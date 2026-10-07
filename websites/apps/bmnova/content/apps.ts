import { storeLinks, type StoreKey } from "@/config/store-links";
import { pageMetadata, type Locale } from "@/lib/i18n";
import type { FirstPartyProject } from "@/lib/site";

export type AppSlug = FirstPartyProject;
export type AppStatus = "live" | "review" | "lab";

export type FeatureIcon =
  | "pen"
  | "user"
  | "sparkle"
  | "grid"
  | "book"
  | "arrow"
  | "camera"
  | "chart"
  | "heart"
  | "bulb"
  | "closet"
  | "hanger"
  | "cart"
  | "pin"
  | "users"
  | "home"
  | "cup"
  | "syringe"
  | "smile"
  | "doc"
  | "shield"
  | "gift"
  | "sun"
  | "screen"
  | "steps"
  | "wallet"
  | "box";

type AppCopy = {
  /** Category label, e.g. "Health · GLP-1 companion" */
  category: string;
  /** Short tag used in chips, tickers and cross-links */
  tag: string;
  /** Two or three sentences for the home grid card */
  card: string;
  heroBefore: string;
  heroAccent: string;
  heroBody: string;
  stepsTitle: string;
  steps: { title: string; body: string }[];
  featuresTitle: string;
  features: { icon: FeatureIcon; title: string; body: string; wide?: boolean; plus?: boolean }[];
  ctaTitle: string;
  ctaBody: string;
  /** Short floating labels around the hero phone */
  stickers: string[];
  /** Extra hero facts after the status, e.g. "12 purpose-built coaches" */
  facts: string[];
};

export type AppInfo = {
  slug: AppSlug;
  name: string;
  /** Display colour on the ink ground (lifted from the store brand colour for contrast) */
  color: string;
  icon: string;
  status: AppStatus;
  platforms: "both" | "android";
  store?: StoreKey;
  screenshots: string[];
  copy: Record<Locale, AppCopy>;
};

const shots = (slug: AppSlug, n: number) =>
  Array.from({ length: n }, (_, i) => `/apps/${slug}/store-${i + 1}.webp`);

