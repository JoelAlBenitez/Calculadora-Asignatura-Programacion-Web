let windows = document.getElementById("window");
let btnsNumbers = document.querySelectorAll(".btn-number");
let btnsOperator = document.querySelectorAll(".btn-operator");

let btnX = document.getElementById("x-digit");
let resultOp = document.getElementById("result-operator");
const regex = /^[0-9+\-*/. ]+$/;

let num1 = null;
let num2 = null;
let operator = null;
let waitingNum2 = false;

btnsNumbers.forEach(btn => {
    btn.addEventListener("click", () => {   
       if(regex.test(btn.value) && windows.value.length <= 14){
        if(!waitingNum2){
            let input = windows.value.replace(/,/g, "");
            windows.value = Number(input).toLocaleString("en-US");
            windows.value += btn.value;
            num1 = (num1 ?? "")  + btn.value;
            
        }else{
            windows.value ="";
            let input = windows.value.replace(/,/g, "");
            windows.value = Number(input).toLocaleString("en-US");
            windows.value += btn.value;
            num2 = (num2 ?? "")  + btn.value;

        }
        
       }
    });
});

btnsOperator.forEach(btn => {
    btn.addEventListener("click", ()  => {
         if(!regex.test(btn.value)) return;
         operator = btn.value;
         waitingNum2 = true;
    });
});

resultOp.addEventListener("click", () => {

    if(num2 === null  || num2  === ""){
        num2 = num1;
    }

    let result;
    switch (operator) {
        case "+":
            result = Number(num1) + Number(num2);
            break;
        case "-":
              result = Number(num1) - Number(num2);
            break;
        case "*":
              result = Number(num1) * Number(num2);
            break;
        case "/":
              result = Number(num1) / Number(num2);
            break;
    }
    window.value = result;
    num1 = result;
    num2 = null;
    waitingNum2 = false;
    operator = null;
});