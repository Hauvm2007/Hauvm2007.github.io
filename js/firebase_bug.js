
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


let userlink = document.getElementById('userlink');
const signout = document.getElementById('signout');
var currentUser = null
const dbref = ref(db);




var ID,Name, Birthday,Address,Phone, Bpm, SPO2,Temp;

get(child(dbref,"patient/")).then((querySnapshot)=>{
    // var reverseSnapshot = [];
    // querySnapshot.forEach((childSnapshot)=>{
    //     reverseSnapshot.push(childSnapshot.key)
    // })
    // reverseSnapshot.reverse();
    // console.log(querySnapshot.val());

    querySnapshot.forEach((patient)=> {
        get(child(dbref,"patient/"+ patient.key)).then((querySnapshot)=>{
                // const array_Bpm = [],array_Temp = [], array_SPO2 = [];
            // console.log(querySnapshot.val());
                ID = querySnapshot.val().ID;
                Name = querySnapshot.val().Name;
                Birthday = querySnapshot.val().BD;
                Address  = querySnapshot.val().Address;
                Phone = querySnapshot.val().Phone;
                Bpm = querySnapshot.val().Bpm;
                SPO2 = querySnapshot.val().SPO2;
                Temp = querySnapshot.val().temp;
                const test = [];
                test.push(Bpm);
                console.log(test);
                if ((ID != 'undefined')) {
                    AddItem();
                }
                // Bpm.forEach((bpm)=>{
                //     array_Bpm.push(bpm);
                // })
                // const bpm_chart = document.getElementById(`p${ID}bpm`);
                // // console.log(array_Bpm);
                // drawchart(bpm_chart,array_Bpm,"Heart Pluse (BPM)");

                // Temp.forEach((temp)=>{
                //     array_Temp.push(temp);
                // })
                // const temp_chart = document.getElementById(`p${ID}temp`);
                // // console.log(array_Bpm);
                // drawchart(temp_chart, array_Temp,"Heart Pluse (BPM)");

                // SPO2.forEach((spo2)=>{
                //     array_SPO2.push(spo2);
                // })
                // const spo2_chart = document.getElementById(`p${ID}spo2`);
                // // console.log(array_Bpm);
                // drawchart(spo2_chart, array_SPO2,"Oximeter (%)");
        });
    });
});

//------------------create expand------------------------//
// import{getid} from '../Main.html';
// if(getid>0){
//     console.log("yes")
// }
export function hello() {console.log("hello");}
// hello();

export function addExpand(){
    const Patient_box = document.getElementById('expand_active');
    const newDiv = document.createElement("div");
    newDiv.className = "patient_care";
    newDiv.id = ID;
    newDiv.innerHTML = 
                        `
                        <div class="care_value" >
                            <canvas id="bpm"></canvas>
                            <div class="note">
                                <div class="average"> 
                                    <h3>Average</h3>
                                    <div>40</div>
                                </div>
                                <div class="warmning">
                                    <h3>Warmning</h3>
                                    <div>40</div>
                                </div>
                            </div>
                        </div>
                        <div class="care_value">
                            <canvas id="temp"></canvas>
                            <div class="note">
                            <div class="average"> 
                                <h3>Average</h3>
                                <div>40</div>
                            </div>
                            <div class="warmning">
                                <h3>Warmning</h3>
                                <div>40</div>
                            </div>
                        </div>
                        </div>
                        <div class="care_value">
                            <canvas id="spo2"></canvas>
                            <div class="note">
                            <div class="average"> 
                                <h3>Average</h3>
                                <div>40</div>
                            </div>
                            <div class="warmning">
                                <h3>Warmning</h3>
                                <div>40</div>
                            </div>
                        </div>
                        </div>

                        `
    Patient_box.prepend(newDiv);
    // datachart();
}


//-------------------get heathcare value ---------------//
const array_Bpm = [],array_Temp = [], array_SPO2 = [] 
function datachart(){
    const div = document.querySelector('.expand_active');
    const id= div.id
    console.log(div);
    // const id = "001"
    get(child(dbref,"patient/" + id + "/Bpm")).then((querySnapshot)=>{
       const Bpm = querySnapshot.val();
        // console.log(Bpm);
        querySnapshot.forEach((bpm)=>{
            array_Bpm.push(bpm.val());
        });
        console.log(array_Bpm);
        const bpm_chart = document.getElementById("bpm");
        drawchart(bpm_chart, array_Bpm,"Heart Pluse (BPM)");
        // console.log(bpm_chart)
    });
    get(child(dbref,"patient/" + id + "/Temp")).then((querySnapshot)=>{
        const Bpm = querySnapshot.val();
         querySnapshot.forEach((bpm)=>{
             array_Temp.push(bpm.val());
         });
         console.log(array_Temp);
         const temp_chart = document.getElementById("temp");
         drawchart(temp_chart, array_Temp,"temperature (℃)");
    });
    get(child(dbref,"patient/" + id + "/SPO2")).then((querySnapshot)=>{
    const Bpm = querySnapshot.val();
        querySnapshot.forEach((bpm)=>{
            array_SPO2.push(bpm.val());
        });
        console.log(array_SPO2);
        const spo2_chart = document.getElementById("spo2");
        drawchart(spo2_chart, array_SPO2,"Oximeter (%)");
    });
}
// datachart()
// export{array_Bpm};
//----------------------------------------------------//


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
    var id_div = ID.toString();
    console.log(id_div);
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
                                <p class="patient_item Age flex2">${Birthday}</p>
                                <p class="patient_item phone flex3">${Phone}</p>
                                <p class="patient_item address flex4">${Address}</p>
                                <div class="expand flex2">
                                    <i class="fa-solid fa-chevron-down" id="${ID}" onclick="active_expand('p${id_div}')"></i>
                                </div>
                            </div>
                        `
    Patient_List.prepend(newDiv);
    const expand_btn = document.getElementById(`${ID}`);
    expand_btn.addEventListener('click', datachart);
    // expand_btn_list.id
    // console.log(expand_btn.id);
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

function removeg(){
    const div = document.querySelector(".patient_care");
    console.log(div);
    div.remove();
}
function test(){
    
    console.log("yes");
}


signout.addEventListener('click',removeg);



//window load

window.onload = function(){
    // getUserid();
    // if(currentUser == null){
        
    // }


}
