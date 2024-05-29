async function start() {
    includeHTML();
    await loadLogInData();
    loadActiveUser();
    loadActiveUserInitials();
}

const urlLogInData = "https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/LogInData.json";
const logInName = [];
const activeKey = [];

async function loadLogInData() {
    try {
        const response = await fetch(urlLogInData);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        for (const key in data) {
            const userArray = data[key];
            if (Array.isArray(userArray) && userArray.length > 0) {
                userArray.forEach(user => {
                    if (user.name) {
                        logInName.push(user.name);
                        activeKey.push(key);
                        console.log(`Name found and added: ${user.name}`);
                    } else {
                        console.log(`No name found for user in key: ${key}`);
                    }
                });
            } else {
                console.log(`No valid user array found for key: ${key}`);
            }
        }
        console.log("All names:", logInName);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function openLegalNotice() {
    window.open('/legal_notice.html', '_blank');
}

function openPrivacyPolice() {
    window.open('/privay_policy.html', '_blank');
}

function loadActiveUser() {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
        const name = activeUser.data.name;
        const user = document.getElementById('activeUser');
        user.innerHTML = name;
    } else {
        console.error('No active user found in localStorage');
    }
}

function loadActiveUserInitials() {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
        const name = activeUser.data.name;
        const initials = name.split(' ').map(word => word.charAt(0)).join('');
        const userProfil = document.getElementById('userInitials');
        userProfil.innerHTML = initials;
    } else {
        console.error('No active user found in localStorage');
    }
}

async function deleteActiveUser() {
    try {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (!activeUser) throw new Error('No active user found in localStorage');

        const userKey = activeUser.key;
        const deleteResponse = await fetch(`https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/LogInData/${userKey}.json`, {
            method: 'DELETE'
        });

        if (!deleteResponse.ok) {
            throw new Error('Failed to delete user data');
        }

        console.log('User data deleted successfully');
    } catch (error) {
        console.error('Error deleting user data:', error);
    }
}

function openLogIn() {
    deleteActiveUser();
    setTimeout(() => {
        window.location.href = '/log_in.html';
    }, 2000);
}




function openSubMenu() {
    let submenu = document.getElementById('submenucontainer');
    submenu.classList.remove('display-none');
}

function closeSubmenu() {
    document.getElementById('submenucontainer').classList.add('display-none');
}

// Function to handle clicks outside the submenu
function handleClickOutside(event) {
    const submenu = document.getElementById('submenucontainer');
    const userDiv = document.querySelector('.user');
    if (!submenu.contains(event.target) && !userDiv.contains(event.target)) {
        closeSubmenu();
    }
}

document.addEventListener('click', handleClickOutside);
