"use strict";



window.addEventListener("load", 
   function(){

      var formData = location.search.slice(1);

      //A regex filter
      formData = formData.replace(/\+/g," ");
      formData = decodeURIComponent(formData);
      var formFields = formData.split(/[&=]/g);

      //write the field values to the order form
      document.forms.order.elements.orderDate.value = formFields[1];
      document.forms.order.elements.modelName.value = formFields[5];
      document.forms.order.elements.qty.value = formFields[7];
      document.forms.order.elements.initialCost.value = formFields[9];
      document.forms.order.elements.protectionName.value = formFields[13];
      document.forms.order.elements.protectionCost.value = formFields[15];
      document.forms.order.elements.subtotal.value = formFields[17];
      document.forms.order.elements.salesTax.value = formFields[19];
      document.forms.order.elements.totalCost.value = formFields[21];

      document.getElementById("subButton").onclick = runSubmit;
      document.getElementById("subButton").oninput = validateeName;
   });


function validateeName(){

   var cardName = document.getElementById("cardName");

   if(cardName.validity.valueMissing){
      cardName.setCustomValidity("Enter your name as it appears on the card");
   }else{
      cardName.setCustomValidity("");
   }
}

function validateCredit(){

   var creditCard = document.forms.payment.elements.credit[0];

   if(creditCard.validity.valueMissing){
      creditCard.setCustomValidity("Select your credit card");
   }else{
      creditCard.setCustomValidity("");
   }
}

function validateNumber(){

   var cardNumber = document.getElementById("cardNumber");
   if(cardNumber.validity.valueMissing){
      cardNumber.setCustomValidity("Enter your card number.");
   }else if(cardNumber.validity.patternMismatch){
      cardNumber.setCustomValidity("Enter a valid card number.");
   }else if(luhn(cardNumber.value)===false){
      cardNumber.setCustomValidity("Enter a legitimate card number.");
   }


   else{
      cardNumber.setCustomValidity("");
   }
}

function validateMonth(){
   var cardMonth = document.getElementById("expMonth");
   if(cardMonth.selectedIndex==0){
      cardMonth.setCustomValidity("Select the expiration month");
   }else{
      cardMonth.setCustomValidity("");
   }
}

function validateYear(){
   var cardYear = document.getElementById("expYear");
   if(cardYear.selectedIndex==0){
      cardYear.setCustomValidity("Select the expiration year");
   }else{
      cardYear.setCustomValidity("");
   }
}

function validateCVC(){

   var cardCVC = document.getElementById("cvc");
   var creditCard = document.querySelector('input[name="credit"]:checked').value;

   if(cardCVC.validity.valueMissing){
      cardCVC.setCustomValidity("Enter your CVC number");
   }else if((creditCard==="amex") && ((/^\d{4}$/).test(cardCVC.value)===false)){
      cardCVC.setCustomValidity("Enter a 4-digit CVC number.");
   }else if((creditCard!=="amex") && ((/^\d{3}$/).test(cardCVC.value)===false)){
      cardCVC.setCustomValidity("Enter a 3-digit CVC number.");
   }else{
      cardCVC.setCustomValidity("");
   }
}

function sumDigits(numStr){

   var digitsTotal=0;
   for(var i = 0; i<numStr.length; i++){
      digitsTotal += numStr[i]*1;
   }

   return digitsTotal;
}




//str ="Hello"
//a
function luhn(idNumber){

   var string1 ="";
   var string2 ="";

   for(var i = idNumber.length-1; i>=0; i-=2){
      string1 += idNumber.charAt(i);
   }

   for(var i = idNumber.length-2; i>=0; i-=2){
      string2 += 2*idNumber.charAt(i);
   }

   return sumDigits(string1+string2)%10===0;
}
function runSubmit(){

   validateeName();
   validateCredit();
   validateNumber();
   validateMonth();
   validateYear();
   validateCVC();
}



















