"use strict";

function login(){
   var name = document.getElementById("name").value;
   document.getElementById("memberForm").innerHTML = "Welcome," + name + "!";
}




window.addEventListener("load", 
   function(){
      var orderForm = document.forms.orderForm;

      orderForm.elements.orderDate.value = new Date().toDateString();

      orderForm.elements.model.focus();

      calcOrder();

      orderForm.elements.model.onchange = calcOrder;
      orderForm.elements.qty.onchange = calcOrder;
      var shipOptions = document.querySelectorAll('input[name="shipping"]');
      for(var i= 0; i<shipOptions.length; i++){
      shipOptions[i].onclick = calcOrder;
   }

   });


function calcOrder(){

   var orderForm = document.forms.orderForm;

   var mIndex = orderForm.elements.model.selectedIndex;
   var mCost = orderForm.elements.model.options[mIndex].value;

   var qIndex = orderForm.elements.qty.selectedIndex;
   var qty = orderForm.elements.qty.options[qIndex].value;

   var initialCost = mCost * qty;
   orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

   var sCost = document.querySelector('input[name="shipping"]:checked').value * qty;
   orderForm.elements.shippingCost.value = formatNumber(sCost, 2);

   orderForm.elements.subtotal.value = formatNumber((initialCost + sCost*1),2);

   var salesTax = (0.08*(initialCost + sCost*1));
   orderForm.elements.salesTax.value = formatNumber(salesTax,2);

   var cartTotal = ((initialCost + sCost*1) + (0.08*(initialCost + sCost*1)));
   orderForm.elements.totalCost.value = formatUSCurrency(cartTotal,2);


   orderForm.elements.modelName.value = 
   orderForm.elements.model.options[mIndex].text;
   orderForm.elements.ShippingType.value = 
   document.querySelector('input[name="shipping"]:checked').nextSibling.nodeValue;
}

function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}







