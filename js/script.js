const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const sonEklenenDisplay = document.getElementById("sonEklenenResult");
const resetBtn = document.getElementById("resetBtn");
const aciDisplay = document.getElementById("aci");

//  Yeni eklenen display alanları
const sagToplamDisplay = document.getElementById("sagToplam");
const solToplamDisplay = document.getElementById("solToplam");

let agirliklar = [];
const PIVOT_X = 250;
const PIVOT_Y = 150;
const BAR_YARI_GENISLIK = 200;
const BAR_YARI_YUKSEKLIK = 20;
const AGIRLIK_RADIUS = 15;

let guncelDerece = 0;

function ciz() {
  ctx.clearRect(0, 0, c.width, c.height);

  // --- 1. Moment ve taraf toplamları ---
  let toplamMoment = 0;
  let sagToplam = 0;
  let solToplam = 0;

  agirliklar.forEach((item) => {
    toplamMoment += item.deger * item.pozX;

    if (item.pozX > 0) sagToplam += item.deger;
    else solToplam += item.deger;
  });

  // --- 2. Denge açısı ---
  let derece = toplamMoment / 50;
  derece = Math.max(-30, Math.min(30, derece));
  guncelDerece = derece;

  aciDisplay.innerText = derece.toFixed(1) + "°";
  sagToplamDisplay.innerText = sagToplam.toFixed(1) + " kg";
  solToplamDisplay.innerText = solToplam.toFixed(1) + " kg";

  // --- 3. Tahta çizimi ---
  ctx.save();
  ctx.translate(PIVOT_X, PIVOT_Y);
  ctx.rotate((derece * Math.PI) / 180);

  ctx.fillStyle = "brown";
  ctx.fillRect(
    -BAR_YARI_GENISLIK,
    -BAR_YARI_YUKSEKLIK,
    BAR_YARI_GENISLIK * 2,
    BAR_YARI_YUKSEKLIK * 2
  );

  // --- 4. Ağırlıkları çiz ---
  agirliklar.forEach((item) => {
    const agirlikDikeyPoz = -BAR_YARI_YUKSEKLIK - AGIRLIK_RADIUS;
    ctx.fillStyle = "pink";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(item.pozX, agirlikDikeyPoz, AGIRLIK_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";
    ctx.fillText(item.deger + "kg", item.pozX, agirlikDikeyPoz);
  });

  ctx.restore();

  // --- 5. Pivot üçgeni ---
  ctx.fillStyle = "gray";
  ctx.beginPath();
  ctx.moveTo(PIVOT_X - 20, PIVOT_Y);
  ctx.lineTo(PIVOT_X + 20, PIVOT_Y);
  ctx.lineTo(PIVOT_X, PIVOT_Y + 30);
  ctx.closePath();
  ctx.fill();
}

// --- Olay Dinleyicileri ---
c.addEventListener("click", function (event) {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const rect = c.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const relativeX = mouseX - PIVOT_X;
  const relativeY = mouseY - PIVOT_Y;

  const angleRad = (-guncelDerece * Math.PI) / 180;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);

  const unrotatedX = relativeX * cos - relativeY * sin;
  const unrotatedY = relativeX * sin + relativeY * cos;

  if (
    Math.abs(unrotatedX) <= BAR_YARI_GENISLIK &&
    Math.abs(unrotatedY) <= BAR_YARI_YUKSEKLIK
  ) {
    agirliklar.push({ deger: randomNumber, pozX: unrotatedX });
    sonEklenenDisplay.innerText = randomNumber + "kg";
    ciz();
  }
});

resetBtn.addEventListener("click", function () {
  agirliklar = [];
  sonEklenenDisplay.innerText = "";
  sagToplamDisplay.innerText = "0 kg";
  solToplamDisplay.innerText = "0 kg";
  ciz();
});

ciz();
