const fetchSub = async () => {
    try {
        const response = await fetch('http://localhost:3000/adminorder/sub', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                // 'Authorization': `Bearer ${token}` // replace token with your actual token
            }
        });
        if (response.ok) {
            const Submail = await response.json();
            rendersub(Submail);
        } else {
            console.log('Failed to fetch order', response.statusText);
        }
    } catch (err) {
        console.log('Error fetching order:', err);
    }
}

const rendersub = (Submail) => {
    const adminsubshow = document.querySelector('.adminsubshow');
    adminsubshow.innerHTML = '';



    Submail.forEach(item => {
        let newrow = document.createElement('tr');
        newrow.innerHTML =
            `
            <td>${item.submail}</td>
    `
        adminsubshow.appendChild(newrow);
    });
}

fetchSub();


$(window).on("load resize ", function () {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({ 'padding-right': scrollWidth });
}).resize();