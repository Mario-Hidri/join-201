<<<<<<< HEAD
const loginUrl = "https://join-backend-2c8c7-default-rtdb.europe-west1.firebasedatabase.app/users.json";
=======
const loginUrl = "https://join-5d8da-default-rtdb.europe-west1.firebasedatabase.app/login.json";
>>>>>>> 341301359b3698bf27a02cb9c135bb0d347e578d

async function checkLogIn(event) {
    event.preventDefault();
    let email = document.getElementById('emailLogIn').value;
    let password = document.getElementById('passwordLogIn').value;

    try {
        let data = await fetchUserData();
        let userData = findUser(data, email, password);

        if (userData) {
            handleSuccessfulLogin(userData);
        } else {
            passwordError(document.getElementById('passwordLogIn'));
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

async function fetchUserData() {
    let response = await fetch(loginUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
}

function findUser(data, email, password) {
    if (!data) return null;
    for (const key in data) {
        const userData = data[key];
        if (userData && userData.email === email && userData.password === password) {
            return userData;
        }
    }
    return null;
}

async function handleSuccessfulLogin(userData) {
    const userName = userData.name;
    const activeUser = { key: key, data: { name: userName } };
    localStorage.setItem('activeUser', JSON.stringify(activeUser));
    localStorage.setItem('hasShownWelcome', 'false');
    window.location.href = './summary_user.html';
}

<<<<<<< HEAD
async function saveActiveUserInFirebase(name) {
    try {
        const response = await fetch('https://join-backend-2c8c7-default-rtdb.europe-west1.firebasedatabase.app/LogInData.json', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name })
        });
        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error saving active user in Firebase:', error);
    }
}

=======
>>>>>>> 341301359b3698bf27a02cb9c135bb0d347e578d
function guestLogIn() {
    const guestUser = { key: "guest", data: { name: "Guest" } };
    localStorage.setItem('activeUser', JSON.stringify(guestUser));
    localStorage.setItem('hasShownWelcome', 'false');
    window.location.href = './summary_user.html';
}

function passwordError(passwordField) {
    if (!passwordField.parentNode.querySelector('.error-message')) {
        let errorMessage = document.createElement('div');
        errorMessage.textContent = 'Wrong Password. Try again';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessagePassword';
        passwordField.parentNode.appendChild(errorMessage);
    }
    passwordField.classList.add('error-border');
}

function changePasswordImgLogIn() {
    let inputPassword = document.getElementById('passwordLogIn').value;
    let image = document.getElementById('passwordLogInImg');
    changePasswordImgTemplate(inputPassword, image);
}

function passwordLogInVisible() {
    let image = document.getElementById('passwordLogInImg');
    let x = document.getElementById("passwordLogIn");
    passwordVisibleTemplate(x, image);
}

function passwordVisibleTemplate(x, image) {
    if (x.type === "password") {
        x.type = "text";
        image.src = "./assets/img/log_in_img/visibility.svg";
    } else {
        x.type = "password";
        image.src = "./assets/img/log_in_img/visibility_off.svg";
    }
}

function changePasswordImgTemplate(inputPassword, image) {
    if (inputPassword === "") {
        image.src = "./assets/img/log_in_img/lock.svg";
        image.classList.remove('cursorpointer');
    } else {
        image.classList.add('cursorpointer');
        image.src = "./assets/img/log_in_img/visibility_off.svg";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const privacyPolicyLink = document.getElementById("privacyPolicyLink");
    const legalNoticeLink = document.getElementById("legalNoticeLink");
    const overlay = document.getElementById("overlay");
    const privacyPolicyPopup = document.getElementById("privacyPolicyPopup");
    const legalNoticePopup = document.getElementById("legalNoticePopup");

    const showPopup = (popup) => {
        if (overlay && popup) {
            overlay.style.display = "block";
            popup.style.display = "block";
        } else {
            console.error('Overlay or popup element not found');
        }
    };

    const hidePopups = () => {
        if (overlay && privacyPolicyPopup && legalNoticePopup) {
            overlay.style.display = "none";
            privacyPolicyPopup.style.display = "none";
            legalNoticePopup.style.display = "none";
        } else {
            console.error('Overlay or popup elements not found');
        }
    };

    if (privacyPolicyLink) {
        privacyPolicyLink.addEventListener("click", (event) => {
            event.preventDefault();
            showPopup(privacyPolicyPopup);
        });
    } else {
        console.error('Element with ID privacyPolicyLink not found');
    }

    if (legalNoticeLink) {
        legalNoticeLink.addEventListener("click", (event) => {
            event.preventDefault();
            showPopup(legalNoticePopup);
        });
    } else {
        console.error('Element with ID legalNoticeLink not found');
    }

    if (overlay) {
        overlay.addEventListener("click", hidePopups);
    } else {
        console.error('Element mit ID overlay not found');
    }
});

