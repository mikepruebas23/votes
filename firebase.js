var config  = {
    apiKey: "AIzaSyDy60mMMiFgtrIizIqmDzd8R4dJ7Sgzxg8",
    authDomain: "clicker-mikerm24.firebaseapp.com",
    databaseURL: "https://clicker-mikerm24.firebaseio.com",
    projectId: "clicker-mikerm24",
    storageBucket: "clicker-mikerm24.appspot.com",
    messagingSenderId: "483328941100"
};

firebase.initializeApp(config);
const db = firebase.firestore();