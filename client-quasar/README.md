# Quasar App (client-quasar)

A Quasar Framework app

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Configuring Firebase

This app will fail to compile unless there is a set Firebase configuration.

1. Create a new Firebase project at <https://console.firebase.google.com>
2. Add a new web app
3. Copy the credentials and create a new file at `/boot/firebase.js`:

```javascript
import * as firebase from './firebase/app'
import 'firebase/auth'
import 'firebase/database'

// copy and paste the web app's Firebase configuration here

let firebaseApp = firebase.default.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }

```
