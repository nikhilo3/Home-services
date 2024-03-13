
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const loginbox = document.getElementById("loginbox");

const loginbtn = document.getElementById("loginbtn");
const navbars = document.getElementById('header');
const mains = document.getElementById('main');
const footers = document.getElementById('footer');
const logoutbtn = document.getElementById('logoutbtn');
const body = document.body;

const header = document.querySelector('#header');
export function displayFlashMessage(message, type) {
    console.log("displayflashmessage function is called");
    const element = document.createElement('div');
    element.classList.add('flash-message');
    element.classList.add(type);
    element.textContent = message;

    const headerParent = header.parentNode;
    headerParent.insertBefore(element, header.nextSibling);
    // header.append(element);
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

document.addEventListener('DOMContentLoaded', () => {
    const loginform = document.getElementById('loginform');

    loginform.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("originalsign in button clicked");
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;
        handleLogin(email, password);
    });
});

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
            localStorage.setItem('flashMessage', JSON.stringify({ message: 'Login successful!', type: 'success' }));
            console.log('Redirecting to homepage');
            displayFlashMessage('login successfull', 'success');

            window.location.href = "/";
        } else {
            console.log("error occured");
        }

    } catch (error) {
        console.error('Error during login:', error);
        // Handle login failure
    }
}





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
    switchlogin();
    displayFlashMessage('logout successfull', 'success');
}
logoutbtn.addEventListener("click", logout);

function isLoggedIn() {
    const user = localStorage.getItem('user');
    return user !== null;
}

function switchlogin() {
    if (isLoggedIn()) {
        document.getElementById("loginbtn").style.display = "none";
    } else {
        document.querySelector('[profile]').style.display = "none";
        document.getElementById("loginbtn").style.display = "block";
    }
}
switchlogin()

export function countcart() {
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
}
countcart();


document.addEventListener('DOMContentLoaded', () => {
    const regiform = document.getElementById('regiform');

    regiform.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("originalsign in button clicked");
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        handlRegistration(username, email, password);
    });
});

async function handlRegistration(username, email, password) {
    try {
        const response = await fetch('http://localhost:3000/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        console.log(response);

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            
            localStorage.setItem('flashMessage', JSON.stringify({ message: 'Registration successful!', type: 'success' }));
            console.log('Redirecting to homepage');
            displayFlashMessage('Registration successfull', 'success');

            window.location.href = "/";
        } else {
            displayFlashMessage('user already registerd', 'error');
        }

    } catch (error) {
        console.error('Error during login:', error);
        // Handle login failure
    }
}


const flashMessageData = localStorage.getItem('flashMessage');
if (flashMessageData) {
    const messageObj = JSON.parse(flashMessageData);
    displayFlashMessage(messageObj.message, messageObj.type);
    localStorage.removeItem('flashMessage'); // Remove after displaying
}