export const APPS: Record<AppSlug, AppInfo> = {
  pali: {
    slug: "pali",
    name: "Pali",
    color: "#5B8CFF",
    icon: "/apps/pali/icon.webp",
    status: "live",
    platforms: "both",
    store: "pali",
    screenshots: [],
    copy: {
      en: {
        category: "Health · GLP-1 companion",
        tag: "GLP-1 companion",
        card: "The kind companion for your GLP-1 journey. Pali tracks your shots, how you feel, protein, water and weight, then spots the patterns in your week. It tracks, it doesn't advise.",
        heroBefore: "Your GLP-1 week,",
        heroAccent: "tracked kindly.",
        heroBody:
          "Pali keeps track of your shots, how you feel, protein, water and weight, and spots the patterns in your week. It tracks, it doesn't advise: dose changes are always your doctor's call.",
        stepsTitle: "Set up once. Then just tell Pali how it went.",
        steps: [
          { title: "Set up your pen", body: "Which medication, which strength, how often. Pali builds your week around it, with gentle reminders if you want them." },
          { title: "Log the shot", body: "Pick the spot on the body map; Pali suggests one that has been rested. Add a pain score and watch it get easier." },
          { title: "Check in daily", body: "Nausea, fatigue, heartburn, food noise. Thirty seconds, and the patterns show up over the shot cycle." },
          { title: "Review the week", body: "A look back at your shot week, how you felt, protein and water. One thing to focus on next week." },
        ],
        featuresTitle: "Protein and fibre carry a GLP-1 week. Pali carries the rest.",
        features: [
          { icon: "syringe", wide: true, title: "Shots and injection sites", body: "Weekly or every few days, your dose on the pen, a body map that remembers which spot was used in the last two weeks, and a pain score after each shot." },
          { icon: "smile", title: "How-you-feel check-ins", body: "Nausea, fatigue, heartburn, constipation, low appetite and food noise, each on a four-step scale. Patterns, never blame." },
          { icon: "chart", title: "Protein and water first", body: "A protein target from your goal weight to protect muscle and a water goal to sip through the day. Calories are a floor, never a cap." },
          { icon: "camera", title: "Meal photo logging", body: "Snap the plate and AI estimates protein and calories. Small-plate, slow-sip tips for the days after your shot." },
          { icon: "sparkle", title: "Journey and milestones", body: "First shot, four weeks, twelve weeks, weight lost. Pali's wardrobe is earned on the way, never bought." },
          { icon: "doc", plus: true, title: "Doctor report", body: "Shots, side effects, weight and protein in one shareable summary for your next appointment." },
        ],
        ctaTitle: "Your shot week, one tap at a time.",
        ctaBody: "Free to download. Plus adds the doctor report, meal photos and Pali chat.",
        stickers: ["First shot ✓ · milestone", "Protein 62 / 90 g"],
        facts: [],
      },
      tr: {
        category: "Sağlık · GLP-1 yol arkadaşı",
        tag: "GLP-1 yol arkadaşı",
        card: "GLP-1 yolculuğunun nazik yol arkadaşı. Pali iğnelerini, nasıl hissettiğini, proteini, suyu ve kiloyu takip eder, haftandaki örüntüleri yakalar. Takip eder, tavsiye vermez.",
        heroBefore: "GLP-1 haftan,",
        heroAccent: "nazikçe takipte.",
        heroBody:
          "Pali iğnelerini, nasıl hissettiğini, proteini, suyu ve kiloyu takip eder, haftandaki örüntüleri yakalar. Takip eder, tavsiye vermez: doz kararı her zaman doktorunundur.",
        stepsTitle: "Bir kez kur. Sonra Pali'ye nasıl geçtiğini anlat.",
        steps: [
          { title: "Kalemini tanıt", body: "Hangi ilaç, hangi doz, ne sıklıkla. Pali haftanı buna göre kurar; istersen nazik hatırlatmalar da gönderir." },
          { title: "İğneyi kaydet", body: "Vücut haritasından bölgeyi seç; Pali dinlenmiş bir bölge önerir. Ağrı puanı ekle, her seferinde kolaylaştığını gör." },
          { title: "Her gün kısa bir check-in", body: "Mide bulantısı, yorgunluk, mide ekşimesi, yemek gürültüsü. Otuz saniye; örüntüler iğne döngüsü boyunca ortaya çıkar." },
          { title: "Haftayı birlikte değerlendir", body: "İğne haftana, nasıl hissettiğine, protein ve suya bir bakış. Gelecek hafta için tek bir odak." },
        ],
        featuresTitle: "GLP-1 haftasını protein ve lif taşır. Gerisini Pali.",
        features: [
          { icon: "syringe", wide: true, title: "İğneler ve enjeksiyon bölgeleri", body: "Haftalık ya da birkaç günde bir, kalemindeki doz, son iki haftada hangi bölgenin kullanıldığını hatırlayan vücut haritası ve her iğneden sonra ağrı puanı." },
          { icon: "smile", title: "Nasıl hissediyorsun?", body: "Mide bulantısı, yorgunluk, mide ekşimesi, kabızlık, iştahsızlık ve yemek gürültüsü; her biri dört basamaklı ölçekte. Örüntüler var, suçlama yok." },
          { icon: "chart", title: "Önce protein ve su", body: "Kasını korumak için hedef kilona göre protein hedefi, gün boyu yudumlaman için su hedefi. Kalori bir taban, asla tavan değil." },
          { icon: "camera", title: "Fotoğrafla öğün kaydı", body: "Tabağın fotoğrafını çek, yapay zekâ protein ve kaloriyi tahmin etsin. İğne sonrası günler için küçük tabak, yavaş yudum ipuçları." },
          { icon: "sparkle", title: "Yolculuk ve kilometre taşları", body: "İlk iğne, dört hafta, on iki hafta, verilen kilo. Pali'nin gardırobu yolda kazanılır, satın alınmaz." },
          { icon: "doc", plus: true, title: "Doktor raporu", body: "İğneler, yan etkiler, kilo ve protein bir sonraki randevun için tek bir paylaşılabilir özette." },
        ],
        ctaTitle: "İğne haftan, her seferinde tek dokunuş.",
        ctaBody: "Ücretsiz indir. Plus; doktor raporu, fotoğrafla öğün kaydı ve Pali sohbetini ekler.",
        stickers: ["İlk iğne ✓ · kilometre taşı", "Protein 62 / 90 g"],
        facts: [],
      },
    },
  },
  fitvibe: {
    slug: "fitvibe",
    name: "FitVibe",
    color: "#FF7A2F",
    icon: "/apps/fitvibe/icon.webp",
    status: "live",
    platforms: "both",
    store: "fitvibe",
    screenshots: shots("fitvibe", 5),
    copy: {
      en: {
        category: "Fashion · AI wardrobe",
        tag: "AI wardrobe",
        card: "Your closet, digitised. AI outfits from what you own, virtual try-on and a stylist that knows what's missing.",
        heroBefore: "Your closet,",
        heroAccent: "finally smart.",
        heroBody:
          "Add your clothes with automatic background removal, get outfit combinations from what you actually own, discover what's missing, and try on any look before you commit.",
        stepsTitle: "From pile to plan in three steps.",
        steps: [
          { title: "Add your clothes", body: "Snap each item. Backgrounds vanish and categories fill themselves in." },
          { title: "Ask the stylist", body: "“Dinner on Friday, a bit dressy.” The agentic stylist builds outfits from what you own." },
          { title: "Try on, plan, share", body: "Preview the look on you, drop it on the calendar, share a board from the style canvas." },
        ],
        featuresTitle: "Style smarter, not harder.",
        features: [
          { icon: "closet", title: "Digital wardrobe", body: "Add clothes with automatic background removal. A clean, organised catalogue of everything you own." },
          { icon: "sparkle", title: "Agentic AI stylist", body: "It doesn't just suggest, it acts. Ask for an outfit, a wardrobe analysis or what's missing, and it gets it done." },
          { icon: "hanger", title: "AI outfit combinations", body: "Describe an occasion or a mood and get outfits from your actual clothes. No more “nothing to wear”." },
          { icon: "user", title: "Virtual try-on", body: "See how an outfit looks on you before you commit, from a single photo." },
          { icon: "chart", title: "Wardrobe analysis", body: "Gaps, duplicates and styling opportunities. FitVibe tells you exactly what would complete your collection." },
          { icon: "grid", title: "Style canvas", body: "Compose and share outfit boards. Pick items, arrange them, export a polished look." },
        ],
        ctaTitle: "Never “nothing to wear” again.",
        ctaBody: "Free to download. Questions or partnerships: contact@bmnova.com",
        stickers: ["3 outfits for Friday ✓"],
        facts: [],
      },
      tr: {
        category: "Moda · Yapay zekâ gardırop",
        tag: "Yapay zekâ gardırop",
        card: "Dolabın artık dijital. Sahip olduklarından yapay zekâ kombinleri, sanal deneme ve neyin eksik olduğunu bilen bir stilist.",
        heroBefore: "Dolabın,",
        heroAccent: "sonunda akıllı.",
        heroBody:
          "Kıyafetlerini otomatik arka plan kaldırmayla ekle, gerçekten sahip olduklarından kombin önerileri al, eksiklerini keşfet ve karar vermeden önce her görünümü üzerinde dene.",
        stepsTitle: "Yığından plana üç adımda.",
        steps: [
          { title: "Kıyafetlerini ekle", body: "Her parçanın fotoğrafını çek. Arka plan kaybolur, kategoriler kendiliğinden dolar." },
          { title: "Stiliste sor", body: "“Cuma akşam yemeği, biraz şık.” Stilist, dolabındakilerden kombin kurar." },
          { title: "Dene, planla, paylaş", body: "Görünümü üzerinde gör, takvime ekle, stil tuvalinden bir pano paylaş." },
        ],
        featuresTitle: "Daha az uğraş, daha çok stil.",
        features: [
          { icon: "closet", title: "Dijital gardırop", body: "Kıyafetleri otomatik arka plan kaldırmayla ekle. Sahip olduğun her şeyin derli toplu bir kataloğu." },
          { icon: "sparkle", title: "Harekete geçen yapay zekâ stilist", body: "Sadece önermez, yapar. Kombin, gardırop analizi ya da eksik parçaları iste; halleder." },
          { icon: "hanger", title: "Yapay zekâ kombinleri", body: "Bir davet ya da bir ruh hâli anlat, gerçek kıyafetlerinden kombinler al. “Giyecek bir şeyim yok” devri bitti." },
          { icon: "user", title: "Sanal deneme", body: "Karar vermeden önce kombinin üzerinde nasıl durduğunu tek bir fotoğrafla gör." },
          { icon: "chart", title: "Gardırop analizi", body: "Boşluklar, tekrarlar ve stil fırsatları. FitVibe koleksiyonunu neyin tamamlayacağını söyler." },
          { icon: "grid", title: "Stil tuvali", body: "Kombin panoları oluştur ve paylaş. Parçaları seç, yerleştir, şık bir görünüm olarak dışa aktar." },
        ],
        ctaTitle: "“Giyecek bir şeyim yok” bir daha yok.",
        ctaBody: "Ücretsiz indir. Soru ve iş birlikleri için: contact@bmnova.com",
        stickers: ["Cuma için 3 kombin ✓"],
        facts: [],
      },
    },
  },
  haki: {
    slug: "haki",
    name: "Haki",
    color: "#FF3EA5",
    icon: "/apps/haki/icon.webp",
    status: "live",
    platforms: "both",
    store: "haki",
    screenshots: shots("haki", 5),
    copy: {
      en: {
        category: "Entertainment · AI manga creator",
        tag: "AI manga creator",
        card: "Script a story, define your hero, pick a style. Full manga, manhwa and comic pages in minutes.",
        heroBefore: "Your story. Your hero. Manga pages in",
        heroAccent: "minutes.",
        heroBody:
          "Haki turns your stories and photos into real multi-panel pages. Script your vision, add a face for your cast, pick a style, and generate pages you can edit, save and continue.",
        stepsTitle: "Blank page to full page in four taps.",
        steps: [
          { title: "Script the scene", body: "Describe what happens. One sentence is enough; a paragraph is better." },
          { title: "Build your cast", body: "A photo, a name, a role, a look. Haki keeps the same faces across every panel." },
          { title: "Pick a visual DNA", body: "Comic, manga or manhwa, then a style and a genre, from action to isekai." },
          { title: "Generate and continue", body: "Full panels with dialogue and pacing. Edit bubbles, save, write the next page." },
        ],
        featuresTitle: "Everything a mangaka needs. Nothing they don't.",
        features: [
          { icon: "pen", wide: true, title: "Script your vision", body: "Describe the scene you want to bring to life. Haki turns your story prompt into a draft ready for cast setup and panel generation." },
          { icon: "user", title: "Same faces, every panel", body: "Define your protagonist with a photo, name, role and look. Haki keeps your cast consistent across the page." },
          { icon: "sparkle", title: "Visual DNA and genres", body: "Shonen, Seinen, Shojo or Cyberpunk, then Action, Fantasy, Romance or Isekai." },
          { icon: "grid", title: "Real multi-panel pages", body: "Not a single AI image: full pages with panel layouts, dialogue and a clear reading flow." },
          { icon: "book", title: "Edit bubbles, fix panels", body: "Change dialogue, regenerate a panel, keep the rest. Your library keeps every chapter." },
          { icon: "arrow", title: "Continue the story", body: "Finished a chapter? New prompts generate the next page without losing continuity." },
        ],
        ctaTitle: "Your first page is one tap away.",
        ctaBody: "Free to download. Questions, early access or partnerships: contact@bmnova.com",
        stickers: ["Shonen", "Isekai", "Shojo", "Noir"],
        facts: [],
      },
      tr: {
        category: "Eğlence · Yapay zekâ manga",
        tag: "Yapay zekâ manga",
        card: "Hikâyeni yaz, kahramanını belirle, bir tarz seç. Dakikalar içinde tam manga, manhwa ve çizgi roman sayfaları.",
        heroBefore: "Hikâyen. Kahramanın. Manga sayfaları",
        heroAccent: "dakikalar içinde.",
        heroBody:
          "Haki hikâyelerini ve fotoğraflarını çok panelli gerçek sayfalara dönüştürür. Senaryonu yaz, karakterlerine bir yüz ekle, bir tarz seç; düzenleyebileceğin, kaydedebileceğin ve devam ettirebileceğin sayfalar üret.",
        stepsTitle: "Boş sayfadan dolu sayfaya dört dokunuş.",
        steps: [
          { title: "Sahneyi yaz", body: "Ne olduğunu anlat. Bir cümle yeter; bir paragraf daha da iyi." },
          { title: "Kadronu kur", body: "Bir fotoğraf, bir isim, bir rol, bir görünüm. Haki her panelde aynı yüzleri korur." },
          { title: "Görsel DNA'yı seç", body: "Çizgi roman, manga ya da manhwa; sonra bir tarz ve aksiyondan isekaiye bir tür." },
          { title: "Üret ve devam et", body: "Diyaloğu ve ritmiyle tam paneller. Balonları düzenle, kaydet, sonraki sayfayı yaz." },
        ],
        featuresTitle: "Bir mangakanın ihtiyacı olan her şey. Fazlası değil.",
        features: [
          { icon: "pen", wide: true, title: "Senaryonu yaz", body: "Canlandırmak istediğin sahneyi anlat. Haki hikâye fikrini karakter kurulumuna ve panel üretimine hazır bir taslağa çevirir." },
          { icon: "user", title: "Her panelde aynı yüzler", body: "Kahramanını bir fotoğraf, isim, rol ve görünümle tanımla. Haki kadronu sayfa boyunca tutarlı tutar." },
          { icon: "sparkle", title: "Görsel DNA ve türler", body: "Shonen, Seinen, Shojo ya da Cyberpunk; sonra Aksiyon, Fantastik, Romantik ya da Isekai." },
          { icon: "grid", title: "Çok panelli gerçek sayfalar", body: "Tek bir yapay zekâ görseli değil: panel düzeni, diyaloglar ve net bir okuma akışıyla tam sayfalar." },
          { icon: "book", title: "Balonları düzenle, panelleri düzelt", body: "Diyaloğu değiştir, bir paneli yeniden üret, gerisini koru. Kütüphanen her bölümü saklar." },
          { icon: "arrow", title: "Hikâyeye devam et", body: "Bir bölümü bitirdin mi? Yeni istemler sürekliliği bozmadan sonraki sayfayı üretir." },
        ],
        ctaTitle: "İlk sayfan bir dokunuş uzağında.",
        ctaBody: "Ücretsiz indir. Soru, erken erişim ya da iş birlikleri için: contact@bmnova.com",
        stickers: ["Shonen", "Isekai", "Shojo", "Noir"],
        facts: [],
      },
    },
  },
  roompace: {
    slug: "roompace",
    name: "RoomPace",
    color: "#5BC48B",
    icon: "/apps/roompace/icon.webp",
    status: "live",
    platforms: "both",
    store: "roompace",
    screenshots: shots("roompace", 5),
    copy: {
      en: {
        category: "Home · Budget AI design",
        tag: "AI interior design",
        card: "Photo in, budget set, room redesigned. With a shoppable wishlist of real furniture.",
        heroBefore: "Beautiful rooms, designed to",
        heroAccent: "your budget.",
        heroBody:
          "Set how much you want to spend, upload a photo of your space, and get AI layouts that respect the number, each with a wishlist of real furniture you can shop.",
        stepsTitle: "Budget first. Then the pretty part.",
        steps: [
          { title: "Set your budget", body: "A number you're comfortable with. Every design that follows respects it." },
          { title: "Upload a photo", body: "Your actual room; a phone camera is fine. Pick the room type and a vibe." },
          { title: "Compare styles", body: "Modern, cozy, bohemian and more. Refine any render with a simple prompt." },
          { title: "Shop the wishlist", body: "Every design comes with real furniture and decor, prices and purchase links." },
        ],
        featuresTitle: "A beautiful home without overspending.",
        features: [
          { icon: "wallet", title: "Budget-aware design", body: "Room designs that respect your numbers, from a light refresh to a full makeover." },
          { icon: "camera", title: "Photo to AI layout", body: "Upload a photo, pick your room type and vibe, and get a curated AI render in seconds." },
          { icon: "sparkle", title: "Explore interior styles", body: "Browse styles on the Inspire screen, discover your aesthetic and compare looks before you commit." },
          { icon: "pen", title: "Refine every detail", body: "Iterate on your render with simple prompts or auto-rearrange until it feels right." },
          { icon: "grid", title: "My Rooms gallery", body: "Every AI room concept in one organised gallery. Revisit your designs anytime." },
          { icon: "cart", title: "Shoppable wishlist", body: "A per-room wishlist of real furniture and decor, with prices and purchase links." },
        ],
        ctaTitle: "Your room, your number, your style.",
        ctaBody: "Free to download. Questions or partnerships: contact@bmnova.com",
        stickers: [],
        facts: [],
      },
      tr: {
        category: "Ev · Bütçeye göre yapay zekâ tasarım",
        tag: "Yapay zekâ iç mimari",
        card: "Fotoğrafı yükle, bütçeni belirle, odan yeniden tasarlansın. Gerçek mobilyalardan alışveriş listesiyle.",
        heroBefore: "Güzel odalar,",
        heroAccent: "bütçene göre.",
        heroBody:
          "Ne kadar harcamak istediğini belirle, odanın fotoğrafını yükle ve bu rakama sadık kalan yapay zekâ tasarımları al; her birinde satın alabileceğin gerçek mobilyalardan bir liste var.",
        stepsTitle: "Önce bütçe. Sonra güzel kısım.",
        steps: [
          { title: "Bütçeni belirle", body: "İçine sinen bir rakam. Sonraki her tasarım ona sadık kalır." },
          { title: "Fotoğraf yükle", body: "Kendi odan; telefon kamerası yeterli. Oda tipini ve havasını seç." },
          { title: "Tarzları karşılaştır", body: "Modern, sıcak, bohem ve daha fazlası. Her tasarımı basit bir istemle iyileştir." },
          { title: "Listeden alışveriş yap", body: "Her tasarım gerçek mobilya ve dekor ürünleri, fiyatları ve satın alma linkleriyle gelir." },
        ],
        featuresTitle: "Fazla harcamadan güzel bir ev.",
        features: [
          { icon: "wallet", title: "Bütçeye duyarlı tasarım", body: "Hafif bir tazelemeden tam yenilemeye, rakamlarına saygı duyan oda tasarımları." },
          { icon: "camera", title: "Fotoğraftan yapay zekâ tasarımına", body: "Fotoğraf yükle, oda tipini ve havasını seç, saniyeler içinde özenli bir tasarım al." },
          { icon: "sparkle", title: "İç mekân tarzlarını keşfet", body: "İlham ekranında tarzlara göz at, estetiğini keşfet, karar vermeden önce görünümleri karşılaştır." },
          { icon: "pen", title: "Her detayı iyileştir", body: "Tasarımını basit istemlerle ya da otomatik yeniden düzenlemeyle içine sinene kadar geliştir." },
          { icon: "grid", title: "Odalarım galerisi", body: "Tüm yapay zekâ oda fikirlerin tek bir düzenli galeride. İstediğin zaman geri dön." },
          { icon: "cart", title: "Alışveriş listesi", body: "Her oda için fiyatları ve satın alma linkleriyle gerçek mobilya ve dekor listesi." },
        ],
        ctaTitle: "Senin odan, senin bütçen, senin tarzın.",
        ctaBody: "Ücretsiz indir. Soru ve iş birlikleri için: contact@bmnova.com",
        stickers: [],
        facts: [],
      },
    },
  },
  nextstep: {
    slug: "nextstep",
    name: "NextStep",
    color: "#A855F7",
    icon: "/apps/nextstep/icon.webp",
    status: "review",
    platforms: "both",
    screenshots: [],
    copy: {
      en: {
        category: "Coaching · AI clarity",
        tag: "AI clarity coach",
        card: "Overthinking in, one clear next step out. One reflection, one question, one action.",
        heroBefore: "Stop thinking in circles.",
        heroAccent: "Start moving.",
        heroBody:
          "A minimalist AI coaching app that turns overthinking into action. One reflection, one question, one clear next step you can do in under five minutes.",
        stepsTitle: "One reflection. One question. One step.",
        steps: [
          { title: "Pick a coach", body: "Focus, decisions, habits, planning. Each coach has its own rules, tone and structure." },
          { title: "Say what's on your mind", body: "No setup, no goals dashboard. Just the thing you keep circling around." },
          { title: "Get one step", body: "Every answer ends with exactly one concrete action, small enough to do now." },
        ],
        featuresTitle: "Every screen answers exactly one question.",
        features: [
          { icon: "users", wide: true, title: "Purpose-built AI coaches", body: "Not a generic chatbot. Focused coaches for planning, decisions, habits, weekly review and focus, each with its own rules, tone and structure." },
          { icon: "steps", title: "Action-first output", body: "Every response ends with exactly one concrete action, often doable in under five minutes." },
          { icon: "screen", title: "Calm, minimalist UX", body: "No dashboards, graphs or setup complexity. Close the app when you know what to do." },
          { icon: "shield", title: "Safe and private by design", body: "AI calls are proxied server-side and every response is validated before you see it." },
        ],
        ctaTitle: "Know what to do next. Then close the app.",
        ctaBody: "NextStep is in App Store review. Leave your email and we'll tell you on launch day.",
        stickers: ["Focus Sprint", "Decision Maker", "5-Minute Spark"],
        facts: ["12 purpose-built coaches"],
      },
      tr: {
        category: "Koçluk · Yapay zekâ netlik",
        tag: "Yapay zekâ netlik koçu",
        card: "Aşırı düşünce girer, net bir sonraki adım çıkar. Bir yansıma, bir soru, bir eylem.",
        heroBefore: "Kısır döngüde düşünmeyi bırak.",
        heroAccent: "Harekete geç.",
        heroBody:
          "Aşırı düşünmeyi eyleme çeviren minimalist bir yapay zekâ koçluk uygulaması. Bir yansıma, bir soru ve beş dakikadan kısa sürede yapabileceğin net bir sonraki adım.",
        stepsTitle: "Bir yansıma. Bir soru. Bir adım.",
        steps: [
          { title: "Bir koç seç", body: "Odak, karar, alışkanlık, planlama. Her koçun kendi kuralları, tonu ve yapısı var." },
          { title: "Aklındakini söyle", body: "Kurulum yok, hedef paneli yok. Sadece etrafında dönüp durduğun şey." },
          { title: "Tek bir adım al", body: "Her yanıt, hemen yapabileceğin kadar küçük tek bir somut eylemle biter." },
        ],
        featuresTitle: "Her ekran tek bir soruyu yanıtlar.",
        features: [
          { icon: "users", wide: true, title: "Amaca özel yapay zekâ koçları", body: "Genel bir sohbet botu değil. Planlama, karar, alışkanlık, haftalık değerlendirme ve odak için kendi kuralları, tonu ve yapısı olan koçlar." },
          { icon: "steps", title: "Önce eylem", body: "Her yanıt, çoğu zaman beş dakikadan kısa sürede yapılabilecek tek bir somut eylemle biter." },
          { icon: "screen", title: "Sakin, minimalist deneyim", body: "Panel, grafik ya da karmaşık kurulum yok. Ne yapacağını bildiğinde uygulamayı kapat." },
          { icon: "shield", title: "Tasarımdan güvenli ve gizli", body: "Yapay zekâ çağrıları sunucu üzerinden geçer, her yanıt sana ulaşmadan önce doğrulanır." },
        ],
        ctaTitle: "Sıradaki adımı bil. Sonra uygulamayı kapat.",
        ctaBody: "NextStep App Store incelemesinde. E-postanı bırak, yayın günü haber verelim.",
        stickers: ["Focus Sprint", "Decision Maker", "5-Minute Spark"],
        facts: ["Amaca özel 12 koç"],
      },
    },
  },
  bloomish: {
    slug: "bloomish",
    name: "Bloomish",
    color: "#FF6B8B",
    icon: "/apps/bloomish/icon.webp",
    status: "lab",
    platforms: "both",
    screenshots: [],
    copy: {
      en: {
        category: "Gifts · AI bouquets",
        tag: "AI bouquet gifts",
        card: "Turn a feeling into a bouquet and send it to someone who matters.",
        heroBefore: "Turn a feeling into a",
        heroAccent: "bouquet.",
        heroBody:
          "Describe a person, an occasion or a mood. Bloomish generates a one-of-a-kind bouquet and sends it as a gift, beautifully wrapped, no delivery van required.",
        stepsTitle: "A feeling in, a gift out.",
        steps: [
          { title: "Describe the feeling", body: "“Thank you for always picking up the phone.” A sentence is enough. Or pick flowers yourself." },
          { title: "Watch it bloom", body: "The AI generates a unique arrangement with wrapping and a card. Regenerate until it's right." },
          { title: "Send a link", body: "They open a personal unwrapping, anywhere in the world." },
        ],
        featuresTitle: "Send it to someone who matters.",
        features: [
          { icon: "sparkle", wide: true, title: "AI-generated bouquets", body: "Describe a feeling, a person or an occasion. Bloomish generates a bouquet tailored to your words. Every arrangement is one of a kind." },
          { icon: "gift", title: "Send as a gift", body: "Share via link or in-app message. Recipients get a personal gift experience, no delivery required." },
          { icon: "heart", title: "Save and share moments", body: "Keep favourites in your collection and share bouquets with your close circle." },
          { icon: "sun", title: "Endlessly customisable", body: "Choose flowers, colours, wrapping and style, or let the AI surprise you." },
        ],
        ctaTitle: "Say it with a bouquet that didn't exist a minute ago.",
        ctaBody: "Bloomish is in the lab. Leave your email for early access.",
        stickers: ["“For mom's birthday”", "Sent as a gift ✓"],
        facts: ["20+ flower types"],
      },
      tr: {
        category: "Hediye · Yapay zekâ buketleri",
        tag: "Yapay zekâ buket hediyesi",
        card: "Bir duyguyu bukete dönüştür ve önemsediğin birine gönder.",
        heroBefore: "Bir duyguyu",
        heroAccent: "bukete dönüştür.",
        heroBody:
          "Bir kişiyi, bir anı ya da bir ruh hâlini anlat. Bloomish eşi benzeri olmayan bir buket üretir ve özenle paketlenmiş bir hediye olarak gönderir; kurye gerekmez.",
        stepsTitle: "İçeri bir duygu, dışarı bir hediye.",
        steps: [
          { title: "Duyguyu anlat", body: "“Telefonu hep açtığın için teşekkürler.” Bir cümle yeter. Ya da çiçekleri kendin seç." },
          { title: "Açışını izle", body: "Yapay zekâ paketi ve kartıyla eşsiz bir aranjman üretir. Tam istediğin gibi olana kadar yenile." },
          { title: "Bir link gönder", body: "Karşı taraf, dünyanın neresinde olursa olsun, kişisel bir hediye açılışı yaşar." },
        ],
        featuresTitle: "Önemsediğin birine gönder.",
        features: [
          { icon: "sparkle", wide: true, title: "Yapay zekâ buketleri", body: "Bir duyguyu, bir kişiyi ya da bir anı anlat. Bloomish sözlerine özel bir buket üretir. Her aranjman tektir." },
          { icon: "gift", title: "Hediye olarak gönder", body: "Link ya da uygulama içi mesajla paylaş. Alıcı kişisel bir hediye deneyimi yaşar; teslimat gerekmez." },
          { icon: "heart", title: "Anları sakla ve paylaş", body: "Favorilerini koleksiyonunda tut, buketleri yakınlarınla paylaş." },
          { icon: "sun", title: "Sonsuz özelleştirme", body: "Çiçekleri, renkleri, paketi ve tarzı sen seç ya da yapay zekâ seni şaşırtsın." },
        ],
        ctaTitle: "Bir dakika önce var olmayan bir buketle söyle.",
        ctaBody: "Bloomish laboratuvarda. Erken erişim için e-postanı bırak.",
        stickers: ["“Annemin doğum günü için”", "Hediye gönderildi ✓"],
        facts: ["20'den fazla çiçek türü"],
      },
    },
  },
  offer: {
    slug: "offer",
    name: "Offer",
    color: "#FFB224",
    icon: "/apps/offer/icon.webp",
    status: "live",
    platforms: "android",
    store: "offer",
    screenshots: [],
    copy: {
      en: {
        category: "Social · Icebreaker",
        tag: "Social icebreaker",
        card: "Offer someone a coffee at a place nearby. Break the ice, meet real people.",
        heroBefore: "Offer someone a coffee.",
        heroAccent: "Meet for real.",
        heroBody:
          "Check in at a café, see who's there, and offer them a drink or a snack from the menu. No swiping, no algorithms. A simple gesture that breaks the ice at a real place.",
        stepsTitle: "Real people. Real places. Real moments.",
        steps: [
          { title: "Check in", body: "Arrive at a partner café, bar or restaurant and check in. You're visible only while you're there." },
          { title: "See who's there", body: "Browse the people at the same place, with shared interests first." },
          { title: "Offer from the menu", body: "Pick something from the venue's menu and send it. Paid in-app, served by the venue." },
          { title: "Say hi", body: "They accept, the drink arrives, the ice is broken." },
        ],
        featuresTitle: "Make your city feel smaller.",
        features: [
          { icon: "cup", wide: true, title: "Offer something, start a conversation", body: "Send an offer, a coffee, a snack, anything, to someone nearby at a local business. A simple gesture that breaks the ice instantly." },
          { icon: "pin", title: "Discover local spots", body: "Browse businesses around you and see who else is there. Find new places through the people in them." },
          { icon: "users", title: "Meet people with shared interests", body: "No swiping, no algorithms. Just an honest offer and a real moment." },
          { icon: "home", title: "Make your city feel smaller", body: "New in town or growing your circle: Offer turns everyday places into spaces for connection." },
        ],
        ctaTitle: "The first coffee is on you.",
        ctaBody: "Free on Google Play. Venue partnerships and questions: contact@bmnova.com",
        stickers: ["Latte for Deniz", "Offer accepted ✓", "12 people at Café Nova"],
        facts: [],
      },
      tr: {
        category: "Sosyal · Buz kırıcı",
        tag: "Sosyal buz kırıcı",
        card: "Yakındaki bir mekânda birine kahve ısmarla. Buzu kır, gerçek insanlarla tanış.",
        heroBefore: "Birine bir kahve ısmarla.",
        heroAccent: "Gerçekten tanış.",
        heroBody:
          "Bir kafede check-in yap, kimlerin orada olduğunu gör ve menüden bir içecek ya da atıştırmalık ısmarla. Kaydırma yok, algoritma yok. Gerçek bir mekânda buzu kıran basit bir jest.",
        stepsTitle: "Gerçek insanlar. Gerçek mekânlar. Gerçek anlar.",
        steps: [
          { title: "Check-in yap", body: "Anlaşmalı bir kafe, bar ya da restorana gel ve check-in yap. Sadece oradayken görünürsün." },
          { title: "Kimler var, gör", body: "Aynı mekândaki insanlara göz at; ortak ilgi alanları önce." },
          { title: "Menüden ısmarla", body: "Mekânın menüsünden bir şey seç ve gönder. Ödeme uygulamada, servis mekânda." },
          { title: "Merhaba de", body: "Kabul eder, içecek gelir, buz kırılır." },
        ],
        featuresTitle: "Şehrini küçült.",
        features: [
          { icon: "cup", wide: true, title: "Bir şey ısmarla, sohbet başlasın", body: "Yakındaki bir mekânda birine kahve, atıştırmalık, ne istersen ısmarla. Buzu anında kıran basit bir jest." },
          { icon: "pin", title: "Yeni mekânlar keşfet", body: "Çevrendeki işletmelere göz at, orada kimlerin olduğunu gör. Yeni yerleri içindeki insanlar sayesinde bul." },
          { icon: "users", title: "Ortak ilgi alanları olanlarla tanış", body: "Kaydırma yok, algoritma yok. Sadece samimi bir teklif ve gerçek bir an." },
          { icon: "home", title: "Şehrini küçült", body: "Şehirde yeni ya da çevreni genişletiyor olsan da Offer gündelik mekânları tanışma alanlarına çevirir." },
        ],
        ctaTitle: "İlk kahve senden.",
        ctaBody: "Google Play'de ücretsiz. Mekân iş birlikleri ve sorular için: contact@bmnova.com",
        stickers: ["Deniz'e bir latte", "Teklif kabul edildi ✓", "Café Nova'da 12 kişi"],
        facts: [],
      },
    },
  },
};

