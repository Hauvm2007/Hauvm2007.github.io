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

const userid = document.getElementById('userid');
const name = document.getElementById('name');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
const phone = document.getElementById('phone');
const address = document.getElementById('address');
const pass = document.getElementById('password');
const sub_btn = document.getElementById('sub_btn');

const current_user = localStorage.getItem("current_user");
if(current_user != "admin"){
    alert("please login first");
    window.location = "login.html";
}


//----validation.\----
function Validation(){
    let useridregex = /^[0-9]+$/;
    let nameregex = /^[a-zA-Z]+$/;
    let ageregex = /^[0-9]+$/;
    let phoneregex = /^[0-9]+$/;
    let addressregex = /^[a-zA-Z]+$/;
    let passregex = /^[a-zA-Z0-9]+$/;

    // if((!useridregex.test(userid.value))||(!nameregex.test(name.value))||(!ageregex.test(age.value))||(!phoneregex.test(phone.value))
    //     ||(!addressregex.test(address.value))||(!passregex.test(pass.value))){
    //     alert("Please fill all of form");
    //     return false;
    // }
    if((!userid.value)||(!name.value)||(!age.value)||(!phone.value)||(!address.value)||(!gender.value)||(!pass.value)){
        alert("Please fill all of form");
        return false;
    }
    return true;
}

function RegisterUser(){
    if (!Validation()){
        return;
    };
    const dbref = ref(db);
    get(child(dbref,"patient/"+ userid.value)).then((snapshot)=>{
        if(snapshot.exists()){
            // let dbpass = dePass(snapshot.val().password);
            alert("user already exist");
        }else{
            set(ref(db,"patient/" + userid.value),
            {
              ID: userid.value,
              Name : name.value,
              Age: age.value,
              Gender: gender.value,
              Phone:phone.value,
              Address: address.value,
              Password: pass.value,
            })
            set(ref(db,"patient/" + userid.value + "/Bpm/"),
            {
                0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
            })
            set(ref(db,"patient/" + userid.value + "/SPO2/"),
            {
                0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
            })
            set(ref(db,"patient/" + userid.value + "/Temp/"),
            {
                0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
            })
            .then(()=>{
                alert("user added");
                window.location = "hospital.html"
            })
            .cacth((error)=>{
                alert("error"+error);
            })

        }
    });
}
sub_btn.addEventListener('click', RegisterUser);