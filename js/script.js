const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const result = document.getElementById("result");
let agirliklar = [];
ctx.fillStyle = "black";
// tahterevallinin dönme açısı

ctx.fillRect(50, 100, 400, 40);
c.addEventListener("click", function () {
  const ramdomNumber = Math.floor(Math.random() * 11);
  result.innerText = ramdomNumber;
  agirliklar.push(ramdomNumber);
  ctx.clearRect(0, 0, c.width, c.height); // eski çizimi temizle
  // Dereceyi hesapla ve sınırla
  let derece = (ramdomNumber - 5) * 5;
  derece = Math.max(-30, Math.min(30, derece));
  ctx.save(); // mevcut transformu kaydet

  ctx.translate(250, 120); // dikdörtgenin ortasına taşı
  ctx.rotate((derece * Math.PI) / 180); // rastgele açı
  ctx.fillStyle = "black";
  ctx.fillRect(-200, -20, 400, 40); // ortadan çiz

  agirliklar.forEach((item, index) => {
    ctx.beginPath();
    ctx.fillStyle = "pink";
    //daireleri tahtaya eşit aralıklarda koymak
    const x = -180 + index * 40;
    const y = -10;
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    //ağğırlık numarasını daire içine yazmak
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "10px Arial";
    ctx.fillText(item, x, y);
  });
  ctx.restore();
});
