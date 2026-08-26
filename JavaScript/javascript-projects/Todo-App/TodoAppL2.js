let arr= [];

const btn = document.querySelector("#btn");
const ul = document.querySelector("#ul");

const savedTasks=localStorage.getItem("task")

if(savedTasks){
arr=JSON.parse(savedTasks)
}

function renderTasks(){
    ul.innerHTML="";
    arr.forEach(function(task){
    const li=    document.createElement("li");
     const span=   document.createElement("span");
        span.textContent=task.text;
        li.appendChild(span);

        const checkbox =document.createElement("input");
        // checkbox.setAttribute(...)
        checkbox.type="checkbox"
        checkbox.checked=task.completed;
        if(task.completed){
            span.classList.add("line-through")
        }
        li.appendChild(checkbox)
        // ul.appendChild(li);
     
        checkbox.addEventListener("click",function(){
          
        task.completed=checkbox.checked;
        span.classList.toggle("line-through",task.completed)
       localStorage.setItem("task",JSON.stringify(arr));
        })
     
//Delete Button
const delbtn=document.createElement("button");
 delbtn.textContent = "Delete";
  delbtn.classList.add(
            "bg-red-500",
            "text-white",
            "font-bold",
            "rounded-xl",
            "px-2"
        );
li.appendChild(delbtn);
delbtn.addEventListener("click",function(){
 arr=arr.filter(function(item){
        return item.id!==task.id;
    });
localStorage.setItem("task",JSON.stringify(arr));
  renderTasks();

})
//Edit
const edit=document.createElement("button")
edit.textContent="Edit";
 edit.classList.add(
            "bg-blue-500",
            "text-white",
            "font-bold",
            "rounded-xl",
            "px-2"
        );
li.append(edit)
edit.addEventListener("click",function(){
    span.contentEditable=true;
    span.focus();
})

span.addEventListener("keydown",function(event){
    if(event.shiftKey&&event.key=="Enter"){
        return;
    }
    else if(event.key=="Enter"){
        event.preventDefault();
        span.contentEditable=false;
        task.text=span.textContent;
        localStorage.setItem("task",JSON.stringify(arr));
    }
})

     ul.appendChild(li);
    });
}


// INITIAL RENDER
renderTasks();

//Add Task
btn.addEventListener("click",function(){
const input=document.querySelector("#input")
const text = input.value;


    if (text.trim() === "") {
        alert("Please input");
        return;

    }

    //TASK OBJECT
    const task={
        id:Date.now(),
        text:text.trim(),
        completed:false
    };
    arr.push(task)
      console.log(arr);

      localStorage.setItem("task",JSON.stringify(arr));
         renderTasks();

             input.value = "";

})
