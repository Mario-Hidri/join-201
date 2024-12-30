async function loadLogInData() {
    try {
        const response = await fetch(urlLogInData);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        for (const key in data) {
            const userArray = data[key];
            if (Array.isArray(userArray) && userArray.length > 0) {
                userArray.forEach(user => {
                    if (user.name) {
                        logInName.push(user.name);
                        activeKey.push(key);
                    }
                });
            }
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function openLegalNotice() {
    window.open('./legal_notice.html', '_blank');
}

function openPrivacyPolice() {
    window.open('./privay_policy.html', '_blank');
}

async function loadActiveUser() {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
        const userKey = activeUser.key;
        if (userKey === "guest") {
            const activeUserElement = document.getElementById('activeUser');
            const userInitialsElement = document.getElementById('userInitials');
            if (activeUserElement) {
                activeUserElement.innerHTML = "Guest";
            } else {
                console.error('Element with ID activeUser not found');
            }
            if (userInitialsElement) {
                userInitialsElement.innerHTML = "G";
            } else {
                console.error('Element with ID userInitials not found');
            }
            return;
        }
        try {
            const response = await fetch(`https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/LogInData/${userKey}.json`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const userData = await response.json();
            if (!userData || typeof userData.name !== 'string') {
                console.error('Invalid user data structure:', userData);
                return;
            }
            const name = userData.name;
            const activeUserElement = document.getElementById('activeUser');
            const userInitialsElement = document.getElementById('userInitials');
            if (activeUserElement) {
                activeUserElement.innerHTML = name;
            } else {
                console.error('Element with ID activeUser not found');
            }
            if (userInitialsElement) {
                userInitialsElement.innerHTML = getInitials(name);
            } else {
                console.error('Element with ID userInitials not found');
            }
        } catch (error) {
            console.error('Error loading active user from Firebase:', error);
        }
    } else {
        console.error('No active user found in localStorage');
    }
}


function loadActiveUserInitials() {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser && typeof activeUser.data.name === 'string') {
        document.getElementById('userInitials').innerHTML = getInitials(activeUser.data.name);
    } else {
        console.error('No active user found in localStorage or name is not a string');
    }
}

function getInitials(name) {
    return name.split(' ').map(word => word.charAt(0)).join('');
}

function openLogIn() {
    window.location.href = './log_in.html';
}

function openSubMenu() {
    document.getElementById('submenucontainer').classList.remove('display-none');
}

function closeSubmenu() {
    document.getElementById('submenucontainer').classList.add('display-none');
}

document.addEventListener('click', (event) => {
    const submenu = document.getElementById('submenucontainer');
    const userDiv = document.querySelector('.user');
    if (!submenu) {
        console.error('Element with ID submenucontainer not found');
        return;
    }
    if (!userDiv) {
        console.error('Element with class user not found');
        return;
    }
    if (!submenu.contains(event.target) && !userDiv.contains(event.target)) {
        closeSubmenu();
    }
});
