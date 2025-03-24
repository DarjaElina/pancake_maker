import { Order } from './utils.js';

const totalPriceDisplay = document.querySelector('#totalPriceDisplay');
const totalPrice = document.querySelector('.total-price');
const nameInput = document.querySelector('#customerName');
const confirmOrderBtn = document.querySelector('.confirm-order');

const nameVal = document.querySelector('#customerNameVal');
const typeVal = document.querySelector('#pancakeTypeVal');
const toppingsVal = document.querySelector('#toppingsVal');
const extrasVal = document.querySelector('#extrasVal');
const deliveryVal = document.querySelector('#deliveryVal');
const totalVal = document.querySelector('#totalVal');

const updateSummaryValues = () => {
    const toppings = [...document.querySelectorAll('.topping:checked')].map(t => t.value);
    const extras = [...document.querySelectorAll('.extra:checked')].map(t => t.value);
    nameVal.textContent = nameInput.value;

    typeVal.textContent = document.querySelector('.pancake-type:checked').value;
    toppingsVal.textContent = toppings.length > 0 ? toppings.join(', ') : 'Not selected';
    extrasVal.textContent = extras.length > 0 ? extras.join(', ') : 'Not selected';
    deliveryVal.textContent = document.querySelector('.delivery:checked').value;
    totalVal.textContent = `${parseFloat(totalPriceDisplay.textContent)}€`;
}

const stepIndexes = document.querySelectorAll('.index');

stepIndexes.forEach((s, i) => {
    s.addEventListener('click', () => {
      if (nameInput.value.trim()) {
        currentStep++;
        updateStepVisibility(i);
      } else showError(nameInput, 'Please, enter your name.');
    })
})


const navLeft = document.getElementById("navLeft");
const navRight = document.getElementById("navRight");
const form = document.getElementById("pancakeForm");
const formSteps = ["one", "two", "three", "four", "five", "six"];

let currentStep = 0;

const updateStepVisibility = (i) => {
    currentStep = i || i === 0 ? i : currentStep;
    document.querySelector('.confirm-order').classList.add('hidden');
    formSteps.forEach((step) => {
        document.getElementById(step).style.display = "none";
    });

    stepIndexes.forEach(s => s.classList.remove('active'));

    stepIndexes[currentStep].classList.add('active');

    if (currentStep === 5 || i === 5) {
        updateSummaryValues();
        document.querySelector('.confirm-order').classList.remove('hidden');
    }

    currentStep > 0 || i > 0 ? totalPrice.classList.remove('hidden') : totalPrice.classList.add('hidden')


  document.getElementById(formSteps[currentStep]).style.display = "block";
  navLeft.style.display = currentStep === 0 ? "none" : "block";
  navRight.style.display =
  currentStep === formSteps.length - 1 ? "none" : "block";
}

const showError = (input, message) => {
  const formControl = input.parentElement;
  const errorSpan = formControl.querySelector(".error-message");
  input.classList.add("error");
  errorSpan.textContent = message;
}

const clearError = (input) => {
  const formControl = input.parentElement;
  const errorSpan = formControl.querySelector(".error-message");
  input.classList.remove("error");
  errorSpan.textContent = "";
}

const realtimeValidation = () => {
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim() !== "") clearError(nameInput);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  navLeft.style.display = "none";
  updateStepVisibility();
  realtimeValidation();

  navRight.addEventListener("click", () => {
    if (currentStep < formSteps.length - 1) {
      if (nameInput.value.trim()) {
        currentStep++;
        updateStepVisibility();
      } else showError(nameInput, 'Please, enter your name');
    }
  });

  navLeft.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      updateStepVisibility();
    }
  });
});

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
}

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

    const newOrder = new Order(id, customerName, pancakeType, toppings, extras, deliveryMethod, totalPrice);

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.push(newOrder);

    localStorage.setItem('orders', JSON.stringify(orders));

   document.querySelector('#pancakeForm').textContent = "Thank you for your order! Your pancakes are on their way! 🥞❤️";
   const reorderBtn = document.createElement('button');
   reorderBtn.setAttribute('id', 'reorderBtn')
   reorderBtn.textContent = 'Order again';
   document.querySelector('#pancakeForm').appendChild(reorderBtn);
   reorderBtn.addEventListener('click', () => {
    location.reload();
  })
}

form.addEventListener('change', changeHandler);
confirmOrderBtn.addEventListener('click', confirmOrder);




