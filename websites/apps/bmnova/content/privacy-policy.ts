export type PrivacySection = {
  number: number;
  title: string;
  paragraphs: string[];
};

export type PrivacyPolicyContent = {
  lastUpdated: string;
  title: string;
  intro: string[];
  sections: PrivacySection[];
};

export const privacyPolicyContent: Record<"en" | "tr", PrivacyPolicyContent> = {
  en: {
    lastUpdated: "March 8, 2026",
    title: "Privacy Policy",
    intro: [
      'BMNova, operated by Ali Mertcan Karaman ("BMNova", "we", "us", or "our"), builds mobile apps, web products, SaaS platforms, and AI-powered software. This Privacy Policy explains how we collect, use, store, share, and protect personal data when you visit our website, contact us, use our products or services, or interact with us in a business context.',
      "We build and ship real products. We also take privacy seriously.",
    ],
    sections: [
      {
        number: 1,
        title: "Who We Are",
        paragraphs: [
          "BMNova",
          "Operated by Ali Mertcan Karaman",
          "OSTİM OSB Mah. Cevat Dündar Cad. No: 1/1 İç Kapı No: 10",
          "Yenimahalle / Ankara, Türkiye",
          "Email: contact@bmnova.com",
          "Website: https://www.bmnova.com/",
          "For privacy-related requests, you can contact us at contact@bmnova.com.",
        ],
      },
      {
        number: 2,
        title: "Scope",
        paragraphs: [
          "This Privacy Policy applies to personal data processed in connection with:",
          "our website;",
          "our mobile and web applications;",
          "our SaaS and AI-powered products;",
          "contact forms, demo requests, support requests, and business inquiries;",
          "marketing communications;",
          "recruitment and hiring;",
          "client and partner communications.",
          "This Privacy Policy does not apply to third-party websites, applications, or services that operate under their own privacy policies.",
        ],
      },
      {
        number: 3,
        title: "Roles: Controller and Processor",
        paragraphs: [
          "Depending on the context, BMNova may act as either a data controller or a data processor.",
          "We generally act as a controller when we process personal data for:",
          "our website and brand presence;",
          "our own products and services;",
          "sales, support, and communications;",
          "recruitment;",
          "marketing and operations.",
          "We generally act as a processor when we build, maintain, support, or host software for a client and process personal data only on that client's instructions.",
          "If you use a product or service that BMNova built for another company, that company may be the primary controller of your data.",
        ],
      },
      {
        number: 4,
        title: "Data We Collect",
        paragraphs: [
          "Depending on how you interact with us, we may collect:",
          "Identity and contact data — Name, surname, company name, job title, email address, phone number, and address.",
          "Account and profile data — Login details, user profile information, preferences, and account settings.",
          "Communications data — Messages, emails, contact form submissions, support requests, feedback, and business correspondence.",
          "Technical data — IP address, browser type, operating system, device type, app version, crash logs, diagnostic records, and similar technical information.",
          "Usage data — Pages visited, features used, session activity, clickstream, in-app interactions, and product analytics.",
          "Transaction data — Subscription status, invoices, billing-related records, and purchase history where applicable.",
          "User content — Files, text, images, prompts, documents, datasets, and other content you choose to submit through our products or services.",
          "Recruitment data — CVs, portfolios, employment history, education details, interview notes, and related application materials.",
        ],
      },
      {
        number: 5,
        title: "How We Collect Data",
        paragraphs: [
          "We collect personal data:",
          "directly from you, when you contact us, use our services, or submit information;",
          "automatically, through cookies, logs, analytics, and device/app telemetry;",
          "from third parties, such as hosting providers, analytics providers, payment processors, app stores, authentication providers, recruitment platforms, or business partners;",
          "from clients, where we process data on their behalf.",
        ],
      },
      {
        number: 6,
        title: "Why We Use Personal Data",
        paragraphs: [
          "We use personal data to:",
          "provide, operate, and maintain our website, apps, and services;",
          "create and manage accounts;",
          "deliver customer support;",
          "respond to messages, demo requests, and project inquiries;",
          "secure our systems and prevent abuse, fraud, and unauthorized access;",
          "monitor performance, debug issues, and improve reliability;",
          "manage commercial relationships;",
          "process recruitment applications;",
          "comply with legal obligations;",
          "protect our rights, users, products, and infrastructure.",
        ],
      },
      {
        number: 7,
        title: "AI and Data Use",
        paragraphs: [
          "Because BMNova develops AI-powered products and features, some services may process prompts, files, images, text, and other user inputs in order to generate outputs or provide AI-enabled functionality.",
          "At this time, BMNova does not use prompts, uploads, outputs, or client content to train or improve general-purpose AI models.",
          "We process such content only to:",
          "provide the requested feature or service;",
          "maintain security and prevent abuse;",
          "troubleshoot, support, and fix technical issues;",
          "comply with legal obligations.",
          "If BMNova uses third-party AI or cloud providers to power a feature, those providers may process data on our behalf subject to their role, contractual protections, and applicable law.",
          "AI-generated content may be inaccurate or incomplete and should be reviewed before being relied upon in important decisions.",
        ],
      },
      {
        number: 8,
        title: "Legal Bases",
        paragraphs: [
          "Where applicable under GDPR or similar laws, we rely on one or more of the following legal bases:",
          "performance of a contract;",
          "legitimate interests;",
          "consent;",
          "legal obligation;",
          "establishment, exercise, or defense of legal claims.",
          "Where Turkish law applies, we process personal data in line with the lawful grounds available under KVKK.",
        ],
      },
      {
        number: 9,
        title: "Cookies and Similar Technologies",
        paragraphs: [
          "We use cookies and similar technologies to operate our website and services, remember preferences, analyze performance, improve user experience, and support security.",
          "Where required by law, we request consent for non-essential cookies.",
          "You can manage cookies through your browser settings or any cookie banner we provide.",
        ],
      },
      {
        number: 10,
        title: "Mobile App Permissions",
        paragraphs: [
          "Our mobile applications may request access to device features such as camera, microphone, photos, storage, or notifications, depending on the functionality of the app.",
          "We only request access where relevant to the product experience. You can manage these permissions from your device settings.",
        ],
      },
      {
        number: 11,
        title: "Sharing of Personal Data",
        paragraphs: [
          "We do not sell personal data for money in the ordinary course of our business.",
          "We may share personal data with:",
          "cloud, hosting, analytics, communication, authentication, payment, support, and infrastructure providers;",
          "AI service providers used to deliver requested product functionality;",
          "clients and partners where needed for project delivery;",
          "legal, accounting, insurance, and professional advisers;",
          "public authorities or regulators where required by law;",
          "parties involved in a merger, acquisition, restructuring, or similar transaction;",
          "other parties where you direct us to share data or clearly consent.",
        ],
      },
      {
        number: 12,
        title: "International Transfers",
        paragraphs: [
          "Personal data may be processed in Türkiye and other countries where our providers or partners operate.",
          "Where international transfers occur, we take reasonable steps to use lawful transfer mechanisms and appropriate safeguards where required.",
        ],
      },
      {
        number: 13,
        title: "Data Retention",
        paragraphs: [
          "We keep personal data only for as long as needed for the purposes described in this Privacy Policy, including service delivery, security, legal compliance, dispute resolution, and legitimate business operations.",
          "When data is no longer needed, we delete, anonymize, or securely store it in accordance with applicable law and operational requirements.",
        ],
      },
      {
        number: 14,
        title: "Security",
        paragraphs: [
          "We apply technical and organizational measures designed to protect personal data, including access controls, authentication measures, logging, monitoring, secure development practices, and infrastructure safeguards.",
          "No system is perfectly secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        number: 15,
        title: "Your Rights",
        paragraphs: [
          "Depending on applicable law, you may have the right to:",
          "learn whether your personal data is processed;",
          "request access to your data;",
          "request correction of inaccurate or incomplete data;",
          "request deletion of data, where applicable;",
          "object to certain processing;",
          "request restriction of processing;",
          "withdraw consent where processing is based on consent;",
          "request portability where applicable;",
          "request information about recipients of transferred data;",
          "submit a complaint to a competent authority.",
          "To exercise your rights, contact us at contact@bmnova.com.",
        ],
      },
      {
        number: 16,
        title: "Children",
        paragraphs: [
          "Our services are generally not directed to children unless explicitly stated otherwise. We do not knowingly collect personal data from children in violation of applicable law.",
        ],
      },
      {
        number: 17,
        title: "Third-Party Services",
        paragraphs: [
          "Our website and products may include links to or integrations with third-party services. Those third parties operate under their own privacy policies, and we are not responsible for their practices.",
        ],
      },
      {
        number: 18,
        title: "Client Projects",
        paragraphs: [
          "When BMNova develops or operates a product for a client, BMNova may process personal data on that client's behalf. In such cases, the client's own privacy notice may apply to end users, and privacy requests may need to be directed to that client first.",
        ],
      },
      {
        number: 19,
        title: "Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. When we do, we will revise the \"Last updated\" date above. Material changes may also be communicated through the website or relevant service.",
        ],
      },
      {
        number: 20,
        title: "Contact",
        paragraphs: [
          "For questions, requests, or complaints about this Privacy Policy or our privacy practices, contact:",
          "BMNova",
          "Operated by Ali Mertcan Karaman",
          "OSTİM OSB Mah. Cevat Dündar Cad. No: 1/1 İç Kapı No: 10",
          "Yenimahalle / Ankara, Türkiye",
          "contact@bmnova.com",
        ],
      },
    ],
  },
  tr: {
    lastUpdated: "8 Mart 2026",
    title: "Gizlilik Politikası",
    intro: [
      'Ali Mertcan Karaman tarafından işletilen BMNova ("BMNova", "biz", "bize" veya "bizim"), mobil uygulamalar, web ürünleri, SaaS platformları ve yapay zekâ destekli yazılımlar geliştirir. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde, bizimle iletişime geçtiğinizde, ürün veya hizmetlerimizi kullandığınızda ya da bizimle ticari ilişki kurduğunuzda kişisel verilerinizi nasıl topladığımızı, kullandığımızı, sakladığımızı, paylaştığımızı ve koruduğumuzu açıklar.',
      "Biz sadece prototip üretmeyiz; çalışan ürünler geliştiririz. Gizliliği de aynı ciddiyetle ele alırız.",
    ],
    sections: [
      {
        number: 1,
        title: "Biz Kimiz",
        paragraphs: [
          "BMNova",
          "İşleten: Ali Mertcan Karaman",
          "OSTİM OSB Mah. Cevat Dündar Cad. No: 1/1 İç Kapı No: 10",
          "Yenimahalle / Ankara, Türkiye",
          "E-posta: contact@bmnova.com",
          "Web sitesi: https://www.bmnova.com/",
          "Gizlilikle ilgili talepleriniz için bize contact@bmnova.com adresinden ulaşabilirsiniz.",
        ],
      },
      {
        number: 2,
        title: "Kapsam",
        paragraphs: [
          "Bu Gizlilik Politikası aşağıdaki faaliyetlerle bağlantılı olarak işlenen kişisel verilere uygulanır:",
          "web sitemiz;",
          "mobil ve web uygulamalarımız;",
          "SaaS ve yapay zekâ destekli ürünlerimiz;",
          "iletişim formları, demo talepleri, destek talepleri ve iş geliştirme görüşmeleri;",
          "pazarlama iletişimleri;",
          "işe alım süreçleri;",
          "müşteri ve iş ortaklarıyla yürütülen iletişimler.",
          "Bu Politika, kendi gizlilik politikalarına tabi olan üçüncü taraf web siteleri, uygulamalar veya hizmetler için geçerli değildir.",
        ],
      },
      {
        number: 3,
        title: "Veri Sorumlusu ve Veri İşleyen Rolümüz",
        paragraphs: [
          "Bağlama göre BMNova, veri sorumlusu veya veri işleyen olarak hareket edebilir.",
          "Aşağıdaki durumlarda genellikle veri sorumlusu olarak hareket ederiz:",
          "web sitemiz ve marka iletişimimiz;",
          "kendi ürün ve hizmetlerimiz;",
          "satış, destek ve iletişim süreçlerimiz;",
          "işe alım faaliyetlerimiz;",
          "pazarlama ve operasyon süreçlerimiz.",
          "Aşağıdaki durumlarda ise genellikle veri işleyen olarak hareket ederiz:",
          "bir müşteri için yazılım geliştirirken;",
          "bakım, destek, barındırma veya işletim hizmeti sunarken;",
          "kişisel verileri yalnızca müşterinin talimatları doğrultusunda işlerken.",
          "BMNova'nın başka bir şirket için geliştirdiği bir ürünü veya hizmeti kullanıyorsanız, verileriniz açısından asıl veri sorumlusu o şirket olabilir.",
        ],
      },
      {
        number: 4,
        title: "Topladığımız Veriler",
        paragraphs: [
          "Bizimle nasıl etkileşime geçtiğinize bağlı olarak şu veri kategorilerini toplayabiliriz:",
          "Kimlik ve iletişim verileri — Ad, soyad, şirket adı, unvan, e-posta adresi, telefon numarası ve adres.",
          "Hesap ve profil verileri — Giriş bilgileri, kullanıcı profili bilgileri, tercihler ve hesap ayarları.",
          "İletişim verileri — Mesajlar, e-postalar, iletişim formu gönderimleri, destek talepleri, geri bildirimler ve ticari yazışmalar.",
          "Teknik veriler — IP adresi, tarayıcı türü, işletim sistemi, cihaz türü, uygulama sürümü, çökme kayıtları, tanılama kayıtları ve benzeri teknik bilgiler.",
          "Kullanım verileri — Ziyaret edilen sayfalar, kullanılan özellikler, oturum etkinlikleri, tıklama akışı, uygulama içi etkileşimler ve ürün analitiği.",
          "İşlem ve ticari veriler — Abonelik durumu, fatura kayıtları, ödeme ile ilgili bilgiler ve varsa satın alma geçmişi.",
          "Kullanıcı içeriği — Ürün veya hizmetlerimiz üzerinden göndermeyi tercih ettiğiniz dosyalar, metinler, görseller, komutlar, belgeler, veri setleri ve diğer içerikler.",
          "İşe alım verileri — Özgeçmişler, portföyler, çalışma geçmişi, eğitim bilgileri, mülakat notları ve ilgili başvuru belgeleri.",
        ],
      },
      {
        number: 5,
        title: "Verileri Nasıl Topluyoruz",
        paragraphs: [
          "Kişisel verileri şu yollarla toplarız:",
          "doğrudan sizden; örneğin bizimle iletişime geçtiğinizde, hizmetlerimizi kullandığınızda veya bilgi gönderdiğinizde;",
          "otomatik yollarla; örneğin çerezler, log kayıtları, analiz araçları ve cihaz/uygulama telemetrisi aracılığıyla;",
          "üçüncü taraflardan; örneğin barındırma sağlayıcıları, analiz sağlayıcıları, ödeme kuruluşları, uygulama mağazaları, kimlik doğrulama sağlayıcıları, işe alım platformları veya iş ortakları aracılığıyla;",
          "müşterilerimizden; onların adına veri işlediğimiz durumlarda.",
        ],
      },
      {
        number: 6,
        title: "Kişisel Verileri Neden Kullanıyoruz",
        paragraphs: [
          "Kişisel verileri şu amaçlarla kullanırız:",
          "web sitemizi, uygulamalarımızı ve hizmetlerimizi sunmak, işletmek ve sürdürmek;",
          "hesap oluşturmak ve yönetmek;",
          "destek hizmeti sunmak;",
          "mesajlara, demo taleplerine ve proje başvurularına yanıt vermek;",
          "sistemlerimizi korumak ve kötüye kullanım, dolandırıcılık veya yetkisiz erişimi önlemek;",
          "performansı izlemek, teknik sorunları tespit etmek ve güvenilirliği artırmak;",
          "ticari ilişkileri yürütmek;",
          "işe alım başvurularını değerlendirmek;",
          "hukuki yükümlülükleri yerine getirmek;",
          "haklarımızı, kullanıcılarımızı, ürünlerimizi ve altyapımızı korumak.",
        ],
      },
      {
        number: 7,
        title: "Yapay Zekâ ve Veri Kullanımı",
        paragraphs: [
          "BMNova yapay zekâ destekli ürünler ve özellikler geliştirdiği için bazı hizmetler; komutları, dosyaları, görselleri, metinleri ve diğer kullanıcı girdilerini işleyerek çıktı üretebilir veya yapay zekâ destekli işlevler sunabilir.",
          "Şu anda BMNova; komutları, yüklemeleri, çıktıları veya müşteri içeriklerini genel amaçlı yapay zekâ modellerini eğitmek ya da geliştirmek için kullanmamaktadır.",
          "Bu tür içerikleri yalnızca şu amaçlarla işleriz:",
          "talep edilen özelliği veya hizmeti sunmak;",
          "güvenliği sağlamak ve kötüye kullanımı önlemek;",
          "hata ayıklamak, destek sunmak ve teknik sorunları gidermek;",
          "hukuki yükümlülükleri yerine getirmek.",
          "Bir özelliği sunarken üçüncü taraf yapay zekâ veya bulut sağlayıcıları kullanırsak, ilgili veriler bu sağlayıcılar tarafından bizim adımıza ve uygulanabilir sözleşmesel korumalar ile hukuka uygun şekilde işlenebilir.",
          "Yapay zekâ tarafından üretilen içerikler hatalı, eksik veya bağlama uygun olmayabilir. Önemli kararlar öncesinde ayrıca gözden geçirilmelidir.",
        ],
      },
      {
        number: 8,
        title: "Hukuki Sebepler",
        paragraphs: [
          "GDPR veya benzeri düzenlemelerin uygulandığı durumlarda aşağıdaki hukuki sebeplerden birine veya birkaçına dayanabiliriz:",
          "sözleşmenin kurulması veya ifası;",
          "meşru menfaat;",
          "açık rıza;",
          "hukuki yükümlülük;",
          "bir hakkın tesisi, kullanılması veya korunması.",
          "Türk hukuku uygulandığında, kişisel verileri KVKK kapsamındaki hukuka uygun işleme şartlarına dayanarak işleriz.",
        ],
      },
      {
        number: 9,
        title: "Çerezler ve Benzeri Teknolojiler",
        paragraphs: [
          "Web sitemizi ve hizmetlerimizi çalıştırmak, tercihlerinizi hatırlamak, performansı analiz etmek, kullanıcı deneyimini geliştirmek ve güvenliği desteklemek amacıyla çerezler ve benzeri teknolojiler kullanırız.",
          "Mevzuat gerektiriyorsa, zorunlu olmayan çerezler için onay isteriz.",
          "Çerezleri tarayıcı ayarlarınızdan veya sunulan çerez paneli üzerinden yönetebilirsiniz.",
        ],
      },
      {
        number: 10,
        title: "Mobil Uygulama İzinleri",
        paragraphs: [
          "Mobil uygulamalarımız; uygulamanın işlevine bağlı olarak kamera, mikrofon, fotoğraflar, depolama alanı veya bildirimler gibi cihaz özelliklerine erişim talep edebilir.",
          "Bu erişimleri yalnızca ilgili işlev için gerekli olduğunda isteriz. İzinleri cihaz ayarlarınızdan yönetebilirsiniz.",
        ],
      },
      {
        number: 11,
        title: "Kişisel Verilerin Paylaşılması",
        paragraphs: [
          "Olağan iş akışımızda kişisel verileri para karşılığı satmayız.",
          "Kişisel verileri şu taraflarla paylaşabiliriz:",
          "bulut, barındırma, analiz, iletişim, kimlik doğrulama, ödeme, destek ve altyapı sağlayıcıları;",
          "talep edilen ürün işlevini sunmak için kullanılan yapay zekâ hizmet sağlayıcıları;",
          "proje teslimi için gerekli müşteriler ve iş ortakları;",
          "hukuk, muhasebe, sigorta ve diğer profesyonel danışmanlar;",
          "mevzuat gereği yetkili kurum ve kuruluşlar;",
          "birleşme, devralma, yeniden yapılanma veya benzeri işlemlerde ilgili taraflar;",
          "sizin yönlendirmeniz veya açık onayınız bulunan diğer taraflar.",
        ],
      },
      {
        number: 12,
        title: "Yurt Dışına Aktarım",
        paragraphs: [
          "Kişisel veriler, Türkiye'de ve hizmet sağlayıcılarımızın veya iş ortaklarımızın faaliyet gösterdiği diğer ülkelerde işlenebilir.",
          "Yurt dışı aktarımlarda, gerekli olduğu ölçüde uygun güvenlik önlemleri ve hukuka uygun aktarım mekanizmaları kullanmaya çalışırız.",
        ],
      },
      {
        number: 13,
        title: "Saklama Süresi",
        paragraphs: [
          "Kişisel verileri yalnızca bu Politika'da belirtilen amaçlar için gerekli olduğu süre boyunca saklarız. Buna hizmet sunumu, güvenlik, hukuki yükümlülüklerin yerine getirilmesi, uyuşmazlıkların çözümü ve meşru ticari faaliyetler dahildir.",
          "Veriler artık gerekli olmadığında, yürürlükteki mevzuat ve operasyonel ihtiyaçlar doğrultusunda siler, anonimleştirir veya güvenli şekilde saklarız.",
        ],
      },
      {
        number: 14,
        title: "Güvenlik",
        paragraphs: [
          "Kişisel verileri korumak için erişim kontrolleri, kimlik doğrulama önlemleri, kayıt tutma, izleme, güvenli geliştirme uygulamaları ve altyapı güvenlik önlemleri dahil olmak üzere teknik ve idari tedbirler uygularız.",
          "Hiçbir sistem tamamen güvenli değildir ve mutlak güvenlik garanti edilemez.",
        ],
      },
      {
        number: 15,
        title: "Haklarınız",
        paragraphs: [
          "Uygulanabilir mevzuata bağlı olarak şu haklara sahip olabilirsiniz:",
          "kişisel verilerinizin işlenip işlenmediğini öğrenme;",
          "kişisel verilerinize erişim talep etme;",
          "eksik veya yanlış verilerin düzeltilmesini isteme;",
          "uygun hallerde verilerin silinmesini isteme;",
          "belirli işleme faaliyetlerine itiraz etme;",
          "işlemenin sınırlandırılmasını isteme;",
          "açık rızaya dayalı işlemlerde rızayı geri çekme;",
          "uygulanabiliyorsa veri taşınabilirliği talep etme;",
          "verilerin aktarıldığı alıcılar hakkında bilgi talep etme;",
          "yetkili mercilere şikâyette bulunma.",
          "Haklarınızı kullanmak için contact@bmnova.com adresinden bize ulaşabilirsiniz.",
        ],
      },
      {
        number: 16,
        title: "Çocuklara İlişkin Gizlilik",
        paragraphs: [
          "Hizmetlerimiz, açıkça belirtilmedikçe çocuklara yönelik değildir. Uygulanabilir hukuka aykırı şekilde çocuklardan bilerek kişisel veri toplamıyoruz.",
        ],
      },
      {
        number: 17,
        title: "Üçüncü Taraf Hizmetler",
        paragraphs: [
          "Web sitemiz ve ürünlerimiz üçüncü taraf hizmetlere bağlantılar veya entegrasyonlar içerebilir. Bu taraflar kendi gizlilik politikalarına tabidir ve onların uygulamalarından sorumlu değiliz.",
        ],
      },
      {
        number: 18,
        title: "Müşteri Projeleri",
        paragraphs: [
          "BMNova, bir müşteri için ürün geliştiriyor veya işletiyorsa, ilgili kişisel verileri o müşteri adına işleyebilir. Bu durumlarda son kullanıcılar açısından müşterinin kendi gizlilik bildirimi geçerli olabilir ve bazı gizlilik taleplerinin öncelikle ilgili müşteriye yöneltilmesi gerekebilir.",
        ],
      },
      {
        number: 19,
        title: "Bu Politikadaki Değişiklikler",
        paragraphs: [
          "Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Güncelleme yaptığımızda yukarıdaki \"Son güncelleme\" tarihini yenileriz. Esaslı değişiklikler ayrıca web sitesi veya ilgili hizmet üzerinden duyurulabilir.",
        ],
      },
      {
        number: 20,
        title: "İletişim",
        paragraphs: [
          "Bu Gizlilik Politikası veya gizlilik uygulamalarımız hakkında soru, talep ya da şikâyetleriniz için:",
          "BMNova",
          "İşleten: Ali Mertcan Karaman",
          "OSTİM OSB Mah. Cevat Dündar Cad. No: 1/1 İç Kapı No: 10",
          "Yenimahalle / Ankara, Türkiye",
          "contact@bmnova.com",
        ],
      },
    ],
  },
};
