"use strict";

var thisDay = new Date();

document.getElementById("calendar").innerHTML = createCalendar(thisDay);

function createCalendar(date){
   var calendarHTML = "<table id='calendar_table'> ";
   calendarHTML+= calCaption(date);
   calendarHTML+= calWeekdayRow();
   calendarHTML+= calDays(date);
   calendarHTML+= "</table>";
   return calendarHTML;

}

function calCaption(date){
   var monthName=["January", "February", "March","April", "may","June","July",
                  "August", "September", "October", "November", "December"];

   var thisMonth = date.getMonth();

   var thisYear = date.getFullYear();

   return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
}

function calWeekdayRow(){

   var dayName = ["Sunday", "Monday", "Tuesday", "wednesday", "thursday", "Friday", "Saturday"];
   var rowHTML ="<tr>";

   for (var i=0; i<dayName.length; i++){
         rowHTML+="<th class='calendar_weekdays'>" + dayName[i] +"</th>";
   }
   rowHTML += "</tr>";

   return rowHTML;
}

function daysInMonth(calDays){
   var dayCount=[31,28,31,30,31,30,31,31,30,31,30,31];
   var thisYear = calDays.getFullYear();
   var thisMonth = calDays.getMonth();

   if(thisYear%4===0){
      if(thisYear%100!=0 || thisYear%400===0){
      dayCount[1] = 29;

   }
}
   return dayCount[thisMonth];
}


function calDays(date){

   var day = new Date(date.getFullYear(), date.getMonth(), 1);
   var weekDay = day.getDay();
   var htmlCode = "<tr>";
   for(var i=0; i<weekDay; i++){
      htmlCode +="<td></td>";
   }

   var totalDays = daysInMonth(date);

   var highlightDay = date.getDate();

   for(var i=1; i<totalDays; i++){
      day.setDate(i);
      weekDay=day.getDay();
      if(weekDay===0){
         htmlCode+="<tr>";
      }
      if(i===highlightDay){
         htmlCode +="<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i]+"</td>";

      }
      else{
            htmlCode +="<td class='calendar_dates'>" + i + dayEvent[i]+"</td>";
      }

   if(weekDay==6){
      htmlCode += "</tr>";
   }
}
   return htmlCode;

}
