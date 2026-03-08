export type RefundSection = {
  number: number;
  title: string;
  paragraphs: string[];
};

export type RefundPolicyContent = {
  lastUpdated: string;
  title: string;
  intro: string[];
  sections: RefundSection[];
};

export const refundPolicyContent: Record<"en" | "tr", RefundPolicyContent> = {
  en: {
    lastUpdated: "March 8, 2026",
    title: "Refund Policy",
    intro: [
      'This Refund Policy explains how refund requests are handled for products and services offered by BMNova, operated by Ali Mertcan Karaman ("BMNova," "we," "us," or "our").',
      "Because BMNova offers both web-based products and mobile applications, refund handling may differ depending on where and how the purchase was made.",
    ],
    sections: [
      {
        number: 1,
        title: "Scope",
        paragraphs: [
          "This Refund Policy applies to:",
          "web subscriptions and web purchases made through BMNova products or websites;",
          "mobile app subscriptions and in-app purchases made through Apple App Store or Google Play;",
          "one-time digital purchases, premium features, upgrades, and similar paid access where offered by BMNova.",
          "This Refund Policy should be read together with our Terms of Use and Privacy Policy.",
        ],
      },
      {
        number: 2,
        title: "General Rule",
        paragraphs: [
          "Unless otherwise required by applicable law, stated in a product-specific offer, or required by the applicable payment provider or app store, fees are generally non-refundable.",
          "Canceling a subscription usually stops future renewals. It does not automatically create a refund for charges that have already been processed.",
        ],
      },
      {
        number: 3,
        title: "Web Purchases and Web Subscriptions",
        paragraphs: [
          "For certain web-based products and subscriptions, BMNova may use Paddle or another authorized billing provider to process payments.",
          "Where Paddle or another merchant-of-record/payment partner handles checkout:",
          "that provider may process payments, taxes, invoices, renewals, and certain refund requests under its own terms and policies;",
          "refund handling may therefore be managed partly or fully through that provider's systems;",
          "you may be asked to submit your refund request through the billing provider's support channel or buyer portal.",
          "If your purchase was made through a BMNova website checkout flow powered by Paddle, your order may be processed by Paddle as merchant of record. Paddle's seller guidance recommends making this clear to buyers and clearly publishing refund terms before purchase, and Paddle's buyer-facing materials explain that refund handling can run through Paddle's systems.",
        ],
      },
      {
        number: 4,
        title: "Apple App Store Purchases",
        paragraphs: [
          "If you purchased a subscription or in-app product through the Apple App Store, refunds are generally handled by Apple, not directly by BMNova.",
          "Apple states that App Store purchases may be eligible for refund and directs users to request refunds through Apple's own refund flow, while subscription cancellations are generally managed through Apple account settings.",
          "If your purchase was made through Apple:",
          "you should use Apple's refund request process;",
          "subscription cancellation should generally be managed in your Apple account settings;",
          "BMNova cannot directly issue or force refunds for transactions controlled by Apple's billing system.",
        ],
      },
      {
        number: 5,
        title: "Google Play Purchases",
        paragraphs: [
          "If you purchased a subscription or in-app product through Google Play, refunds are generally governed by Google Play's billing and refund rules.",
          "Google states that refund availability depends on what was purchased, when and how payment was made, and the user's location. Google also notes that contacting the app developer may sometimes be the quickest way to resolve an issue.",
          "If your purchase was made through Google Play:",
          "you should first review Google Play's refund request options;",
          "cancellation of subscriptions is generally managed through your Google Play account;",
          "in some situations, BMNova may review the issue and assist where the platform allows.",
        ],
      },
      {
        number: 6,
        title: "Cases Where We May Review Refund Requests",
        paragraphs: [
          "For purchases that BMNova can review directly, we may consider refund requests in situations such as:",
          "duplicate charges;",
          "clear billing errors;",
          "proven technical problems that prevent core paid functionality from being used and cannot be resolved within a reasonable time;",
          "accidental duplicate subscription or purchase activation;",
          "other cases where a refund is required by applicable law.",
          "Submitting a request does not guarantee approval.",
        ],
      },
      {
        number: 7,
        title: "Cases That Are Usually Not Refundable",
        paragraphs: [
          "To the extent permitted by applicable law, refunds are usually not available for:",
          "partial use of a subscription period;",
          "failure to cancel before renewal;",
          "dissatisfaction based only on preference after the paid feature or service was delivered as described;",
          "issues caused by your device, third-party platform restrictions, unsupported environments, or misuse of the product;",
          "requests made after an unreasonable delay, unless a longer period is required by law.",
          "Nothing in this section limits any refund rights you may have under mandatory consumer law or under the rules of the relevant app store or billing provider.",
        ],
      },
      {
        number: 8,
        title: "Technical Problems",
        paragraphs: [
          "If you experience a technical issue, please contact us before initiating a chargeback where possible.",
          "We may first try to:",
          "verify the issue;",
          "provide support or troubleshooting steps;",
          "restore access or correct the billing problem;",
          "offer a refund where appropriate and where we are able to do so.",
          "This is often the fastest way to resolve product-access or billing confusion.",
        ],
      },
      {
        number: 9,
        title: "Chargebacks and Payment Disputes",
        paragraphs: [
          "If you believe a charge is unauthorized or incorrect, please contact us as soon as possible.",
          "Where a payment provider or app store controls the transaction, dispute handling may also be subject to that provider's own rules and timelines.",
        ],
      },
      {
        number: 10,
        title: "How to Request a Refund",
        paragraphs: [
          "To request a refund or report a billing issue, contact:",
          "Email: contact@bmnova.com",
          "Please include, where available:",
          "the product or app name;",
          "the purchase email address;",
          "the order number or transaction ID;",
          "the platform used for purchase, such as web, Apple App Store, or Google Play;",
          "a short explanation of the issue.",
          "If your purchase was processed by a billing provider or app store, we may direct you to the relevant support or refund channel.",
        ],
      },
      {
        number: 11,
        title: "Processing Time",
        paragraphs: [
          "If BMNova approves a refund that we are able to issue directly, processing times may vary depending on the payment provider, bank, platform, and payment method.",
          "Where a third-party platform or billing provider controls the refund flow, their timelines will apply.",
        ],
      },
      {
        number: 12,
        title: "Changes to This Refund Policy",
        paragraphs: [
          "We may update this Refund Policy from time to time. When we do, we will revise the \"Last updated\" date above.",
        ],
      },
      {
        number: 13,
        title: "Contact",
        paragraphs: [
          "For questions about this Refund Policy, please contact:",
          "BMNova",
          "Operated by Ali Mertcan Karaman",
          "OSTİM OSB Mah. Cevat Dündar Cad. No: 1/1 İç Kapı No: 10",
          "Yenimahalle / Ankara, Türkiye",
          "contact@bmnova.com",
          "https://www.bmnova.com/",
        ],
      },
    ],
  },
  tr: {
    lastUpdated: "8 Mart 2026",
    title: "İade Politikası",
    intro: [
      'İşbu İade Politikası, Ali Mertcan Karaman tarafından işletilen BMNova\'nın ("BMNova", "biz", "bize" veya "bizim") sunduğu ürün ve hizmetler için iade taleplerinin nasıl ele alındığını açıklar.',
      "BMNova hem web tabanlı ürünler hem de mobil uygulamalar sunduğundan, iade süreçleri satın alımın nerede ve nasıl yapıldığına göre farklılık gösterebilir.",
    ],
    sections: [
      {
        number: 1,
        title: "Kapsam",
        paragraphs: [
          "Bu İade Politikası aşağıdakiler için geçerlidir:",
          "BMNova ürünleri veya web siteleri üzerinden yapılan web abonelikleri ve web satın alımları;",
          "Apple App Store veya Google Play üzerinden yapılan mobil uygulama abonelikleri ve uygulama içi satın alımlar;",
          "BMNova tarafından sunulan tek seferlik dijital satın alımlar, premium özellikler, yükseltmeler ve benzeri ücretli erişimler.",
          "Bu İade Politikası, Kullanım Koşulları ve Gizlilik Politikası ile birlikte okunmalıdır.",
        ],
      },
      {
        number: 2,
        title: "Genel Kural",
        paragraphs: [
          "Uygulanabilir mevzuat aksini gerektirmedikçe, ürün bazlı bir teklif kapsamında özel olarak belirtilmedikçe veya ilgili ödeme sağlayıcısı ya da uygulama mağazası kuralları gerektirmedikçe, ücretler genel olarak iade edilmez.",
          "Bir aboneliğin iptal edilmesi genellikle gelecekteki yenilemeleri durdurur. Daha önce tahsil edilmiş ücretler için otomatik olarak iade hakkı doğurmaz.",
        ],
      },
      {
        number: 3,
        title: "Web Satın Alımları ve Web Abonelikleri",
        paragraphs: [
          "Bazı web tabanlı ürün ve aboneliklerde BMNova, ödemeleri işlemek için Paddle veya başka yetkili ödeme sağlayıcıları kullanabilir.",
          "Paddle veya başka bir merchant-of-record / ödeme ortağı ödeme sürecini yürütüyorsa:",
          "ödemeler, vergiler, faturalar, yenilemeler ve bazı iade talepleri ilgili sağlayıcının kendi koşulları ve politikaları kapsamında işlenebilir;",
          "bu nedenle iade süreçleri kısmen veya tamamen ilgili sağlayıcının sistemleri üzerinden yürütülebilir;",
          "iade talebinizi, ödeme sağlayıcısının destek kanalı veya alıcı paneli üzerinden iletmeniz istenebilir.",
          "Satın alma işleminiz Paddle destekli bir BMNova web ödeme akışı üzerinden yapıldıysa, siparişiniz Paddle tarafından merchant of record olarak işlenebilir. Paddle'ın satıcı rehberleri, bunun alıcılara açıkça belirtilmesini ve iade koşullarının satın alma öncesinde görünür olmasını önerir; Paddle'ın alıcı tarafı materyalleri de iade sürecinin Paddle sistemleri üzerinden yürüyebileceğini gösterir.",
        ],
      },
      {
        number: 4,
        title: "Apple App Store Satın Alımları",
        paragraphs: [
          "Bir aboneliği veya uygulama içi ürünü Apple App Store üzerinden satın aldıysanız, iadeler genel olarak doğrudan BMNova tarafından değil, Apple tarafından yönetilir.",
          "Apple, App Store satın alımlarının bazı durumlarda iade için uygun olabileceğini belirtmekte ve kullanıcıları Apple'ın kendi iade talep akışına yönlendirmektedir. Abonelik iptalleri de genel olarak Apple hesap ayarları üzerinden yönetilir.",
          "Satın alma işleminiz Apple üzerinden yapıldıysa:",
          "iade talebinizi Apple'ın ilgili süreci üzerinden iletmelisiniz;",
          "abonelik iptalini genel olarak Apple hesap ayarlarınızdan yapmalısınız;",
          "Apple'ın faturalama sistemi üzerinden yürütülen işlemler için BMNova doğrudan iade yapamaz veya iade sürecini zorunlu kılamaz.",
        ],
      },
      {
        number: 5,
        title: "Google Play Satın Alımları",
        paragraphs: [
          "Bir aboneliği veya uygulama içi ürünü Google Play üzerinden satın aldıysanız, iadeler genel olarak Google Play'in faturalama ve iade kurallarına tabidir.",
          "Google, iade uygunluğunun satın alınan ürünün türüne, ödemenin ne zaman ve nasıl yapıldığına ve kullanıcının bulunduğu yere göre değişebileceğini belirtmektedir. Google ayrıca, bazı durumlarda geliştiriciyle iletişime geçmenin en hızlı çözüm yolu olabileceğini ifade etmektedir.",
          "Satın alma işleminiz Google Play üzerinden yapıldıysa:",
          "önce Google Play'in iade talep seçeneklerini incelemelisiniz;",
          "abonelik iptalini genel olarak Google Play hesabınız üzerinden yapmalısınız;",
          "bazı durumlarda BMNova, platformun izin verdiği ölçüde durumu inceleyip yardımcı olabilir.",
        ],
      },
      {
        number: 6,
        title: "Değerlendirebileceğimiz İade Durumları",
        paragraphs: [
          "BMNova'nın doğrudan değerlendirebildiği satın alımlarda, aşağıdaki gibi durumlarda iade taleplerini inceleyebiliriz:",
          "mükerrer tahsilatlar;",
          "açık faturalama hataları;",
          "ücretli temel işlevin kullanılmasını engelleyen ve makul süre içinde çözülemeyen teknik sorunlar;",
          "yanlışlıkla oluşan mükerrer abonelik veya satın alma aktivasyonu;",
          "uygulanabilir hukuk uyarınca iadenin gerekli olduğu diğer durumlar.",
          "Talebin iletilmesi, iadenin otomatik olarak onaylanacağı anlamına gelmez.",
        ],
      },
      {
        number: 7,
        title: "Genellikle İade Edilmeyen Durumlar",
        paragraphs: [
          "Uygulanabilir hukukun izin verdiği ölçüde, aşağıdaki durumlarda genellikle iade yapılmaz:",
          "abonelik döneminin kısmen kullanılmış olması;",
          "yenileme tarihinden önce iptal edilmemiş olması;",
          "ücretli özellik veya hizmet açıklanan şekilde sunulmuş olmasına rağmen yalnızca kişisel memnuniyetsizlik gerekçesiyle talepte bulunulması;",
          "cihazınız, üçüncü taraf platform kısıtlamaları, desteklenmeyen ortamlar veya ürünün yanlış kullanımı nedeniyle ortaya çıkan sorunlar;",
          "mevzuat daha uzun süre gerektirmedikçe, makul olmayan gecikmeyle yapılan talepler.",
          "Bu bölüm, emredici tüketici hukuku veya ilgili uygulama mağazası / ödeme sağlayıcısı kuralları kapsamında sahip olabileceğiniz iade haklarını sınırlamaz.",
        ],
      },
      {
        number: 8,
        title: "Teknik Sorunlar",
        paragraphs: [
          "Teknik bir sorun yaşarsanız, mümkünse ödeme itirazı veya chargeback başlatmadan önce bizimle iletişime geçin.",
          "Öncelikle şu adımları deneyebiliriz:",
          "sorunu doğrulamak;",
          "destek veya sorun giderme adımları sunmak;",
          "erişimi geri sağlamak veya faturalama sorununu düzeltmek;",
          "uygun olduğunda ve yapabildiğimiz ölçüde iade sunmak.",
          "Bu yaklaşım, ürün erişimi veya faturalama karışıklıklarını çoğu zaman en hızlı şekilde çözebilir.",
        ],
      },
      {
        number: 9,
        title: "Chargeback ve Ödeme Uyuşmazlıkları",
        paragraphs: [
          "Bir ödemenin yetkisiz veya hatalı olduğunu düşünüyorsanız, mümkün olan en kısa sürede bizimle iletişime geçin.",
          "İşlem bir ödeme sağlayıcısı veya uygulama mağazası tarafından yönetiliyorsa, uyuşmazlık süreçleri ilgili sağlayıcının kendi kurallarına ve sürelerine de tabi olabilir.",
        ],
      },
      {
        number: 10,
        title: "İade Talebi Nasıl Oluşturulur",
        paragraphs: [
          "İade talebi oluşturmak veya faturalama sorunu bildirmek için:",
          "E-posta: contact@bmnova.com",
          "Mümkünse aşağıdaki bilgileri paylaşın:",
          "ürün veya uygulama adı;",
          "satın alma sırasında kullanılan e-posta adresi;",
          "sipariş numarası veya işlem kimliği;",
          "satın alma platformu: web, Apple App Store veya Google Play;",
          "sorunun kısa açıklaması.",
          "Satın alma işleminiz bir ödeme sağlayıcısı veya uygulama mağazası üzerinden işlendi ise, sizi ilgili destek veya iade kanalına yönlendirebiliriz.",
        ],
      },
      {
        number: 11,
        title: "İşlem Süresi",
        paragraphs: [
          "BMNova'nın doğrudan gerçekleştirebildiği ve onayladığı iadelerde, işlem süresi ödeme sağlayıcısına, bankaya, platforma ve ödeme yöntemine göre değişebilir.",
          "İade akışı üçüncü taraf bir platform veya ödeme sağlayıcısı tarafından yönetiliyorsa, onların işlem süreleri geçerli olur.",
        ],
      },
      {
        number: 12,
        title: "Bu İade Politikasındaki Değişiklikler",
        paragraphs: [
          "Bu İade Politikası'nı zaman zaman güncelleyebiliriz. Güncelleme yaptığımızda yukarıdaki \"Son güncelleme\" tarihini değiştiririz.",
        ],
      },
      {
        number: 13,
        title: "İletişim",
        paragraphs: [
          "Bu İade Politikası hakkında sorularınız için:",
          "BMNova",
          "İşleten: Ali Mertcan Karaman",
          "OSTİM OSB Mah. Cevat Dündar Cad. No: 1/1 İç Kapı No: 10",
          "Yenimahalle / Ankara, Türkiye",
          "contact@bmnova.com",
          "https://www.bmnova.com/",
        ],
      },
    ],
  },
};
