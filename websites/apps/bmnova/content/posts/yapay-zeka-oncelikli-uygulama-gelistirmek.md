---
title: "2025'te Yapay Zekâ Öncelikli Uygulama Geliştirmek"
date: "2025-01-15"
summary: "Yapay zekâ destekli iki ürünü yayına aldıktan sonra öğrendiklerimiz ve farklı yapacaklarımız."
tags: ["Yapay Zekâ", "Flutter", "Ürün"]
lang: tr
translationOf: building-with-ai
---

## Değişim gerçek

Bir yıl önce "yapay zekâ öncelikli" (AI-native), uygulamaya bir sohbet botu serpiştirmek demekti. Bugün ise ürünün tüm yüzeyini baştan düşünmek demek: verinin nasıl aktığını, kullanıcıların nasıl etkileşime girdiğini ve arayüzün zekâya nasıl tepki verebileceğini.

İlk günden beri [intyx.ai](https://intyx.ai) ve `dynamic_intyx` Flutter paketiyle bu alanda geliştiriyoruz. Öğrendiklerimiz şunlar.

## Modelden değil, veriden başla

Yayına aldığımız her yapay zekâ özelliği şu soruya net bir cevapla başladı: *modelin işe yaraması için hangi veriye ihtiyacı var?*

intyx.ai için cevap yapılandırılmış tablo verisiydi: CSV ve JSON. Veri alımını temizlediğimizde yapay zekâ katmanı neredeyse kendi kendini yazdı.

## MCP protokolü mobilde her şeyi değiştiriyor

[Model Context Protocol](https://modelcontextprotocol.io), yapay zekâ ajanlarının çalışma anında uygulamandan araç çağırmasını ve bağlam okumasını sağlıyor. Flutter için bu gerçekten yeni bir şeyin önünü açıyor: hiçbirini elle kodlamana gerek kalmadan widget çizebilen, durumu güncelleyebilen ve kullanıcıya yol gösterebilen bir ajan.

`dynamic_intyx`'in temel fikri bu. Flutter widget ağacı, yapay zekânın kontrol edebildiği bir yüzeye dönüşüyor.

## Küçük yayınla, hızlı öğren

İki ürün de hafta sonu denemesi olarak başladı. Herkese açık yayınladığımız sürüm 8. ya da 9. iterasyondu. Mükemmeli bekleme; gerçek kullanıcılara ulaştır ve yol haritasını geri bildirim şekillendirsin.

---

*Soruların için: [hello@bmnova.com](mailto:hello@bmnova.com).*
