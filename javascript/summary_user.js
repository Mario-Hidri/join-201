async function start() {
    includeHTML();
    await loadLogInData();
    loadActiveUser();
    loadActiveUserInitials();
    await loadTasksFromFirebase();
    loadTaskNumbers();
    loadNearestDeadline();
}

const urlLogInData = "https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/LogInData.json";
const logInName = [];
const activeKey = [];
const guestData = ["Guest"];

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
    window.open('/legal_notice.html', '_blank');
}

function openPrivacyPolice() {
    window.open('/privay_policy.html', '_blank');
}

async function loadActiveUser() {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
        const userKey = activeUser.key;
        if (userKey === "guest") {
            document.getElementById('activeUser').innerHTML = "Guest";
            document.getElementById('userInitials').innerHTML = "G";
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
            document.getElementById('activeUser').innerHTML = name;
            document.getElementById('userInitials').innerHTML = getInitials(name);
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

async function deleteActiveUser() {
    try {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (!activeUser) throw new Error('No active user found in localStorage');
        const userKey = activeUser.key;
        if (userKey === "guest") {
            localStorage.removeItem('activeUser');
            return;
        }
        const deleteResponse = await fetch(`https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/LogInData/${userKey}.json`, {
            method: 'DELETE'
        });
        if (!deleteResponse.ok) {
            throw new Error('Failed to delete user data');
        }
        localStorage.removeItem('activeUser');
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
    document.getElementById('submenucontainer').classList.remove('display-none');
}

function closeSubmenu() {
    document.getElementById('submenucontainer').classList.add('display-none');
}

document.addEventListener('click', (event) => {
    const submenu = document.getElementById('submenucontainer');
    const userDiv = document.querySelector('.user');
    if (!submenu.contains(event.target) && !userDiv.contains(event.target)) {
        closeSubmenu();
    }
});

function loadTaskNumbers() {
    setTaskCount('allTasks', tasks.length);
    setTaskCount('allTasksInBoard', tasks.length);
    setTaskCount('NumberDoneTasks', tasks.filter(task => task.board === "done").length);
    setTaskCount('numberProgressTasks', tasks.filter(task => task.board === "inProgress").length);
    setTaskCount('numberFeedbackTasks', tasks.filter(task => task.board === "awaitFeedback").length);
    setTaskCount('numberUrgentTasks', tasks.filter(task => task.priority === "urgent").length);
}

function setTaskCount(elementId, count) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = count;
    } else {
        console.error(`Element with ID ${elementId} not found`);
    }
}

function loadNearestDeadline() {
    const urgentTasks = tasks.filter(task => task.priority === "urgent");
    if (urgentTasks.length === 0) {
        console.error('No urgent tasks found');
        return;
    }
    let nearestDate = urgentTasks.map(task => new Date(task.date)).sort((a, b) => a - b)[0];
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const nearestDeadlineString = nearestDate.toLocaleDateString('en-US', options);
    const nearestDeadlineElement = document.getElementById('nearestDeadline');
    if (nearestDeadlineElement) {
        nearestDeadlineElement.textContent = nearestDeadlineString;
    } else {
        console.error('Element for nearest deadline not found');
    }
}