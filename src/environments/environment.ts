// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyDA3VfcAYESKv5K0WEYy3cjcj4zl0BndCs",
    authDomain: "galleryapp-b42a1.firebaseapp.com",
    databaseURL: "https://galleryapp-b42a1.firebaseio.com",
    projectId: "galleryapp-b42a1",
    storageBucket: "galleryapp-b42a1.appspot.com",
    messagingSenderId: "565174753687"
  }
};
