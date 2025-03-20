import { createParagraphs } from './utils.js';

const orders = JSON.parse(localStorage.getItem('orders')) || [];
const orderList = document.querySelector('#orderList');

const createDropdown = (currentSelected) => {
    const options = ['waiting', 'ready', 'delivered'];
    const select = document.createElement('select');

    for (const option of options) {
        const optionNode = document.createElement('option');
        optionNode.value = option;
        optionNode.textContent = `${option.charAt(0).toUpperCase()}${option.slice(1)}`;
        select.appendChild(optionNode);
    }

    select.value = currentSelected;
    return select;
}

const createDropdownWrapper = (label, dropdown, parentDiv) => {
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.setAttribute('class', 'statusDropdownWrapper');
    dropdownWrapper.append(label, dropdown);
    styleDropdownWrapper(dropdownWrapper);

    parentDiv.appendChild(dropdownWrapper);
}

const styleDropdownWrapper = (dropdown) => {
    const colors = {
        waiting: '#FFC107',
        ready: '#A2D2FF',
        delivered: '#B8E0D6'
    }
    dropdown.style.backgroundColor = colors[dropdown.childNodes[1].value] || '#FFF0F3';
}

const createBtn = (text) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    return btn;
}

const updateOrders = (orders) => {
    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrders(orders, "Looks like you've completed all orders for the current moment 😃");
}

const displayOrders = (orders, message) => {
    orderList.textContent = '';

    if (orders.length === 0)
        orderList.textContent = message;

    orders.forEach((order) => {
        const orderItem = document.createElement('li');
        const status = document.createElement('p');
        status.textContent = 'Status: ';
        const dropdown = createDropdown(order.status);
        createDropdownWrapper(status, dropdown, orderItem);
        createParagraphs(['customerName', 'pancakeType', 'toppings', 'extras', 'deliveryMethod', 'totalPrice'], order, orderItem);

        dropdown.addEventListener('change', () => {
            const updatedOrders = orders.map(o => o.id === order.id ? {...order, status: dropdown.value} : o);
            updateOrders(updatedOrders);
        });

        if (order.status === 'delivered') {
            const btn = createBtn('Remove order');
            orderItem.appendChild(btn);
            btn.addEventListener('click', () => {
                const updatedOrders = orders.filter(o => o.id !== order.id)
                updateOrders(updatedOrders);
            })
        }

        orderList.appendChild(orderItem);
    })
}

const searchOrder = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const searchText = document.querySelector('#searchOrder').value;
    const filteredOrders = orders.filter(o => o.id.toLowerCase().includes(searchText.toLowerCase()));

    displayOrders(filteredOrders, "Sorry, we couldn't find any orders with this id :(");
}

const sortOrders = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.sort((order1, order2) => order2.status.localeCompare(order1.status));

    displayOrders(orders, "Looks like you've completed all orders for the current moment 😃");
}

document.querySelector('#searchOrder').addEventListener('input', searchOrder);

document.querySelector('#sortOrders').addEventListener('click', sortOrders);

displayOrders(orders, "Looks like you've completed all orders for the current moment 😃");
