// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://join-projekt-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
