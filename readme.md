## Kullanılan Teknolojiler ve Yöntemler

### HTML & CSS

- **Link etiketi** ile harici CSS dosyası projeye dahil edilmiştir
- **@media queries** kullanılarak farklı ekran boyutlarına göre responsive tasarım uygulanmıştır
- Canvas elementi ile görsel simülasyon gerçekleştirilmiştir

### Canvas API ve Çizim

- **fillRect()** metodu ile tahterevalli tahtası (plank) çizilmiştir
- **translate()** fonksiyonu ile pivot noktası merkez alınarak koordinat sistemi kaydırılmıştır
- **rotate()** fonksiyonu ile tahterevallinin dönme animasyonu sağlanmıştır
- **arc()** metodu ile ağırlık objeleri dairesel şekilde çizilmiştir
- **save()** ve **restore()** ile canvas durumu yönetilmiştir

### Fizik ve Matematik Hesaplamaları

- **Math.random()** ile 1-10 kg arası rastgele ağırlık değerleri üretilmiştir
- **Math.abs()** ile negatif pozisyon değerlerinin mutlak değeri alınarak sol taraf torque hesaplaması yapılmıştır
- **Torque (moment) hesaplaması**: Her ağırlık için `torque = ağırlık × pivot'tan uzaklık` formülü uygulanmıştır
- Sağ ve sol torque değerleri ayrı ayrı hesaplanarak farkları alınmıştır
- **Math.max()** ve **Math.min()** fonksiyonları ile açı değeri -30° ile +30° arasında sınırlandırılmıştır
- **Açı hesaplama formülü**: `angle = (rightTorque - leftTorque) / 50`

### Kullanıcı Etkileşimi

- **addEventListener("click")** ile canvas üzerine tıklama eventi dinlenmiştir
- **getBoundingClientRect()** metodu ile mouse koordinatları hesaplanmıştır
- Tıklanan nokta, pivot'a göre relative pozisyona dönüştürülmüştür
- **Ters rotasyon hesaplaması**: Tahterevallinin o anki açısı tersine çevrilerek (`-guncelDerece`), tıklanan noktanın tahta üzerindeki gerçek konumu bulunmuştur
- Trigonometrik dönüşüm (`cos`, `sin`) ile döndürülmüş koordinatlar düz koordinatlara çevrilmiştir
- **Math.abs()** ile mutlak değer kontrolü yapılarak tıklamanın tahta sınırları içinde olup olmadığı kontrol edilmiştir

### Veri Yönetimi

- **push()** metodu ile yeni ağırlıklar `agirliklar` dizisine eklenmiştir
- **forEach()** döngüsü ile tüm ağırlıklar üzerinde iterasyon yapılmıştır
- **localStorage.setItem()** ile ağırlık verileri tarayıcıda kalıcı olarak saklanmıştır
- **localStorage.getItem()** ile sayfa yenilendiğinde önceki durum geri yüklenmiştir
- **JSON.stringify()** ve **JSON.parse()** ile veri serileştirme işlemleri yapılmıştır

### Animasyon ve Fizik Simülasyonu

- **requestAnimationFrame()** ile 60 FPS animasyon döngüsü oluşturulmuştur
- Fizik tabanlı hareket için momentum ve sürtünme simülasyonu eklenmiştir
- **Hızlanma (acceleration)**: `hiz += (hedefDerece - guncelDerece) × HIZLANMA`
- **Sürtünme (friction)**: `hiz *= SURUKLENME` (0.98 değeri ile yavaşlama)
- Smooth (yumuşak) geçiş için anlık açı değişimi yerine kademeli yaklaşma kullanılmıştır

### Ek Özellikler

- **Pause/Resume butonu**: Simülasyonu durdurma ve devam ettirme özelliği
- **Reset butonu**: Tüm ağırlıkları temizleme ve başlangıç durumuna dönme
- **Gerçek zamanlı göstergeler**: Açı değeri, son eklenen ağırlık, sağ/sol toplam ağırlıklar
- **Try-catch bloğu** ile localStorage hatalarının yakalanması
