const loginUrl = "https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/.json";
const url = "https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/LogInData";

const activeUser = {}; // Objekt zum Speichern der aktiven Benutzerdaten

async function checkLogIn(event) {
    event.preventDefault(); // Verhindert das Standard-Formularverhalten
    let email = document.getElementById('emailLogIn').value;
    let password = document.getElementById('passwordLogIn').value;

    try {
        let data = await fetchUserData();
        let userEntry = findUser(data, email, password);

        if (userEntry) {
            handleSuccessfulLogin(userEntry);
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
    let users = Object.entries(data);

    for (let [key, userDataArray] of users) {
        for (let userData of userDataArray) {
            if (userData.email === email && userData.password === password) {
                return [key, userData];
            }
        }
    }
    return null;
}

function handleSuccessfulLogin(userEntry) {
    const userKey = userEntry[0];
    const userData = userEntry[1];

    localStorage.setItem('activeUser', JSON.stringify({ key: userKey, data: userData }));

    saveLogInDataInFirebase();
    setTimeout(() => {
        window.location.href = './summary_user.html';
    }, 2000);
}

function saveLogInDataInFirebase() {
    // Hier fügen Sie den Code zum Speichern der Anmeldedaten in Firebase hinzu
}

function guestLogIn() {
    window.location.href = './summary_user.html'; // Hauptseite der Website
}

function passwordError(passwordField) {
    if (!passwordField.parentNode.querySelector('.error-message')) {
        let errorMessage = document.createElement('div');
        errorMessage.textContent = 'Wrong Password Ups! Try again';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessagePassword';
        passwordField.parentNode.appendChild(errorMessage);
    }

    passwordField.classList.add('error-border');
}

// Ändert das Bild beim Eintippen des Passworts
function changePasswordImgLogIn() {
    let inputPassword = document.getElementById('passwordLogIn').value;
    let image = document.getElementById('passwordLogInImg');
    changePasswordImgTemplate(inputPassword, image);
}

// Macht das Passwortfeld sichtbar
function passwordLogInVisible() {
    let image = document.getElementById('passwordLogInImg');
    let x = document.getElementById("passwordLogIn");
    passwordVisibleTemplate(x, image);
}

// Allgemeine Funktion zur Änderung des Passworts
function passwordVisibleTemplate(x, image) {
    if (x.type === "password") {
        x.type = "text";
        image.src = "./assets/img/log_in_img/visibility.svg";
    } else {
        x.type = "password";
        image.src = "./assets/img/log_in_img/visibility_off.svg";
    }
}

// Allgemeine Funktion zur Änderung des Passwortbilds
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
        overlay.style.display = "block";
        popup.style.display = "block";
    };

    const hidePopups = () => {
        overlay.style.display = "none";
        privacyPolicyPopup.style.display = "none";
        legalNoticePopup.style.display = "none";
    };

    privacyPolicyLink.addEventListener("click", (event) => {
        event.preventDefault();
        showPopup(privacyPolicyPopup);
    });

    legalNoticeLink.addEventListener("click", (event) => {
        event.preventDefault();
        showPopup(legalNoticePopup);
    });

    overlay.addEventListener("click", hidePopups);
});
