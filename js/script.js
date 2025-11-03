const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const sonEklenenDisplay = document.getElementById("sonEklenenResult");
const resetBtn = document.getElementById("resetBtn");
const aciDisplay = document.getElementById("aci");
const agirlikDisplay = document.getElementById("agirlik");
const sagToplamDisplay = document.getElementById("sagToplam");
const solToplamDisplay = document.getElementById("solToplam");
const pauseBtn = document.getElementById("pauseBtn");
let hiz = 0;
const SURUKLENME = 0.98;
const HIZLANMA = 0.008;
let durduruldumu = false;

let agirliklar = [];

pauseBtn.addEventListener("click", function () {
  durduruldumu = !durduruldumu; //tıklama olunca tersi olsun
  pauseBtn.innerText = durduruldumu ? "Devam Et" : "Durdur";
});

// localStorage'dan verileri yükle
const kaydedilenVeri = localStorage.getItem("agirliklar");
if (kaydedilenVeri) {
  try {
    agirliklar = JSON.parse(kaydedilenVeri);
  } catch (e) {
    console.error("Veri yüklenemedi:", e);
    agirliklar = [];
  }
}
const sonEklenen = localStorage.getItem("sonEklenen");
if (sonEklenen) {
  sonEklenenDisplay.innerText = sonEklenen;
}

const PIVOT_X = 250;
const PIVOT_Y = 150;
const BAR_YARI_GENISLIK = 200;
const BAR_YARI_YUKSEKLIK = 20;
const AGIRLIK_RADIUS = 15;

let guncelDerece = 0;

function ciz() {
  ctx.clearRect(0, 0, c.width, c.height);

  // --- 1. ÖNCE moment ve taraf toplamlarını hesapla ---
  let sagToplam = 0; // ← EKLE
  let solToplam = 0; // ← EKLE
  let sagTorque = 0;
  let solTorque = 0;

  agirliklar.forEach((item) => {
    if (item.pozX > 0) {
      sagToplam += item.deger; // ← EKLE
      sagTorque += item.deger * item.pozX;
    } else {
      solToplam += item.deger; // ← EKLE
      solTorque += item.deger * Math.abs(item.pozX);
    }
  });

  // --- 2. Hedef açıyı hesapla ---
  let hedefDerece = (sagTorque - solTorque) / 50;
  hedefDerece = Math.max(-30, Math.min(30, hedefDerece));

  // --- 3. Fizik benzeri hareket (animasyon) ---
  if (durduruldumu) {
    hedefDerece = guncelDerece; // Mevcut pozisyonda kal
    hiz = 0; // Hareketi tamamen durdur
  } else {
    // --- 3. Fizik benzeri hareket (animasyon) ---
    const fark = hedefDerece - guncelDerece;
    hiz += fark * HIZLANMA;
    hiz *= SURUKLENME;
    guncelDerece += hiz;
  }

  // --- 4. Display güncelle ---
  aciDisplay.innerText = guncelDerece.toFixed(1) + "°";
  sagToplamDisplay.innerText = sagToplam.toFixed(1) + " kg";
  solToplamDisplay.innerText = solToplam.toFixed(1) + " kg";

  // --- 5. Tahta çizimi ---
  ctx.save();
  ctx.translate(PIVOT_X, PIVOT_Y);
  ctx.rotate((guncelDerece * Math.PI) / 180);

  ctx.fillStyle = "brown";
  ctx.fillRect(
    -BAR_YARI_GENISLIK,
    -BAR_YARI_YUKSEKLIK,
    BAR_YARI_GENISLIK * 2,
    BAR_YARI_YUKSEKLIK * 2
  );

  // --- 6. Ağırlıkları çiz ---
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

  // --- 7. Pivot üçgeni ---
  ctx.fillStyle = "gray";
  ctx.beginPath();
  ctx.moveTo(PIVOT_X - 20, PIVOT_Y);
  ctx.lineTo(PIVOT_X + 20, PIVOT_Y);
  ctx.lineTo(PIVOT_X, PIVOT_Y + 30);
  ctx.closePath();
  ctx.fill();
}

// --- Animasyon döngüsü ---
function animasyonDongusu() {
  ciz();
  requestAnimationFrame(animasyonDongusu);
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
    localStorage.setItem("agirliklar", JSON.stringify(agirliklar));
    localStorage.setItem("sonEklenen", randomNumber + "kg");
  }
});

resetBtn.addEventListener("click", function () {
  agirliklar = [];
  sonEklenenDisplay.innerText = "";
  sagToplamDisplay.innerText = "0 kg";
  solToplamDisplay.innerText = "0 kg";
  localStorage.removeItem("agirliklar");
  localStorage.removeItem("sonEklenen");
  guncelDerece = 0;
  hiz = 0;
  durduruldumu = false; // ← Ekle
  pauseBtn.innerText = "Durdur"; // ← Ekle
});

// Animasyonu başlat
animasyonDongusu();
