const form= document.querySelector("#transaction-form");


const description=document.querySelector("#description");
const Amount=document.querySelector("#amount");
const type=document.querySelector("#type");
const date=document.querySelector("#date");
const category=document.querySelector("#category");

const emptyMessage=document.querySelector("#empty-message");
const transactions =document.querySelector("#transactions");

const transactionArr=[]

// dashboard variables
const balance=document.querySelector("#balance");
const income=document.querySelector("#income");
const expense=document.querySelector("#expense");


//Search and Filter Variable
 const search =document.querySelector("#search");
 const filter=document.querySelector("#filter");

form.addEventListener("submit",function(event){
    event.preventDefault();
    console.log("Form Submitted");

const descriptionValue=description.value;

const amountValue=Amount.value;

const typeValue=type.value;

const dateValue=date.value;

const categoryValue=category.value;

const transaction={
id: Date.now(),
description:descriptionValue,
amount:amountValue,
type:typeValue,
date:dateValue,
category:categoryValue
}
transactionArr.push(transaction);

    // function calls
    // previous approach
// displayTransaction(transaction);
renderTransactions(transactionArr);
updateSummary();

if (transactionArr.length>0){
 emptyMessage.classList.add("hidden")
}



Amount.value="";
type.value="";
date.value="";
category.value="";
description.value = "";

})

//  display function
// displayTransaction() → knows how to display one transaction
 function displayTransaction(transaction){

const li =document.createElement("li");

const descriptionSpan =document.createElement("span");
descriptionSpan.textContent="Description :  " + transaction.description  ;
li.appendChild(descriptionSpan);

const amountSpan =document.createElement("span");
amountSpan.textContent="Amount :  "+ transaction.amount ;
li.appendChild(amountSpan);

const typeSpan =document.createElement("span");
typeSpan.textContent="Transaction Type :  "+ transaction.type  ;
li.appendChild(typeSpan);

const dateSpan =document.createElement("span");
dateSpan.textContent= "Date :  "+ transaction.date  ;
li.appendChild(dateSpan);

const categorySpan =document.createElement("span");
categorySpan.textContent="Category :  "+ transaction.category   ;
li.appendChild(categorySpan);

// Delete Button
const deleteButton=document.createElement("button");
deleteButton.textContent="delete";
li.appendChild(deleteButton)
deleteButton.classList.add("border","rounded" )
deleteButton.addEventListener("click",function(){

    // its on solution but its not good
// transactionArr.splice(index,1)   
const index=transactionArr.findIndex((item)=> item.id===transaction.id);
 transactionArr.splice(index,1);
li.remove();
updateSummary();
 if(transactionArr.length===0){
    emptyMessage.classList.remove("hidden");
}

})

li.classList.add("flex","w-80", "gap-6","font-bold" ,"text-white","mb-2", "bg-blue-600","flex-col","ml-15","text-left","p-5", "rounded-xl","hover:bg-blue-700","border-black" )

transactions.appendChild(li);


} 

// Summary Function

function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;
    let Balance=0;
transactionArr.forEach((transaction)=>{
    if(transaction.type==="income"){
    totalIncome+=parseInt(transaction.amount);
    
    }
   
    else{
        totalExpense+=parseInt(transaction.amount);
    }
})
     income.textContent=totalIncome;
      expense.textContent=totalExpense;
       Balance = totalIncome - totalExpense;
      balance.textContent=Balance;
    
}

//Search
search.addEventListener("input",function(){
const searchValue=search.value;


const searchResult=transactionArr.filter((item)=>
item.description.toLowerCase().includes(searchValue.toLowerCase()) ||item.type.toLowerCase().includes(searchValue.toLowerCase()))

renderTransactions(searchResult)
})


// renderTransactions() → updates the UI.
 function renderTransactions(arr) {
transactions.innerHTML="";

    arr.forEach((transaction) => {
     displayTransaction(transaction)  
    });
}

filter.addEventListener("change",function(item){
const filterValue=filter.value;
 if(filterValue==="all"){
    renderTransactions(transactionArr)
    return 
 }
const filterResult= transactionArr.filter((item)=>
filterValue===item.type)

renderTransactions(filterResult)
})