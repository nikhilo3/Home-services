import { fetchData } from "./fetchjson.js";

const herophoto = document.querySelector("[subservicemain]");
const heading = document.querySelector('#headingmain');
const rating = document.querySelector('[ratingmain]');
let subcontain = document.querySelector('[subcontain]');



(async () => {

    try {
        const data = await fetchData();

        let serviceid = new URLSearchParams(window.location.search).get('id');

        let thisservice = data.filter((data) => {
            return data.id == serviceid;
        })[0];

        herophoto.src = thisservice.herophoto;
        heading.textContent = thisservice.heading;
        rating.innerHTML = `<img width="42" height="42" src="https://img.icons8.com/sf-black-filled/64/000000/rating-circled.png" alt="rating-circled" />
            <span>${thisservice.rating}</span>`;

        console.log(data);

        thisservice.all_service.forEach(({ name, sub_service }) => {

            let newservices = document.createElement('div');
            newservices.classList = "subserv";
            newservices.innerHTML = `
                <h2>${name}</h2>
                <div class="scroll-container">
                    <div class="subitem">
                    <div class="d-flex" style="gap:50px;" subwrapper></div>
                    </div>
                </div>
                `

            sub_service.forEach(({ id, title, rating, price, image, description1, description2, description3 }) => {
                let newsubcard = document.createElement('div');
                newsubcard.classList.add("row", "p-lg-3", "col-lg-4", "pb-0", "pe-lg-0", "pt-lg-2", "align-items-center", "rounded-5", "shadow-lg", "justify-between")
                newsubcard.style.borderRadius = '10px';
                newsubcard.innerHTML = `
                    
        <div class="col-lg-8 p-lg-3">
          <h2 class=" fw-bold lh-1" style="font-size: 24px;">${title}</h2>
          <div class="d-flex " style="align-items:center;">
          <img width="42" height="42"
                            src="https://img.icons8.com/sf-black-filled/64/000000/rating-circled.png"
                            alt="rating-circled" />
                        <span>${rating}</span>
            </div>
          <ul style=" font-size:12px; padding-left: 20px; line-height: 20px; text-align: justify; ">
            <li style="list-style:disc;">${description1}</li>
            <li style="list-style:disc;">${description2}</li>
            <li style="list-style:disc;">${description3}</li>
          </ul>
          <div style="padding-left: 20px;">
          <span class="fw-bold" style="font-size:22px;">${price}</span>
        </div>
        </div>
        <div class="col-lg-4 p-0 shadow-lg" style=" position: relative; text-align: center;">
          <img class="rounded" src="${image}" alt="" width="164px" height="170px" style="object-fit: cover;">
            <button type="button" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold btncart addcart" style="position: absolute; bottom: -24px; right: 25px;">ADD</button>
        </div>
                    `
                newservices.querySelector('[subwrapper]').appendChild(newsubcard);

                newsubcard.querySelector('.addcart').addEventListener('click', () => {
                    addtocart(id, title, price, image);
                });

            });

            subcontain.appendChild(newservices);
        });
    } catch (err) {
        console.log("error is occured", err)
    }

})();





async function addtocart(id, title, price, image) {
    console.log(id, title, price, image);

    try {
        const response = await fetch('http://localhost:3000/cart/addtocart', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: title,
                price: price,
                image: image,
                quantity: 1
            })
        });

        if (response.ok) {
            console.log('Item added to cart successfully');
        }
        else {
            console.log('failed to add item to cart', response.statusText);
        }
        // const existingItem = cartItems.find((item) => {
        //     item.id === id;
        // });

        // if (existingItem) {
        //     existingItem.quantity += 1;
        // }
        // else {
        //     cartItems.push({
        //         id: id,
        //         title: title,
        //         price: price,
        //         image: image,
        //         quantity: 1
        //     });
        // }

        // localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    catch (error) {
        console.log('Error adding item to cart:', error);
    }
}