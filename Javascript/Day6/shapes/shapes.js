const form = document.getElementById("shapeForm");
const dimensionInput = document.getElementById("size");
const canvas = document.getElementById("shapeCanvas");
const ctx = canvas.getContext("2d");

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

form.addEventListener("change", function (event) {
    const selectedShape = document.querySelector(
        'input[name="shape"]:checked'
    ).value;
    dimensionInput.placeholder =
        selectedShape === "CIRCLE" ? "Enter Radius" : "Enter side length";
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedShape = document.querySelector(
        'input[name="shape"]:checked'
    ).value;
    console.log(selectedShape);
    const size = parseInt(dimensionInput.value);
    console.log(size);
    drawShape(size, selectedShape);
});

function drawShape(size, selectedShape) {
    if (size <= 0) {
        alert("Please enter a valid number");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getRandomColor();
    ctx.beginPath();

    switch (selectedShape) {
        case "CIRCLE":
            ctx.arc(canvas.width / 2, canvas.height / 2, size, 0, Math.PI * 2);
            ctx.fill();
            break;
        case "SQUARE":
            ctx.fillRect(250 - size / 2, 250 - size / 2, size, size);
            break;
        case "TRIANGLE":
            ctx.moveTo(250, 250 - size / 2);
            ctx.lineTo(250 - size / 2, 250 + size / 2);
            ctx.lineTo(250 + size / 2, 250 + size / 2);
            ctx.closePath();
            ctx.fill();
            break;
        case "STAR":
            ctx.moveTo(250, 250 - size / 2);
            ctx.lineTo(250 - size / 2, 250 + size / 2);
            ctx.lineTo(250 + size / 2, 250 + size / 2);
            ctx.moveTo(250, 250 + size / 2 + size / 3);
            ctx.lineTo(250 + size / 2, 250 - size / 2 + size / 3);
            ctx.lineTo(250 - size / 2, 250 - size / 2 + size / 3);
            ctx.closePath();
            ctx.fill();
            break;
    }
    localStorage.setItem("size", size);
    localStorage.setItem("shape", selectedShape);
}
// function drawCircle(radius) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.beginPath();
//     ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
//     ctx.stroke();
//     localStorage.setItem("circleRadius", radius);
// }

function loadLastShape() {
    const savedSize = localStorage.getItem("size");
    const savedShape = localStorage.getItem("shape");
    console.log(savedSize, savedShape);
    if (savedSize && savedShape) {
        drawShape(parseInt(savedSize, 10), savedShape);
    }
}

window.onload = loadLastShape;
