import type { TeamMember, NavLink } from "@websites/shared/types";
import projectsData from "@/config/projects.json";
import type { Locale } from "@/app/locale-context";

export { type Locale };

const partners = [
  { name: "EverPixel", href: "https://www.everpixel.org" },
  { name: "Nefes Mühendislik", href: null as string | null },
];

// Project image URLs served from public/projects/
const projectImages: Record<string, string> = {
  Offer: "/projects/offer.avif",
  NextStep: "/projects/nextstep.png",
  DietPal: "/projects/dietpal.png",
  Pixvibe: "/projects/pixvibe.avif",
  Collagevibe: "/projects/collagevibe.png",
  FitVibe: "/projects/fitvibe.png",
};

const trProjectDescriptions: Record<string, string> = {
  Offer:
    "Yerel işletmelerde çevrenizdekilere içecek, atıştırmalık veya başka şeyler ısmarlayarak onlarla bağlantı kurun. Buzu kırın, yeni yerler keşfedin ve gerçek bağlar kurun.",
  NextStep:
    "Aşırı düşünmeyi eyleme dönüştüren minimalist bir yapay zeka koçluk uygulaması. Bir yansıma, bir soru, bir net sonraki adım.",
  DietPal:
    "İhtiyaçlarınıza ve yaşam tarzınıza göre planınızı kişiselleştiren yapay zeka destekli diyet uygulaması. Yiyecekleri, egzersizi ve refahı takip edin — ardından hedeflerinize ulaşmak için içgörüler alın.",
  Pixvibe:
    "Olağanüstü yapay zeka destekli fotoğraf düzenleme: nesneleri silin, konuları kesin, arka planları değiştirin ve AI görselleri oluşturun. Pixvibe'ın mobil ve web platformları için geliştirildi.",
  Collagevibe:
    "Fotoğrafları kolaj olarak kolayca oluşturun ve özelleştirin. Resimlerinizi tam istediğiniz gibi düzenleyin ve kişiselleştirin. Collagevibe'ın mobil platformu için geliştirildi.",
  FitVibe:
    "Yapay zeka destekli dolap uygulaması. Kıyafetleri otomatik arka plan kaldırma ile ekleyin, AI ile kombin oluşturun, kişiselleştirilmiş stil önerileri alın, dolabınızdaki eksikleri keşfedin ve kıyafetleri üzerinizde görün.",
  "intyx.ai":
    "Verinizi anında dashboard'a dönüştürün. CSV yükleyin, yapay zeka saniyeler içinde güzel ve interaktif grafikler oluştursun — kod gerekmez. Erken erişim açık.",
  "dynamic.intyx.ai":
    "Yeni build göndermeden uygulamanızın içeriğini gerçek zamanlı güncelleyin. Tek bir Flutter component ekleyin; AI karar katmanı her kullanıcı için doğru içeriği seçsin.",
};

function buildProjects(locale: Locale) {
  return projectsData.map((p) => ({
    ...p,
    image: projectImages[p.title],
    description:
      locale === "tr"
        ? (trProjectDescriptions[p.title] ?? p.description)
        : p.description,
  }));
}

