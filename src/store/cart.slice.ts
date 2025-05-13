import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export interface CartItemI {
	id: number;
	count: number;
}

export interface CartState {
	items: CartItemI[];
}

const initialState: CartState = loadState<CartState>('cartState') ?? {
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const isItemExist = state.items.find(
				(i) => i.id === action.payload
			);
			if (!isItemExist) {
				state.items.push({ id: action.payload, count: 1 });
				return;
			}
			state.items.map((item) => {
				if (item.id === action.payload) {
					item.count += 1;
				}
				return item;
			});
		},
		remove: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((i) => i.id === action.payload);
			if (!existed) {
				return;
			}
			if (existed.count === 1) {
				state.items = state.items.filter(
					(i) => i.id !== action.payload
				);
			} else {
				state.items.map((i) => {
					if (i.id === action.payload) {
						i.count -= 1;
					}
					return i;
				});
				return;
			}
		},
		clean: (state) => {
			state.items = [];
		},
		delete: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
	},
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
