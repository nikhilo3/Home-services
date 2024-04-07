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



const fetchrecentuser = async () => {
    try {
        const response = await fetch('http://localhost:3000/adminorder/recentuser', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });
        if (response.ok) {
            const user = await response.json();

            render(user);

        } else {
            console.log('failed to fetch count', response.statusText);
        }
    } catch (err) {
        console.log('Error fetching:', err);
    }
}

const render = (user) => {
    const dataname = document.querySelector('[dataname]');
    const dataemail = document.querySelector('[dataemail]');
    const datatype = document.querySelector('[datatype]');
    const userid = document.querySelector('[userid]');

    // console.log(dataname);


    user.forEach(item => {
        let newname = document.createElement("span");
        newname.className = "data-list";
        newname.textContent = `${item.username}`;

        let newemail = document.createElement("span");
        newemail.className = "data-list";
        newemail.textContent = `${item.email}`;

        let newtype = document.createElement("span");
        newtype.className = "data-list";
        newtype.textContent = `${item.role}`;

        let newid = document.createElement("span");
        newid.className = "data-list";
        newid.textContent = `${item._id}`;

        dataname.appendChild(newname);
        dataemail.appendChild(newemail);
        datatype.appendChild(newtype);
        userid.appendChild(newid);

    });

}

fetchrecentuser();