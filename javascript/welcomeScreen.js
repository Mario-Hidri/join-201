function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return 'Good Morning,';
    } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon,';
    } else {
        return 'Good Evening,';
    }
}

async function showWelcomeScreen() {
    try {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        const hasShownWelcome = localStorage.getItem('hasShownWelcome');
        const userName = activeUser && activeUser.data && activeUser.data.name
            ? activeUser.data.name
            : 'Guest';

        const greeting = getGreeting();

        // Elemente im normalen Summary-Bereich
        const greetingTextElement = document.getElementById('greetingText');
        const activeUserElement = document.getElementById('activeUser');

        if (greetingTextElement) {
            greetingTextElement.textContent = greeting;
        }
        if (activeUserElement) {
            activeUserElement.textContent = userName;
        }

        // Elemente im Welcome-Screen Overlay
        const usernameElement = document.getElementById('username');
        const welcomeGreetingElement = document.getElementById('welcomeGreeting');

        if (usernameElement) {
            usernameElement.textContent = userName;
        }
        if (welcomeGreetingElement) {
            welcomeGreetingElement.textContent = greeting;
        }

        // Mobile Welcome-Screen Logik
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
        }
    } catch (error) {
        console.error('Error in showWelcomeScreen:', error);
    }
}
