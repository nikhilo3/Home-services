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
                        <div class="subwrapper" subwrapper>
                            
                        </div>    
                    </div>
                </div>
                `

            sub_service.forEach(({ id, title, rating, price, image, description1, description2, description3 }) => {
                let newsubcard = document.createElement('div');
                newsubcard.classList = "subcard";
                // newsubcard.dataset.id = id;
                newsubcard.innerHTML = `
                    <div class="right">
                    <h4>${title}</h4>

                    <div class="rating">
                        <img width="24" height="24"
                            src="https://img.icons8.com/sf-black-filled/64/000000/rating-circled.png"
                            alt="rating-circled" />
                        <span>${rating}</span>
                    </div>

                    <span class="price">${price}</span>

                    <div class="detail">
                        <div class="detail1">
                            <img width="10" height="10"
                                src="https://img.icons8.com/ios-glyphs/30/full-stop--v2.png"
                                alt="full-stop--v2" />
                            <span>${description1}</span>
                        </div>

                        <div class="detail1">
                            <img width="10" height="10"
                                src="https://img.icons8.com/ios-glyphs/30/full-stop--v2.png"
                                alt="full-stop--v2" />
                                <span>${description2}</span>
                        </div>

                        <div class="detail1">
                            <img width="10" height="10"
                                src="https://img.icons8.com/ios-glyphs/30/full-stop--v2.png"
                                alt="full-stop--v2" />
                                <span>${description3}</span>
                        </div>
                    </div>

                </div>

                <div class="left">
                    <div class="img">
                        <img src="${image}" alt="bathroom cleaning">
                    </div>

                    <button type="button" class="btn btn-success btncart addcart">Add</button>
                </div>
                    `
                newservices.querySelector('[subwrapper]').appendChild(newsubcard);

                newsubcard.querySelector('.addcart').addEventListener('click', ()=>{
                    addtocart(id, title, price, image);
                });
                
            });

            subcontain.appendChild(newservices);
        });
    } catch (err) {
        console.log("error is occured", err)
    }

})();





let cartItems = [];

function addtocart (id, title, price, image){
    console.log(id,title,price,image);

    const existingItem = cartItems.find((item)=>{
        item.id === id;
    });

    if(existingItem){
        existingItem.quantity += 1;
    }
    else{
        cartItems.push({
            id: id,
            title: title,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
