const BASEURL = "home-services-seven.vercel.app";


const fetchOrder = async () => {
    try {
        const response = await fetch(`${BASEURL}/adminorder/user`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                // 'Authorization': `Bearer ${token}` // replace token with your actual token
            }
        });
        if (response.ok) {
            const user = await response.json();
            render(user);
        } else {
            console.log('Failed to fetch user detail', response.statusText);
        }
    } catch (err) {
        console.log('Error fetching user detail:', err);
    }
}

const render = (user) => {
    const adminusershow = document.querySelector('.adminusershow');
    adminusershow.innerHTML = '';



    user.forEach(item => {
        let newrow = document.createElement('tr');
        newrow.innerHTML =
            `
                <td>${item.username}</td>
                <td>${item.email}</td>
                <td>${item.role}</td>
    `
        adminusershow.appendChild(newrow);
    });
}

fetchOrder();





$(window).on("load resize ", function () {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({ 'padding-right': scrollWidth });
}).resize();