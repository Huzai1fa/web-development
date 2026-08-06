let arr = [
"Never give up.",
  "Success takes time.",
  "Stay consistent.",
  "Practice every day."
]

const btn =document.querySelector("#btn");
const para= document.querySelector("#result");
// const randomIndex = Math.floor(Math.random() * arr.length);

 btn.addEventListener("click",function(event){


  const randomIndex = Math.floor(Math.random() * arr.length);
  // para.textContent=arr[randomIndex];
    para.innerHTML = `
    <p class="text-2xl font-bold italic text-gray-800">
      <span class="text-4xl text-yellow-500">❝</span>
      ${arr[randomIndex]}
      <span class="text-4xl text-yellow-500">❞</span>
    </p>
  `;
 })
