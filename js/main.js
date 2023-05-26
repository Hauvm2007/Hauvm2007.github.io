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
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
const dbref = ref(db);

// db.ref("/patient").get().then((querySnapshot)=>{
//     console.log(querySnapshot);
// });

const a = db.ref("/patient").update({
    
})
// console.log
// get(child(dbref,"patient/")).then((querySnapshot)=>{
//     // var reverseSnapshot = [];
//     // querySnapshot.forEach((childSnapshot)=>{
//     //     reverseSnapshot.push(childSnapshot.key)
//     // })
//     // reverseSnapshot.reverse();
//     console.log(querySnapshot.val());
// });