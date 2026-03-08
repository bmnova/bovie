export type AccountDataDeletionSection = {
  number: number;
  title: string;
  paragraphs: string[];
};

export type AccountDataDeletionContent = {
  lastUpdated: string;
  title: string;
  intro: string[];
  sections: AccountDataDeletionSection[];
};

export const accountDataDeletionContent: Record<
  "en" | "tr",
  AccountDataDeletionContent
> = {
  en: {
    lastUpdated: "March 8, 2026",
    title: "Account and Data Deletion",
    intro: [
      "This page explains how users can delete their account and personal data for BMNova products and applications.",
      "At BMNova, we aim to make account deletion simple and accessible. In supported products, users can delete their account directly from the app or product settings. If you cannot access your account or need help, you can also contact us.",
    ],
    sections: [
      {
        number: 1,
        title: "How to Delete Your Account",
        paragraphs: [
          "If your BMNova product includes account deletion in Settings, you can delete your account directly by following these steps:",
          "Open the relevant BMNova app or web product.",
          "Go to Settings.",
          "Tap or click Delete Account.",
          "Follow the confirmation steps shown in the product.",
          "Once completed, your deletion request will be processed according to the product's deletion flow.",
        ],
      },
      {
        number: 2,
        title: "Contacting Us for Deletion",
        paragraphs: [
          "If you cannot access your account, cannot find the delete option, or need assistance, you can request deletion by contacting us.",
          "Email: contact@bmnova.com",
          "Please send your request from the email address associated with your account where possible, and include:",
          "the name of the app or product;",
          "your registered email address or username;",
          "a short note saying that you want your account deleted.",
          "You may use the subject line:",
          "Account Deletion Request",
          "We may contact you to verify your identity before processing the request.",
        ],
      },
      {
        number: 3,
        title: "What Happens When Your Account Is Deleted",
        paragraphs: [
          "When your account deletion request is completed, we will delete or anonymize the personal data associated with your account, subject to legal, security, fraud prevention, backup, and compliance requirements.",
          "Depending on the product, this may include:",
          "your profile information;",
          "your account credentials and identifiers;",
          "saved preferences and settings;",
          "user-generated content stored in the product;",
          "usage data associated with your account where deletion is technically and legally feasible.",
        ],
      },
      {
        number: 4,
        title: "What May Be Retained",
        paragraphs: [
          "Some limited data may be retained where necessary for:",
          "legal compliance;",
          "tax, accounting, or payment records;",
          "fraud prevention and security;",
          "dispute resolution;",
          "enforcement of our legal rights;",
          "backup systems for a limited period.",
          "Where possible, retained data will be minimized, isolated, or anonymized so that it is no longer linked to your active account.",
        ],
      },
      {
        number: 5,
        title: "Subscription and Purchase Data",
        paragraphs: [
          "Deleting your account does not automatically cancel an active subscription or guarantee a refund.",
          "If you purchased a subscription through:",
          "a web checkout, billing and refund handling may involve Paddle or another authorized billing provider;",
          "the Apple App Store, subscription management and refund requests are generally handled by Apple;",
          "Google Play, subscription management and refund requests are generally handled by Google Play.",
          "Please review the relevant billing platform and our Refund Policy for more information.",
        ],
      },
      {
        number: 6,
        title: "Processing Time",
        paragraphs: [
          "We aim to process deletion requests within a reasonable time after verification and subject to technical and legal requirements.",
          "In-app self-service deletion requests may be processed faster depending on the product architecture. Some residual data may remain temporarily in backups or security logs for a limited period.",
        ],
      },
      {
        number: 7,
        title: "Questions",
        paragraphs: [
          "If you have any questions about account or data deletion, contact us at:",
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
    title: "Hesap ve Veri Silme",
    intro: [
      "Bu sayfa, BMNova ürünleri ve uygulamaları için kullanıcıların hesaplarını ve kişisel verilerini nasıl silebileceğini açıklar.",
      "BMNova olarak hesap silme sürecini mümkün olduğunca basit ve erişilebilir tutmayı amaçlıyoruz. Desteklenen ürünlerde kullanıcılar hesaplarını doğrudan uygulama veya ürün ayarları içinden silebilir. Hesabınıza erişemiyorsanız veya yardıma ihtiyacınız varsa bizimle ayrıca iletişime geçebilirsiniz.",
    ],
    sections: [
      {
        number: 1,
        title: "Hesabınızı Nasıl Silebilirsiniz",
        paragraphs: [
          "Kullandığınız BMNova ürününde Ayarlar içinde hesap silme özelliği bulunuyorsa, aşağıdaki adımları izleyerek hesabınızı doğrudan silebilirsiniz:",
          "İlgili BMNova uygulamasını veya web ürününü açın.",
          "Ayarlar bölümüne gidin.",
          "Hesabı Sil seçeneğine dokunun veya tıklayın.",
          "Üründe gösterilen onay adımlarını tamamlayın.",
          "Bu işlem tamamlandığında silme talebiniz ilgili ürünün silme akışına göre işleme alınır.",
        ],
      },
      {
        number: 2,
        title: "Bizimle İletişime Geçerek Silme Talebi Oluşturma",
        paragraphs: [
          "Hesabınıza erişemiyorsanız, silme seçeneğini bulamıyorsanız veya desteğe ihtiyacınız varsa, bizimle iletişime geçerek silme talebinde bulunabilirsiniz.",
          "E-posta: contact@bmnova.com",
          "Mümkünse talebinizi hesabınızla ilişkili e-posta adresinden gönderin ve aşağıdaki bilgileri ekleyin:",
          "uygulama veya ürün adı;",
          "kayıtlı e-posta adresiniz veya kullanıcı adınız;",
          "hesabınızın silinmesini istediğinizi belirten kısa bir açıklama.",
          "Konu satırı olarak şunu kullanabilirsiniz:",
          "Hesap Silme Talebi",
          "Talebinizi işleme almadan önce kimliğinizi doğrulamak için sizinle iletişime geçebiliriz.",
        ],
      },
      {
        number: 3,
        title: "Hesabınız Silindiğinde Ne Olur",
        paragraphs: [
          "Hesap silme talebiniz tamamlandığında, hesabınızla ilişkili kişisel veriler; hukuki yükümlülükler, güvenlik, dolandırıcılığı önleme, yedekleme ve uyum gereklilikleri saklı kalmak üzere silinir veya anonim hale getirilir.",
          "Ürüne bağlı olarak bu kapsamda şunlar yer alabilir:",
          "profil bilgileriniz;",
          "hesap bilgileri ve tanımlayıcılar;",
          "kayıtlı tercihler ve ayarlar;",
          "ürün içinde saklanan kullanıcı içerikleri;",
          "teknik ve hukuki olarak mümkün olduğu ölçüde hesabınızla ilişkili kullanım verileri.",
        ],
      },
      {
        number: 4,
        title: "Saklanabilecek Veriler",
        paragraphs: [
          "Bazı sınırlı veriler aşağıdaki amaçlarla saklanabilir:",
          "hukuki yükümlülüklere uyum;",
          "vergi, muhasebe veya ödeme kayıtları;",
          "dolandırıcılığın önlenmesi ve güvenlik;",
          "uyuşmazlık çözümü;",
          "yasal haklarımızın korunması ve uygulanması;",
          "sınırlı süreli yedekleme sistemleri.",
          "Mümkün olduğu durumlarda, saklanan veriler en aza indirilir, ayrıştırılır veya aktif hesabınızla ilişkilendirilemeyecek şekilde anonim hale getirilir.",
        ],
      },
      {
        number: 5,
        title: "Abonelik ve Satın Alma Verileri",
        paragraphs: [
          "Hesabınızı silmeniz, aktif bir aboneliği otomatik olarak iptal etmez ve otomatik iade hakkı oluşturmaz.",
          "Bir aboneliği şu kanallar üzerinden satın aldıysanız:",
          "web ödeme akışı üzerinden, faturalama ve iade süreci Paddle veya başka yetkili ödeme sağlayıcılarını içerebilir;",
          "Apple App Store üzerinden, abonelik yönetimi ve iade talepleri genel olarak Apple tarafından yürütülür;",
          "Google Play üzerinden, abonelik yönetimi ve iade talepleri genel olarak Google Play tarafından yürütülür.",
          "Daha fazla bilgi için ilgili ödeme platformunu ve İade Politikamızı inceleyin.",
        ],
      },
      {
        number: 6,
        title: "İşlem Süresi",
        paragraphs: [
          "Silme taleplerini, doğrulama sonrasında ve teknik/hukuki gerekliliklere bağlı olarak makul süre içinde işlemeye çalışırız.",
          "Uygulama içi self-service silme talepleri, ürün altyapısına bağlı olarak daha hızlı tamamlanabilir. Bazı artık veriler yedeklerde veya güvenlik kayıtlarında sınırlı bir süre daha kalabilir.",
        ],
      },
      {
        number: 7,
        title: "Sorular",
        paragraphs: [
          "Hesap veya veri silme hakkında sorularınız için bize ulaşın:",
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
