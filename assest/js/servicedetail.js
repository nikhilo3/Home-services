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
                <h2 class="heding">${name}</h2>
                <div class="scroll-container">
                    <div class="subitem">
                    <div class="abc" subwrapper></div>
                    </div>
                </div>
                `

            sub_service.forEach(({ id, title, rating, price, image, description1, description2, description3 }) => {
                let newsubcard = document.createElement('div');
                newsubcard.classList.add("cards");
                newsubcard.innerHTML = `
                    
                <div class="carddetailes">
                <div class="border-hero">
                    <h2 class="title">${title}</h2>
                    <div class="reting" style="display:flex; align-items: center;">
                        <img width="32" height="32" 
                            src="https://img.icons8.com/sf-black-filled/64/000000/rating-circled.png"
                            alt="rating-circled" />
                        <span>${rating}</span>
                    </div>
                </div>
                <div class="description">
                    <ul style="padding-left: 15px">
                        <li>${description1}</li>
                        <li>${description2}</li>
                    </ul>
                </div>
                <div class="price">
                    ${price}
                </div>
            </div>
            <div class="card-image">
                <img src=${image}>
                <button class="add-button btn btncart addcart">ADD</button>
            </div>
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
        
    }
    catch (error) {
        console.log('Error adding item to cart:', error);
    }
}