import type { TeamMember } from "@websites/shared/types";
import type { Locale } from "@/lib/i18n";

export { type Locale };

export const contentMap = {
  en: {
    meta: {
      homeTitle: "BMNova — Mobile app studio & AI startup",
      description:
        "BMNova is a mobile app studio and consumer-app startup in Ankara. We design, build and ship our own AI apps for iOS and Android.",
      pages: {
        about: { title: "About BMNova — Mobile app studio & startup", description: "BMNova is an independent mobile app studio and consumer-app startup at Ostim Teknokent, Ankara. Meet the founders behind Pali, FitVibe, Haki and the rest." },
        careers: { title: "Careers — BMNova", description: "Join BMNova. We're hiring a Mobile App Growth Expert." },
        blog: { title: "Blog — BMNova", description: "Evidence-based writing on health, productivity, psychology, and building software products." },
        privacy: { title: "Privacy Policy — BMNova", description: "BMNova Privacy Policy. How we collect, use, store, share, and protect personal data." },
        terms: { title: "Terms of Use — BMNova", description: "BMNova Terms of Use. Access and use of our websites, apps, AI features, and services." },
        refund: { title: "Refund Policy — BMNova", description: "BMNova Refund Policy. How refund requests are handled for web and mobile purchases." },
        deletion: { title: "Account & Data Deletion — BMNova", description: "BMNova Account and Data Deletion. How to delete your account and personal data." },
      },
    },
    nav: {
      apps: "Apps",
      studio: "Studio",
      shipLog: "Ship log",
      careers: "Careers",
      getApps: "Get the apps",
      menu: "Toggle menu",
      switchTo: "Türkçe",
      switchLabel: "TR",
    },
    hero: {
      badge: "Mobile app studio & startup · Ankara → worldwide",
      titleLine1: "Tiny studio.",
      titleBig: "Big",
      titleAccent: "apps.",
      sub: "BMNova designs, builds and ships its own AI-powered consumer apps. No clients, no briefs: just seven apps people open every day, and more in the lab.",
      ctaApps: "Explore the apps",
      ctaHiring: "We're hiring",
      nowShowing: "Now showing",
      pickApp: "Pick an app",
      showApp: "Show {name}",
    },
    numbers: {
      heading: "Only real numbers here.",
      note: "From App Store Connect and Play Console, all apps combined",
      apps: { label: "apps shipped", sub: "5 live · 1 in review · 1 in the lab" },
      downloads: { label: "downloads", sub: "across iOS and Android" },
      ratings: { label: "store ratings", sub: "and {n}+ written reviews" },
      inhouse: { label: "in-house", sub: "design, code, AI, growth" },
      founded: { label: "founded", sub: "Ostim Teknokent, Ankara" },
    },
    apps: {
      eyebrow: "The apps",
      headingStart: "Seven apps. One obsession: making AI feel",
      headingEm: "useful.",
      sub: "Each one solves a small, daily problem. Each one is designed, built and grown by the same team.",
      status: { live: "Live", review: "In review", lab: "In the lab" },
      both: "iOS · Android",
      android: "Android",
      notify: "Notify me",
      open: "Open page →",
    },
    reviews: {
      eyebrow: "Loved by users",
      heading: "Real reviews, straight from the stores.",
      note: "From the App Store and Google Play · hover to pause",
      translated: "translated from Turkish",
      source: { appStore: "App Store", googlePlay: "Google Play" },
      stars: "5 out of 5 stars",
    },
    core: {
      eyebrow: "How we move fast",
      heading: "One core. Seven apps.",
      body: "Every app runs on the same engine: one Flutter codebase, one AI layer, shared onboarding and paywalls, and content we update remotely without shipping a new build.",
      chips: ["Flutter", "AI layer", "dynamic.intyx", "Shared onboarding & paywalls"],
      center: "core",
    },
    shipLog: {
      eyebrow: "Ship log",
      heading: "Recently shipped.",
      note: "Straight from the app repositories",
    },
    studio: {
      eyebrow: "The studio",
      heading1: "Built in Ankara.",
      heading2: "Shipped everywhere.",
      body: "BMNova is an independent mobile app studio and consumer-app startup: two founders at Ostim Teknokent, shipping our own AI apps worldwide. We use what we build, and we keep improving the ones people keep opening.",
      values: [
        "We ship small and often.",
        "Every app is ours. No client work.",
        "AI that does one job well beats AI that does everything.",
      ],
      cofounder: "Co-founder",
      yourCard: "Your card goes here.",
      seeRoles: "See open roles →",
    },
    careersCta: {
      eyebrow: "Careers",
      heading: "We're growing. Come grow with us.",
      body: "Small team, big surface area. If you want your work in front of real users this month, not next year, talk to us.",
      openRole: "Open role",
      readRole: "Read the role",
    },
    appPage: {
      allApps: "All apps",
      get: "Get {name}",
      notify: "Notify me at launch",
      earlyAccess: "Get early access",
      liveBoth: "Live on iOS & Android",
      liveAndroid: "Live on Android",
      inReview: "In App Store review",
      inLab: "In the lab · launching soon",
      madeIn: "Made in Ankara",
      worksWith: "Works with",
      howItWorks: "How it works",
      whatItDoes: "What {name} does",
      tryIt: "Try it",
      storeListing: "From the store listing",
      storeNote: "Google Play screenshots · scroll sideways",
      reviewsHeading: "What people say about {name}",
      reviewsNote: "From the App Store and Google Play",
      faqHeading: "Questions about {name}",
      moreFrom: "More from BMNova",
      allSeven: "All seven apps →",
      downloadOn: "Download on the",
      getItOn: "Get it on",
      plus: "Plus",
    },
    company: {
      eyebrow: "The company",
      heading: "A mobile app studio. A startup.",
      lead: "BMNova (BMNova Innovations) is an independent mobile app studio and consumer-app startup at Ostim Teknokent in Ankara, Turkey. Co-founders Ali Mertcan Karaman and Büşra Mercan design, build and ship their own AI-powered apps for iOS and Android. BMNova does not take client work.",
      faqs: [
        {
          question: "What is BMNova?",
          answer:
            "BMNova, legally BMNova Innovations, is an independent mobile app studio and consumer-app startup based at Ostim Teknokent in Ankara, Turkey. It designs, builds and ships its own AI-powered mobile apps, including Pali, FitVibe, Haki, RoomPace, NextStep, Bloomish and Offer, plus intyx.ai.",
        },
        {
          question: "Is BMNova a mobile app studio?",
          answer:
            "Yes. BMNova is a mobile app studio. A small in-house team designs, builds and grows consumer apps for iOS and Android on one Flutter codebase, a shared AI layer and remote content updates. It is not a client agency.",
        },
        {
          question: "Is BMNova a startup?",
          answer:
            "Yes. BMNova is an independent product startup founded by Ali Mertcan Karaman and Büşra Mercan. It ships its own consumer mobile apps from Ankara to a worldwide audience. Partners and investors can reach the studio at contact@bmnova.com.",
        },
        {
          question: "Where is BMNova based?",
          answer:
            "BMNova is based at Ostim Teknokent in Ankara, Turkey. Its apps are published for a worldwide audience on the App Store and Google Play.",
        },
        {
          question: "Which mobile apps has BMNova built?",
          answer:
            "BMNova's own apps are Pali (GLP-1 companion), FitVibe (AI wardrobe), Haki (AI manga and comics), RoomPace (budget AI interior design), NextStep (AI coaching for overthinking), Bloomish (AI bouquet gifts) and Offer (a social icebreaker). It also builds intyx.ai and dynamic.intyx.ai.",
        },
        {
          question: "Does BMNova build mobile apps for other companies?",
          answer:
            "No. BMNova is a product studio and startup, not an agency. Every app on bmnova.com is BMNova's own product.",
        },
      ],
    },
    aboutUs: {
      eyebrow: "Who we are",
      heading: "About BMNova",
      vision: {
        label: "Vision",
        text: "To build a family of AI-powered consumer apps that people open every day, from a small studio in Ankara to users all over the world.",
      },
      mission: {
        label: "Mission",
        text: "To design, build and grow our own products with a compact, highly skilled team: one shared core, honest numbers, and AI that does one job well.",
      },
      teamLabel: "The Team",
    },
    footer: {
      tagline: "Independent mobile app studio and startup. Ostim Teknokent, Ankara, Turkey.",
      apps: "Apps",
      studio: "Studio",
      legal: "Legal",
      about: "About",
      blog: "Blog",
      shipLog: "Ship log",
      careers: "Careers",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
      refundPolicy: "Refund Policy",
      accountDataDeletion: "Account & Data Deletion",
      copyright: "BMNova Innovations",
    },
    privacyPolicy: {
      back: "← bmnova.com",
      lastUpdatedLabel: "Last updated:",
    },
    termsOfUse: {
      back: "← bmnova.com",
      lastUpdatedLabel: "Last updated:",
    },
    refundPolicy: {
      back: "← bmnova.com",
      lastUpdatedLabel: "Last updated:",
    },
    accountDataDeletion: {
      back: "← bmnova.com",
      lastUpdatedLabel: "Last updated:",
    },
    blog: {
      title: "Blog",
      subtitle: "Thoughts on AI, Flutter, and building software.",
      noPosts: "No posts yet. Check back soon.",
      back: "← bmnova.com",
      allPosts: "← All posts",
      minRead: "min read",
      relatedEyebrow: "From the blog",
      relatedHeading: "Related reading",
      fromStudio: "From BMNova",
      learnMore: "Learn more about {name} →",
    },
    careers: {
      title: "Careers",
      subtitle:
        "We're a small team building serious products. If you're sharp, self-directed, and want to work on things that matter — we'd love to hear from you.",
      opening: {
        title: "Mobile App Growth Expert",
        type: "Part-time · Remote",
        summary: "ASO, paid, retention",
        description:
          "We're looking for someone who lives and breathes mobile app growth. You'll own acquisition, retention, and monetization strategy across our mobile products — running experiments, analyzing data, and finding the levers that move the numbers.",
        responsibilitiesLabel: "What you'll do",
        responsibilities: [
          "Drive user acquisition via ASO, paid campaigns, and organic channels",
          "Design and run A/B tests to improve onboarding and retention",
          "Analyze product metrics and translate insights into growth experiments",
          "Collaborate closely with the engineering and design team",
          "Build and own our mobile marketing playbook from the ground up",
        ],
        niceLabel: "Nice to have",
        nice: [
          "Experience growing a mobile app past 10K+ MAU",
          "Familiarity with Flutter or mobile development workflows",
          "Background in SaaS or AI-powered products",
        ],
        apply: "Apply via email",
      },
    },
    team: [
      {
        name: "Ali Mertcan Karaman",
        role: "Co-Founder",
        initials: "AK",
        twitter: "https://x.com/alimertcank?s=21",
        linkedin: "https://www.linkedin.com/in/ali-mertcan-karaman-088582133/",
        background: [
          { place: "Marmara University", years: "2016–2020" },
          { place: "TUSAŞ", years: "2020–2025" },
        ],
      },
      {
        name: "Büşra Mercan",
        role: "Co-Founder",
        initials: "BM",
        background: [{ place: "TOBB ETU", years: "2020–2024" }],
      },
    ] satisfies TeamMember[],
  },
  tr: {
    meta: {
      homeTitle: "BMNova — Mobil uygulama stüdyosu ve startup",
      description:
        "BMNova, Ankara merkezli bir mobil uygulama stüdyosu ve tüketici uygulaması startup'ıdır. Kendi yapay zekâ uygulamalarını iOS ve Android için geliştirir.",
      pages: {
        about: { title: "BMNova Hakkında — Mobil uygulama stüdyosu ve startup", description: "BMNova, Ankara Ostim Teknokent'te bağımsız bir mobil uygulama stüdyosu ve tüketici uygulaması startup'ıdır. Pali, FitVibe, Haki ve diğer uygulamaların kurucuları." },
        careers: { title: "Kariyer — BMNova", description: "BMNova'ya katıl. Mobil Uygulama Büyüme Uzmanı arıyoruz." },
        blog: { title: "Blog — BMNova", description: "Sağlık, üretkenlik, psikoloji ve yazılım ürünleri geliştirme üzerine kanıta dayalı yazılar." },
        privacy: { title: "Gizlilik Politikası — BMNova", description: "BMNova Gizlilik Politikası. Kişisel verileri nasıl topladığımız, kullandığımız, sakladığımız, paylaştığımız ve koruduğumuz." },
        terms: { title: "Kullanım Koşulları — BMNova", description: "BMNova Kullanım Koşulları. Web sitelerimizin, uygulamalarımızın, yapay zekâ özelliklerimizin ve hizmetlerimizin kullanımı." },
        refund: { title: "İade Politikası — BMNova", description: "BMNova İade Politikası. Web ve mobil satın alımlarda iade taleplerinin nasıl ele alındığı." },
        deletion: { title: "Hesap ve Veri Silme — BMNova", description: "BMNova Hesap ve Veri Silme. Hesabınızı ve kişisel verilerinizi nasıl silebileceğiniz." },
      },
    },
    nav: {
      apps: "Uygulamalar",
      studio: "Stüdyo",
      shipLog: "Yayın günlüğü",
      careers: "Kariyer",
      getApps: "Uygulamaları indir",
      menu: "Menüyü aç/kapat",
      switchTo: "English",
      switchLabel: "EN",
    },
    hero: {
      badge: "Mobil uygulama stüdyosu ve startup · Ankara → dünya",
      titleLine1: "Küçük stüdyo.",
      titleBig: "Büyük",
      titleAccent: "uygulamalar.",
      sub: "BMNova kendi yapay zekâ destekli tüketici uygulamalarını tasarlar, geliştirir ve yayınlar. Müşteri yok, brief yok: insanların her gün açtığı yedi uygulama ve laboratuvarda daha fazlası.",
      ctaApps: "Uygulamaları keşfet",
      ctaHiring: "Ekibe katıl",
      nowShowing: "Şu an",
      pickApp: "Bir uygulama seç",
      showApp: "{name} uygulamasını göster",
    },
    numbers: {
      heading: "Burada sadece gerçek rakamlar var.",
      note: "App Store Connect ve Play Console'dan, tüm uygulamaların toplamı",
      apps: { label: "uygulama", sub: "5 yayında · 1 incelemede · 1 laboratuvarda" },
      downloads: { label: "indirme", sub: "iOS ve Android'de" },
      ratings: { label: "mağaza puanı", sub: "ve {n}+ yazılı yorum" },
      inhouse: { label: "kendi ekibimiz", sub: "tasarım, kod, yapay zekâ, büyüme" },
      founded: { label: "kuruluş", sub: "Ostim Teknokent, Ankara" },
    },
    apps: {
      eyebrow: "Uygulamalar",
      headingStart: "Yedi uygulama. Tek bir tutku: yapay zekâyı",
      headingEm: "işe yarar kılmak.",
      sub: "Her biri küçük, gündelik bir sorunu çözer. Hepsi aynı ekip tarafından tasarlanır, geliştirilir ve büyütülür.",
      status: { live: "Yayında", review: "İncelemede", lab: "Laboratuvarda" },
      both: "iOS · Android",
      android: "Android",
      notify: "Haber ver",
      open: "Sayfayı aç →",
    },
    reviews: {
      eyebrow: "Kullanıcılar seviyor",
      heading: "Gerçek yorumlar, doğrudan mağazalardan.",
      note: "App Store ve Google Play'den · durdurmak için üzerine gel",
      translated: "İngilizceden çevrildi",
      source: { appStore: "App Store", googlePlay: "Google Play" },
      stars: "5 üzerinden 5 yıldız",
    },
    core: {
      eyebrow: "Nasıl hızlı ilerliyoruz",
      heading: "Tek çekirdek. Yedi uygulama.",
      body: "Tüm uygulamalar aynı motorla çalışır: tek bir Flutter kod tabanı, tek bir yapay zekâ katmanı, ortak onboarding ve ödeme ekranları ve yeni sürüm yayınlamadan uzaktan güncellediğimiz içerik.",
      chips: ["Flutter", "Yapay zekâ katmanı", "dynamic.intyx", "Ortak onboarding ve paywall"],
      center: "çekirdek",
    },
    shipLog: {
      eyebrow: "Yayın günlüğü",
      heading: "Son yayınlananlar.",
      note: "Doğrudan uygulama repolarından",
    },
    studio: {
      eyebrow: "Stüdyo",
      heading1: "Ankara'da geliştirildi.",
      heading2: "Her yerde yayında.",
      body: "BMNova, bağımsız bir mobil uygulama stüdyosu ve tüketici uygulaması startup'ıdır: Ostim Teknokent'te iki kurucu, kendi yapay zekâ uygulamalarını dünyaya yayınlıyor. Geliştirdiklerimizi kendimiz kullanıyor, insanların açmaya devam ettiklerini geliştirmeye devam ediyoruz.",
      values: [
        "Küçük ve sık yayınlarız.",
        "Her uygulama bizim. Müşteri işi yok.",
        "Tek bir işi iyi yapan yapay zekâ, her şeyi yapmaya çalışandan iyidir.",
      ],
      cofounder: "Kurucu ortak",
      yourCard: "Senin kartın burada olabilir.",
      seeRoles: "Açık pozisyonlar →",
    },
    careersCta: {
      eyebrow: "Kariyer",
      heading: "Büyüyoruz. Bizimle büyü.",
      body: "Küçük ekip, geniş etki alanı. İşinin seneye değil bu ay gerçek kullanıcılarla buluşmasını istiyorsan bize yaz.",
      openRole: "Açık pozisyon",
      readRole: "İlanı oku",
    },
    appPage: {
      allApps: "Tüm uygulamalar",
      get: "{name} indir",
      notify: "Yayınlanınca haber ver",
      earlyAccess: "Erken erişim al",
      liveBoth: "iOS ve Android'de yayında",
      liveAndroid: "Android'de yayında",
      inReview: "App Store incelemesinde",
      inLab: "Laboratuvarda · yakında",
      madeIn: "Ankara'da geliştirildi",
      worksWith: "Uyumlu",
      howItWorks: "Nasıl çalışır",
      whatItDoes: "{name} neler yapar",
      tryIt: "Dene",
      storeListing: "Mağaza sayfasından",
      storeNote: "Google Play ekran görüntüleri · yana kaydır",
      reviewsHeading: "{name} hakkında ne diyorlar",
      reviewsNote: "App Store ve Google Play'den",
      faqHeading: "{name} hakkında sorular",
      moreFrom: "BMNova'dan diğerleri",
      allSeven: "Yedi uygulamanın hepsi →",
      downloadOn: "İndir",
      getItOn: "Şuradan edinin",
      plus: "Plus",
    },
    company: {
      eyebrow: "Şirket",
      heading: "Bir mobil uygulama stüdyosu. Bir startup.",
      lead: "BMNova (BMNova Innovations), Türkiye'nin Ankara kentindeki Ostim Teknokent'te kurulu bağımsız bir mobil uygulama stüdyosu ve tüketici uygulaması startup'ıdır. Kurucu ortaklar Ali Mertcan Karaman ve Büşra Mercan, iOS ve Android için kendi yapay zekâ uygulamalarını tasarlar, geliştirir ve yayınlar. BMNova müşteri işi almaz.",
      faqs: [
        {
          question: "BMNova nedir?",
          answer:
            "BMNova, tüzel adı BMNova Innovations, Ankara Ostim Teknokent'te kurulu bağımsız bir mobil uygulama stüdyosu ve tüketici uygulaması startup'ıdır. Pali, FitVibe, Haki, RoomPace, NextStep, Bloomish ve Offer dahil kendi yapay zekâ mobil uygulamalarını tasarlar, geliştirir ve yayınlar; intyx.ai de BMNova ürünüdür.",
        },
        {
          question: "BMNova bir mobil uygulama stüdyosu mu?",
          answer:
            "Evet. BMNova bir mobil uygulama stüdyosudur. Küçük bir ekip, iOS ve Android tüketici uygulamalarını tek bir Flutter kod tabanı, ortak bir yapay zekâ katmanı ve uzaktan içerik güncellemesiyle kendi içinde tasarlar, geliştirir ve büyütür. Ajans değildir.",
        },
        {
          question: "BMNova bir startup mı?",
          answer:
            "Evet. BMNova, Ali Mertcan Karaman ve Büşra Mercan'ın kurduğu bağımsız bir ürün startup'ıdır. Kendi tüketici mobil uygulamalarını Ankara'dan dünya çapında bir kitleye yayınlar. İş ortakları ve yatırımcılar stüdyoya contact@bmnova.com adresinden ulaşabilir.",
        },
        {
          question: "BMNova nerede?",
          answer:
            "BMNova, Ankara'da Ostim Teknokent'te kuruludur. Uygulamaları App Store ve Google Play üzerinden dünya genelinde yayınlanır.",
        },
        {
          question: "BMNova hangi mobil uygulamaları geliştirdi?",
          answer:
            "BMNova'nın kendi uygulamaları Pali (GLP-1 yol arkadaşı), FitVibe (yapay zekâ gardırop), Haki (yapay zekâ manga ve çizgi roman), RoomPace (bütçeli yapay zekâ iç mimari), NextStep (aşırı düşünme için yapay zekâ koçluğu), Bloomish (yapay zekâ buket hediyesi) ve Offer'dır (sosyal buz kırıcı). intyx.ai ve dynamic.intyx.ai de BMNova ürünleridir.",
        },
        {
          question: "BMNova başka şirketler için mobil uygulama yapar mı?",
          answer:
            "Hayır. BMNova bir ajans değil, ürün stüdyosu ve startup'tır. bmnova.com'daki her uygulama BMNova'nın kendi ürünüdür.",
        },
      ],
    },
    aboutUs: {
      eyebrow: "Biz kimiz",
      heading: "BMNova Hakkında",
      vision: {
        label: "Vizyon",
        text: "Ankara'daki küçük bir stüdyodan dünyanın dört bir yanındaki kullanıcılara, insanların her gün açtığı yapay zekâ destekli tüketici uygulamalarından oluşan bir aile kurmak.",
      },
      mission: {
        label: "Misyon",
        text: "Küçük ve son derece yetkin bir ekiple kendi ürünlerimizi tasarlamak, geliştirmek ve büyütmek: tek bir ortak çekirdek, dürüst rakamlar ve tek bir işi iyi yapan yapay zekâ.",
      },
      teamLabel: "Ekibimiz",
    },
    footer: {
      tagline: "Bağımsız mobil uygulama stüdyosu ve startup. Ostim Teknokent, Ankara, Türkiye.",
      apps: "Uygulamalar",
      studio: "Stüdyo",
      legal: "Yasal",
      about: "Hakkımızda",
      blog: "Blog",
      shipLog: "Yayın günlüğü",
      careers: "Kariyer",
      privacyPolicy: "Gizlilik Politikası",
      termsOfUse: "Kullanım Koşulları",
      refundPolicy: "İade Politikası",
      accountDataDeletion: "Hesap ve Veri Silme",
      copyright: "BMNova Innovations",
    },
    privacyPolicy: {
      back: "← bmnova.com",
      lastUpdatedLabel: "Son güncelleme:",
    },
    termsOfUse: {
      back: "← bmnova.com",
      lastUpdatedLabel: "Son güncelleme:",
    },
    refundPolicy: {
      back: "← bmnova.com",
      lastUpdatedLabel: "Son güncelleme:",
    },
    accountDataDeletion: {
      back: "← bmnova.com",
      lastUpdatedLabel: "Son güncelleme:",
    },
    blog: {
      title: "Blog",
      subtitle: "Yapay zeka, Flutter ve yazılım geliştirme üzerine düşünceler.",
      noPosts: "Henüz yazı yok. Yakında tekrar kontrol edin.",
      back: "← bmnova.com",
      allPosts: "← Tüm yazılar",
      minRead: "dk okuma",
      relatedEyebrow: "Blogdan",
      relatedHeading: "İlgili yazılar",
      fromStudio: "BMNova'dan",
      learnMore: "{name} hakkında daha fazlası →",
    },
    careers: {
      title: "Kariyer",
      subtitle:
        "Ciddi ürünler geliştiren küçük bir ekibiz. Keskin, bağımsız çalışabilen ve önemli şeyler üretmek isteyen biri arıyorsak — sizden haber almak isteriz.",
      opening: {
        title: "Mobil Uygulama Büyüme Uzmanı",
        type: "Yarı zamanlı · Uzaktan",
        summary: "ASO, ücretli kampanyalar, elde tutma",
        description:
          "Mobil uygulama büyümesini içselleştirmiş birini arıyoruz. Mobil ürünlerimizde edinim, elde tutma ve monetizasyon stratejisini üstleneceksiniz — deneyler yapacak, verileri analiz edecek ve sayıları hareket ettiren kaldıraçları bulacaksınız.",
        responsibilitiesLabel: "Ne yapacaksınız",
        responsibilities: [
          "ASO, ücretli kampanyalar ve organik kanallar aracılığıyla kullanıcı edinimini yönetin",
          "Onboarding ve elde tutmayı iyileştirmek için A/B testleri tasarlayın ve yürütün",
          "Ürün metriklerini analiz edin ve içgörüleri büyüme deneylerine dönüştürün",
          "Mühendislik ve tasarım ekibiyle yakın işbirliği yapın",
          "Mobil pazarlama playbook'umuzu sıfırdan oluşturun",
        ],
        niceLabel: "Artı değer",
        nice: [
          "10K+ MAU'ya ulaşmış bir mobil uygulamayı büyütme deneyimi",
          "Flutter veya mobil geliştirme süreçlerine aşinalık",
          "SaaS veya yapay zeka ürünleri geçmişi",
        ],
        apply: "E-posta ile başvur",
      },
    },
    team: [
      {
        name: "Ali Mertcan Karaman",
        role: "Kurucu Ortak",
        initials: "AK",
        twitter: "https://x.com/alimertcank?s=21",
        linkedin: "https://www.linkedin.com/in/ali-mertcan-karaman-088582133/",
        background: [
          { place: "Marmara Üniversitesi", years: "2016–2020" },
          { place: "TUSAŞ", years: "2020–2025" },
        ],
      },
      {
        name: "Büşra Mercan",
        role: "Kurucu Ortak",
        initials: "BM",
        background: [{ place: "TOBB ETÜ", years: "2020–2024" }],
      },
    ] satisfies TeamMember[],
  },
};

/** Fills {placeholders} in a content string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
