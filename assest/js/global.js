// //main slider
// $('.carousel').carousel({
//   interval: 5000 // Adjust the interval as needed (in milliseconds)
// });



//customerdetail section
let customerquetion = document.querySelectorAll("[customerquetion]");

let question = document.querySelectorAll(".question");

question.forEach((element, index) => {
  element.addEventListener("click", function () {
    customerquetion[index].classList.toggle("active");


    customerquetion.forEach((otherelement, otherindex) => {
      if (otherindex !== index && otherelement.classList.contains("active")) {
        otherelement.classList.remove("active");
      }
    })
  });
})

let num = document.querySelectorAll(".num");

num.forEach((element) => {

  let startvalue = 0;
  let endvalue = parseInt(element.getAttribute("get-value"))
  let counter = setInterval(() => {
    startvalue += 1;
    element.textContent = startvalue;

    if (startvalue == endvalue) {
      clearInterval(counter);
    }
  }, 2000 / endvalue)
});


import { fetchData } from "./fetchjson.js";

let servicecontainer = document.querySelector('[servicepagecontainer]');


(async () => {
  try {
    const data = await fetchData();

    data.forEach((data) => {
      let newservice = document.createElement('div');
      newservice.className = "meal";
      newservice.innerHTML = `
      <img
      src="${data.herophoto}"
      class="meal-img"
      alt="home cleaning"
      />
    <div class="meal-content">
   <div class="meal-tags">
   </div>
   <p class="meal-title">${data.heading}</p>
   
   <div class="detail" style="color: black;">
     <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a provident alias perferendis accusantium nisi expedita recusandae maiores modi sapiente nulla porro, consequuntur culpa.</span>
   </div>
   <button>view detail</button>
 </div>
 <a href="/servicedetail.html?id=${data.id}" homeservicesclick></a>
      `



      servicecontainer.appendChild(newservice)
    })
  } catch (err) {
    console.error("Error fetching data:", err);
  }
})();