//header
const nav = document.querySelector(".nav"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});

let menuToggle = document.querySelector('.menu-toggle');
let navigation = document.querySelector('.navigation');

menuToggle.onclick = function () {
  navigation.classList.toggle('active');
}


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