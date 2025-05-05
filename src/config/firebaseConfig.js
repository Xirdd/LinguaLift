// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


    const firebaseConfig = {
    apiKey: 'AIzaSyB-OcBTG9daplh3MjCqaTGi2EqOUZ3oFWc',
    authDomain: 'com.chadrix.lingualift',
    projectId: 'lingualift-e9bc5',
    storageBucket: 'com.chadrix.lingualift',
    messagingSenderId: 'your-sender-id',
    appId: '1:752088035900:android:9142a2aa4ed5103e5b4939',
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    export { auth };