export const createParagraphs = (keysArray, order, parentDiv) => {
    keysArray.forEach(k => {
        const paragraph = document.createElement('p');
        paragraph.classList.add('decoratedParagraph')
        parentDiv.appendChild(paragraph);
        switch (k) {
            case 'customerName':
                paragraph.textContent = `Customer name: ${order.customerName}`;
                return;
            case 'pancakeType':
                paragraph.textContent = `Pancake type: ${order.pancakeType}`;
                return;
            case 'toppings':
                paragraph.textContent = `Toppings: ${order.toppings.length > 0 ? order.toppings.join(', ') : 'Not selected'}`;
                return;
            case 'extras':
                paragraph.textContent = `Extras: ${order.extras.length > 0 ? order.extras.join(', ') : 'Not selected'}`;
                return;
            case 'deliveryMethod':
                paragraph.textContent = `Delivery method: ${order.deliveryMethod}`;
                return;
            case 'totalPrice':
                paragraph.textContent = `Total price: ${order.totalPrice} €`;
                return;
            default:
                paragraph.textContent = '';
        }
    })
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