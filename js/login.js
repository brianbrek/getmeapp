(function() {
  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyATHYRDFn17PFsmiY149_3LFe3UdNSBWQw",
    authDomain: "getmeapp-deda5.firebaseapp.com",
    databaseURL: "https://getmeapp-deda5.firebaseio.com",
    projectId: "getmeapp-deda5",
    storageBucket: "getmeapp-deda5.appspot.com",
    messagingSenderId: "583030851047"
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
  signInSuccessUrl: 'service.html',
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
