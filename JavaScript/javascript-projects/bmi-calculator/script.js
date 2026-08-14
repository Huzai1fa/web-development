

//  const height=parseInt(document.querySelector("#height").value);

const form=document.querySelector("#form"); 
let result=document.querySelector("#result");

form.addEventListener("submit" ,function(e){
   e.preventDefault();
const height=document.querySelector("#height").valueAsNumber;
const weight=document.querySelector("#weight").valueAsNumber;
   let bmi=weight/(height*height/10000);
    result.textContent=bmi;
//   e.form.submit();

})
