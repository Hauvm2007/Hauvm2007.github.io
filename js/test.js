// Login_paitent_select(1);
// var pre_sel = 1;
// function Login_paitent_select(select){
//     const listUser = document.querySelector(".login_form");
//     const newDiv = document.createElement("div");
//     const patient = document.getElementById("patient_form");
//     const hospital = document.getElementById("hospital_form");
//     console.log(select);
//     if(select !=pre_sel){
//         pre_sel = select;
//         console.log(select);
//         if(select==1){
//             hospital?.remove();
//             newDiv.id = "patient_form";
//             newDiv.innerHTML = 
//                                 `
//                                 <input class="user_input" name="userid" type="text" placeholder="Userid" id="userid">
//                                 <input class="user_input" name="password" type="password" placeholder="Password" id="password">
//                                 <div class="ex_form">
//                                     <div class="remember">
//                                         <input type="checkbox" name="checkbox" id="remember_password">
//                                         <label for="remember_password">remember password</label>
//                                     </div>
//                                     <div>Forgot password?</div>
//                                 </div>
//                                 <button class="submit" id="log_patient" onclick="">Login</button>
//                                 `
//         }
//         else{
//         // listUser.removeChild
//         // const newDiv = document.createElement("div");
//         patient?.remove();
//         newDiv.id = "hospital_form";
//         newDiv.innerHTML = 
//                             `            
                            // <input class="user_input" name="username" type="text" placeholder="Username" id="userid">
                            // <input class="user_input" name="email" type="text" placeholder="Email" id="email">
                            // <input class="user_input" name="password" type="password" placeholder="Password" id="password">
                            // <div class="ex_form">
                            //     <div class="remember">
                            //         <input type="checkbox" name="checkbox" id="remember_password">
                            //         <label for="remember_password">remember password</label>
                            //     </div>
                            //     <div>Forgot password?</div>
                            // </div>
                            // <button class="submit" id="log_patient">Login</button>
//                             `
//         }
//         listUser.prepend(newDiv);
//     }
// }
// import { array_Bpm } from "./firebase.js";

function Login_paitent_select(select){
    const patient = document.getElementById("patient_form");
    console.log(patient);
    const hospital = document.getElementById("hospital_form");
    if(select==1){
        hospital.classList.add("non_active");
        patient.classList.remove("non_active");
    }
    else{
        patient.classList.add("non_active");
        hospital.classList.remove("non_active");
    }
}
const named = 'JavaScript Program';
console.log(named)
// export {name};
// // exporting function
// export function sum(x, y) {
//     return x + y;
// }
// import{addExpand} from './firebase.js'


