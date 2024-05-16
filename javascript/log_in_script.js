function checkLogIn() {

}

function changePasswordImgLogIn() {
    let inputPassword = document.getElementById('passwordLogIn').value;
    let image = document.getElementById('passwordLogInImg');
    changePasswordImgTemplate(inputPassword, image);
}

function changeFirstPasswordImgSignUp() {
    let inputPassword = document.getElementById('firstPasswordSignUp').value;
    let image = document.getElementById('firstPasswordLogInImg');
    changePasswordImgTemplate(inputPassword, image);
}

function changesecondPasswordImgSignUp() {
    let inputPassword = document.getElementById('secondPasswordSignUp').value;
    let image = document.getElementById('secondPasswordSignUpImg');
    changePasswordImgTemplate(inputPassword, image);
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

function passwordLogInVisible() {
    let image = document.getElementById('passwordLogInImg');
    let x = document.getElementById("passwordLogIn");
    passwordVisibleTemplate(x, image);
}

function firstPasswordSignUpVisible() {
    let image = document.getElementById('firstPasswordLogInImg');
    let x = document.getElementById("firstPasswordSignUp");
    passwordVisibleTemplate(x, image);
}

function secondPasswordSignUpVisible() {
    let image = document.getElementById('secondPasswordSignUpImg');
    let x = document.getElementById("secondPasswordSignUp");
    passwordVisibleTemplate(x, image);
}

function passwordVisibleTemplate(x, image) {
    if (x.type === "password") {
        x.type = "text";
        image.src = "./assets/img/log_in_img/visibility.svg"
    } else {
        x.type = "password";
        image.src = "./assets/img/log_in_img/visibility_off.svg"
    }
}

function loadDataToFirebaseAndCheckPasswords(event) {
    event.preventDefault();
    let nameInput = document.querySelector('input[placeholder="Name"]');
    let emailInput = document.getElementById('inputEmailSignUp');
    let password1Input = document.getElementById('firstPasswordSignUp');
    let password2Input = document.getElementById('secondPasswordSignUp');
    checkNameInputTemplate(nameInput);
    checkEmailInputTemplate(emailInput);
    let password1 = password1Input.value;
    let password2 = password2Input.value;
    if (password1 === "" && password2 === "") {
        password1Template(password1Input);
        password2Template(password2Input);
    } else if (password1 !== password2) {
        passwordMismatchTemplate(password1Input, password2Input);
    } else if (password1 === password2 && document.getElementById('errorMessageMismatchSignUp')) {
        password1Input.classList.remove('error-border');
        password2Input.classList.remove('error-border');
        document.getElementById('errorMessageMismatchSignUp').remove();
    } else {
        document.getElementById('signupForm').submit();
    }
}



function passwordMismatchTemplate(password1Input, password2Input) {
    // Überprüfen, ob bereits eine Fehlermeldung vorhanden ist
    let errorMessage = password2Input.parentNode.querySelector('.error-message');
    if (!errorMessage) {
        // Erstelle die benutzerdefinierte Fehlermeldung
        errorMessage = document.createElement('div');
        errorMessage.textContent = 'Ups! your password dont match';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessageMismatchSignUp';
        // Füge die Fehlermeldung dem übergeordneten Container hinzu
        password2Input.parentNode.appendChild(errorMessage);
    }

    // Füge eine CSS-Klasse hinzu, um das Feld zu markieren
    password1Input.classList.add('error-border');
    password2Input.classList.add('error-border');

    return; // Beendet die Funktion, ohne das Formular abzusenden
}

function password1Template(password1Input) {
    // Überprüfen, ob bereits eine Fehlermeldung vorhanden ist
    if (!password1Input.parentNode.querySelector('.error-message')) {
        // Erstelle die benutzerdefinierte Fehlermeldung
        let errorMessage = document.createElement('div');
        errorMessage.textContent = 'Bitte Feld ausfüllen';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessagePassword1SignUp';
        // Füge die Fehlermeldung dem übergeordneten Container hinzu
        password1Input.parentNode.appendChild(errorMessage);
    }

    // Füge eine CSS-Klasse hinzu, um das Feld zu markieren
    password1Input.classList.add('error-border');

    return; // Beendet die Funktion, ohne das Formular abzusenden
}

function password2Template(password2Input) {
    // Überprüfen, ob bereits eine Fehlermeldung vorhanden ist
    if (!password2Input.parentNode.querySelector('.error-message')) {
        // Erstelle die benutzerdefinierte Fehlermeldung
        let errorMessage = document.createElement('div');
        errorMessage.textContent = 'Bitte Feld ausfüllen';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessagePassword2SignUp';
        // Füge die Fehlermeldung dem übergeordneten Container hinzu
        password2Input.parentNode.appendChild(errorMessage);
    }

    // Füge eine CSS-Klasse hinzu, um das Feld zu markieren
    password2Input.classList.add('error-border');

    return; // Beendet die Funktion, ohne das Formular abzusenden
}

function checkEmailInputTemplate(emailInput) {
    // Überprüfen, ob alle Felder ausgefüllt sind
    if (emailInput.value.trim() === '') {
        // Überprüfen, ob bereits eine Fehlermeldung vorhanden ist
        if (!emailInput.parentNode.querySelector('.error-message')) {
            // Erstelle die benutzerdefinierte Fehlermeldung
            let errorMessage = document.createElement('div');
            errorMessage.textContent = 'Bitte Email-Adresse eingeben!';
            errorMessage.classList.add('error-message');
            errorMessage.id = 'errorMessageEmailSignUp';
            // Füge die Fehlermeldung dem übergeordneten Container hinzu
            emailInput.parentNode.appendChild(errorMessage);
        }

        // Füge eine CSS-Klasse hinzu, um das Feld zu markieren
        emailInput.classList.add('error-border');

        return; // Beendet die Funktion, ohne das Formular abzusenden
    }

    // Überprüfen, ob das E-Mail-Feld kein @-Zeichen enthält
    if (!emailInput.value.includes('@')) {
        // Überprüfen, ob bereits eine Fehlermeldung vorhanden ist
        let errorMessage = emailInput.parentNode.querySelector('.error-message');
        if (errorMessage) {
            // Falls bereits eine Fehlermeldung vorhanden ist, aktualisiere den Text
            errorMessage.textContent = 'Bitte @-Zeichen beachten!';
        } else {
            // Erstelle die benutzerdefinierte Fehlermeldung
            errorMessage = document.createElement('div');
            errorMessage.textContent = 'Bitte @-Zeichen beachten!';
            errorMessage.classList.add('error-message');
            errorMessage.id = 'errorMessageEmailSignUp';
            // Füge die Fehlermeldung dem übergeordneten Container hinzu
            emailInput.parentNode.appendChild(errorMessage);
        }

        // Füge eine CSS-Klasse hinzu, um das Feld zu markieren
        emailInput.classList.add('error-border');

        return; // Beendet die Funktion, ohne das Formular abzusenden
    }

    // Wenn alles in Ordnung ist, entferne die Fehlermeldung und die Markierung
    let errorMessage = emailInput.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    emailInput.classList.remove('error-border');
}

function checkNameInputTemplate(nameInput) {
    // Überprüfen, ob alle Felder ausgefüllt sind
    if (nameInput.value.trim() === '') {
        // Überprüfen, ob bereits eine Fehlermeldung vorhanden ist
        if (!nameInput.parentNode.querySelector('.error-message')) {
            // Erstelle die benutzerdefinierte Fehlermeldung
            let nameErrorMessage = document.createElement('div');
            nameErrorMessage.textContent = 'Bitte Name eingeben !';
            nameErrorMessage.classList.add('error-message');
            nameErrorMessage.id = 'errorMessageNameSignUp';
            // Füge die Fehlermeldung dem übergeordneten Container hinzu
            nameInput.parentNode.appendChild(nameErrorMessage);
        }

        // Füge eine CSS-Klasse hinzu, um das Feld zu markieren
        nameInput.classList.add('error-border');

        return; // Beendet die Funktion, ohne das Formular abzusenden
    }
}

function removeErrorMessageOnNameInput() {
    let input = document.getElementById('inputNameSignUp');
    let errorMessage = document.getElementById('errorMessageNameSignUp')
    if (input.value.length > 0 && errorMessage) {
        errorMessage.remove();
    } else {
        restoreErrorMessageOnNameInput(input, errorMessage);
        input.classList.add('error-border');
    }
    if (input.value.length > 0) {
        input.classList.remove('error-border');
    }
}

function restoreErrorMessageOnNameInput(input, errorMessage) {
    if (input.value.length <= 0 && !errorMessage) {
        // Erstelle die Fehlermeldung nur, wenn sie nicht bereits existiert
        errorMessage = document.createElement('div');
        errorMessage.textContent = 'Bitte Name eingeben';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessageNameSignUp';
        // Füge die Fehlermeldung dem übergeordneten Container hinzu (z.B. dem div.input-container)
        let inputContainer = document.querySelector('.input-container');
        inputContainer.appendChild(errorMessage);
    }
}

function removeErrorMessageOnEmailInput() {
    let input = document.getElementById('inputEmailSignUp');
    let errorMessage = document.getElementById('errorMessageEmailSignUp')
    if (input.value.length > 0 && errorMessage) {
        errorMessage.remove();
    } else {
        restoreErrorMessageOnEmailInput(input, errorMessage, input.parentNode);
        input.classList.add('error-border');
    }
    if (input.value.length > 0) {
        input.classList.remove('error-border');
    }
}

function restoreErrorMessageOnEmailInput(input, errorMessage, container) {
    if (input.value.length <= 0 && !errorMessage) {
        // Erstelle die Fehlermeldung nur, wenn sie nicht bereits existiert
        errorMessage = document.createElement('div');
        errorMessage.textContent = 'Bitte Email-Adresse eingeben !';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessageEmailSignUp';
        // Füge die Fehlermeldung dem übergeordneten Container hinzu (z.B. dem div.input-container)
        let inputContainer = document.querySelector('.input-container');
        container.appendChild(errorMessage);
    }
}

function removeErrorMessageOnPassword1Input() {
    let input = document.getElementById('firstPasswordSignUp');
    let errorMessage = document.getElementById('errorMessagePassword1SignUp')
    if (input.value.length > 0 && errorMessage) {
        errorMessage.remove();
    } else {
        restoreErrorMessageOnPassword1Input(input, errorMessage, input.parentNode);
        input.classList.add('error-border');
    }
    if (input.value.length > 0) {
        input.classList.remove('error-border');
    }
}

function restoreErrorMessageOnPassword1Input(input, errorMessage, container) {
    if (input.value.length <= 0 && !errorMessage) {
        // Erstelle die Fehlermeldung nur, wenn sie nicht bereits existiert
        errorMessage = document.createElement('div');
        errorMessage.textContent = 'Bitte Feld ausfüllen !';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessagePassword1SignUp';
        // Füge die Fehlermeldung dem übergeordneten Container hinzu (z.B. dem div.input-container)
        let inputContainer = document.querySelector('.input-container');
        container.appendChild(errorMessage);
    }
}

function removeErrorMessageOnPassword2Input() {
    let input = document.getElementById('secondPasswordSignUp');
    let errorMessage = document.getElementById('errorMessagePassword2SignUp')
    if (input.value.length > 0 && errorMessage) {
        errorMessage.remove();
    } else {
        restoreErrorMessageOnPassword2Input(input, errorMessage, input.parentNode);
        input.classList.add('error-border');
    }
    if (input.value.length > 0) {
        input.classList.remove('error-border');
    }
}

function restoreErrorMessageOnPassword2Input(input, errorMessage) {
    if (input.value.length <= 0 && errorMessage) {
        // Das Passwortfeld ist leer, aber es gibt eine Fehlermeldung,
        // die nicht die Standardfehlermeldung ist, also entfernen wir sie
        if (errorMessage.textContent !== 'Bitte Feld ausfüllen !') {
            errorMessage.remove();
        }
        // Erstelle die Standardfehlermeldung nur, wenn sie nicht bereits existiert
        if (!input.parentNode.querySelector('.error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.textContent = 'Bitte Feld ausfüllen !';
            errorMessage.classList.add('error-message');
            errorMessage.id = 'errorMessagePassword2SignUp';
            // Füge die Fehlermeldung dem übergeordneten Container hinzu
            let inputContainer = input.parentNode;
            inputContainer.appendChild(errorMessage);
        }
    } else {
        // Das Passwortfeld ist nicht leer, entferne die Standardfehlermeldung, wenn vorhanden
        if (errorMessage && errorMessage.textContent === 'Bitte Feld ausfüllen !') {
            errorMessage.remove();
        }
    }
}






