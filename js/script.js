const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const result = document.getElementById("result");

ctx.fillStyle = "black";
// tahterevallinin dönme açısı
ctx.rotate((20 * Math.PI) / 180);
ctx.fillRect(50, 100, 400, 40);
c.addEventListener("click", function () {
  const ramdomNumber = Math.floor(Math.random() * 100);
  result.innerText = ramdomNumber;
});