/** Apps in order of importance; drives every list on the site. */
export const APP_ORDER: AppSlug[] = ["pali", "fitvibe", "haki", "roompace", "nextstep", "bloomish", "offer"];

export function appStore(app: AppInfo) {
  return app.store ? storeLinks[app.store] : undefined;
}

export type Review = {
  app: AppSlug;
  author: string;
  source: "appStore" | "googlePlay";
  /** Language the review was written in; the other locale shows a translation */
  original: Locale;
  title?: Record<Locale, string>;
  text: Record<Locale, string>;
};

/** Store reviews verbatim in their original language, with translations for the other locale. */
export const REVIEWS: Review[] = [
  {
    app: "pali",
    author: "Kerem Can K.",
    source: "appStore",
    original: "tr",
    title: { tr: "Karmaşadan uzak, çok pratik", en: "No clutter, very practical" },
    text: {
      tr: "Daha önce benzer birçok diyet uygulamasını denedim ama hemen hepsinde arayüz o kadar karmaşıktı ki bir noktadan sonra kullanmayı bırakıyordum. Dietpal’ı keşfettiğim için çok mutluyum. Özellikle içindeki yapay zeka asistanı beklediğimden çok daha iyi çalışıyor.",
      en: "I tried many similar diet apps before, but almost all of them had interfaces so complicated that I eventually stopped using them. I'm so happy I found DietPal. The AI assistant inside works much better than I expected.",
    },
  },
  {
    app: "fitvibe",
    author: "fatmanur ş",
    source: "appStore",
    original: "tr",
    title: { tr: "bayıldım!", en: "loved it!" },
    text: { tr: "istek değil, ihtiyaç", en: "not a want, a need" },
  },
  {
    app: "pali",
    author: "Burak Safak",
    source: "googlePlay",
    original: "en",
    text: { en: "very useful, i found what I want", tr: "çok kullanışlı, aradığımı buldum" },
  },
  {
    app: "pali",
    author: "Engin Demirli",
    source: "googlePlay",
    original: "tr",
    text: {
      tr: "kullanışlı bi uygulama, özellikle içtiğim su miktarını loglama özelliğini ve diyet oluşturma özelliklerini kullanıyorum",
      en: "a handy app, I mostly use the water logging and the diet building features",
    },
  },
  {
    app: "pali",
    author: "piseq",
    source: "appStore",
    original: "tr",
    title: { tr: "kullanışlı ve güzel bi uygulama", en: "a handy, lovely app" },
    text: {
      tr: "kalori takibi yaparken ve beslenme listesi oluştururken kullanıyorum, çok beğendim",
      en: "I use it to track calories and build my meal list, I really like it",
    },
  },
  {
    app: "fitvibe",
    author: "Ozgur641",
    source: "appStore",
    original: "tr",
    title: { tr: "Harikaa", en: "Amazing" },
    text: { tr: "Süper", en: "Super" },
  },
  {
    app: "pali",
    author: "Ozgur641",
    source: "appStore",
    original: "tr",
    title: { tr: "Pratik", en: "Practical" },
    text: { tr: "Süper, kullanması çok basit", en: "Great, really simple to use" },
  },
];

