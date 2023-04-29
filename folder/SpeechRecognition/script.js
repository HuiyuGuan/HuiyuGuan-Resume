const canvas = document.getElementById("speechCanvas");
const ctx = canvas.getContext("2d");

var color = "black";
var diameter = 50;

ctx.beginPath();
ctx.fillStyle = color;
ctx.arc(300, 300, diameter / 2, 0, 2 * Math.PI);
ctx.fill();

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;

const colors = ['black', 'while', 'silver', 'gray', 'red', 'purple', 'green', 'chocolate', 'lime', 'yellow', 'blue', 'aqua'];
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')};`

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

function changeCircle(color, diameter) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(300, 300, diameter / 2, 0, 2 * Math.PI);
    ctx.fill();
}
function speak() {
    var button = document.getElementById("speakButton");
    if (button.innerHTML === "Speak") {
        recognition.start();
        button.innerHTML = "Stop";
        var text = document.getElementById("text");

        recognition.onresult = (event) => {
            var response = event.results[0][0].transcript;
            text.innerHTML = "Result received: " + response;
            const arrayResponse = response.split(" ");
            console.log(arrayResponse);
            if ((arrayResponse[0] == "color") && (arrayResponse[2] == "size")) {
                if (colors.includes(arrayResponse[1]) && (parseInt(arrayResponse[3]) > 1 & parseInt(arrayResponse[3]) < 300)) {
                    changeCircle(arrayResponse[1], parseInt(arrayResponse[3]));
                } else if (parseInt(arrayResponse[3]) < 1) {
                    text.innerHTML = "Size too small, the minimize size is 1";
                } else {
                    text.innerHTML = "Size size limit 300";
                }
            } else if (arrayResponse[0] == "help") {
                text.innerHTML = "Say <Strong> color </Strong>, followed by a color, to set the circle color. Say <Strong> size </strong>, followed of a number from 1 to 300, to set the diameter of the circle.";
            } else {
                text.innerHTML = "I didn't recognise that command.";
            }
        }

        recognition.onnomatch = (event) => {
            diagnostic.textContent = "I didn't recognize that color.";
        }

        recognition.onerror = (event) => {
            diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
        }

    } else if (button.innerHTML === "Stop") {
        recognition.stop();
        button.innerHTML = "Speak";
    }
}