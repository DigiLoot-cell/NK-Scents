// script.js

// Cart functionality
let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    cart.push({ name, price });
    alert(`${name} added to your cart!`);
  });
});

// PayPal Integration
paypal.Buttons({
  createOrder: (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: cart.reduce((total, item) => total + item.price, 0).toFixed(2)
        }
      }]
    });
  },
  onApprove: (data, actions) => {
    return actions.order.capture().then(details => {
      alert(`Transaction completed by ${details.payer.name.given_name}!`);
      cart = []; // Clear the cart after successful payment
    });
  }
}).render('#paypal-button-container');