export type ShipLogEntry = {
  date: string;
  app: AppSlug;
  text: Record<Locale, string>;
};

/** Recent releases, newest first, taken from the app repositories' history. */
export const SHIP_LOG: ShipLogEntry[] = [
  {
    date: "2026-10-07",
    app: "pali",
    text: {
      en: "Build 65 with every locale reworded for the GLP-1 release.",
      tr: "Build 65: tüm diller GLP-1 sürümü için yeniden yazıldı.",
    },
  },
  {
    date: "2026-10-06",
    app: "fitvibe",
    text: { en: "Build 122.", tr: "Build 122." },
  },
  {
    date: "2026-10-05",
    app: "pali",
    text: {
      en: "DietPal becomes Pali 3.0, a GLP-1 companion with shots, check-ins and a new mascot.",
      tr: "DietPal, Pali 3.0 oldu: iğneler, check-in'ler ve yeni bir maskotla GLP-1 yol arkadaşı.",
    },
  },
  {
    date: "2026-09-09",
    app: "haki",
    text: {
      en: "Live on the App Store and Google Play.",
      tr: "App Store ve Google Play'de yayında.",
    },
  },
];

/** Title, description and alternates for an app's landing page. */
export function appMetadata(locale: Locale, slug: AppSlug) {
  const app = APPS[slug];
  const copy = app.copy[locale];
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${app.name}: ${copy.tag} — BMNova`,
    description: copy.heroBody,
  });
}
