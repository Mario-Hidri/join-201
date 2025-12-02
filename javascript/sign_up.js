let signUpDataJson = [];

<<<<<<< HEAD
const usersUrl = "https://join-backend-2c8c7-default-rtdb.europe-west1.firebasedatabase.app/users";
=======
const url = "https://join-5d8da-default-rtdb.europe-west1.firebasedatabase.app/login";
>>>>>>> 341301359b3698bf27a02cb9c135bb0d347e578d

async function getSignUpData() {
    let email = document.getElementById('inputEmailSignUp').value;
    let password = document.getElementById('secondPasswordSignUp').value;
    let signUpName = document.getElementById('inputNameSignUp').value;
    let signUpData = signUpDataTemplate(email, password, signUpName);
    await saveSignUpDataInFirebase(signUpData);
}

function signUpDataTemplate(email, password, signUpName) {
    return {
        "email": email,
        "password": password,
        "name": signUpName,
    };
}

async function saveSignUpDataInFirebase(signUpData) {
    await fetch(usersUrl + '.json', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData)
    });
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

async function loadDataToFirebaseAndCheckPasswords(event) {
    event.preventDefault();
    const signUpContainer = document.getElementById('signUpContainer');
    let nameInput = document.querySelector('input[placeholder="Name"]');
    let emailInput = document.getElementById('inputEmailSignUp');
    let password1Input = document.getElementById('firstPasswordSignUp');
    let password2Input = document.getElementById('secondPasswordSignUp');
    checkNameInputTemplate(nameInput);
    checkEmailInputTemplate(emailInput);
    checkPasswordInputTemplate(password1Input, password2Input);

    if (password1Input.value.length === 0) {
        password1Template(password1Input);
        return;
    } else if (password2Input.value.length === 0) {
        password2Template(password1Input, password2Input);
        return;
    } else if (password1Input.value !== password2Input.value) {
        passwordMismatchTemplate(password1Input, password2Input);
        return;
    } else if (!document.getElementById('errorMessageMismatchSignUp')) {
        await getSignUpData();
        finalSubmit(signUpContainer);
    }
}

function removeErrorMessages(password1Input, password2Input) {
    password1Input.classList.remove('error-border');
    password2Input.classList.remove('error-border');
    document.getElementById('errorMessageMismatchSignUp').remove();
}

function finalSubmit(signUpContainer) {
    signUpContainer.classList.remove('display-none');
    setTimeout(() => {
        signUpContainer.classList.add('move-up');
    }, 10);
    setTimeout(() => {
        window.location.href = './log_in.html';
    }, 2000);
}

function passwordMismatchTemplate(password1Input, password2Input) {
    let errorMessage = password2Input.parentNode.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.textContent = 'Ups! your password dont match';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessageMismatchSignUp';
        password2Input.parentNode.appendChild(errorMessage);
    }
    password1Input.classList.add('error-border');
    password2Input.classList.add('error-border');
    return;
}

function password1Template(password1Input) {
    if (!password1Input.parentNode.querySelector('.error-message')) {
        let password1ErrorMessage = document.createElement('div');
        password1ErrorMessage.textContent = 'Ups! your password is to short and must be at least 6 characters long';
        password1ErrorMessage.classList.add('error-message');
        password1ErrorMessage.id = 'errorMessageShortPasswordSignUp';
        password1Input.parentNode.appendChild(password1ErrorMessage);
    }
    password1Input.classList.add('error-border');
    return;
}

function password2Template(password1Input, password2Input) {
    if (password1Input.value.length > 0) {
        let password2ErrorMessage = document.createElement('div');
        password2ErrorMessage.textContent = 'Ups! your password dont match';
        password2ErrorMessage.classList.add('error-message');
        password2ErrorMessage.id = 'errorMessageMismatchSignUp';
        password2Input.parentNode.appendChild(password2ErrorMessage);
        password1Input.classList.add('error-border');
        password2Input.classList.add('error-border');
        return;
    } else if (password1Input.value.length == 0) {
        password1Template(password1Input);
        return;
    }
}

function checkPasswordInputTemplate(password1Input, password2Input) {
    let errorMessage = password1Input.parentNode.querySelector('.error-message');
    if (password1Input.value.length >= 6) {
        if (errorMessage) {
            errorMessage.remove();
        }
        password1Input.classList.remove('error-border');
    } else if (password1Input.value.length < 6) {
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.textContent = 'Ups! your password is to short and must be at least 6 characters long';
            errorMessage.classList.add('error-message');
            errorMessage.id = 'errorMessageShortPasswordSignUp';
            password1Input.parentNode.appendChild(errorMessage);
        }
        password1Input.classList.add('error-border');
        return;
    }
    if (password1Input.value == password2Input.value) {
        if (document.getElementById('errorMessageMismatchSignUp')) {
            removeErrorMessages(password1Input, password2Input);
        }
    }
}

function checkNameInputTemplate(nameInput) {
    let nameErrorMessage = nameInput.parentNode.querySelector('.error-message');
    if (nameInput.value.length > 0) {
        if (nameErrorMessage) {
            nameErrorMessage.remove();
        }
        nameInput.classList.remove('error-border');
    } else if (nameInput.value.length == 0) {
        if (nameErrorMessage) {
            nameErrorMessage.textContent = 'Please insert your Name!';
        } else {
            nameErrorMessage = document.createElement('div');
            nameErrorMessage.textContent = 'Please insert your Name!';
            nameErrorMessage.classList.add('error-message');
            nameErrorMessage.id = 'errorMessageNameSignUp';
            nameInput.parentNode.appendChild(nameErrorMessage);
        }
        nameInput.classList.add('error-border');
        return;
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
}

function restoreErrorMessageOnNameInput(input, errorMessage) {
    input.classList.add('error-border');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.textContent = 'Please insert your Name!';
        errorMessage.classList.add('error-message');
        errorMessage.id = 'errorMessageNameSignUp';
        input.parentNode.appendChild(errorMessage);
    }
}

function checkEmailInputTemplate(emailInput) {
    let errorMessage = emailInput.parentNode.querySelector('.error-message');
    if (emailInput.value.length > 0 && emailInput.value.includes('@')) {
        if (errorMessage) {
            errorMessage.remove();
        }
        emailInput.classList.remove('error-border');
        return;
    }
    if (!emailInput.value.includes('@')) {
        let errorMessage = emailInput.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = 'Bitte @-Zeichen beachten!';
        } else {
            errorMessage = document.createElement('div');
            errorMessage.textContent = 'Bitte @-Zeichen beachten!';
            errorMessage.classList.add('error-message');
            errorMessage.id = 'errorMessageEmailSignUp';
            emailInput.parentNode.appendChild(errorMessage);
        }
        emailInput.classList.add('error-border');
        return;
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
