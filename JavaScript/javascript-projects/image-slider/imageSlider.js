const images=[
   "aaron-burden-DBZlIiO1P88-unsplash.jpg",
   "aside.jpg",
   "billy-huynh-W8KTS-mhFUE-unsplash.jpg",
   
]
let currentIndex=0;
const img=document.querySelector("#img");
// document.addEventListener("DOMContentLoaded",function(){
//    img.src=images[currentIndex];
// })
 img.src=images[currentIndex];
const btn2=document.querySelector("#btn2");
btn2.addEventListener("click",function(){
  currentIndex++;

   if(currentIndex > images.length-1){
   currentIndex=0;
}

img.src=images[currentIndex];
 

})
const btn1=document.querySelector("#btn1");
btn1.addEventListener("click",function(){
 currentIndex--;
 if(currentIndex<0){
 
   currentIndex=images.length-1;
}
img.src=images[currentIndex];
  
 
})