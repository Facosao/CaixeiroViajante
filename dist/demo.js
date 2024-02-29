/* eslint-disable no-unused-vars */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function test() {
    const area = document.getElementById("index-canvas");
    const ctx = area.getContext("2d", {
        willReadFrequently: true
    });

    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 799, 599);
    ctx.fillStyle = "black";

    // Set line width
    ctx.lineWidth = 10;

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();

    const gradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);

    // Add three color stops
    gradient.addColorStop(0, "pink");
    gradient.addColorStop(0.9, "white");
    gradient.addColorStop(1, "green");

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(20, 20, 160, 160);

    ctx.moveTo(500, 100);
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    ctx.stroke();
    ctx.lineTo(700, 700);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(20, 20);
    ctx.lineTo(200, 20);
    ctx.stroke();

    // Second path
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(20, 20);
    ctx.lineTo(120, 120);
    ctx.stroke();
}