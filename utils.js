export const createParagraphs = (keysArray, order, parentDiv) => {
    keysArray.forEach(k => {
        const summaryItem = document.createElement('div');
        summaryItem.classList.add('summary-item');

        const title = document.createElement('h4');
        const value = document.createElement('p');

        switch (k) {
            case 'customerName':
                title.textContent = 'Customer name:';
                value.textContent = order.customerName;
                break;
            case 'pancakeType':
                title.textContent = 'Pancake type:';
                value.textContent = order.pancakeType;
                break;
            case 'toppings':
                title.textContent = 'Toppings:';
                value.textContent = order.toppings.length > 0 ? order.toppings.join(', ') : 'Not selected';
                break;
            case 'extras':
                title.textContent = 'Extras:';
                value.textContent = order.extras.length > 0 ? order.extras.join(', ') : 'Not selected';
                break;
            case 'deliveryMethod':
                title.textContent = 'Delivery method:';
                value.textContent = order.deliveryMethod;
                break;
            case 'totalPrice':
                title.textContent = 'Total price:';
                value.textContent = `${order.totalPrice} €`;
                break;
            default:
                return; 
        }

        summaryItem.appendChild(title);
        summaryItem.appendChild(value);
        parentDiv.appendChild(summaryItem);
    });
};



export class Order {
    constructor(id, customerName, pancakeType, toppings, extras, deliveryMethod, totalPrice, status = 'waiting') {
        this.id = id;
        this.customerName = customerName;
        this.pancakeType = pancakeType;
        this.toppings = toppings;
        this.extras = extras;
        this.deliveryMethod = deliveryMethod;
        this.totalPrice = totalPrice;
        this.status = status;
    }
};