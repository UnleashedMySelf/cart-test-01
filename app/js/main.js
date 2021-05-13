const toggleCart = document.querySelector('.btn-cart');
const hideCart = document.querySelector('.btn__cart-close');
const cart = document.querySelector('.cart');
const hideCartOverlay = document.querySelector('.cart-overlay');

const shippingCost = 0;

const allItems = document.querySelector('.cart__items');
const productItemList = [...document.querySelectorAll('.cart__item')];
const countChange = document.querySelectorAll('.cart__item-input-qty');
const itemPrice = document.querySelectorAll('.cart__item-price');
const inputValue = (input) => Number(input.value) * Number(input.dataset.price);
let countOfItems = document.querySelector('.cart-indicator');
const btnQty = document.getElementById('cartItems');
const btnDeleteItem = document.querySelectorAll('.btn__cart-item-close');
console.log(btnQty);

const main = () => {
    let totalPrice = 0;
    productItemList.forEach((productItem) => {
        totalPrice += inputValue(productItem.querySelector('.cart__item-input-qty'));
        console.log(inputValue(productItem.querySelector('.cart__item-input-qty')));
        document.querySelector('.cart__totalcost-amout').textContent = '$ ' + totalPrice;
    })
    if (productItemList.length <= 0) {
        document.querySelector('.cart__totalcost-amout').textContent = '$0';
        allItems.innerHTML += ``;
    }
    totalPrice += shippingCost;
    countOfItems.textContent = '(' + productItemList.length + ')';
    countOfItems.dataset.indicator = productItemList.length;

    if (countOfItems.dataset.indicator == 0) {
        cart.classList.add('cart-empty');
        countOfItems.textContent = '';
        document.querySelector('.cart__shipping-unlock').classList.add('hidden');
        document.querySelector('.cart__checkout-total').classList.add('hidden');
        document.querySelector('.cart__items-empty-img').classList.remove('hidden');
        document.querySelector('.cart__text-empty').classList.remove('hidden');
        document.querySelector('.btn__cart-empty').classList.remove('hidden');
        allItems.style.height = 'auto';
    }
    else {
        document.querySelector('.cart__items-empty-img').classList.add('hidden');
        document.querySelector('.cart__text-empty').classList.add('hidden');
        document.querySelector('.btn__cart-empty').classList.add('hidden');
    }

    console.log(countOfItems);
    document.querySelector('.cart__totalcost-amout').textContent = totalPrice;
} 
main();

const subTotal = () => {
    countChange.forEach(inputChangeVal => {
        inputChangeVal.addEventListener('change', (e) => {
            const targetItem = e.target;
            if (targetItem.value <= 0) {
                targetItem.value = 1
            }
            const setSubtotalPrice = targetItem.closest('div').getElementsByClassName('cart__item-price')[0];
            setSubtotalPrice.textContent = '$' + Number(targetItem.value) * Number(targetItem.dataset.price);
            main();
            e.preventDefault();
        })
    })
}
subTotal();


btnQty.addEventListener('click', (e) => {
    if(e.target.classList.contains('cart__item-qty-minus')) {
        const inputCurrent = e.target.closest("div").getElementsByClassName('cart__item-input-qty')[0];
        inputCurrent.value <= 1 ? inputCurrent.value = 1 : inputCurrent.value--;
        const setSubtotalPrice = e.target.closest("div").getElementsByClassName('cart__item-price')[0];
        setSubtotalPrice.textContent = '$' + Number(inputCurrent.value) * Number(inputCurrent.dataset.price);
        main();
        subTotal();
    }
    if(e.target.classList.contains('cart__item-qty-plus')) {
        const inputCurrent = e.target.closest("div").getElementsByClassName('cart__item-input-qty')[0];
        inputCurrent.value++;
        const setSubtotalPrice = e.target.closest("div").getElementsByClassName('cart__item-price')[0];
        setSubtotalPrice.textContent = '$' + Number(inputCurrent.value) * Number(inputCurrent.dataset.price);
        main();
        subTotal();
    }
})

// Show-hide cart
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



// Цикл обработки удаления товаров по кнопке "удалить"
btnDeleteItem.forEach(btnDel => {
    btnDel.addEventListener('click', () => {
        const indexItem = productItemList.indexOf(btnDel.parentElement);
        console.log(productItemList[indexItem]);
        productItemList[indexItem].remove();
        productItemList.splice(indexItem, 1);
        main();
        subTotal();
    })
}) 