import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    data: [],
    shipping: 0,
    totalQuantity: 0,
    totalAmount: 0,
    globalTotalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            // Check if on the cart
            const itemIndex = state.data.findIndex(
                (item) => item._id === action.payload._id
            );
            // Add product to cart
            if (itemIndex >= 0) {
                state.data[itemIndex].quantity += 1;
                toast.info(`Increasing of the quantity of product ${state.data[itemIndex].name} to cart...`, {
                    position: "bottom-left",
                });
            } else {
                const temp = { ...action.payload, quantity: 1 }
                state.data.push(temp);
                toast.success(`Product ${action.payload.name} added to cart...`, {
                    position: "bottom-left",
                });
            }
        },
        removeFromCart(state, action) {
            const temp = state.data.filter(
                item => item._id !== action.payload._id
            )
            state.data = temp;
            toast.error(`Product ${action.payload.name} at remove from cart...`, {
                position: "bottom-left",
            });
        },
        decreaseCart(state, action) {
            const itemIndex = state.data.findIndex(
                (item) => item._id === action.payload._id
            );
            if (state.data[itemIndex].quantity > 1) {
                state.data[itemIndex].quantity -= 1;
                toast.info(`Decreasing of the quantity of product ${state.data[itemIndex].name} to cart...`, {
                    position: "bottom-left",
                });
            } else if (state.data[itemIndex].quantity === 1) {
                const temp = state.data.filter(
                    item => item._id !== action.payload._id
                )
                state.data = temp;
                toast.error(`Product ${action.payload.name} at remove from cart...`, {
                    position: "bottom-left",
                });
            }
        },
        getTotals(state, action) {
            let { globalTotal, total, quantity, shipping } = state.data.reduce(
                (dataTotal, dataItem) => {
                    const { price, quantity } = dataItem;
                    const itemTotal = price * quantity;

                    dataTotal.total += itemTotal;
                    dataTotal.quantity += quantity;

                    // Check the total amount cart and update to the estimated shipping
                    if (dataTotal.total >= 50) {
                        dataTotal.shipping = 0;
                        dataTotal.globalTotal = dataTotal.total + dataTotal.shipping;
                    } else {
                        dataTotal.shipping = 4;
                        dataTotal.globalTotal = dataTotal.total + dataTotal.shipping;
                    }

                    return dataTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                    shipping: 0,
                    globalTotal: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            globalTotal = parseFloat(globalTotal.toFixed(2));
            state.shipping = shipping;
            state.totalQuantity = quantity;
            state.totalAmount = total;
            state.globalTotalAmount = globalTotal;
        },
        clearCart(state, action) {
            state.data = [];
            toast.error(`Cart cleared...`, {
                position: "bottom-left",
            });
        }
    },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
