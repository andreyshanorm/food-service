import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { PREFIX } from "../api/Api";
import axios, { AxiosError } from "axios";
import type { getProfileResponce, LoginResponce } from "../interfaces/authInterface";

export const JWT_STATE = "userData";

export interface UserBeginState {
	jwt: string | null;
}

export interface UserState {
	jwt: string | null;
	name: string | undefined;
	email: string | undefined;
	loginMessage?: string;
}

const initialState: UserState = {
	jwt: loadState<UserBeginState>(JWT_STATE)?.jwt ?? null,
    name: undefined,
    email: undefined
};

export const login = createAsyncThunk(
	"user/login",
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<LoginResponce>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password,
			});
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message);
			}
		}
	}
);

export const getProfile = createAsyncThunk(
	"user/profile",
	async (token: string) => {
		try {
			const { data } = await axios.get<getProfileResponce>(
				`${PREFIX}/user/profile`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message);
			}
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginMessage = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
			state.loginMessage = "Успешно";
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
            state.email = action.payload.email
            state.name = action.payload.name;
		});
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
