import type { Locale } from "@/lib/i18n";

/** Answers may hold links written as [label](href); internal hrefs get the locale prefix when rendered. */
export type PaliFaqContent = {
  title: string;
  description: string;
  items: { question: string; answer: string }[];
};

export const paliFaqContent: Record<Locale, PaliFaqContent> = {
  en: {
    title: "Pali – Frequently Asked Questions",
    description: "Answers about logging shots and meals, reminders, Pali Plus, your data and your account.",
    items: [
      {
        question: "What is Pali?",
        answer:
          "Pali is an AI-powered companion for people on GLP-1 treatment. It helps you log your shots, track how you feel, and keep up with protein, fibre and water. All of this sits next to the meal logging and nutrition tracking that began as DietPal.",
      },
      {
        question: "Is Pali a medical app? Does it tell me what dose to take?",
        answer:
          "No. Pali is a tracking and wellness tool. It does not diagnose, prescribe or recommend doses. Always follow your doctor's instructions. The medication level you see in the app is an estimate based on published pharmacokinetic data. It is for information only.",
      },
      {
        question: "How do I get started?",
        answer:
          "Download Pali from the App Store or Google Play and answer a few short onboarding questions about your medication, your shot day and your goal. Pali sets your daily protein, fibre, water and calorie targets from these answers. You can change them anytime in Profile.",
      },
      {
        question: "How do I log a meal?",
        answer:
          "Tap the Pali quick-add button on Today. Search the food database or enter the values by hand. With Plus, you can also snap a photo and Pali's AI estimates the calories and macros.",
      },
      {
        question: "How do I log a shot?",
        answer:
          'Open the Shots tab and tap "Log shot". Choose the injection site on the body map; Pali suggests the next site in your rotation. You can edit or delete a dose later.',
      },
      {
        question: "Can Pali remind me about my shots?",
        answer:
          "Yes. Pali sends shot-day reminders and gentle nudges for water and protein. You can manage these from the Reminders page in Profile. To receive them, allow notifications when asked.",
      },
      {
        question: "What can I ask Pali in chat?",
        answer:
          "You can ask about nutrition, protein-rich meal ideas, managing common side effects, or your progress. Pali's answers take your treatment cycle and your logs into account. Chat is general guidance and not medical advice. Chat with Pali is a Plus feature.",
      },
      {
        question: "How do I share my progress with my doctor?",
        answer:
          'On Progress, open "Doctor report" and tap "Share PDF". The report summarises your doses, weight change, symptoms and nutrition on one page. Free users get the last 7 days; Plus covers your full history.',
      },
      {
        question: "What does Pali Plus include?",
        answer:
          "Shots, how you feel, water, weight and reminders stay free. Always. Plus adds meal photo AI, chat with Pali, your estimated medication level, symptom patterns across your shot week, and your full history (free keeps the last 7 days). New subscribers get a free trial, and Pali reminds you before it ends.",
      },
      {
        question: "How do I cancel or restore my subscription?",
        answer:
          'Subscriptions are managed by Apple or Google. On iPhone go to Settings → your name → Subscriptions; on Android go to Google Play → Profile → Payments & subscriptions. If you reinstall the app or switch devices, tap "Restore Purchases" on the paywall.',
      },
      {
        question: "Is my data safe?",
        answer:
          "Your data is stored securely and is used only to run the app's features. We do not sell personal data. For details, see our [Privacy Policy](/privacy-policy) and [Terms of Use](/terms-of-use).",
      },
      {
        question: "How do I delete my account?",
        answer:
          'Go to Profile → Account → "Delete Account". To protect your data we email you a sign-in link to confirm it\'s you, and your data is then permanently deleted.',
      },
      {
        question: "I need help or have feedback.",
        answer: "Contact us at [contact@bmnova.com](mailto:contact@bmnova.com). We read every message.",
      },
    ],
  },
  tr: {
    title: "Pali – Sıkça Sorulan Sorular",
    description: "Enjeksiyon ve öğün kaydı, hatırlatıcılar, Pali Plus, verileriniz ve hesabınız hakkında yanıtlar.",
    items: [
      {
        question: "Pali nedir?",
        answer:
          "Pali, GLP-1 tedavisi kullananlar için yapay zekâ destekli bir yol arkadaşıdır. Enjeksiyonlarınızı kaydetmenize, nasıl hissettiğinizi takip etmenize ve protein, lif ve su alımınızı düzenli tutmanıza yardımcı olur. Bunlar, DietPal ile başlayan öğün kaydı ve beslenme takibi özellikleriyle birlikte çalışır.",
      },
      {
        question: "Pali tıbbi bir uygulama mı? Hangi dozu almam gerektiğini söylüyor mu?",
        answer:
          "Hayır. Pali bir takip ve sağlıklı yaşam aracıdır; teşhis koymaz, ilaç yazmaz ve doz önermez. Her zaman doktorunuzun talimatlarına uyun. Uygulamada gördüğünüz ilaç seviyesi, yayımlanmış farmakokinetik verilere dayanan bir tahmindir ve yalnızca bilgilendirme amaçlıdır.",
      },
      {
        question: "Nasıl başlarım?",
        answer:
          "Pali'yi App Store'dan veya Google Play'den indirin. İlacınız, enjeksiyon gününüz ve hedefiniz hakkındaki birkaç kısa soruyu yanıtlayın. Pali bu cevaplara göre günlük protein, lif, su ve kalori hedeflerinizi belirler. Hedeflerinizi istediğiniz zaman Profil'den değiştirebilirsiniz.",
      },
      {
        question: "Öğün nasıl kaydederim?",
        answer:
          "Bugün sayfasındaki Pali hızlı ekleme butonuna dokunun. Besin veritabanında arama yapabilir veya değerleri elle girebilirsiniz. Plus ile öğününüzün fotoğrafını da çekebilirsiniz; Pali'nin yapay zekâsı kaloriyi ve makro besin değerlerini tahmin eder.",
      },
      {
        question: "Enjeksiyonu nasıl kaydederim?",
        answer:
          'Enjeksiyonlar sekmesini açın ve "Enjeksiyonu kaydet"e dokunun. Vücut haritasından enjeksiyon bölgesini seçin; Pali rotasyondaki bir sonraki bölgeyi önerir. Kaydettiğiniz dozu sonradan düzenleyebilir veya silebilirsiniz.',
      },
      {
        question: "Pali bana enjeksiyonlarımı hatırlatabilir mi?",
        answer:
          "Evet. Pali enjeksiyon günü hatırlatmaları ve su ile protein için nazik uyarılar gönderir. Bunları Profil'deki Hatırlatıcılar sayfasından yönetebilirsiniz. Bildirim almak için sorulduğunda bildirimlere izin verin.",
      },
      {
        question: "Pali'ye sohbette neler sorabilirim?",
        answer:
          "Beslenme, protein açısından zengin öğün fikirleri, sık görülen yan etkilerle başa çıkma veya ilerlemeniz hakkında sorular sorabilirsiniz. Pali cevap verirken tedavi döngünüzü ve kayıtlarınızı dikkate alır. Pali ile sohbet bir Plus özelliğidir; genel bilgi amaçlıdır ve tıbbi tavsiye yerine geçmez.",
      },
      {
        question: "İlerlememi doktorumla nasıl paylaşırım?",
        answer:
          'İlerleme sayfasında "Doktor Raporu"nu açın ve "PDF Paylaş"a dokunun. Rapor; dozlarınızı, kilo değişiminizi, semptomlarınızı ve beslenmenizi tek sayfada özetler. Ücretsiz sürümde rapor son 7 günü kapsar, Plus ile tüm geçmişinizi kapsar.',
      },
      {
        question: "Pali Plus neleri içerir?",
        answer:
          "Enjeksiyon kaydı, nasıl hissettiğiniz, su, kilo ve hatırlatıcılar her zaman ücretsizdir. Plus ile fotoğrafla öğün analizi, Pali ile sohbet, tahmini ilaç seviyeniz, enjeksiyon haftanız boyunca semptom örüntüleriniz ve tüm geçmişiniz açılır; ücretsiz sürümde son 7 günlük geçmiş görünür. Yeni aboneler ücretsiz deneme süresinden yararlanır ve Pali, deneme süresi bitmeden önce sizi bilgilendirir.",
      },
      {
        question: "Aboneliğimi nasıl iptal eder veya geri yüklerim?",
        answer:
          'Abonelikler Apple veya Google tarafından yönetilir. iPhone\'da Ayarlar → adınız → Abonelikler yolunu izleyin; Android\'de Google Play → Profil → Ödemeler ve abonelikler yolunu izleyin. Uygulamayı yeniden yüklerseniz veya cihaz değiştirirseniz ödeme ekranındaki "Satın Alımları Geri Yükle" seçeneğini kullanın.',
      },
      {
        question: "Verilerim güvende mi?",
        answer:
          "Verileriniz güvenli şekilde saklanır ve yalnızca uygulamanın özelliklerini çalıştırmak için kullanılır. Kişisel verilerinizi satmayız. Ayrıntılar için [Gizlilik Politikası](/privacy-policy) ve [Kullanım Koşulları](/terms-of-use) sayfalarına bakabilirsiniz.",
      },
      {
        question: "Hesabımı nasıl silerim?",
        answer:
          'Profil → Hesap → "Hesabı Sil" yolunu izleyin. Verilerinizi korumak için, hesabın size ait olduğunu doğrulamanız amacıyla e-posta adresinize bir giriş linki göndeririz. Doğrulamanın ardından verileriniz kalıcı olarak silinir.',
      },
      {
        question: "Yardıma ihtiyacım var veya geri bildirim vermek istiyorum.",
        answer: "Bize [contact@bmnova.com](mailto:contact@bmnova.com) adresinden ulaşabilirsiniz. Her mesajı okuyoruz.",
      },
    ],
  },
};

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** The answer as plain text, with each link reduced to its label. */
export function plainAnswer(answer: string): string {
  return answer.replace(LINK, "$1");
}

/** Splits an answer into text and link parts, in order. */
export function answerParts(answer: string): ({ text: string } | { label: string; href: string })[] {
  // split with two capture groups yields [text, label, href, text, label, href, ..., text]
  const pieces = answer.split(LINK);
  const parts: ({ text: string } | { label: string; href: string })[] = [];
  for (let i = 0; i < pieces.length; i += 3) {
    if (pieces[i]) parts.push({ text: pieces[i] });
    if (i + 2 < pieces.length) parts.push({ label: pieces[i + 1], href: pieces[i + 2] });
  }
  return parts;
}
