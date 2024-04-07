const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
});

const fetchcount = async () => {
    try {
        const response = await fetch('http://localhost:3000/countdata', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });
        if (response.ok) {
            const counts = await response.json();

            console.log("user",counts.userCount);
            console.log("order",counts.orderCount);
            console.log("payment",counts.paymentCount);
            
            document.getElementById('countuser').textContent = `${counts.userCount}`;
            document.getElementById('countorder').textContent = `${counts.orderCount}`;
            document.getElementById('countpayment').textContent = `₹${counts.paymentCount}`;

        } else {
            console.log('failed to fetch count', response.statusText);
        }
    } catch (err) {
        console.log('Error fetching:', err);
    }
}

fetchcount();