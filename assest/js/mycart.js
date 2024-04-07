const btncheckout = document.querySelector('[btncheckout]');
const msgdisplay = document.querySelector('[msgdisplay]');
const total = document.querySelector('[total]');
const subtotalElement = document.querySelector("[subtotal]");
const tax_feesElement = document.querySelector('[tax_fees]');
const header = document.querySelector('#header');

import { countcart } from "./auth.js";

function displayFlashMessage(message, type) {
  const element = document.createElement('div');
  element.classList.add('flash-message');
  element.classList.add(type);
  element.textContent = message;

  const headerParent = header.parentNode;
  headerParent.insertBefore(element, header.nextSibling);
  // header.append(element);
  setTimeout(() => {
    element.remove();
  }, 3000);
}

const fetchAndRenderCartItems = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/cart/getcartitems', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}` // replace token with your actual token
      }
    });
    if (response.ok) {
      const cartItems = await response.json();
      rendercart(cartItems);
    } else {
      console.log('Failed to fetch cart items', response.statusText);
    }
  } catch (err) {
    console.log('Error fetching cart items:', err);
  }
}



function rendercart(cartItems) {
  const carttable = document.querySelector("[carttable]");
  carttable.innerHTML = '';

  cartItems.forEach(item => {
    let newtable = document.createElement('tr');
    newtable.innerHTML =
      `
                            
                            <td class="align-middle"><img src="${item.image}" alt="" width="70" class="img-fluid rounded shadow-sm"></td>
                                
                                
                            <td class="align-middle"><h5 class="mb-0"><a href="#" class="text-dark d-inline-block">${item.title}</a></td>
                            </th>
                            <td class="align-middle"><strong>${item.price}</strong></td>

                            <td class="align-middle"><button href="#" class="deletecart text-dark" data-itemid="${item._id}"><i class="fa fa-trash"></i></button>
                            </td>
    `
    carttable.appendChild(newtable);

    newtable.querySelector('.deletecart').addEventListener('click', () => {
      removeFromCart(item._id);
      // newtable.remove();
      // updateSubtotal();
      // updatefinaltotal();
      // cartcount();
      // noitemmsg();
    });
  });
  updateSubtotal(cartItems);
  updatefinaltotal(cartItems);
  cartcount(cartItems);
  noitemmsg(cartItems);
}


const removeFromCart = (itemId) => {
  fetch(`http://localhost:3000/cart/removefromcart/${itemId}`, {
    method: 'DELETE'
  }).then((response) => {
    if (response.ok) {
      console.log('Item removed from cart successfully');
      displayFlashMessage("remove successfully", "success");
      fetchAndRenderCartItems();
      countcart();
    } else {
      console.log('Failed to remove item from cart', response.statusText);
    }
  }).catch((err) => {
    console.log('Error removing item from cart:', err);
    displayFlashMessage("login first then access cart item", "error");
  })
  // const itemIndex = cartItems.findIndex(item => item.id === id);
  // if (itemIndex !== -1) {
  //   cartitems.splice('itemIndex', 1);
  //   localStorage.setItem('cartItems', JSON.stringify(cartitems));
  // }
};



function noitemmsg(cartItems) {
  if (cartItems.length == 0) {
    btncheckout.disabled = true;
    msgdisplay.innerHTML = `<p>no service selected in cart</p>`;
    tax_feesElement.textContent = "₹0.00";
    total.textContent = "₹0.00";

  } else {
    btncheckout.disabled = false;
  }
}



function cartcount(cartItems) {
  const cartCountElement = document.querySelector('[countitem]');
  if (cartCountElement) {
    cartCountElement.textContent = cartItems.length;
  }
}


function updateSubtotal(cartItems) {
  const subtotalElement = document.querySelector("[subtotal]");

  const subtotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price.replace(/[^0-9.]/g, ''));
  }, 0);
  subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
}



function updatefinaltotal(cartItems) {
  let subtotals = parseFloat(subtotalElement.textContent.replace(/[^0-9.]/g, ''));
  let tax_feess = parseFloat(tax_feesElement.textContent.replace(/[^0-9.]/g, ''));

  let totals = subtotals + tax_feess;

  total.textContent = `₹${totals.toFixed(2)}`;
}


btncheckout.addEventListener('click', () => {

  localStorage.setItem('paymentsubtotal', subtotalElement.textContent);
  localStorage.setItem('taxandfess', tax_feesElement.textContent);
  localStorage.setItem('paymenttotal', total.textContent);


  window.location.href = "/checkout";
});


fetchAndRenderCartItems();



// const emptycart = () => {
  
// }