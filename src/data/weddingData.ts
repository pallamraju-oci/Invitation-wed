export interface EventDetail {
  title: string;
  date: string;
  day: string;
  time?: string;
  venueName: string;
}

export interface WeddingData {
  groom: string;
  bride: string;
  groomFull: string;
  brideFull: string;
  weddingDate: string;
  weddingDay: string;
  weddingTime: string;
  invocation: string;
  tagline: string;
  welcomeMessage: string;
  journey: {
    heading: string;
    lines: string[];
    closing: string;
  };
  haldi: EventDetail;
  wedding: {
    venue: string;
    address: string;
    date: string;
    day: string;
    time: string;
    mapsUrl: string;
  };
  blessing: string;
  thankYouMessage: string;
  finalMessage: string;
  signature: string;
}

export const weddingData: WeddingData = {
  groom: "Charan",
  bride: "Jyothi",
  groomFull: "Charan",
  brideFull: "Jyothi",
  weddingDate: "30 August 2026",
  weddingDay: "Sunday",
  weddingTime: "11:27 PM",
  invocation: "ఓం శ్రీ గణేశాయ నమః",
  tagline: "A love story written in destiny",
  welcomeMessage:
    "Together with their families, we joyfully invite you to celebrate the wedding of two hearts, two families, and a beautiful journey of a lifetime.",
  journey: {
    heading: "Our Journey",
    lines: ["From strangers to friends, from friends to love,", "and from love to forever."],
    closing: "Thank you for being a part of our beautiful story.",
  },
  haldi: {
    title: "Haldi Ceremony",
    date: "28 August 2026",
    day: "Friday",
    venueName: "At Our Residence",
  },
  wedding: {
    venue: "S Convention",
    address: "Brodipet Bypass Road, Palakollu, Andhra Pradesh",
    date: "30 August 2026",
    day: "Sunday",
    time: "11:27 PM",
    mapsUrl: "https://maps.app.goo.gl/RJoB2yetVfwoUqxRA?g_st=ac",
  },
  blessing:
    "With the divine blessings of Almighty and our elders, we seek your love, blessings and good wishes as we begin our new journey together.",
  thankYouMessage: "Your presence will make our celebration even more special and memorable.",
  finalMessage:
    "With the blessings of our families, we request the honour of your presence to bless the couple and make the occasion truly memorable.",
  signature: "Together Forever",
};
