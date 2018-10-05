(function() {
  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCouee6t_RJA2a7-TO_H30YirySMbd-2Aw",
      authDomain: "getmeappadmin-61d15.firebaseapp.com",
      databaseURL: "https://getmeappadmin-61d15.firebaseio.com",
      projectId: "getmeappadmin-61d15",
      storageBucket: "getmeappadmin-61d15.appspot.com",
      messagingSenderId: "551176956579"
    };
    firebase.initializeApp(config);

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    	var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'block';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInSuccessUrl: 'admin.html',
  signInFailure: function(error) {
            window.location.assign('admin.html');
          },
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
};
ui.start('#firebaseui-auth-container', uiConfig);

  /*Elementos
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnRegister = document.getElementById('btnRegister');
  const btnLogout = document.getElementById('btnLogout');

  //Evento login
  btnLogin.addEventListener('click', e => {
    //email y password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  //Registro evento
  btnRegister.addEventListener('click', e => {
    //email y password
    // TODO: CHECK 4 REAL EMAILS
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
    .catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e=> {
    firebase.auth().signOut();
  });

  //addEventListener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
      btnMenu.classList.remove('hide');
      btnAdmin.classList.remove('hide');
    } else {
      alert('not logged in');
      btnLogout.classList.add('hide');
      btnMenu.classList.add('hide');
      btnAdmin.classList.add('hide');
    }

  });
*/

}());