export const contentMap = {
  en: {
    nav: [
      { label: "Projects", href: "#projects" },
      { label: "Services", href: "#services" },
      { label: "About", href: "/about-us" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "#contact" },
    ] satisfies NavLink[],
    navbar: {
      hireUs: "Hire us",
    },
    hero: {
      tagline: "We ship products.\nNot just prototypes.",
      sub: "We are a software, technology, and innovation company based in Ankara. We develop mobile/web projects and AI-powered solutions.",
      cta: { label: "See our work", href: "#projects" },
      ctaSecondary: { label: "Get in touch", href: "#contact" },
      stats: {
        products: "products shipped",
        founders: "founders",
        techStack: "Flutter · Next.js · AI",
      },
    },
    projects: {
      eyebrow: "Our Work",
      heading: "Products & Projects",
      longPressToViewFull: "Long press to view full",
      items: buildProjects("en"),
    },
    services: {
      eyebrow: "What We Do",
      heading: "Our Services",
      items: [
        {
          icon: "🤖",
          title: "AI Powered Projects",
          description:
            "We build AI-driven products using RAG pipelines, computer vision with YOLO, and LLM integrations — from intelligent search to real-time object detection.",
        },
        {
          icon: "📱",
          title: "Application Development",
          description:
            "We develop mobile, desktop, and web applications using Flutter, Next.js, and modern backend stacks.",
        },
        {
          icon: "☁️",
          title: "SaaS",
          description:
            "We design and build scalable SaaS products — from architecture to launch — helping ideas become investable digital businesses.",
        },
      ],
    },
    about: {
      eyebrow: "About Us",
      heading: "A lean team. Serious products.",
      body: "We are a software, technology, and innovation company. We develop mobile/web projects and AI-powered solutions. Founded in 2025 and based at Ostim Teknokent in Ankara, our vision is to become a driving force in digital transformation — a globally recognized, innovation-led company shaping the future of intelligent digital systems.",
      stack: [
        { label: "Mobile", items: "Flutter · Dart · Onyx" },
        { label: "Web", items: "Next.js · TypeScript" },
        { label: "Backend", items: "Supabase · Firebase" },
        { label: "AI", items: "RAG · YOLO · LLM Integration" },
        { label: "Design", items: "Figma · Framer" },
      ],
      teamLabel: "The Team",
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
        { name: "Büşra Mercan", role: "Co-Founder", initials: "BM" },
        { name: "Özgür", role: "Backend Developer", initials: "Ö" },
      ] satisfies TeamMember[],
    },
    contact: {
      eyebrow: "Contact",
      heading: "Got a project in mind? Or need support?",
      sub: "We have capacity for 1–2 new projects. For project inquiries or any support question, reach out — we'll get back within 24 hours.",
      email: "contact@bmnova.com",
      mailSubject: "",
      mailBody: `Hello,

I'm reaching out via your website.`,
      form: {
        appLabel: "Regarding app",
        apps: [
          { value: "", label: "None" },
          { value: "dietpal", label: "DietPal" },
          { value: "fitvibe", label: "FitVibe" },
          { value: "nextstep", label: "NextStep" },
          { value: "bloomish", label: "Bloomish" },
          { value: "intyx.ai", label: "Intyx AI" },
          { value: "dynamic.intyx", label: "Dynamic Intyx" },
        ],
        name: "Name (optional)",
        namePlaceholder: "Your name",
        bodyGreetingWithName: "Hello, I'm {name},",
        subject: "Subject",
        message: "Message",
        submit: "Open in email",
      },
      orEmailDirectly: "— or email directly —",
      links: [
        { label: "GitHub", href: "https://github.com/bmnova" },
        { label: "Twitter / X", href: "https://x.com/alimertcank?s=21" },
        { label: "LinkedIn", href: "https://linkedin.com/company/bmnova" },
        { label: "Instagram", href: "https://www.instagram.com/bmnovainnovations/" },
      ],
    },
    partnerships: {
      eyebrow: "Partners",
      heading: "Strategic Partnerships",
      items: partners,
    },
    aboutUs: {
      back: "← bmnova.com",
      eyebrow: "Who We Are",
      heading: "About BMNova",
      vision: {
        label: "Vision",
        text: "To become a driving force in digital transformation through AI-powered software solutions. Our vision is to be a globally recognized, innovation-led technology company shaping the future of intelligent digital systems.",
      },
      mission: {
        label: "Mission",
        text: "To deliver lean and effective software solutions powered by cutting-edge technologies through a compact and highly skilled team. We aim to build scalable, investment-worthy digital products that drive business value and long-term growth for our clients.",
      },
      teamLabel: "The Team",
      partnershipsLabel: "Strategic Partnerships",
    },
    footer: {
      careers: "Careers",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
      refundPolicy: "Refund Policy",
      accountDataDeletion: "Account & Data Deletion",
      copyright: "BMNova. All rights reserved.",
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
    },
    careers: {
      title: "Careers",
      subtitle:
        "We're a small team building serious products. If you're sharp, self-directed, and want to work on things that matter — we'd love to hear from you.",
      back: "← bmnova.com",
      opening: {
        title: "Mobile App Growth Expert",
        type: "Part-time · Remote",
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
    offer: {
      back: "← bmnova.com",
      eyebrow: "How it works",
      heading: "Real people. Real places. Real moments.",
      description:
        "Connect with people around you by offering them drinks, snacks, or other items at local businesses. Break the ice, discover new places, and make real connections.",
      features: [
        {
          icon: "☕",
          title: "Offer something, start a conversation",
          description:
            "Send a virtual offer — a coffee, a snack, anything — to someone nearby at a local business. A simple gesture that breaks the ice instantly.",
        },
        {
          icon: "📍",
          title: "Discover local spots",
          description:
            "Browse businesses around you and see who else is there. Find new cafés, restaurants, and hangout spots through the people already in them.",
        },
        {
          icon: "🤝",
          title: "Meet people with shared interests",
          description:
            "Offer matches you with people who enjoy the same kinds of places. No swiping, no algorithms — just an honest offer and a real moment.",
        },
        {
          icon: "🌍",
          title: "Make your city feel smaller",
          description:
            "Whether you're new to a city or just looking to expand your circle, Offer turns everyday places into spaces for genuine connection.",
        },
      ],
      ctaHeading: "Interested in Offer?",
      ctaSub:
        "We're actively developing Offer. Reach out if you'd like to know more or get early access.",
      ctaButton: "Get in touch →",
    },
    nextstep: {
      back: "← bmnova.com",
      eyebrow: "What NextStep does",
      heading: "Stop thinking in circles. Start moving.",
      description:
        "A minimalist AI coaching app that turns overthinking into action. One reflection, one question, one clear next step.",
      features: [
        {
          icon: "🎯",
          title: "Purpose-built AI coaches",
          description:
            "Not a generic chatbot. NextStep offers focused coaches for planning, decisions, habits, review, and focus — each designed for a specific type of thinking.",
        },
        {
          icon: "✅",
          title: "Action-first output",
          description:
            "Every response ends with a concrete, small action you can take immediately — often in under five minutes.",
        },
        {
          icon: "🧘",
          title: "Calm, minimalist UX",
          description:
            "No dashboards, graphs, or setup complexity. Every screen answers exactly one question. Close the app when you know what to do.",
        },
        {
          icon: "🔁",
          title: "Reflection → Question → Next Step",
          description:
            "Each session follows a simple, repeatable structure designed to reduce noise and increase clarity — not to keep you engaged longer.",
        },
      ],
      ctaHeading: "Want to try NextStep?",
      ctaSub:
        "NextStep is currently in development. Get in touch if you'd like early access or have questions.",
      ctaButton: "Get in touch →",
    },
    dietpal: {
      back: "← bmnova.com",
      eyebrow: "What DietPal does",
      heading: "A holistic approach to reaching your health goals.",
      description:
        "AI-powered diet app that personalizes your plan based on your needs and lifestyle. Track food, exercise, and well-being — then get actionable insights to hit your goals.",
      demoAlt: "DietPal app demo",
      features: [
        {
          icon: "🧠",
          title: "Personalized by AI",
          description:
            "DietPal learns your dietary needs, goals, and lifestyle to build a plan that actually fits you — not a generic template.",
        },
        {
          icon: "🥗",
          title: "Track food & exercise",
          description:
            "Log meals and workouts with ease. DietPal gives you a clear picture of your daily intake and activity without overwhelming you with numbers.",
        },
        {
          icon: "📊",
          title: "Insights that matter",
          description:
            "Get clear, actionable feedback based on your data. DietPal surfaces the patterns that matter so you can make better choices every day.",
        },
        {
          icon: "💚",
          title: "Holistic well-being",
          description:
            "Diet is just one piece. DietPal also tracks your sleep, stress, and energy — giving you a complete picture of your health journey.",
        },
      ],
      ctaHeading: "Want to try DietPal?",
      ctaSub:
        "DietPal is currently in development. Get in touch if you'd like early access or have questions.",
      ctaButton: "Get in touch →",
    },
  },
  tr: {
    nav: [
      { label: "Projeler", href: "#projects" },
      { label: "Hizmetler", href: "#services" },
      { label: "Hakkımızda", href: "/about-us" },
      { label: "Blog", href: "/blog" },
      { label: "Kariyer", href: "/careers" },
      { label: "İletişim", href: "#contact" },
    ] satisfies NavLink[],
    navbar: {
      hireUs: "Bizi işe al",
    },
    hero: {
      tagline: "Ürün üretiriz.\nSadece prototip değil.",
      sub: "Ankara merkezli bir yazılım, teknoloji ve inovasyon şirketiyiz. Mobil/web projeler ve yapay zeka destekli çözümler geliştiriyoruz.",
      cta: { label: "Çalışmalarımıza bak", href: "#projects" },
      ctaSecondary: { label: "İletişime geç", href: "#contact" },
      stats: {
        products: "ürün",
        founders: "kurucu",
        techStack: "Flutter · Next.js · AI",
      },
    },
    projects: {
      eyebrow: "Çalışmalarımız",
      heading: "Ürünler & Projeler",
      longPressToViewFull: "Tam görmek için basılı tutun",
      items: buildProjects("tr"),
    },
    services: {
      eyebrow: "Ne Yapıyoruz",
      heading: "Hizmetlerimiz",
      items: [
        {
          icon: "🤖",
          title: "Yapay Zeka Projeleri",
          description:
            "RAG pipeline'ları, YOLO ile bilgisayarlı görü ve LLM entegrasyonlarını kullanarak yapay zeka odaklı ürünler geliştiriyoruz — akıllı aramadan gerçek zamanlı nesne tespitine.",
        },
        {
          icon: "📱",
          title: "Uygulama Geliştirme",
          description:
            "Flutter, Next.js ve modern backend altyapıları kullanarak mobil, masaüstü ve web uygulamaları geliştiriyoruz.",
        },
        {
          icon: "☁️",
          title: "SaaS",
          description:
            "Mimari tasarımdan lansmana kadar ölçeklenebilir SaaS ürünleri tasarlayıp inşa ediyoruz — fikirleri yatırım alabilir dijital işlere dönüştürüyoruz.",
        },
      ],
    },
    about: {
      eyebrow: "Hakkımızda",
      heading: "Küçük ekip. Ciddi ürünler.",
      body: "Bir yazılım, teknoloji ve inovasyon şirketiyiz. Mobil/web projeler ve yapay zeka destekli çözümler geliştiriyoruz. 2025 yılında kurulan ve Ankara Ostim Teknokent'te faaliyet gösteren şirketimizin vizyonu, dijital dönüşümde itici güç olmak — akıllı dijital sistemlerin geleceğini şekillendiren, küresel ölçekte tanınan, inovasyon odaklı bir şirket.",
      stack: [
        { label: "Mobil", items: "Flutter · Dart · Onyx" },
        { label: "Web", items: "Next.js · TypeScript" },
        { label: "Backend", items: "Supabase · Firebase" },
        { label: "Yapay Zeka", items: "RAG · YOLO · LLM Entegrasyonu" },
        { label: "Tasarım", items: "Figma · Framer" },
      ],
      teamLabel: "Ekibimiz",
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
        { name: "Büşra Mercan", role: "Kurucu Ortak", initials: "BM" },
        { name: "Özgür", role: "Backend Geliştirici", initials: "Ö" },
      ] satisfies TeamMember[],
    },
    contact: {
      eyebrow: "İletişim",
      heading: "Aklınızda bir proje mi var? Destek mi gerekiyor?",
      sub: "1–2 yeni proje kapasitemiz var. Proje talepleri veya destek sorularınız için bize ulaşın — 24 saat içinde dönüş yaparız.",
      email: "contact@bmnova.com",
      mailSubject: "",
      mailBody: `Merhaba,

Siteniz üzerinden size ulaşıyorum.`,
      form: {
        appLabel: "İlgili uygulama",
        apps: [
          { value: "", label: "Yok" },
          { value: "dietpal", label: "DietPal" },
          { value: "fitvibe", label: "FitVibe" },
          { value: "nextstep", label: "NextStep" },
          { value: "bloomish", label: "Bloomish" },
          { value: "intyx.ai", label: "Intyx AI" },
          { value: "dynamic.intyx", label: "Dynamic Intyx" },
        ],
        name: "Ad (opsiyonel)",
        namePlaceholder: "Adınız",
        bodyGreetingWithName: "Merhaba, ben {name},",
        subject: "Konu",
        message: "Mesaj",
        submit: "E-posta ile aç",
      },
      orEmailDirectly: "— veya doğrudan e-posta —",
      links: [
        { label: "GitHub", href: "https://github.com/bmnova" },
        { label: "Twitter / X", href: "https://x.com/alimertcank?s=21" },
        { label: "LinkedIn", href: "https://linkedin.com/company/bmnova" },
        { label: "Instagram", href: "https://www.instagram.com/bmnovainnovations/" },
      ],
    },
    partnerships: {
      eyebrow: "Ortaklar",
      heading: "Stratejik Ortaklıklar",
      items: partners,
    },
    aboutUs: {
      back: "← bmnova.com",
      eyebrow: "Biz Kimiz",
      heading: "BMNova Hakkında",
      vision: {
        label: "Vizyon",
        text: "Yapay zeka destekli yazılım çözümleriyle dijital dönüşümde itici güç olmak. Vizyonumuz; akıllı dijital sistemlerin geleceğini şekillendiren, küresel ölçekte tanınan, inovasyon odaklı bir teknoloji şirketi olmaktır.",
      },
      mission: {
        label: "Misyon",
        text: "Küçük ve son derece nitelikli bir ekiple en güncel teknolojileri kullanarak yalın ve etkili yazılım çözümleri sunmak. Müşterilerimiz için iş değeri ve uzun vadeli büyüme sağlayan, ölçeklenebilir ve yatırıma değer dijital ürünler inşa etmeyi hedefliyoruz.",
      },
      teamLabel: "Ekibimiz",
      partnershipsLabel: "Stratejik Ortaklıklar",
    },
    footer: {
      careers: "Kariyer",
      privacyPolicy: "Gizlilik Politikası",
      termsOfUse: "Kullanım Koşulları",
      refundPolicy: "İade Politikası",
      accountDataDeletion: "Hesap ve Veri Silme",
      copyright: "BMNova. Tüm hakları saklıdır.",
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
    },
    careers: {
      title: "Kariyer",
      subtitle:
        "Ciddi ürünler geliştiren küçük bir ekibiz. Keskin, bağımsız çalışabilen ve önemli şeyler üretmek isteyen biri arıyorsak — sizden haber almak isteriz.",
      back: "← bmnova.com",
      opening: {
        title: "Mobil Uygulama Büyüme Uzmanı",
        type: "Yarı zamanlı · Uzaktan",
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
    offer: {
      back: "← bmnova.com",
      eyebrow: "Nasıl çalışır",
      heading: "Gerçek insanlar. Gerçek mekanlar. Gerçek anlar.",
      description:
        "Yerel işletmelerde çevrenizdekilere içecek, atıştırmalık veya başka şeyler ısmarlayarak onlarla bağlantı kurun. Buzu kırın, yeni yerler keşfedin ve gerçek bağlar kurun.",
      features: [
        {
          icon: "☕",
          title: "Bir şey ısmarla, konuşma başlat",
          description:
            "Yakınınızdaki birine yerel bir işletmede sanal bir ısmarlama gönderin — kahve, atıştırmalık, her neyse. Buzu anında kıran basit bir jest.",
        },
        {
          icon: "📍",
          title: "Yerel mekanları keşfet",
          description:
            "Çevrenizdeki işletmelere göz atın ve kimlerin orada olduğunu görün. Zaten orada olan insanlar aracılığıyla yeni kafeler, restoranlar ve buluşma noktaları bulun.",
        },
        {
          icon: "🤝",
          title: "Ortak ilgi alanlarına sahip insanlarla tanış",
          description:
            "Offer, aynı tür mekanları seven insanlarla eşleştirir. Kaydırma yok, algoritma yok — sadece samimi bir ısmarlama ve gerçek bir an.",
        },
        {
          icon: "🌍",
          title: "Şehrini küçült",
          description:
            "İster yeni taşınmış olun ister çevrenizi genişletmek isteyin, Offer gündelik mekanları gerçek bağlantı alanlarına dönüştürür.",
        },
      ],
      ctaHeading: "Offer'a ilginiz mi var?",
      ctaSub:
        "Offer'ı aktif olarak geliştiriyoruz. Daha fazla bilgi almak veya erken erişim için bize ulaşın.",
      ctaButton: "İletişime geç →",
    },
    nextstep: {
      back: "← bmnova.com",
      eyebrow: "NextStep ne yapar",
      heading: "Düşünce döngüsünü kır. Harekete geç.",
      description:
        "Aşırı düşünmeyi eyleme dönüştüren minimalist bir yapay zeka koçluk uygulaması. Bir yansıma, bir soru, bir net sonraki adım.",
      features: [
        {
          icon: "🎯",
          title: "Amaca özel yapay zeka koçları",
          description:
            "Genel amaçlı bir sohbet botu değil. NextStep; planlama, karar verme, alışkanlıklar, gözden geçirme ve odaklanma için özel koçlar sunar.",
        },
        {
          icon: "✅",
          title: "Eyleme yönelik çıktı",
          description:
            "Her yanıt, genellikle beş dakika içinde yapabileceğiniz somut ve küçük bir eylemle biter.",
        },
        {
          icon: "🧘",
          title: "Sakin, minimalist arayüz",
          description:
            "Dashboard, grafik veya karmaşık kurulum yok. Her ekran tam olarak bir soruyu yanıtlar. Ne yapacağınızı bildiğinizde uygulamayı kapatın.",
        },
        {
          icon: "🔁",
          title: "Yansıma → Soru → Sonraki Adım",
          description:
            "Her oturum, gürültüyü azaltmak ve netliği artırmak için tasarlanmış basit ve tekrarlanabilir bir yapıyı izler — sizi daha uzun süre ekranda tutmak için değil.",
        },
      ],
      ctaHeading: "NextStep'i denemek ister misiniz?",
      ctaSub:
        "NextStep şu anda geliştirme aşamasında. Erken erişim veya sorularınız için bize ulaşın.",
      ctaButton: "İletişime geç →",
    },
    dietpal: {
      back: "← bmnova.com",
      eyebrow: "DietPal ne yapar",
      heading: "Sağlık hedeflerinize ulaşmak için bütünsel bir yaklaşım.",
      description:
        "İhtiyaçlarınıza ve yaşam tarzınıza göre planınızı kişiselleştiren yapay zeka destekli diyet uygulaması. Yiyecekleri, egzersizi ve refahı takip edin — ardından hedeflerinize ulaşmak için içgörüler alın.",
      demoAlt: "DietPal uygulama demosu",
      features: [
        {
          icon: "🧠",
          title: "Yapay zeka ile kişiselleştirme",
          description:
            "DietPal, genel bir şablondan değil, size gerçekten uyan bir plan oluşturmak için beslenme ihtiyaçlarınızı, hedeflerinizi ve yaşam tarzınızı öğrenir.",
        },
        {
          icon: "🥗",
          title: "Yiyecek ve egzersiz takibi",
          description:
            "Öğün ve antrenmanlarınızı kolayca kaydedin. DietPal, günlük alımınız ve aktiviteniz hakkında size rakamlarla bunaltmadan net bir tablo sunar.",
        },
        {
          icon: "📊",
          title: "Önemli içgörüler",
          description:
            "Verilerinize dayalı net ve eyleme geçirilebilir geri bildirimler alın. DietPal, her gün daha iyi seçimler yapabilmeniz için önemli kalıpları öne çıkarır.",
        },
        {
          icon: "💚",
          title: "Bütünsel sağlık",
          description:
            "Diyet yalnızca bir parça. DietPal aynı zamanda uyku, stres ve enerjinizi de takip ederek sağlık yolculuğunuzun eksiksiz bir resmini sunar.",
        },
      ],
      ctaHeading: "DietPal'ı denemek ister misiniz?",
      ctaSub:
        "DietPal şu anda geliştirme aşamasında. Erken erişim veya sorularınız için bize ulaşın.",
      ctaButton: "İletişime geç →",
    },
  },
};
