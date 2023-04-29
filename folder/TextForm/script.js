function changeStyle(obj) {
  let name = document.getElementById("name").value;
  document.getElementById("text").innerHTML = name;
  //background color
  let backgroundcolor = document.getElementById("backgroundcolor").value;
  document.getElementById("text").style.backgroundColor = backgroundcolor;
  //text color
  let textColor = document.getElementById("textColor").value;
  document.getElementById("text").style.color = textColor;
  //font size
  let size = document.getElementById("fontSize").value;
  document.getElementById("text").style.fontSize = size + "px";
  //font family
  document.getElementById("text").style.fontFamily = obj.value;
}

function resetStyle() {
  document.getElementById("text").style.color = "black";
  document.getElementById("text").style.fontSize = "12px";
  document.getElementById("text").style.fontFamily = "";
  document.getElementById("text").style.backgroundColor = "white";
}