const loginUrl = "https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/.json";



async function checkLogIn(event) {
    event.preventDefault(); // Verhindert das Standard-Formularverhalten
    
    let email = document.getElementById('emailLogIn').value;
    let password = document.getElementById('passwordLogIn');
    
    
        let response = await fetch(loginUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        
        let data = await response.json();
        console.log("Fetched Data:", data); // Debugging: Überprüfen Sie die abgerufenen Daten

        if (data) {
            let users = Object.values(data).map(entry => entry[0]);
            console.log("Users Array:", users); // Debugging: Überprüfen Sie das Users-Array
            
            let user = users.find(user => user.email === email && user.password === password.value);
            console.log("Found User:", user); // Debugging: Überprüfen Sie den gefundenen Benutzer

            if (user) {
                window.location.href = './summary_user.html'; // Hauptseite der Website
            } else if (!user){
                passwordError(password);
            }
        }
  
}


function passwordError(password) {
    // Überprüfen, ob bereits eine Fehlermeldung vorhanden ist
    if (!password.parentNode.querySelector('.error-message')) {
        // Erstelle die benutzerdefinierte Fehlermeldung
        let errorMessage = document.createElement('div');
        errorMessage.textContent = 'Wrong Password Ups! Try again';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessagePassword';
        // Füge die Fehlermeldung dem übergeordneten Container hinzu
        password.parentNode.appendChild(errorMessage);
    }

    // Füge eine CSS-Klasse hinzu, um das Feld zu markieren
    password.classList.add('error-border');

    return; // Beendet die Funktion, ohne das Formular abzusenden
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