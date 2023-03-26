import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBQKBOInfIrA29A-9koc9NLO8xiZcuae1c",
    authDomain: "sistema-chamados-dc5ef.firebaseapp.com",
    projectId: "sistema-chamados-dc5ef",
    storageBucket: "sistema-chamados-dc5ef.appspot.com",
    messagingSenderId: "765675700241",
    appId: "1:765675700241:web:90f7b28a6ff080dba671b0",
    measurementId: "G-EC8Z505V0R"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { 
    auth, 
    db, 
    storage 
};