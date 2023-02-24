import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MAX_CART_ITEM_QUANTITY} from "../../constants/cart";
import {Cart, CartItemId, CartItemOptions} from "../../types/cart";
import {Product} from "../../types/product";
import {RootState} from "../index";

const initialState: Cart = [];

const add: CaseReducer<Cart, PayloadAction<{ product: Product, options: CartItemOptions }>> =
    (state, {payload: {product, options}}) => {
        const id = `${product.id}${Object.values(options).join("")}`;
        const cartItem = state.find((item) => item.id === id);

        if (cartItem) {
            const newQuantity = cartItem.quantity + 1;
            if (newQuantity <= MAX_CART_ITEM_QUANTITY) {
                cartItem.quantity = newQuantity;
            }

        } else {
            state.push({
                id,
                quantity: 1,
                productId: product.id,
                title: product.title,
                preview: product.preview,
                price: product.price,
                ...options
            });
        }
    }

const remove: CaseReducer<Cart, PayloadAction<CartItemId>> = (state, {payload}) => {
    return state.filter(({id}) => id !== payload);
}

const increment: CaseReducer<Cart, PayloadAction<CartItemId>> = (state, {payload}) => {
    const cartItem = state.find((item) => item.id === payload);

    if (cartItem) {
        const newQuantity = cartItem.quantity + 1;
        if (newQuantity <= MAX_CART_ITEM_QUANTITY) {
            cartItem.quantity = newQuantity;
        }
    }
}

const decrement: CaseReducer<Cart, PayloadAction<CartItemId>> = (state, {payload}) => {
    const cartItem = state.find((item) => item.id === payload);

    if (cartItem) {
        const newQuantity = cartItem.quantity - 1;
        if (newQuantity > 0) {
            cartItem.quantity = newQuantity;
        }
    }
}

const changeQuantity: CaseReducer<Cart, PayloadAction<{ id: CartItemId, quantity: number }>> =
    (state, {payload: {id, quantity}}) => {
        const cartItem = state.find((item) => item.id === id);

        if (cartItem) {
            if (quantity > 0 && quantity <= MAX_CART_ITEM_QUANTITY) {
                cartItem.quantity = quantity;
            }
        }
    }

export const {
    actions: cartActions,
    reducer: cartReducer
} = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add,
        remove,
        increment,
        decrement,
        changeQuantity
    }
})

export const selectCart = (state: RootState) => state.cart;

export const selectCartTotalCount = (state: RootState) =>
    state.cart.reduce((acc, {quantity}) => acc + quantity, 0);

export const selectCartTotalPrice = (state: RootState) =>
    state.cart.reduce((acc, {price, quantity}) =>
        acc + price * quantity, 0);
