
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
const dbref = ref(db);

const current_user = localStorage.getItem("current_user");
// console.log(localStorage.getItem("delete_id"))
if(current_user != "admin"){
    alert("please login first");
    window.location = "login.html";
}

var ID,Name,Gender, Age,Address,Phone, Bpm, SPO2,Temp,Bpm_avg,sum,SPO2_avg,Temp_avg;

get(child(dbref,"patient/")).then((querySnapshot)=>{
    querySnapshot.forEach((patient)=> {
        get(child(dbref,"patient/"+ patient.key)).then((querySnapshot)=>{
                const array_Bpm = [],array_Temp = [], array_SPO2 = [];
                var delta1, delta2;
            // console.log(querySnapshot.val());
                ID = querySnapshot.val().ID;
                Name = querySnapshot.val().Name;
                Gender = querySnapshot.val().Gender;
                Age = querySnapshot.val().Age;
                Address  = querySnapshot.val().Address;
                Phone = querySnapshot.val().Phone;
                Bpm = querySnapshot.val().Bpm;
                SPO2 = querySnapshot.val().SPO2;
                Temp = querySnapshot.val().Temp;
                // const test = [];
                // test.push(Bpm);
                // console.log(Bpm);
                if ((Bpm != 'undefined') && (Temp != 'undefined') && (SPO2 != 'undefined')) {
                    //---------------------------Bpm-------------------//
                    Bpm.forEach((bpm)=>{
                        array_Bpm.push(bpm);
                    })
                    sum = array_Bpm.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue;
                    });
                    Bpm_avg = sum/5;
                    // console.log(Bpm_avg);
                    //------------------------Temp---------------------//
                    Temp.forEach((temp)=>{
                        array_Temp.push(temp);
                    })
                    sum = array_Temp.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue;
                    });
                    Temp_avg = sum/5;
                    // console.log(Temp_avg);

                    //-----------------------SPO2-----------------------//
                    SPO2.forEach((spo2)=>{
                        array_SPO2.push(spo2);
                    })
                    sum = array_SPO2.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue;
                    });
                    SPO2_avg = sum/5;
                    // console.log(SPO2_avg);
                    AddItem();
                }
                const bpm_chart = document.getElementById(`p${ID}bpm`);
                drawchart(bpm_chart,array_Bpm,"Heart Pluse (BPM)");

                const temp_chart = document.getElementById(`p${ID}temp`);
                drawchart(temp_chart, array_Temp,"Temperature (℃)");

                const spo2_chart = document.getElementById(`p${ID}spo2`);
                drawchart(spo2_chart, array_SPO2,"Oximeter (%)");
        });
    });
});



//-----------------------draw chart-------------------//
Chart.register(ChartDataLabels);
function drawchart(charttype, dt, lb){
    new Chart(charttype, {
        type: 'line',
        data: {
          labels: ['day 1', 'day 2', 'day 3', 'day 4', 'day 5'],
          datasets: [{
            label: lb,
            data: dt,
            borderWidth: 1,
            datalabels:{
                anchor: 'start',
                align: 'end',
                color:'red'
            }
          }]
        },
        options: {
            backgroundColor: "red",
            borderColor: "red",
            label:{
                display: false,
            },
            title: {
                display: false,
                },
            scales: {
                x:{
                    grid: {display:false}
                },
                y: {
                // padding: 30,
                grace: '50%',
                // beginAtZero: true,
                display:false,
                // grid: {display:false}
                },
            },
            layout:{
                padding: 20
            },
            Plugins: [ChartDataLabels],
            aspectRatio: 1/1,
            plugins:{
                tooltip:{
                    title: {display: false,},
                    enabled: false
                    // callback:{
                    //     label: (context) => `Total: ${context.formttedValue} users`,
                    // },
                    // position: 'nearest',
                },
                datalabels:{
                    // color: colorDatalabels,
                    font: {size:18}
                }
            }
        }
    });
}


function AddItem() {
    const Patient_List = document.querySelector(".patient_list");
    const newDiv = document.createElement("div");
    // console.log(newDiv);
    newDiv.className = "patient_box";
    newDiv.id = `p${ID}`;
    // newDiv.insertAdjacentHTML("afterend",div);
    newDiv.innerHTML = 
                        `
                            <div class="patient_info">
                                <p class="patient_item id flex2">${ID}</p>
                                <p class="patient_item Name flex4">${Name}</p>
                                <p class="patient_item Age flex2">${Age}</p>
                                <p class="patient_item Age flex2">${Gender}</p>
                                <p class="patient_item phone flex3">${Phone}</p>
                                <p class="patient_item address flex4">${Address}</p>
                                <div class="expand flex2">
                                    <i class="fa-solid fa-chevron-down" title="Expand" id="expand_icon" onclick="active_expand('p${ID}')"></i>
                                    <i class="fa-solid fa-circle-xmark" title="Delete" onclick="delete_patient('${ID}')"></i>
                                </div>
                            </div>

                            <div class="patient_care">
                                <div class="care_value" >
                                    <canvas id="p${ID}bpm"></canvas>
                                    <div class="average"> 
                                        <h3>Average</h3>
                                        <p>${parseFloat(Bpm_avg.toFixed(0))}</p>
                                    </div>
                                </div>
                                <div class="care_value">
                                    <canvas id="p${ID}temp"></canvas>
                                    <div class="average"> 
                                        <h3>Average</h3>
                                        <p>${parseFloat(Temp_avg.toFixed(2))}</p>
                                    </div>
                                </div>
                                <div class="care_value">
                                    <canvas id="p${ID}spo2"></canvas>
                                    <div class="average"> 
                                        <h3>Average</h3>
                                        <p>${parseFloat(SPO2_avg.toFixed(0))}</p>
                                    </div>
                                </div>
                            </div>
                        `
    Patient_List.prepend(newDiv);
}

                            // <div class="patient_item">
                            //     <p>${Name}</p>
                            // </div>
                            // <div class="patient_item">
                            //     <p>${Birthday}</p>
                            // </div>
                            // <div class="patient_item">
                            //     <p>${Address}</p>
                            // </div>
                            // <div class="patient_item">
                            //     <p>${Phone}</p>
                            // </div>
                            // <div class="patient_item">
                            //     <p>${Bpm}</p>
                            // </div>
                            // <div class="patient_item">
                            //     <p>${SPO2}</p>
                            // </div>

function Signout(){
    sessionStorage.removeItem('userid');
    localStorage.removeItem('userid');
    localStorage.removeItem('KeepLoggedIn');
    window.location = "login.html";
}
const signout = document.getElementById('signout');
signout.addEventListener('click',Signout);

// const add_patient = document.getElementById("add_patient");
// console.log(add_patient);
// add_patient.addEventListener('click', register);
const delete_id = localStorage.getItem("delete_id");
if(delete_id != null){
    remove(ref(db, "patient/"+ delete_id))
    localStorage.removeItem("delete_id");
}
// get(child(dbref,"patient/"+ patient.key)).then((querySnapshot)
