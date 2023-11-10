export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    //calculate item price
    state.itemPrice = addDecimals(state.cartItems.reduce((total, item) => {
        return (total + item.price * item.qty)
    },0));
    //calculate tax price
    state.taxPrice = addDecimals(Number(0.15 * state.itemPrice));
    //calculate shipping price if price is greater dhan 1000  then free else 20 rupees shipping 
    state.shippingPrice = addDecimals(state.itemPrice > 1000 ? 0 : 10);
    //calculate total price
    state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.taxPrice) +
        Number(state.shippingPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}