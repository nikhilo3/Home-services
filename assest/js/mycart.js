
const storedCartItems = localStorage.getItem('cartItems');
const cartitems = storedCartItems ? JSON.parse(storedCartItems) : "[]"
const btncheckout = document.querySelector('[btncheckout]');
const msgdisplay = document.querySelector('[msgdisplay]');
const total = document.querySelector('[total]');
const subtotalElement = document.querySelector("[subtotal]");
const tax_feesElement = document.querySelector('[tax_fees]');

function rendercart() {
  const carttable = document.querySelector("[carttable]");
  cartitems.forEach(item => {
    let newtable = document.createElement('tr');
    newtable.innerHTML =
      `
                            
                            <td class="align-middle"><img src="${item.image}" alt="" width="70" class="img-fluid rounded shadow-sm"></td>
                                
                                
                            <td class="align-middle"><h5 class="mb-0"><a href="#" class="text-dark d-inline-block">${item.title}</a></td>
                            </th>
                            <td class="align-middle"><strong>${item.price}</strong></td>

                            <td class="align-middle"><button href="#" class="deletecart text-dark"><i class="fa fa-trash"></i></button>
                            </td>
    `
    carttable.appendChild(newtable);

    newtable.querySelector('.deletecart').addEventListener('click', () => {
      removeFromCart(item.id);
      newtable.remove();
      updateSubtotal();
      updatefinaltotal();
      cartcount();
      noitemmsg();
    });
  });
}
rendercart();

function noitemmsg() {
  if (cartitems.length == 0) {
    btncheckout.disabled = true;
    msgdisplay.innerHTML = `<p>no service selected in cart</p>`;
    tax_feesElement.textContent = "₹0.00";
    total.textContent = "₹0.00";

  } else {
    btncheckout.disabled = false;
  }
}
noitemmsg();


function cartcount() {
  const cartCountElement = document.querySelector('[countitem]');
  if (cartCountElement) {
    cartCountElement.textContent = cartitems.length;
  }
}
cartcount();


const removeFromCart = (id) => {
  const itemIndex = cartitems.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    cartitems.splice('itemIndex', 1);
    localStorage.setItem('cartItems', JSON.stringify(cartitems));
  }
};


function updateSubtotal() {
  const subtotalElement = document.querySelector("[subtotal]");

  const subtotal = cartitems.reduce((total, item) => {
    return total + parseFloat(item.price.replace(/[^0-9.]/g, ''));
  }, 0);
  subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
}
updateSubtotal();



function updatefinaltotal() {
  let subtotals = parseFloat(subtotalElement.textContent.replace(/[^0-9.]/g, ''));
  let tax_feess = parseFloat(tax_feesElement.textContent.replace(/[^0-9.]/g, ''));

  let totals = subtotals + tax_feess;

  total.textContent = `₹${totals.toFixed(2)}`;
}
updatefinaltotal();