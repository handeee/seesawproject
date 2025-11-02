const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const result = document.getElementById("result");
let agirliklar = [];
ctx.fillStyle = "black";
// tahterevallinin dönme açısı

ctx.fillRect(50, 100, 400, 40);
c.addEventListener("click", function (event) {
  const ramdomNumber = Math.floor(Math.random() * 11);
  result.innerText = ramdomNumber;
  const rect = c.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  //agirlik ve pzoisyon kaydetme
  agirliklar.push({ deger: ramdomNumber + " " + "kg", x: mouseX, y: mouseY });

  ctx.clearRect(0, 0, c.width, c.height); // eski çizimi temizle
  // Dereceyi hesapla ve sınırla
  let derece = (ramdomNumber - 5) * 5;
  derece = Math.max(-30, Math.min(30, derece));

  ctx.save(); // mevcut transformu kaydet
  ctx.translate(250, 120); // dikdörtgenin ortasına taşı
  ctx.rotate((derece * Math.PI) / 180); // rastgele açı

  ctx.fillStyle = "black";
  ctx.fillRect(-200, -20, 400, 40); // ortadan çiz

  agirliklar.forEach((item) => {
    const x = item.x;
    const y = item.y;
    //daire çizimi
    ctx.fillStyle = "pink";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(item.x - 250, item.y - 120, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    //ağırlık numarasını daire içine yazmak
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "14px Arial";
    ctx.textBaseline = "middle";
    ctx.fillText(item.deger, item.x - 250, item.y - 120);
  });
  ctx.restore();
});
