let windows = document.getElementById("window");
let mirror = document.getElementById("mirrorWindows");

let btnsNumbers = document.querySelectorAll(".btn-number");
let btnsOperator = document.querySelectorAll(".btn-operator");

let btnX = document.getElementById("x-digit");
let resultOp = document.getElementById("result-operator");
let btnOperatorNumber = document.querySelectorAll(".btn-operatorNumber");
let btnPoint =  document.getElementById("btn-point");


let history = document.getElementById("field-history");
let eliminateHistory = document.getElementById("grabarge-history");


//
let num1 = null;
let num2 = null;
let operator = null;
let waitingNum2 = false;
let result = null;
const regex = /^[0-9+\-*/. ]+$/;

 
//escritura de numeros
btnsNumbers.forEach(btn => {
    btn.addEventListener("click", () => {   
       if(regex.test(btn.value) && windows.value.length <= 14){
        if(!waitingNum2){
             num1 = (num1 ?? "")  + btn.value;
             windows.value = formatNumber(num1);
        }
        else{
            if(num2 === null){
                windows.value = "";
            }
            num2 = (num2 ?? "")  + btn.value;
            windows.value = formatNumber(num2);
        }
       
       }
    });
});

//operadores aritmeticos
btnsOperator.forEach(btn => {
    btn.addEventListener("click", ()  => {
         if(!regex.test(btn.value)) return;
         if(num1 === null) num1 = "0";

         operator = btn.value;
          if(num1 != null && operator != null ){
            mirror.value = num1 + " " +  operator;
         }
         waitingNum2 = true;
       
    });
});

//calculo del resultado operacional 
resultOp.addEventListener("click", () => {

    if(num2 === null  || num2  === ""){
        num2 = num1;
    }

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

    if(num1 != null && operator != null && operator != num2){
        mirror.value = num1 + " " + operator + " " + num2 ;
    }

    result = result.toString();

    windows.value = "";
    windows.value =  formatNumber(result);
    num1 = result;
    num2 = null;
    waitingNum2 = false;
    operator = null;
});

//eliminar digito
btnX.addEventListener("click", () => {
    if(!waitingNum2){
        if(num1 != null){
        num1 = num1.slice(0, -1);
        windows.value = num1  === ""  ? "" : Number(num1).toLocaleString("en-US");
        if(num1 === "") num1 = null;
    }
    }
    else{
        if(num2 != null){
            num2 = num2.slice(0, -1);
            windows.value = num2  === ""  ? "" : Number(num2).toLocaleString("en-US");
            if(num2 === "") num2 = null;
        }
    }
     mirror.value =  result  != null ?  "" : mirror.value; 
});


//operadores de limpieza
btnOperatorNumber.forEach(btn => {
    btn.addEventListener("click", () => {
        let operator = btn.value;
        switch (operator) {
            case "C":
                windows.value = "";
                num1 = null;
                num2 = null;
                mirror.value = "";
                result = null;
                break;
        
             case "CE":
                if(!waitingNum2){
                    num1 = null;
                    windows.value = "";
                    
                }else{
                   num2 = null;
                   windows.value = "";
                                }
                break;
        }
    });
});

btnPoint.addEventListener("click", () => {
    if(!waitingNum2){
        if(num1 === null || num1 === ""){
            num1 = "0.";
        } 
        else if(!num1.toString().includes(".")){
            num1 += ".";
        }
        windows.value = formatNumber(num1);
    }
    else{
        if(num2 === null || num2 === ""){
            num2 = "0.";
        } 
        else if(!num2.toString().includes(".")){
            num2 += ".";
        }
        windows.value = formatNumber(num2);
    }

});

//function formateo 
function formatNumber(numString) {
    if (numString === null || numString === "") return "";
    let parts = numString.toString().split(".");
    let integerPart = Number(parts[0]).toLocaleString("en-US");
    
    if (parts.length > 1) {
        return integerPart + "." + parts[1]; 
    } else {
        return integerPart; 
    }
}