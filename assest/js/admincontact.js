const fetchdetail = async () => {
    try {
        const response = await fetch('http://localhost:3000/adminorder/contact', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
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
    const admincontactshow = document.querySelector('.admincontactshow');
    admincontactshow.innerHTML = '';



    user.forEach(item => {
        let newrow = document.createElement('tr');
        newrow.innerHTML =
            `
                <td>${item.conname}</td>
                <td>${item.conmail}</td>
                <td>${item.conphone}</td>
                <td>${item.condetail}</td>
    `
        admincontactshow.appendChild(newrow);
    });
}

fetchdetail();





$(window).on("load resize ", function () {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({ 'padding-right': scrollWidth });
}).resize();