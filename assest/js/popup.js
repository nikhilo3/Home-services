const BASEURL = "home-services-seven.vercel.app";

$(document).ready(function () {
  $('.popup-btn').click(function (e) {
    $('.popup-wrap').fadeIn(500);
    $('.popup-box').removeClass('transform-out').addClass('transform-in');

    e.preventDefault();
  });
});
const removeFromCart = () => {
  fetch(`${BASEURL}/cart/removeall`, {
    method: 'DELETE'
  }).then((response) => {
    if (response.ok) {
      console.log('Item removed from cart successfully');
      window.location.href = `${BASEURL}`;
    } else {
      console.log('Failed to remove item from cart', response.statusText);
    }
  }).catch((err) => {
    console.log('Error removing item from cart:', err);
    displayFlashMessage("login first then access cart item", "error");
  })
};
