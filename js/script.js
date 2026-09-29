let windows = document.getElementById("window");
let mirror = document.getElementById("mirrorWindows");

let btnsNumbers = document.querySelectorAll(".btn-number");
let btnsOperator = document.querySelectorAll(".btn-operator");

let btnX = document.getElementById("x-digit");
let resultOp = document.getElementById("result-operator");
let btnOperatorNumber = document.querySelectorAll(".btn-operatorNumber");
let btnPoint =  document.getElementById("btn-point");

let divHistory = document.getElementById("field-history");
let eliminateHistory = document.getElementById("grabarge-history");
//
let num1 = null;
let num2 = null;
let operator = null;
let waitingNum2 = false;
let result = null;
let resultHistory = null;
let lastNum2 = null;
let lastOperator = null;
const regex = /^[0-9+\-*/. ]+$/;

//cargar local storage

showHistory();

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

//
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

//calculo del resultado operacional 
resultOp.addEventListener("click", () => {

if(num1 !== null && operator !== null){

    if(num2 === null  || num2  === ""){
        num2 = num1;
    }

    lastOperator = operator;
    lastNum2 = num2;

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
    
    mirror.value = num1 + " " + operator + " " + num2 ;

    result = result.toString();
    windows.value =  formatNumber(result);

    resultHistory = num1 + " " + operator + " " + num2 + " = " + result;

    saveHistory(resultHistory);
    showHistory()

    num1 = result;
    num2 = null;

    waitingNum2 = false;
    operator = null;

}
    else if ( num1 !== null && lastOperator !== null && lastNum2 !== null ) 
        {
             let previousNum1 = num1;

             switch (lastOperator)
             { 
                
                case "+": 
                result = Number(num1) + Number(lastNum2); 
                    break; 
                case "-":
                     result = Number(num1) - Number(lastNum2);
                 break; 

                case "*": 
                    result = Number(num1) * Number(lastNum2); 
                break;
                 case "/":
                     result = Number(num1) / Number(lastNum2); 
                     break; 
            } 
            
        mirror.value = previousNum1 + " " + lastOperator + " " + lastNum2;

        result = result.toString(); 
        windows.value = formatNumber(result); 

        resultHistory = previousNum1 + " " + lastOperator + " " + lastNum2 + " = " + result; 

        saveHistory(resultHistory); 
        showHistory();

        num1 = result;
        num2 = null;
        waitingNum2 = false;  
        operator = null; 
    }

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

//history

function saveHistory(historyResult){
     let history = JSON.parse(
        localStorage.getItem("history")
    ) || [];

    history.push(historyResult);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );
}

function showHistory(){
    
    let history = JSON.parse(
        localStorage.getItem("history")
    ) || [];

    divHistory.innerHTML = "";

    history.forEach(result => {

            let element = document.createElement("p");
            element.textContent = result;
            divHistory.appendChild(element);
    });
}

eliminateHistory.addEventListener("click", () => {
    localStorage.removeItem("history");
    showHistory();
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


//barra de desplazamineto historial


