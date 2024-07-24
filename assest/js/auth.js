const BASEURL = "home-services-seven.vercel.app";



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
        const response = await fetch(`${BASEURL}/login`, {
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
            displayFlashMessage('invalid credential', 'error');
        }

    } catch (error) {
        console.error('Error during login:', error);
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

        fetch(`${BASEURL}/cart/getcartitems`, {
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


const regiform = document.getElementById('regiform');
document.addEventListener('DOMContentLoaded', () => {

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
        const response = await fetch(`${BASEURL}/registration`, {
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
            localStorage.setItem('flashMessage', JSON.stringify({ message: 'Registration successfully please login first then access services', type: 'success' }));
            console.log('Redirecting to homepage');
            flashMessagefunc();
            regiform.reset();
            // displayFlashMessage('Registration successfull', 'success');

            // window.location.href = "/";
        } else {
            displayFlashMessage('user already registred', 'error');
        }

    } catch (error) {
        console.error('Error during login:', error);
        // Handle login failure
    }
}

function flashMessagefunc() {
    const flashMessageData = localStorage.getItem('flashMessage');
    if (flashMessageData) {
        const messageObj = JSON.parse(flashMessageData);
        displayFlashMessage(messageObj.message, messageObj.type);
        localStorage.removeItem('flashMessage'); // Remove after displaying
    }
}
flashMessagefunc();


//subcribe handle

document.addEventListener('DOMContentLoaded', () => {
    const subform = document.getElementById('subform');

    subform.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.querySelector('[name="submail"]').value;

        handlesubscribe(email)
    });
});


async function handlesubscribe(email) {
    const subform = document.getElementById('subform');

    console.log("handle subscribe  called");
    try {
        const response = await fetch(`${BASEURL}/subscribemail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ submail: email })
        });
        console.log(response);

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            displayFlashMessage('subscribe successfully', 'success');
            subform.reset();
        } else {
            console.log('Login failed');
            displayFlashMessage('mail already subscribe', 'error');
        }
    } catch (error) {
        console.error('Error during login:', error);
        displayFlashMessage('not subscribe error on server', 'error');
    }
}







// contact us handle
document.addEventListener('DOMContentLoaded', () => {
    const contactform = document.getElementById('contact_form');
    contactform.addEventListener('submit', (event) => {
        event.preventDefault();

        const conname = document.querySelector('[name="conname"]').value;
        const conmail = document.querySelector('[name="conmail"]').value;
        const conphone = document.querySelector('[name="conphone"]').value;
        const condetail = document.querySelector('[name="condetail"]').value;

        handlecontact(conname, conmail, conphone, condetail)
    });
})


async function handlecontact(conname, conmail, conphone, condetail) {
    const contactform = document.getElementById('contact_form');

    console.log("handle subscribe  called");
    try {
        const response = await fetch(`${BASEURL}/contactus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ conname, conmail, conphone, condetail })
        });
        console.log(response);

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            displayFlashMessage('thank you for contact us we will contact you soon', 'success');
            contactform.reset();
        } else {
            console.log('Login failed');
            displayFlashMessage('some error on server contact later', 'error');
        }
    } catch (error) {
        console.error('Error during login:', error);
        displayFlashMessage('error on server', 'error');
    }
}