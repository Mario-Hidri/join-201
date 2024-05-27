function start() {
    includeHTML();
    loadLogInData();
}

const urlLogInData = "https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/LogInData.json";
const logInName = [];

async function loadLogInData() {
    try {
        const response = await fetch(urlLogInData);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);  // Log the fetched data to inspect its structure
        for (const key in data) {
            const userArray = data[key];
            if (Array.isArray(userArray) && userArray.length > 0) {
                userArray.forEach(user => {
                    if (user.name) {
                        logInName.push(user.name);
                        console.log(`Name found and added: ${user.name}`);  // Log the added name
                    } else {
                        console.log(`No name found for user in key: ${key}`);  // Log if no name is found for a user in the array
                    }
                });
            } else {
                console.log(`No valid user array found for key: ${key}`);  // Log if the array is empty or not found
            }
        }
        console.log("All names:", logInName);  // Log all names collected
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}