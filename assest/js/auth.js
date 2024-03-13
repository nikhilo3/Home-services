
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const loginbox = document.getElementById("loginbox");

const loginbtn = document.getElementById("loginbtn");
const navbars = document.getElementById('header');
const mains = document.getElementById('main');
const footers = document.getElementById('footer');
const logoutbtn = document.getElementById('logoutbtn');
const body = document.body;

function displayFlashMessage(message) {
    const element = document.createElement('div');
    element.classList.add('flash-message');
    element.textContent = message;
    document.body.appendChild(element);
    setTimeout(() => {
        element.remove();
    }, 3000);
}

function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user === null) { return null };
    return JSON.parse(user);
}

function addUserHeaders(req) {
    const user = getUserFromLocalStorage();
    if (user && isLoggedIn()) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
}

async function handleLogin(email, password) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        console.log(response);

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            localStorage.setItem('user', data.username);
            localStorage.setItem('token', data.token);
            console.log('Redirecting to homepage');
            // Redirect the user to the homepage
            window.location.href = "/";
            displayFlashMessage('login successfull');
        } else {
            throw new Error('Login failed');
        }

    } catch (error) {
        console.error('Error during login:', error);
        // Handle login failure
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const originalsigninbtn = document.getElementById("originalsignin");

    originalsigninbtn.addEventListener("click", () => {
        console.log("originalsign in button clicked");
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;
        handleLogin(email, password);
    });
});


function openloginform() {
    // Display login box and blur main content
    loginbox.style.cssText = `
    display:block;
    z-index:999;
`;
    mains.style.filter = 'blur(10px)';
    navbars.style.display = 'none';
    body.style.overflow = 'hidden';
    footers.style.filter = 'blur(10px)';
}
loginbtn.addEventListener("click", openloginform);

const duser = localStorage.getItem('user');
document.querySelector('[displayusername]').textContent = duser;

signUpButton.addEventListener("click", () => {
    console.log("Sign Up button clicked");
    loginbox.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    console.log("Sign In button clicked");
    loginbox.classList.remove("right-panel-active");
});

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    displayFlashMessage('logout successfull');
}
logoutbtn.addEventListener("click", logout);

function isLoggedIn() {
    const user = localStorage.getItem('user');
    return user !== null;
}

if (isLoggedIn()) {
    document.getElementById("loginbtn").style.display = "none";
} else {
    document.querySelector('[profile]').style.display = "none";
    document.getElementById("loginbtn").style.display = "block";
}

if (isLoggedIn()) {
    const token = localStorage.getItem('token');

    fetch('/cart/getcartitems', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(cartItems => {
            document.getElementById('cart-item-count').innerText = cartItems.length;
        });
}