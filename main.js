import { Order } from './utils.js';

const totalPriceDisplay = document.querySelector('#totalPriceDisplay');
const totalPrice = document.querySelector('.total-price');
const nameInput = document.querySelector('#customerName');
const confirmOrderBtn = document.querySelector('#confirm-order');

const nameVal = document.querySelector('#customer-name-val');
const typeVal = document.querySelector('#pancake-type-val');
const toppingsVal = document.querySelector('#toppings-val');
const extrasVal = document.querySelector('#extras-val');
const deliveryVal = document.querySelector('#delivery-val');

const updateSummaryValues = () => {
    const toppings = [...document.querySelectorAll('.topping:checked')].map(t => t.value);
    const extras = [...document.querySelectorAll('.extra:checked')].map(t => t.value);
    nameVal.textContent = nameInput.value;

    typeVal.textContent = document.querySelector('.pancake-type:checked').value;
    toppingsVal.textContent = toppings.length > 0 ? toppings.join(', ') : 'Not selected';
    extrasVal.textContent = extras.length > 0 ? extras.join(', ') : 'Not selected';
    deliveryVal.textContent = document.querySelector('.delivery:checked').value;
}

const stepIndexes = document.querySelectorAll('.index');

stepIndexes.forEach((s, i) => {
    s.addEventListener('click', () => {
        updateStepVisibility(i);
    })
})


const navLeft = document.getElementById("navLeft");
const navRight = document.getElementById("navRight");
const form = document.getElementById("pancakeForm");
const formSteps = ["one", "two", "three", "four", "five", "six"];

let currentStep = 0;

const updateStepVisibility = (i) => {
    // totalPriceDisplay.classList.remove('hidden');
    currentStep = i || i === 0 ? i : currentStep;
    formSteps.forEach((step) => {
        document.getElementById(step).style.display = "none";
    });

    stepIndexes.forEach(s => s.classList.remove('active'));

    stepIndexes[currentStep].classList.add('active');

    if (currentStep === 5 || i === 5) {
        updateSummaryValues();
    }

    currentStep > 0 || i > 0 ? totalPrice.classList.remove('hidden') : totalPrice.classList.add('hidden')


  document.getElementById(formSteps[currentStep]).style.display = "block";
  navLeft.style.display = currentStep === 0 ? "none" : "block";
  navRight.style.display =
  currentStep === formSteps.length - 1 ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
  navLeft.style.display = "none";
  updateStepVisibility();
  navRight.addEventListener("click", () => {
    if (currentStep < formSteps.length - 1) {
      if (nameInput.value.trim()) {
        currentStep++;
        updateStepVisibility();
      } else document.querySelector('.error-message').textContent = 'Please enter your name';
    }
  });

  navLeft.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      updateStepVisibility();
    }
  });
});

// const displayInputError = () => {
//     errorText.classList.remove('hidden');
//     errorText.textContent = 'Please enter your name.';
// }

const changeHandler = () => {
    const basePrice = parseFloat(
        document.querySelector('.pancake-type:checked').dataset.price
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
    // totalPriceBanner.textContent = `${totalPrice} €`;
}

// const showOrderDetails = () => {
//     orderSummary.textContent = '';

//     const order = {
//         customerName: nameInput.value,
//         pancakeType: pancakeTypeInput.value,
//         toppings: [...document.querySelectorAll('.topping:checked')].map(t => t.value),
//         extras: [...document.querySelectorAll('.extra:checked')].map(t => t.value),
//         deliveryMethod: document.querySelector('.delivery:checked').value,
//         totalPrice: parseFloat(totalPriceDisplay.textContent)
//     }

//     if (!nameInput.value.trim()) {
//         displayInputError();
//         return;
//     }

//     createParagraphs(['customerName', 'pancakeType', 'toppings', 'extras', 'deliveryMethod', 'totalPrice'], order, orderSummary);
    
//     confirmOrderBtn.classList.remove('hidden');
//     document.querySelector('#orderSummaryContent').insertBefore(orderSummary, confirmOrderBtn);

//     errorMessage.classList.add('hidden');
//     openModal();
// }

// const resetCheckboxes = (checkboxes) => {
//     for (const checkbox of checkboxes) {
//         checkbox.checked = false;
//     }
// }

// const resetFormAndPrice = () => {
//     resetCheckboxes(document.querySelectorAll('.topping'));
//     resetCheckboxes(document.querySelectorAll('.extra'));
//     pancakeTypeInput.value = 'Classic';
//     document.querySelector('.delivery').checked = 'Eat in';
//     totalPriceDisplay.textContent = '5 €';
//     totalPriceBanner.textContent = '5 €';
// };

const confirmOrder = (e) => {
    e.preventDefault();
    orderSummary.textContent = '';
    const id = Date.now().toString();
    const customerName = nameInput.value;
    const pancakeType = document.querySelector('.pancake-type:checked').value;
    const toppings = [...document.querySelectorAll('.topping:checked')].map(t => t.value);
    const extras = [...document.querySelectorAll('.extra:checked')].map(t => t.value);
    const deliveryMethod = document.querySelector('.delivery:checked').value;
    const totalPrice = parseFloat(totalPriceDisplay.textContent);

    // if (!customerName) {
    //     displayInputError();
    //     return;
    // }

    const newOrder = new Order(id, customerName, pancakeType, toppings, extras, deliveryMethod, totalPrice);

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.push(newOrder);

    localStorage.setItem('orders', JSON.stringify(orders));

   document.querySelector('#six').textContent = "Thank you for your order! Your pancakes are on their way!🥞❤️"
}

// document.querySelector('#seeOrder').addEventListener('click', showOrderDetails);
form.addEventListener('change', changeHandler);
// document.querySelector('#closeModal').addEventListener('click', closeModal);
confirmOrderBtn.addEventListener('click', confirmOrder);


