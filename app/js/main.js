const toggleCart = document.querySelector('.btn-cart');
const hideCart = document.querySelector('.btn__cart-close');
const cart = document.querySelector('.cart');
const hideCartOverlay = document.querySelector('.cart-overlay');


hideCartOverlay.addEventListener('click', () => {
    cart.classList.remove('cart-visible');
    hideCartOverlay.classList.remove('hide-cart-overlay');
});
hideCart.addEventListener('click', () => {
    cart.classList.remove('cart-visible');
    hideCartOverlay.classList.remove('hide-cart-overlay');
});
toggleCart.addEventListener('click', () => {
    cart.classList.toggle('cart-visible'); 
    hideCartOverlay.classList.add('hide-cart-overlay');
});
