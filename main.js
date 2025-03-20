import { createParagraphs, Order } from './utils.js';

const pancakeTypeInput = document.querySelector('#type');
const totalPriceDisplay = document.querySelector('#totalPriceDisplay');
const totalPriceBanner = document.querySelector('#totalPrice');
const nameInput = document.querySelector('#customerName');
const errorMessage = document.querySelector('#errorText');
const userMessage = document.querySelector('#userMessage');
const confirmOrderBtn = document.querySelector('#confirmOrder');
const overlay = document.querySelector('.overlay');

const closeModal = () => {
    overlay.classList.remove('active');
}
const openModal = () => {
    overlay.classList.add('active');
}

const displayInputError = () => {
    errorText.classList.remove('hidden');
    errorText.textContent = 'Please enter your name.';
}

const changeHandler = () => {
    const basePrice = parseFloat(
        pancakeTypeInput.selectedOptions[0].dataset.price
    )

    const toppingsTotal = [...document.querySelectorAll('.topping:checked')]
    .reduce((sum, topping) => sum + parseFloat(topping.dataset.price), 0);

    const extrasTotal = [...document.querySelectorAll('.extra:checked')]
    .reduce((sum, extra) => sum + parseFloat(extra.dataset.price), 0);

    const deliveryOption = parseFloat(
        document.querySelector('.delivery:checked').dataset.price
    )

    let totalPrice = basePrice + toppingsTotal + extrasTotal + deliveryOption;

    totalPriceDisplay.textContent = `${totalPrice} €`;
    totalPriceBanner.textContent = `${totalPrice} €`;
}

const orderSummary = document.createElement('div');
orderSummary.setAttribute('id', 'orderSummary');

const showOrderDetails = () => {
    orderSummary.textContent = '';

    const order = {
        customerName: nameInput.value,
        pancakeType: pancakeTypeInput.value,
        toppings: [...document.querySelectorAll('.topping:checked')].map(t => t.value),
        extras: [...document.querySelectorAll('.extra:checked')].map(t => t.value),
        deliveryMethod: document.querySelector('.delivery:checked').value,
        totalPrice: parseFloat(totalPriceDisplay.textContent)
    }

    if (!nameInput.value.trim()) {
        displayInputError();
        return;
    }

    createParagraphs(['customerName', 'pancakeType', 'toppings', 'extras', 'deliveryMethod', 'totalPrice'], order, orderSummary);
    
    confirmOrderBtn.classList.remove('hidden');
    document.querySelector('#orderSummaryContent').insertBefore(orderSummary, confirmOrderBtn);

    errorMessage.classList.add('hidden');
    openModal();
}

const resetCheckboxes = (checkboxes) => {
    for (const checkbox of checkboxes) {
        checkbox.checked = false;
    }
}

const resetFormAndPrice = () => {
    resetCheckboxes(document.querySelectorAll('.topping'));
    resetCheckboxes(document.querySelectorAll('.extra'));
    pancakeTypeInput.value = 'Classic';
    document.querySelector('.delivery').checked = 'Eat in';
    totalPriceDisplay.textContent = '5 €';
    totalPriceBanner.textContent = '5 €';
};

const confirmOrder = () => {
    const id = Date.now().toString();
    const customerName = nameInput.value;
    const pancakeType = pancakeTypeInput.value;
    const toppings = [...document.querySelectorAll('.topping:checked')].map(t => t.value);
    const extras = [...document.querySelectorAll('.extra:checked')].map(t => t.value);
    const deliveryMethod = document.querySelector('.delivery:checked').value;
    const totalPrice = parseFloat(totalPriceDisplay.textContent);

    if (!customerName) {
        displayInputError();
        return;
    }

    const newOrder = new Order(id, customerName, pancakeType, toppings, extras, deliveryMethod, totalPrice);

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.push(newOrder);

    localStorage.setItem('orders', JSON.stringify(orders));

    orderSummary.textContent = '';
    errorMessage.classList.add('hidden');
    confirmOrderBtn.classList.add('hidden');
    userMessage.classList.remove('hidden');
    userMessage.textContent = 'Your order has been successfully completed! 🎉 This window will close in a few seconds.';
    nameInput.value = '';

    resetFormAndPrice();
    setTimeout(() => {
        userMessage.classList.add('hidden');
        userMessage.textContent = '';
        closeModal();
    }, 3000)
}

document.addEventListener('click', (event) => {
    if (!document.querySelector('#orderSummaryContent').contains(event.target) && !document.querySelector('#seeOrder').contains(event.target)) {
        overlay.classList.remove('active');
    }
});

document.querySelector('#seeOrder').addEventListener('click', showOrderDetails);
document.querySelector('#pancakeForm').addEventListener('change', changeHandler);
document.querySelector('#closeModal').addEventListener('click', closeModal);
confirmOrderBtn.addEventListener('click', confirmOrder);
