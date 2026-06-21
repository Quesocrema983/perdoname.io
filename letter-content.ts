export type LangCode = "es" | "en" | "it";

export interface LetterContent {
  code: LangCode;
  label: string;
  flag: string;
  /** Big headline shown as H1 inside the letter */
  title: string;
  /** Dedication line shown at the top of the letter */
  dedication: string;
  /** "Para:" label prefixing the dedication */
  toLabel: string;
  /** Body paragraphs of the letter (corrected spelling) */
  body: string[];
  /** Closing signature */
  signature: string;
  /** Call to open the envelope */
  tapToOpen: string;
  /** Made with love footer */
  madeWith: string;
  /** Audio player strings */
  ourSong: string;
  songComingSoon: string;
  /** Button to close the letter */
  close: string;
  /** Small whisper under the seal */
  sealHint: string;
}

export const LETTERS: Record<LangCode, LetterContent> = {
  es: {
    code: "es",
    label: "Español",
    flag: "🇪🇸",
    title: "PERDÓNAME",
    dedication: "Para el amor de mi vida, hoy, mañana y siempre",
    toLabel: "Para",
    body: [
      "Ya sé que a veces me puedo pasar con mis bromas o mi sarcasmo, y puedo llegar a ser mala novia; pero pase lo que pase, siempre serás tú la estrella más brillante de mi noche.",
      "Da igual lo que pase: te seguiré eligiendo a ti, porque de eso se trata amar, de elegir a la otra persona cada día, pase lo que pase.",
      "Gracias por ser tú. Te amo.",
    ],
    signature: "Con todo mi amor",
    tapToOpen: "Toca para abrir",
    madeWith: "Hecho con el corazón roto y arrepentido",
    ourSong: "Nuestra canción",
    songComingSoon: "Pronto: nuestra canción 💕",
    close: "Cerrar carta",
    sealHint: "Ábreme",
  },
  en: {
    code: "en",
    label: "English",
    flag: "🇬🇧",
    title: "FORGIVE ME",
    dedication: "For the love of my life, today, tomorrow and always",
    toLabel: "To",
    body: [
      "I know that sometimes I can go too far with my jokes or my sarcasm, and I can be a bad girlfriend; but no matter what happens, you will always be the brightest star in my night.",
      "No matter what happens, I will keep choosing you, because that is what love is about: choosing the other person every single day, no matter what happens.",
      "Thank you for being you. I love you.",
    ],
    signature: "With all my love",
    tapToOpen: "Tap to open",
    madeWith: "Made with a broken, sorry heart",
    ourSong: "Our song",
    songComingSoon: "Soon: our song 💕",
    close: "Close letter",
    sealHint: "Open me",
  },
  it: {
    code: "it",
    label: "Italiano",
    flag: "🇮🇹",
    title: "PERDONAMI",
    dedication: "Per l'amore della mia vita, oggi, domani e sempre",
    toLabel: "Per",
    body: [
      "So che a volte posso esagerare con le mie battute o il mio sarcasmo, e posso essere una cattiva fidanzata; ma succeda quel che succeda, tu sarai sempre la stella più luminosa della mia notte.",
      "Non importa cosa accada: continuerò a scegliere te, perché di questo si tratta amare, di scegliere l'altra persona ogni giorno, succeda quel che succeda.",
      "Grazie per essere tu. Ti amo.",
    ],
    signature: "Con tutto il mio amore",
    tapToOpen: "Tocca per aprire",
    madeWith: "Fatto con il cuore spezzato e pentito",
    ourSong: "La nostra canzone",
    songComingSoon: "Presto: la nostra canzone 💕",
    close: "Chiudi la lettera",
    sealHint: "Aprimi",
  },
};

export const LANG_ORDER: LangCode[] = ["es", "en", "it"];
