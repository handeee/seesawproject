// --- CodePen JS Paneli için Güncellenmiş Kod ---

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const sonEklenenDisplay = document.getElementById("sonEklenenResult");
const resetBtn = document.getElementById("resetBtn");
const aciDisplay = document.getElementById("aci");

let agirliklar = [];
const PIVOT_X = 250;
const PIVOT_Y = 150;
const BAR_YARI_GENISLIK = 200; // 400 / 2
const BAR_YARI_YUKSEKLIK = 20; // 40 / 2
const AGIRLIK_RADIUS = 15;

// YENİ: Son çizimdeki açıyı saklamak için bir değişken
let guncelDerece = 0;

// --- Ana Çizim Fonksiyonu ---
function ciz() {
  ctx.clearRect(0, 0, c.width, c.height);

  // 1. Moment hesabı
  let toplamMoment = 0;
  agirliklar.forEach((item) => {
    toplamMoment += item.deger * item.pozX;
  });

  let derece = toplamMoment / 50; // Denge faktörü
  derece = Math.max(-30, Math.min(30, derece));

  // YENİ: Hesaplanan açıyı global değişkene kaydet
  guncelDerece = derece;

  aciDisplay.innerText = derece.toFixed(1) + "°";

  // 2. Tahterevalli çizimi
  ctx.save();
  ctx.translate(PIVOT_X, PIVOT_Y);
  ctx.rotate((derece * Math.PI) / 180);

  // Tahta
  ctx.fillStyle = "brown";
  ctx.fillRect(
    -BAR_YARI_GENISLIK,
    -BAR_YARI_YUKSEKLIK,
    BAR_YARI_GENISLIK * 2,
    BAR_YARI_YUKSEKLIK * 2
  );

  // 3. Yuvarlakları (ağırlıkları) çiz
  agirliklar.forEach((item) => {
    const agirlikDikeyPoz = -BAR_YARI_YUKSEKLIK - AGIRLIK_RADIUS; // -20 - 15 = -35

    ctx.fillStyle = "pink";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(item.pozX, agirlikDikeyPoz, AGIRLIK_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Ağırlık yazısı
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";
    ctx.fillText(item.deger + "kg", item.pozX, agirlikDikeyPoz);
  });

  ctx.restore(); // Dönüşümü sıfırla

  // 4. Pivot üçgeni (sabit)
  ctx.fillStyle = "gray";
  ctx.beginPath();
  ctx.moveTo(PIVOT_X - 20, PIVOT_Y);
  ctx.lineTo(PIVOT_X + 20, PIVOT_Y);
  ctx.lineTo(PIVOT_X, PIVOT_Y + 30);
  ctx.closePath();
  ctx.fill();
}

// --- Olay Dinleyicileri ---

// DÜZELTME: Tıklama Olayı Tamamen Yenilendi
c.addEventListener("click", function (event) {
  const randomNumber = Math.floor(Math.random() * 10) + 1; // 1-10 arası
  const rect = c.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // 1. Tıklamayı pivot merkezli koordinatlara çevir
  const relativeX = mouseX - PIVOT_X;
  const relativeY = mouseY - PIVOT_Y;

  // 2. Tıklamayı, tahterevallinin son dönüş açısının TERSİ yönünde döndür
  // (guncelDerece'yi kullanarak)
  const angleRad = (-guncelDerece * Math.PI) / 180;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);

  const unrotatedX = relativeX * cos - relativeY * sin;
  const unrotatedY = relativeX * sin + relativeY * cos;

  // 3. Kontrolü "döndürülmemiş" (düz) koordinatlara göre yap
  // unrotatedX: -200 ile +200 arasında mı?
  // unrotatedY: -20 ile +20 arasında mı?

  if (
    Math.abs(unrotatedX) <= BAR_YARI_GENISLIK &&
    Math.abs(unrotatedY) <= BAR_YARI_YUKSEKLIK
  ) {
    // Tıklama Başarılı! Ağırlığı ekle

    agirliklar.push({
      deger: randomNumber,
      // Ağırlığın pozisyonu olarak "döndürülmemiş" x'i kaydet
      pozX: unrotatedX,
    });

    sonEklenenDisplay.innerText = randomNumber + "kg";
    ciz(); // Sahneyi yeniden çiz
  } else {
    // Tıklama barın dışındaydı, hiçbir şey yapma.
  }
});

// Reset butonu (Değişiklik yok)
resetBtn.addEventListener("click", function (event) {
  agirliklar = [];
  sonEklenenDisplay.innerText = "";
  ciz();
});

// Sayfa ilk yüklendiğinde çiz (Değişiklik yok)
ciz();
