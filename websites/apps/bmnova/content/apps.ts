import { storeLinks, type StoreKey } from "@/config/store-links";
import { pageMetadata, type Locale } from "@/lib/i18n";
import type { FaqItem } from "@/lib/json-ld";
import type { FirstPartyProject } from "@/lib/site";
import shipLog from "./ship-log.json";

export type AppSlug = FirstPartyProject;
export type AppStatus = "live" | "review" | "lab" | "archived";

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
  /** Search-facing page title and description; default to the tag and hero body */
  seoTitle?: string;
  seoDescription?: string;
  /** Question-led answers shown on the app page and emitted as FAQPage schema */
  faqs?: FaqItem[];
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
        seoTitle: "Pali: GLP-1 Tracker for Ozempic, Wegovy & Mounjaro Shots",
        seoDescription:
          "Track GLP-1 shots and injection sites, side effects, protein, water and weight. Pali works with Ozempic, Wegovy, Mounjaro, Zepbound and Rybelsus. Free on iOS and Android.",
        faqs: [
          { question: "What is the best app to track Ozempic, Wegovy or Mounjaro shots?", answer: "Pali is a GLP-1 companion that logs each shot with its dose, injection site and a pain score, and reminds you when the next one is due. It works with Ozempic, Wegovy, Mounjaro, Zepbound and Rybelsus, and it is free on iOS and Android." },
          { question: "How does Pali help with injection site rotation?", answer: "Pali shows a body map of your abdomen, thighs and upper arms and remembers which spots you used in the last two weeks. It suggests a rested spot for the next shot so you don't keep injecting in the same place." },
          { question: "Can Pali track GLP-1 side effects like nausea and food noise?", answer: "Yes. A thirty-second daily check-in rates nausea, fatigue, heartburn, constipation, low appetite and food noise on a four-step scale. Pali then shows how they move across your shot cycle." },
          { question: "How much protein should I eat on a GLP-1 medication?", answer: "Pali sets a daily protein target from your goal weight, because eating enough protein helps protect muscle while you lose weight. Your doctor or dietitian can adjust that number for you." },
          { question: "Does Pali give medical advice or change my dose?", answer: "No. Pali tracks and spots patterns, it does not advise. Dose changes are always your doctor's call, and the Plus doctor report gives them your shots, side effects, weight and protein in one summary." },
        ],
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
        seoTitle: "Pali: Ozempic, Wegovy ve Mounjaro için GLP-1 Takip Uygulaması",
        seoDescription:
          "GLP-1 iğnelerini ve iğne yerlerini, yan etkileri, proteini, suyu ve kiloyu takip et. Pali Ozempic, Wegovy, Mounjaro, Zepbound ve Rybelsus ile çalışır. iOS ve Android'de ücretsiz.",
        faqs: [
          { question: "Ozempic, Wegovy ya da Mounjaro iğnelerini takip etmek için hangi uygulama kullanılır?", answer: "Pali her iğneyi dozu, iğne yeri ve ağrı puanıyla kaydeden, sıradaki iğnenin zamanını hatırlatan bir GLP-1 yol arkadaşıdır. Ozempic, Wegovy, Mounjaro, Zepbound ve Rybelsus ile çalışır; iOS ve Android'de ücretsizdir." },
          { question: "Pali iğne yeri değiştirmeye nasıl yardım eder?", answer: "Pali karın, uyluk ve üst kolu gösteren bir vücut haritası tutar ve son iki haftada kullandığın noktaları hatırlar. Bir sonraki iğne için dinlenmiş bir nokta önerir, böylece hep aynı yere yapmazsın." },
          { question: "Pali bulantı ve yemek sesi (food noise) gibi yan etkileri takip eder mi?", answer: "Evet. Otuz saniyelik günlük kontrolde bulantı, yorgunluk, mide yanması, kabızlık, iştahsızlık ve yemek sesi dört basamaklı bir ölçekte puanlanır. Pali bunların iğne döngüsü boyunca nasıl değiştiğini gösterir." },
          { question: "GLP-1 ilacı kullanırken ne kadar protein almalıyım?", answer: "Pali hedef kilona göre günlük bir protein hedefi belirler, çünkü yeterli protein kilo verirken kası korumaya yardımcı olur. Bu rakamı doktorun ya da diyetisyenin sana göre ayarlayabilir." },
          { question: "Pali tıbbi tavsiye verir mi, dozumu değiştirir mi?", answer: "Hayır. Pali takip eder ve örüntüleri yakalar, tavsiye vermez. Doz değişiklikleri her zaman doktorunun kararıdır; Plus doktor raporu iğnelerini, yan etkilerini, kilonu ve proteinini tek bir özette sunar." },
        ],
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
        seoTitle: "FitVibe: AI Wardrobe, Outfit Planner & Virtual Try-On App",
        seoDescription:
          "Digitise your closet with automatic background removal, get AI outfit ideas from clothes you already own, find wardrobe gaps and try looks on before you buy. Free on iOS and Android.",
        faqs: [
          { question: "What is the best app to organise my closet and plan outfits?", answer: "FitVibe is an AI digital wardrobe: photograph each item, the background is removed automatically and the item is sorted into a category. The AI stylist then builds outfits only from clothes you own and lets you plan them on a calendar." },
          { question: "How does FitVibe's virtual try-on work?", answer: "Upload one photo of yourself and pick an outfit. FitVibe renders the look on you so you can see whether it works before you wear it, buy it or pack it." },
          { question: "Can an AI stylist tell me what to wear today?", answer: "Yes. Describe the occasion or the mood, for example dinner on Friday, a bit dressy, and FitVibe's stylist suggests complete outfits from your own wardrobe." },
          { question: "How do I find out what my wardrobe is missing?", answer: "FitVibe's wardrobe analysis looks for gaps, duplicates and styling opportunities across everything you have added. It names the pieces that would unlock the most new outfits." },
          { question: "Is FitVibe free?", answer: "FitVibe is free to download on iOS and Android." },
        ],
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
        seoTitle: "FitVibe: Yapay Zekâ Gardırop, Kombin Uygulaması ve Sanal Deneme",
        seoDescription:
          "Dolabını otomatik arka plan kaldırmayla dijitale aktar, sahip olduğun kıyafetlerden yapay zekâ kombinleri al, eksiklerini bul ve almadan önce üzerinde dene. iOS ve Android'de ücretsiz.",
        faqs: [
          { question: "Dolabımı düzenleyip kombin planlamak için en iyi uygulama hangisi?", answer: "FitVibe bir yapay zekâ dijital gardıroptur: her parçanın fotoğrafını çekersin, arka plan otomatik kaldırılır ve parça kategorisine yerleşir. Ardından stilist yalnızca sahip olduğun kıyafetlerden kombin kurar ve takvime planlamanı sağlar." },
          { question: "FitVibe'ın sanal deneme özelliği nasıl çalışır?", answer: "Kendi fotoğrafını yükle ve bir kombin seç. FitVibe görünümü üzerinde canlandırır; giymeden, satın almadan ya da bavula koymadan önce yakışıp yakışmadığını görürsün." },
          { question: "Yapay zekâ stilist bugün ne giyeceğimi söyleyebilir mi?", answer: "Evet. Davet ya da ruh hâlini anlat, örneğin cuma akşam yemeği, biraz şık; FitVibe kendi gardırobundan tam kombinler önerir." },
          { question: "Gardırobumda neyin eksik olduğunu nasıl anlarım?", answer: "FitVibe'ın gardırop analizi eklediğin her şeyde boşlukları, tekrarları ve stil fırsatlarını arar. En çok yeni kombin açacak parçaları adıyla söyler." },
          { question: "FitVibe ücretsiz mi?", answer: "FitVibe iOS ve Android'de ücretsiz indirilebilir." },
        ],
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
        seoTitle: "Haki: AI Manga, Manhwa & Comic Maker with Consistent Characters",
        seoDescription:
          "Make your own manga with AI. Write a scene, add a photo for your hero, pick a style and get editable multi-panel manga, manhwa and comic pages in minutes. Free on iOS and Android.",
        faqs: [
          { question: "How can I make my own manga with AI?", answer: "With Haki you describe the scene, define your protagonist with a photo, name, role and look, and pick comic, manga or manhwa plus a genre. Haki generates full multi-panel pages with dialogue that you can edit, save and continue." },
          { question: "Can Haki keep the same character across panels and pages?", answer: "Yes. Your cast is defined once and Haki reuses the same faces in every panel. When you continue the story, new pages keep that continuity." },
          { question: "Can I turn a photo of myself into a manga character?", answer: "Yes. Add a photo when you build your cast and Haki draws that person as the hero of your pages in the style you chose." },
          { question: "Which manga styles and genres does Haki support?", answer: "Visual styles include Shonen, Seinen, Shojo and Cyberpunk, and genres include Action, Fantasy, Romance and Isekai. You can also choose comic or manhwa formats." },
          { question: "Can I edit speech bubbles or regenerate one panel?", answer: "Yes. You can change the dialogue, regenerate a single panel and keep the rest of the page. Every chapter is saved in your library." },
        ],
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
        seoTitle: "Haki: Tutarlı Karakterlerle Yapay Zekâ Manga ve Çizgi Roman Yapma",
        seoDescription:
          "Yapay zekâ ile kendi mangını yap. Sahneyi yaz, kahramanın için bir fotoğraf ekle, tarzı seç; dakikalar içinde düzenlenebilir çok panelli manga, manhwa ve çizgi roman sayfaları al. iOS ve Android'de ücretsiz.",
        faqs: [
          { question: "Yapay zekâ ile kendi mangamı nasıl yaparım?", answer: "Haki'de sahneyi anlatırsın, kahramanını fotoğraf, isim, rol ve görünümle tanımlarsın; çizgi roman, manga ya da manhwa ile bir tür seçersin. Haki diyaloglu, çok panelli tam sayfalar üretir; düzenleyebilir, kaydedebilir ve devam ettirebilirsin." },
          { question: "Haki aynı karakteri panellerde ve sayfalarda koruyabilir mi?", answer: "Evet. Kadronu bir kez tanımlarsın, Haki her panelde aynı yüzleri kullanır. Hikâyeye devam ettiğinde yeni sayfalar da bu sürekliliği korur." },
          { question: "Kendi fotoğrafımı manga karakterine dönüştürebilir miyim?", answer: "Evet. Kadroyu kurarken bir fotoğraf ekle; Haki o kişiyi seçtiğin tarzda sayfalarının kahramanı olarak çizer." },
          { question: "Haki hangi manga tarzlarını ve türlerini destekliyor?", answer: "Görsel tarzlar arasında Shonen, Seinen, Shojo ve Cyberpunk, türler arasında Aksiyon, Fantastik, Romantik ve Isekai var. Çizgi roman ya da manhwa formatını da seçebilirsin." },
          { question: "Konuşma balonlarını düzenleyebilir ya da tek bir paneli yeniden üretebilir miyim?", answer: "Evet. Diyaloğu değiştirebilir, tek bir paneli yeniden üretip sayfanın geri kalanını koruyabilirsin. Her bölüm kütüphanende saklanır." },
        ],
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
        seoTitle: "RoomPace: AI Interior Design App That Redesigns Your Room on a Budget",
        seoDescription:
          "Upload a photo of your room, set a budget and get AI interior designs in modern, cozy, bohemian and more styles, each with a shoppable list of real furniture. Free on iOS and Android.",
        faqs: [
          { question: "How can I redesign my room with AI from a photo?", answer: "Open RoomPace, set your budget, upload a phone photo of the room and pick the room type and a style. You get an AI render of your own space in seconds and can refine it with a simple prompt." },
          { question: "Can AI interior design stay within my budget?", answer: "Yes, that is what RoomPace is built around. You set the number first and every design and its furniture list respects it, from a light refresh to a full makeover." },
          { question: "Can I buy the furniture shown in the design?", answer: "Every RoomPace design comes with a wishlist of real furniture and decor, with prices and purchase links." },
          { question: "Which interior design styles can I try?", answer: "RoomPace includes modern, cozy, bohemian and more, and the Inspire screen helps you compare looks before you commit. Every concept is saved in your My Rooms gallery." },
          { question: "Is RoomPace free?", answer: "RoomPace is free to download on iOS and Android." },
        ],
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
        seoTitle: "RoomPace: Bütçene Göre Yapay Zekâ Oda ve İç Mimari Tasarım Uygulaması",
        seoDescription:
          "Odanın fotoğrafını yükle, bütçeni belirle; modern, sıcak, bohem ve daha fazla tarzda yapay zekâ iç mimari tasarımları al, her biri satın alınabilir gerçek mobilya listesiyle. iOS ve Android'de ücretsiz.",
        faqs: [
          { question: "Bir fotoğraftan yapay zekâ ile odamı nasıl yeniden tasarlarım?", answer: "RoomPace'i aç, bütçeni belirle, odanın telefonla çekilmiş fotoğrafını yükle, oda tipini ve tarzı seç. Saniyeler içinde kendi odanın yapay zekâ tasarımını alırsın ve basit bir istemle iyileştirebilirsin." },
          { question: "Yapay zekâ iç mimari tasarımı bütçeme sadık kalabilir mi?", answer: "Evet, RoomPace tam olarak bunun üzerine kurulu. Önce rakamı belirlersin; hafif bir tazelemeden tam yenilemeye her tasarım ve mobilya listesi ona uyar." },
          { question: "Tasarımda görünen mobilyaları satın alabilir miyim?", answer: "Her RoomPace tasarımı fiyatları ve satın alma linkleriyle gerçek mobilya ve dekor ürünlerinden oluşan bir listeyle gelir." },
          { question: "Hangi iç mekân tarzlarını deneyebilirim?", answer: "RoomPace'te modern, sıcak, bohem ve daha fazlası var; İlham ekranı karar vermeden önce görünümleri karşılaştırmanı sağlar. Her fikir Odalarım galerisinde saklanır." },
          { question: "RoomPace ücretsiz mi?", answer: "RoomPace iOS ve Android'de ücretsiz indirilebilir." },
        ],
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
        seoTitle: "NextStep: AI App to Stop Overthinking and Take One Next Step",
        seoDescription:
          "NextStep is a minimalist AI coaching app from BMNova. One reflection, one question, one clear next step you can do in under five minutes. 12 purpose-built coaches.",
        faqs: [
          { question: "What is the best app to stop overthinking?", answer: "NextStep is a minimalist AI coaching app that turns a looping thought into one clear next step. You pick a coach, say what is on your mind, and every answer ends with a single action you can do in under five minutes." },
          { question: "How is NextStep different from a generic AI chatbot?", answer: "NextStep is not an open chat. It has purpose-built coaches for focus, decisions, habits, planning and weekly review, each with its own rules, tone and structure. Every screen answers one question." },
          { question: "Does NextStep give me a plan or just one step?", answer: "One step. Every response ends with exactly one concrete action, often doable in under five minutes, so you can close the app once you know what to do." },
          { question: "Is NextStep available to download?", answer: "NextStep is in App Store review. BMNova is the studio behind it. Leave your email on the NextStep page and the team will tell you on launch day." },
        ],
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
        seoTitle: "NextStep: Aşırı Düşünmeyi Bırakıp Tek Adım Atan Yapay Zekâ Uygulaması",
        seoDescription:
          "NextStep, BMNova'nın minimalist yapay zekâ koçluk uygulaması. Bir yansıma, bir soru ve beş dakikadan kısa sürede yapabileceğin net bir sonraki adım. 12 amaca özel koç.",
        faqs: [
          { question: "Aşırı düşünmeyi bırakmak için hangi uygulama kullanılır?", answer: "NextStep, dönüp duran bir düşünceyi tek bir net adıma çeviren minimalist bir yapay zekâ koçluk uygulamasıdır. Bir koç seçersin, aklındakini söylersin ve her yanıt beş dakikadan kısa sürede yapabileceğin tek bir eylemle biter." },
          { question: "NextStep genel bir yapay zekâ sohbetinden nasıl farklı?", answer: "NextStep açık uçlu bir sohbet değildir. Odak, karar, alışkanlık, planlama ve haftalık değerlendirme için kendi kuralları, tonu ve yapısı olan amaca özel koçları vardır. Her ekran tek bir soruyu yanıtlar." },
          { question: "NextStep plan mı verir, tek adım mı?", answer: "Tek adım. Her yanıt, çoğu zaman beş dakikadan kısa sürede yapılabilecek tam bir somut eylemle biter. Ne yapacağını bildiğinde uygulamayı kapatırsın." },
          { question: "NextStep indirilebilir mi?", answer: "NextStep App Store incelemesindedir. Arkasındaki stüdyo BMNova'dır. NextStep sayfasına e-postanı bırakırsan ekip yayın günü haber verir." },
        ],
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
        seoTitle: "Bloomish: AI Bouquet Generator for Digital Flower Gifts",
        seoDescription:
          "Bloomish turns a feeling, a person or an occasion into a one-of-a-kind digital bouquet you can send as a gift. An AI flower app from the BMNova studio.",
        faqs: [
          { question: "What is an AI bouquet generator?", answer: "Bloomish is an AI bouquet generator. You describe a person, an occasion or a mood in a sentence, and it creates a one-of-a-kind digital bouquet with wrapping and a card." },
          { question: "Can I send a digital flower gift with Bloomish?", answer: "Yes. Bloomish sends the bouquet as a gift link. The recipient opens a personal unwrapping anywhere in the world, with no delivery van." },
          { question: "Can I choose the flowers myself?", answer: "Yes. You can pick flowers, colours, wrapping and style, or let Bloomish generate the arrangement from your words and regenerate until it looks right." },
          { question: "Is Bloomish available yet?", answer: "Bloomish is still in the lab at BMNova, the Ankara mobile app studio behind it. Leave your email on the Bloomish page for early access." },
        ],
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
        seoTitle: "Bloomish: Dijital Çiçek Hediyesi için Yapay Zekâ Buket Uygulaması",
        seoDescription:
          "Bloomish bir duyguyu, kişiyi ya da anı eşi benzeri olmayan dijital bir bukete çevirir ve hediye olarak göndermenizi sağlar. BMNova stüdyosunun yapay zekâ çiçek uygulaması.",
        faqs: [
          { question: "Yapay zekâ buket üreticisi nedir?", answer: "Bloomish bir yapay zekâ buket üreticisidir. Bir kişiyi, bir anı ya da bir ruh hâlini tek cümleyle anlatırsın; paket ve kartıyla eşi benzeri olmayan dijital bir buket üretir." },
          { question: "Bloomish ile dijital çiçek hediyesi gönderebilir miyim?", answer: "Evet. Bloomish buketi bir hediye linki olarak gönderir. Alıcı dünyanın neresinde olursa olsun kişisel bir açılış yaşar; kurye gerekmez." },
          { question: "Çiçekleri kendim seçebilir miyim?", answer: "Evet. Çiçekleri, renkleri, paketi ve tarzı sen seçebilir ya da Bloomish'in sözlerinden aranjman üretmesine izin verip istediğin gibi olana kadar yenileyebilirsin." },
          { question: "Bloomish yayında mı?", answer: "Bloomish hâlâ BMNova laboratuvarındadır. BMNova, Ankara'da kurulu mobil uygulama stüdyosudur. Erken erişim için Bloomish sayfasına e-postanı bırak." },
        ],
      },
    },
  },
  offer: {
    slug: "offer",
    name: "Offer",
    color: "#FFB224",
    icon: "/apps/offer/icon.webp",
    status: "archived",
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
        seoTitle: "Offer: Meet People Nearby by Buying Them a Coffee",
        seoDescription:
          "Offer is a social icebreaker app from BMNova. Check in at a café, see who is there, and offer a drink from the menu. No swiping. Free on Google Play.",
        faqs: [
          { question: "What is Offer?", answer: "Offer is a social icebreaker app. You check in at a café, bar or restaurant, see who else is there, and offer them a drink or snack from the venue menu. There is no swiping and no match algorithm." },
          { question: "How do you meet people at a café with Offer?", answer: "Arrive at a partner venue and check in. You are visible only while you are there. Browse people at the same place, send something from the menu, and if they accept the drink arrives and the ice is broken." },
          { question: "Is Offer a dating app?", answer: "Offer is built for real-world introductions, not endless swiping. You meet people who are physically at the same local business, often starting from a shared interest and a simple offer." },
          { question: "Where can I download Offer?", answer: "Offer is free on Google Play. It is made by BMNova, a mobile app studio and startup in Ankara. Venue partnerships: contact@bmnova.com." },
        ],
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
        seoTitle: "Offer: Yakındaki Birine Kahve Ismarlayarak Tanışma Uygulaması",
        seoDescription:
          "Offer, BMNova'nın sosyal buz kırıcı uygulaması. Bir kafede check-in yap, kimlerin orada olduğunu gör, menüden bir içecek ısmarla. Kaydırma yok. Google Play'de ücretsiz.",
        faqs: [
          { question: "Offer nedir?", answer: "Offer bir sosyal buz kırıcı uygulamadır. Bir kafe, bar ya da restoranda check-in yapar, orada kimlerin olduğunu görür ve menüden bir içecek ya da atıştırmalık ısmarlarsın. Kaydırma ve eşleşme algoritması yoktur." },
          { question: "Offer ile bir kafede nasıl tanışılır?", answer: "Anlaşmalı bir mekâna gelir ve check-in yaparsın. Yalnızca oradayken görünürsün. Aynı mekândaki insanlara bakarsın, menüden bir şey gönderirsin; kabul edilirse içecek gelir ve buz kırılır." },
          { question: "Offer bir flört uygulaması mı?", answer: "Offer sonsuz kaydırma için değil, gerçek hayatta tanışmak için tasarlandı. Aynı yerel mekânda fiziksel olarak bulunan insanlarla, çoğu zaman ortak bir ilgi ve basit bir ısmarlama üzerinden tanışırsın." },
          { question: "Offer nereden indirilir?", answer: "Offer Google Play'de ücretsizdir. Ankara'daki mobil uygulama stüdyosu ve startup BMNova tarafından yapılır. Mekân iş birlikleri: contact@bmnova.com." },
        ],
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
export const SHIP_LOG = shipLog as ShipLogEntry[];

/** Title, description and alternates for an app's landing page. */
export function appMetadata(locale: Locale, slug: AppSlug) {
  const app = APPS[slug];
  const copy = app.copy[locale];
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: copy.seoTitle ?? `${app.name}: ${copy.tag} — BMNova`,
    description: copy.seoDescription ?? copy.heroBody,
  });
}
