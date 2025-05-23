import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_STATE } from "./user.slice";
import { saveState } from "./storage";
import cartSlice from "./cart.slice";

export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice,
	},
});

store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, JWT_STATE);
	saveState(store.getState().cart, 'cartState');
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch