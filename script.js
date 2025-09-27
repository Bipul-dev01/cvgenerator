function addNewWEfiled() {
  let nodeElement = document.createElement("textarea");
  nodeElement.classList.add("form-control", "mt-2", "weField");
  nodeElement.setAttribute("rows", 3);
  nodeElement.setAttribute("placeholder", "Enter here");

  let we = document.getElementById("we");
  let weAddBtn = document.getElementById("weAddBtn");

  we.insertBefore(nodeElement, weAddBtn);

  // // Create Delete Button
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
  deleteButton.style.marginTop = "2px";

  we.insertBefore(deleteButton, weAddBtn);

  // Delete button এর কাজ – textarea গুলো মুছে ফেলা
  deleteButton.addEventListener("click", () => {
    if (nodeElement) {
      nodeElement.remove(); // সংশ্লিষ্ট textarea মুছে দেবে
      deleteButton.remove(); // নিজেকেও সরাবে
    }
  });
}

function addNewAQfiled() {
  let nodeElement = document.createElement("textarea");
  nodeElement.classList.add("form-control", "mt-2", "academicQualification");
  nodeElement.setAttribute("rows", 3);
  nodeElement.setAttribute("placeholder", "Enter here");

  let aqField = document.getElementById("aqField");
  let aqAddBtn = document.getElementById("aqAddBtn");

  aqField.insertBefore(nodeElement, aqAddBtn);

  // // Create Delete Button
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
  deleteButton.style.marginTop = "2px";

  aqField.insertBefore(deleteButton, aqAddBtn);

  // Delete button এর কাজ – textarea গুলো মুছে ফেলা
  deleteButton.addEventListener("click", () => {
    if (nodeElement) {
      nodeElement.remove(); // সংশ্লিষ্ট textarea মুছে দেবে
      deleteButton.remove(); // নিজেকেও সরাবে
    }
  });
}

// Generating CV

function generateCV() {
  // nameFiled

  let nameFiled = document.getElementById("nameFiled");
  let nameT1 = document.getElementById("nameT1");
  let nameT2 = document.getElementById("nameT2");

  nameT1.innerText = nameFiled.value;
  nameT2.innerText = nameFiled.value;

  // contactFiled

  let contactFiled = document.getElementById("contactFiled").value;
  document.getElementById("contactT").innerText = contactFiled;

  // addressFiled

  let addressFiled = document.getElementById("addressFiled").value;
  document.getElementById("addressT").innerText = addressFiled;

  let fbFiled = document.getElementById("fbFiled").value;
  document.getElementById("fbT").innerText = fbFiled;

  let instaFiled = document.getElementById("instaFiled").value;
  document.getElementById("instaT").innerText = instaFiled;

  let linkedFiled = document.getElementById("linkedFiled").value;
  document.getElementById("linkedT").innerText = linkedFiled;

  document.getElementById(
    "fbT"
  ).innerHTML = `<a href="${fbFiled}" target="_blank">${fbFiled}</a>`;
  document.getElementById(
    "instaT"
  ).innerHTML = `<a href="${instaFiled}" target="_blank">${instaFiled}</a>`;
  document.getElementById(
    "linkedT"
  ).innerHTML = `<a href="${linkedFiled}" target="_blank">${linkedFiled}</a>`;

  // Objectives

  let objectiveField = document.getElementById("objectiveField").value;
  let objectiveT = document.getElementById("objectiveT");
  objectiveT.innerText = objectiveField;

  // Work Experience

  let weField = document.getElementsByClassName("weField");
  //console.log(weField)

  let str = "";
  for (let e of weField) {
    str = str + `<li>${e.value}</li>`;
    //console.log(e.value)
  }

  let weT = document.getElementById("weT");
  weT.innerHTML = str;

  // Academic Qualification

  let academicQualification = document.getElementsByClassName(
    "academicQualification"
  );

  let str1 = "";
  for (let e of academicQualification) {
    str1 = str1 + `<li>${e.value}</li>`;
  }

  let aqT = document.getElementById("aqT");
  aqT.innerHTML = str1;

  // Display & Hide Section
  document.getElementById("cv-form").style.display = "none";
  document.getElementById("cv-template").style.display = "block";


  //*******************************************
  // Code for setting image

  let file = document.getElementById("imageField").files[0];
  console.log(file);

  let reader = new FileReader();
  reader.readAsDataURL(file);
  console.log(reader.result);

  // set the image to template

  reader.onloadend = function () {
    let imgTemplate = document.getElementById("imgTemplate");
    imgTemplate.src = reader.result;
  };
  //*******************************************

  // Gender
  let gender = document.querySelector('input[name="gender"]:checked');
  if (gender) {
    document.getElementById("genderT").innerText = gender.value;
  } else {
    document.getElementById("genderT").innerText = "";
  }
  //  :checked মানে হলো — ওই সব radio button এর মধ্যে যেটা বর্তমানে select বা checked করা আছে, সেটা ধরো।


  // Date of Birth
  let day = document.getElementById("dobDay").value;
  let month = document.getElementById("dobMonth").value;
  let year = document.getElementById("dobYear").value;

  if (day && month && year) {
    document.getElementById("dobT").innerText = `${day} ${month}, ${year}`;
  } else {
    document.getElementById("dobT").innerText = "";
  }


  //console.log(nameFiled.value);

  //console.log("Generating CV")
}

// Fill Day options
let daySelect = document.getElementById("dobDay");
for (let i = 1; i <= 31; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.text = i;
  daySelect.add(option);
}

// Fill Month options
let monthSelect = document.getElementById("dobMonth");
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
months.forEach((month, index) => {
  let option = document.createElement("option");
  option.value = month;
  option.text = month;
  monthSelect.add(option);
});

// Fill Year options (e.g. 1950 – current year)
let yearSelect = document.getElementById("dobYear");
let currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1950; y--) {
  let option = document.createElement("option");
  option.value = y;
  option.text = y;
  yearSelect.add(option);
}

function printCV() {
  window.print();
}

function downloadPDF() {
  const cvTemplate = document.getElementById("cv-template");

  // ডাউনলোডের আগে বাটন hide
  const buttons = cvTemplate.querySelectorAll(".no-pdf");
  buttons.forEach(btn => btn.style.display = "none");

  let name = document.getElementById("nameT1").innerText || "My-CV";
  let fileName = name.replace(/\s+/g, "-") + "-CV.pdf";

  const opt = {
    margin: [0.2, 0.2, 0.2, 0.2],
    filename: fileName,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 1.2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };

  // PDF বানানো
  html2pdf().set(opt).from(cvTemplate).save().then(() => {
    // আবার বাটন দেখাও
    buttons.forEach(btn => btn.style.display = "block");
  });
}





//****************************************************************

// let numbersID = document.getElementById("numbers");
// console.log(numbersID); // <p id="numbers" class="numbers">

//let numbersClass = document.getElementsByClassName("numbers");
//console.log(numbersClass)

// HTMLCollection { 0: p#numbers.numbers, 1: p#numbers.numbers, 2: p#numbers.numbers
// , length: 3, … }
// ​
// 0: <p id="numbers" class="numbers">​
// 1: <p id="numbers" class="numbers">​
// 2: <p id="numbers" class="numbers">
// ​
// length: 3

// let str = ""
// for(let e of numbersClass){

//   str = str + `<h1>${e.textContent}</h1>`
//   //console.log(e.textContent)
// }

// let outPut = document.getElementById("outPut");
// outPut.innerHTML = str

//****************************************************************

// let arr = [10,20,30,40]

// for(let i of arr){
//   console.log(i)
// }

// for(let i in arr){
//   console.log(i)
// }

//****************************************************************

//let arr = [10,20,30,40,50];

// arr.filter((item, index)=>{
//   console.log("Item is : " ,item, "and index is :", index);
// });

// Item is :  10 and index is : 0
// Item is :  20 and index is : 1
// Item is :  30 and index is : 2
// Item is :  40 and index is : 3
// Item is :  50 and index is : 4

// //1st way :
// *******************************************

// let newArr = arr.filter((_,index)=> index !==1 )
// console.log(newArr)  // Array(4) [ 10, 30, 40, 50 ]

// //2nd way :
// *******************************************

// let newArr = arr.filter((_,, index)=> { return index !==1} )

// console.log(newArr) // Array(4) [ 10, 30, 40, 50 ]

// //3rd way :
// *******************************************

// let newArr = arr.filter((_, index)=> {

//   if(index !==1){
//     return arr
//     }
//   })

// console.log(newArr) // Array(4) [ 10, 30, 40, 50 ]
