"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/app/locale-context";
import { APPS } from "@/content/apps";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Chip, DemoSection } from "@/components/apps/AppPage";

const COLOR = APPS.offer.color;
type Place = "nova" | "roof" | "book";
type Person = "deniz" | "mert" | "ela";
type Drink = "coffee" | "lemonade" | "tea" | "dessert";

const PEOPLE: Record<Person, { name: string; color: string }> = {
  deniz: { name: "Deniz", color: "#FFB224" },
  mert: { name: "Mert", color: "#5B8CFF" },
  ela: { name: "Ela", color: "#FF6B8B" },
};

const copy = {
  en: {
    heading: "Send an offer in three taps.",
    note: "A sample venue and people, the same flow as the app.",
    where: "1 · Where are you?",
    who: "2 · Who's there?",
    what: "3 · What's the offer?",
    places: { nova: "Café Nova", roof: "Rooftop Bar", book: "Bookshop Café" },
    drinks: { coffee: "Coffee · ₺90", lemonade: "Lemonade · ₺110", tea: "Tea · ₺50", dessert: "Dessert · ₺160" },
    drinkNames: { coffee: "a coffee", lemonade: "a lemonade", tea: "a tea", dessert: "a dessert" },
    send: "Send offer",
    undo: "Undo offer",
    preview: "Preview",
    sent: "Offer sent",
    previewTitle: (person: string, drink: string) => `Offer ${person} ${drink}.`,
    sentTitle: (person: string) => `${person} has 10 minutes to accept.`,
    previewBody: (place: string, person: string) => `At ${place}, right now. ${person} sees your name, your offer and a one-line hello.`,
    sentBody: (place: string, person: string) => `Your offer is waiting at ${place}. When ${person} accepts, the venue serves it and you get a nudge to say hi.`,
    footer: "Paid in-app. The venue serves it. You just say hi.",
  },
  tr: {
    heading: "Üç dokunuşta bir teklif gönder.",
    note: "Örnek bir mekân ve kişiler, uygulamadaki akışın aynısı.",
    where: "1 · Neredesin?",
    who: "2 · Kimler var?",
    what: "3 · Ne ısmarlıyorsun?",
    places: { nova: "Café Nova", roof: "Teras Bar", book: "Kitapçı Kafe" },
    drinks: { coffee: "Kahve · ₺90", lemonade: "Limonata · ₺110", tea: "Çay · ₺50", dessert: "Tatlı · ₺160" },
    drinkNames: { coffee: "bir kahve", lemonade: "bir limonata", tea: "bir çay", dessert: "bir tatlı" },
    send: "Teklifi gönder",
    undo: "Teklifi geri al",
    preview: "Önizleme",
    sent: "Teklif gönderildi",
    previewTitle: (person: string, drink: string) => `${person} için ${drink}.`,
    sentTitle: (person: string) => `${person} 10 dakika içinde kabul edebilir.`,
    previewBody: (place: string, person: string) => `Mekân: ${place}, şu anda. ${person} adını, teklifini ve tek satırlık selamını görür.`,
    sentBody: (place: string, person: string) => `Teklifin bekliyor (${place}). ${person} kabul edince mekân servis eder, sana da merhaba demen için bir hatırlatma gelir.`,
    footer: "Ödeme uygulamada. Servis mekânda. Sana sadece merhaba demek kalıyor.",
  },
};

export function OfferHeroVisual() {
  return (
    <PhoneFrame className="relative z-[2] w-[330px] max-w-full animate-floaty" screenClassName="bg-[#2A0C12]">
      <div className="relative aspect-[9/19] w-full">
        <Image src="/apps/offer/welcome.webp" alt="Offer welcome screen" fill priority sizes="330px" className="scale-[1.12] object-cover" />
      </div>
    </PhoneFrame>
  );
}

export function OfferDemo() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [place, setPlace] = useState<Place>("nova");
  const [person, setPerson] = useState<Person>("deniz");
  const [drink, setDrink] = useState<Drink>("coffee");
  const [sent, setSent] = useState(false);
  const label = "text-[11px] font-semibold uppercase tracking-[.12em] text-dim";
  const reset = () => setSent(false);
  const name = PEOPLE[person].name;

  return (
    <DemoSection slug="offer" heading={t.heading} note={t.note}>
      <div className="flex flex-wrap items-center gap-10">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className={label}>{t.where}</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(t.places) as Place[]).map((id) => (
                <Chip key={id} on={place === id} color={COLOR} onClick={() => { setPlace(id); reset(); }}>
                  {t.places[id]}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className={label}>{t.who}</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PEOPLE) as Person[]).map((id) => (
                <Chip key={id} on={person === id} color={COLOR} onClick={() => { setPerson(id); reset(); }} className="pl-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-extrabold text-surface" style={{ background: PEOPLE[id].color }}>
                    {PEOPLE[id].name[0]}
                  </span>
                  {PEOPLE[id].name}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className={label}>{t.what}</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(t.drinks) as Drink[]).map((id) => (
                <Chip key={id} on={drink === id} color={COLOR} onClick={() => { setDrink(id); reset(); }}>
                  {t.drinks[id]}
                </Chip>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSent((v) => !v)}
            className="h-[52px] w-fit rounded-full px-6 text-[15px] font-bold text-surface transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: COLOR }}
          >
            {sent ? t.undo : t.send}
          </button>
        </div>
        <div
          className="flex min-w-0 flex-[1_1_320px] flex-col gap-3.5 rounded-card border p-7 transition-colors duration-500"
          style={sent ? { background: COLOR, borderColor: COLOR, color: "#0B0B12" } : { background: "#0B0B12", borderColor: "rgba(255,255,255,.1)" }}
          aria-live="polite"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[.12em]" style={{ color: sent ? "rgba(11,11,18,.7)" : COLOR }}>
            {sent ? t.sent : t.preview}
          </span>
          <strong className="font-display text-[32px] font-extrabold leading-none">
            {sent ? t.sentTitle(name) : t.previewTitle(name, t.drinkNames[drink])}
          </strong>
          <span className="text-[15px] leading-normal" style={{ color: sent ? "rgba(11,11,18,.75)" : "#A4A2B8" }}>
            {sent ? t.sentBody(t.places[place], name) : t.previewBody(t.places[place], name)}
          </span>
          <span className="mt-1.5 flex items-center gap-2.5 text-[13px]" style={{ color: sent ? "rgba(11,11,18,.75)" : "#A4A2B8" }}>
            <Image src="/apps/offer/drink.webp" alt="" width={56} height={31} />
            {t.footer}
          </span>
        </div>
      </div>
    </DemoSection>
  );
}
