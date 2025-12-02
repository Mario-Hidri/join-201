async function showWelcomeScreen() {
    try {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        const hasShownWelcome = localStorage.getItem('hasShownWelcome');
        let userName = activeUser && activeUser.data && activeUser.data.name ? activeUser.data.name : "Guest";

        const usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.textContent = userName;
        }

        if (window.innerWidth <= 1350 && hasShownWelcome === 'false') {
            const welcomeScreen = document.getElementById('welcomeScreen');
            const summaryContent = document.querySelector('.rightSide');
            if (welcomeScreen && summaryContent) {
                summaryContent.style.visibility = 'hidden';

                welcomeScreen.classList.add('active');

                setTimeout(() => {
                    welcomeScreen.classList.remove('active');
                    welcomeScreen.classList.add('hidden');
                    summaryContent.style.visibility = 'visible';
                }, 3500);

                localStorage.setItem('hasShownWelcome', 'true');
            }
        } else {
            const summaryContent = document.querySelector('.rightSide');
            if (summaryContent) {
                summaryContent.style.visibility = 'visible';
            }
            const activeUserElement = document.getElementById('activeUser');
            if (activeUserElement) {
                activeUserElement.textContent = userName;
            }
        }
    } catch (error) {
        console.error('Error in showWelcomeScreen:', error);
    }
}
