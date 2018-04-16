// Scripts

// Initialize Firebase
const config = {
    apiKey: "AIzaSyB-CiHAjuIdQcShFc6huULX5jD2zJwmNmU",
    authDomain: "localleague6742319.firebaseapp.com",
    databaseURL: "https://localleague6742319.firebaseio.com",
    projectId: "localleague6742319",
    storageBucket: "localleague6742319.appspot.com",
    messagingSenderId: "1009473358530"
};
firebase.initializeApp(config);

// Global vars
const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const register = document.getElementById("register");
const logout = document.getElementById("logout");
const auth = firebase.auth();

// Login with email
login.addEventListener('click', e => {
    const emailValue = email.value;
    const passwordValue = password.value;
// DO VALIDATION
    const authPromise = auth.signInWithEmailAndPassword(emailValue, passwordValue);
    authPromise.catch(e => console.log(e.message));

});

// Register
register.addEventListener('click', e => {
    const emailValue = email.value;
    const passwordValue = password.value;
    // DO VALIDATION
    const authPromise = auth.createUserWithEmailAndPassword(emailValue, passwordValue);
    authPromise.catch(e => console.log(e.message));
});

// Log out
logout.addEventListener('click', e=> {
    firebase.auth().signOut();
});


// Real time listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
        logout.classList.remove('hide');
        login.classList.add('hide');
        register.classList.add('hide');
        email.classList.add('hide');
        password.classList.add('hide');
    }
    else{
        console.log("Please log in");
        logout.classList.add('hide');
        login.classList.remove('hide');
        register.classList.remove('hide');
        email.classList.remove('hide');
        password.classList.remove('hide');
    }
})

