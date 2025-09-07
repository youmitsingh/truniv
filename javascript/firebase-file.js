// Firebase configuration and initialization
// Replace the below config with your actual Firebase project config
const firebaseConfig = {
        apiKey: "AIzaSyClsOcO9g_9OFhMCmngRJxmTO1UZIICfL0",
        authDomain: "youmit-truniv-life.firebaseapp.com",
        databaseURL: "https://youmit-truniv-life-default-rtdb.firebaseio.com",
        projectId: "youmit-truniv-life",
        storageBucket: "youmit-truniv-life.firebasestorage.app",
        messagingSenderId: "20205073833",
        appId: "1:20205073833:web:a6a25aa77d0d83a02a80b8",
        measurementId: "G-CV4LK7HBW5"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}


// Ensure user is authenticated anonymously
firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
                firebase.auth().signInAnonymously().catch(function(error) {
                        console.error('Anonymous auth failed:', error);
                });
        }
});

const database = firebase.database();
window.database = database;
