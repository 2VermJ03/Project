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
const onLoggedIn = document.getElementById("onLoggedIn");
const createClubBtn = document.getElementById("createClubBtn");
const clubName = document.getElementById("clubName");
const clubLocation = document.getElementById("clubLocation");
const clubPassword = document.getElementById("clubPassword");
const uppBtn = document.getElementById("updatePlayerProfileBtn");
const pfName = document.getElementById("playerFirstName");
const plName = document.getElementById("playerLastName");
const playerPosition = document.getElementById("playerPosition");

const db = firebase.database();
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
logout.addEventListener('click', e => {
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
        onLoggedIn.classList.remove('hide');

        const userRef = db.ref(`users/${firebaseUser.uid}`);
        userRef.once('value', snapshot => {
            if(!snapshot.val()){
                userRef.set({
                    email: firebaseUser.email
                });
            }
        });

        // Update player profile
        uppBtn.addEventListener('click', e => {
            const pfNameValue = pfName.value;
            const plNameValue = plName.value;
            const playerPositionValue = playerPosition.value;
            
        });

        // create club
        createClubBtn.addEventListener('click', e => {
            const clubNameValue = clubName.value;
            const clubLocationValue = clubLocation.value;
            const clubPasswordValue = clubPassword.value;

            const rootRef = db.ref();
            const clubRef = rootRef.child('clubs');
            const pushRef = clubRef.push();

            pushRef.set({
                clubName: clubNameValue,
                managerId: firebaseUser.uid,
                clubLocation: clubLocationValue,
                clubPassword: clubPasswordValue
            });

            const clubId = pushRef.key;
            console.log(clubId);

        });
       

    }
    else{
        console.log("Please log in");
        logout.classList.add('hide');
        login.classList.remove('hide');
        register.classList.remove('hide');
        email.classList.remove('hide');
        password.classList.remove('hide');
        onLoggedIn.classList.add('hide');

    }
});





/* create new club || join club

    Create new club form:
    name
    badge
    PASSWORD !!

    Join club:
    search by club name -- noSql search should be instant, like AJAX?
    enter password
    assign player ID to clubs' players array, if uid and playerid match -- show club data ???
const clubNameValue = clubName.value;

            function createNewClub(clubName, managerId){
                const postData = {
                    clubName: clubNameValue,
                    managerId: managerId
                };
            
                const newPostKey = firebase.db().ref().child('clubs').push().key;

                const updates = {};
                updates['/clubs/' + newPostKey] = postData;

                return firebase.db().ref.update(updates);
            }

*/