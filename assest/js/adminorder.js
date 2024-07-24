const BASEURL = "home-services-seven.vercel.app";

const fetchOrder = async () => {
    try {
        const response = await fetch(`${BASEURL}/adminorder/order`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                // 'Authorization': `Bearer ${token}` // replace token with your actual token
            }
        });
        if (response.ok) {
            const cartItems = await response.json();
            renderorder(cartItems);
        } else {
            console.log('Failed to fetch order', response.statusText);
        }
    } catch (err) {
        console.log('Error fetching order:', err);
    }
}

const renderorder = (cartItems) => {
    const adminordershow = document.querySelector('.adminordershow');
    adminordershow.innerHTML = '';

    

    cartItems.forEach(item => {
        const formattedDate = moment(item.appointmentDate).format('YYYY-MM-DD');
        let newrow = document.createElement('tr');
        newrow.innerHTML =
            `
                <td>${item.fullName}</td>
                <td>${item.address},${item.city},${item.state},${item.postalCode}</td>
                <td>${item.emailAddress}</td>
                <td>${item.mobileNumber}</td>
                <td>${item.paytotal}</td>
                <td>${formattedDate}(${item.appointmentTime})</td>
    `
        adminordershow.appendChild(newrow);
    });
}

fetchOrder();





$(window).on("load resize", function () {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({ 'padding-right': scrollWidth });
}).resize();