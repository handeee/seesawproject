const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const result = document.getElementById("result");

ctx.fillStyle = "black";
// tahterevallinin dönme açısı

ctx.fillRect(50, 100, 400, 40);
c.addEventListener("click", function () {
  const ramdomNumber = Math.floor(Math.random() * 100);
  result.innerText = ramdomNumber;

  ctx.clearRect(0, 0, c.width, c.height); // eski çizimi temizle
  // Dereceyi hesapla ve sınırla
  let derece = (ramdomNumber - 50) * 0.5;
  derece = Math.max(-30, Math.min(30, derece));
  ctx.save(); // mevcut transformu kaydet

  ctx.translate(350, 120); // dikdörtgenin ortasına taşı
  ctx.rotate(((ramdomNumber - 50) * Math.PI) / 180); // rastgele açı
  ctx.fillStyle = "black";
  ctx.fillRect(-200, -20, 400, 40); // ortadan çiz

  ctx.restore(); // transformu eski haline getir
});
