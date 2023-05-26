import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyDGWbRYafwfDQvdZ-qEARZE_uDHFQu60qY",
  authDomain: "datn-c62e9.firebaseapp.com",
  databaseURL: "https://datn-c62e9-default-rtdb.firebaseio.com",
  projectId: "datn-c62e9",
  storageBucket: "datn-c62e9.appspot.com",
  messagingSenderId: "5465544707",
  appId: "1:5465544707:web:68fcebabd74e1cea385636",
  measurementId: "G-MPY38F5X51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import {getDatabase, ref, set, child, get, update, remove}
    from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";



const db = getDatabase();
const Log_patient = document.getElementById('log_patient');
const log_hospital = document.getElementById('log_hospital');

localStorage.removeItem("current_user");
const a = localStorage.getItem("current_user");
console.log(a)

// For patienn form
function AuthenticateUser_patient(){
    const userid = document.getElementById('userid');
    const pass = document.getElementById('password_patient');
    const dbref = ref(db);
    get(child(dbref,"patient/"+ userid.value)).then((snapshot)=>{
        if(snapshot.exists()){
            // let dbpass = dePass(snapshot.val().password);
            let dbpass = snapshot.val().Password;
            if(dbpass==pass.value){
                localStorage.setItem("current_user", userid.value);
                window.location = "patient.html";
            }else{
                alert("user not exist");
            }
        }else{
            alert("useris or password is invalid");
        }
    });
}
// export {AuthenticateUser_patient}

// for hospital form
function AuthenticateUser_hospital(){
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const pass = document.getElementById('password_hospital');
    const dbref = ref(db);
    get(child(dbref, username.value)).then((snapshot)=>{
        if(snapshot.exists()){
            // let dbpass = dePass(snapshot.val().password);
            let dbpass = snapshot.val().Password;
            let dbmail = snapshot.val().Email;
            if(dbpass==pass.value && dbmail == email.value){
                localStorage.setItem("current_user", "admin");
                window.location = "hospital.html";
            }else{
                alert("user not exist");
            }
        }else{
            alert("useris or password is invalid");
        }
    });
}

//decript process
function dePass(dbpass){
    var pass12 = CryptoJS.AES.decrypt(dbpass, pass.value);
    return pass12.toString(CryptoJS.enc.Utf8);
}

Log_patient?.addEventListener('click', AuthenticateUser_patient);
log_hospital?.addEventListener('click', AuthenticateUser_hospital);

// window.onload = function() {

// }