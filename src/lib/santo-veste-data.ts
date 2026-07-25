import roundneck from "@/assets/catalogue/roundneck.jpg";
import layered from "@/assets/catalogue/layered.jpg";
import polos from "@/assets/catalogue/polos.jpg";
import sweatshirts from "@/assets/catalogue/sweatshirts.jpg";
import hoodies from "@/assets/catalogue/hoodies.jpg";
import jerseys from "@/assets/catalogue/jerseys.jpg";
import uniforms from "@/assets/catalogue/uniforms.jpg";
import scrubs from "@/assets/catalogue/scrubs.jpg";
import mandarin from "@/assets/catalogue/mandarin.jpg";
import collared from "@/assets/catalogue/collared.jpg";
import jackets from "@/assets/catalogue/jackets.jpg";
import shorts from "@/assets/catalogue/shorts.jpg";

export type ProductGalleryImage = {
  src: string;
  alt: string;
  label?: string;
  objectPosition?: string;
  scale?: number;
};

export type ProductCardCrop = {
  objectPosition: string;
  scale?: number;
  transformOrigin?: string;
};

export type PricingTier = {
  id: string;
  name: string;
  multiplier: number;
};

export type PrintMethod = {
  id: string;
  name: string;
  addOn: number;
};

export type BulkDiscount = {
  threshold: number;
  rate: number;
};

export type CategoryPricing = {
  baseUnit: number;
  tiers: PricingTier[];
  methods: PrintMethod[];
  discounts: BulkDiscount[];
};

export type Category = {
  id: string;
  index: string;
  name: string;
  description: string;
  fabrics: string;
  features: string;
  moq?: string;
  price?: string;
  sizes: string;
  image: string;
  cardCrop?: ProductCardCrop;
  gallery?: ProductGalleryImage[];
  pricing?: CategoryPricing;
};

const defaultTiers: PricingTier[] = [
  { id: "standard", name: "Standard fabric", multiplier: 1 },
  { id: "premium", name: "Premium fabric", multiplier: 1.25 },
];

const defaultMethods: PrintMethod[] = [
  { id: "none", name: "No decoration", addOn: 0 },
  { id: "screen", name: "Screen print", addOn: 800 },
  { id: "dtf", name: "DTF / DTG", addOn: 1200 },
  { id: "embroidery", name: "Embroidery", addOn: 1500 },
];

const defaultDiscounts: BulkDiscount[] = [
  { threshold: 100, rate: 0.05 },
  { threshold: 250, rate: 0.1 },
  { threshold: 500, rate: 0.15 },
];

function makePricing(baseUnit: number): CategoryPricing {
  return {
    baseUnit,
    tiers: defaultTiers,
    methods: defaultMethods,
    discounts: defaultDiscounts,
  };
}

export const categories: Category[] = [
  {
    id: "round-neck",
    index: "01",
    name: "Round-neck T-Shirts",
    description: "Comfortable round-neck T-shirts for casual or branded use.",
    fabrics: "100% Cotton, blends",
    features: "Custom printing, DTF, screen print, flex and embroidery options",
    moq: "30 pieces",
    price: "from NGN 15,000",
    sizes: "S – XXXL",
    image: roundneck,
    pricing: makePricing(15000),
    cardCrop: {
      objectPosition: "left center",
      scale: 1.06,
      transformOrigin: "left center",
    },
  },
  {
    id: "layered",
    index: "02",
    name: "Layered T-Shirts",
    description: "Comfortable round-neck layered T-shirts for casual or branded use.",
    fabrics: "100% Cotton, blends",
    features: "Custom printing, DTF, screen print, flex and embroidery options",
    moq: "30 pieces",
    price: "from NGN 15,000",
    sizes: "S – XXXL",
    image: layered,
    pricing: makePricing(15000),
    cardCrop: {
      objectPosition: "left center",
      scale: 1.06,
      transformOrigin: "left center",
    },
  },
  {
    id: "polos",
    index: "03",
    name: "Premium Polos",
    description: "Premium quality polos perfect for casual or corporate settings.",
    fabrics: "Cotton, Piqué, polyester blends",
    features: "Custom embroidery, flap collar, Henley, wide colour range",
    moq: "30 pieces",
    price: "from NGN 20,000",
    sizes: "S – XXXL",
    image: polos,
    pricing: makePricing(20000),
    cardCrop: {
      objectPosition: "center top",
      scale: 1.72,
      transformOrigin: "center top",
    },
  },
  {
    id: "sweatshirts",
    index: "04",
    name: "Sweatshirts",
    description:
      "Comfortable sweatshirts for casual activities, events, work or branded wear.",
    fabrics: "100% Cotton, polyester blends",
    features: "Logo embroidery, zipper, button, collar, Henley",
    moq: "30 pieces",
    price: "from NGN 20,000",
    sizes: "S – XXXL",
    image: sweatshirts,
    pricing: makePricing(20000),
    cardCrop: {
      objectPosition: "left top",
      scale: 2.2,
      transformOrigin: "left top",
    },
  },
  {
    id: "hoodies",
    index: "05",
    name: "Hoodies & Joggers",
    description:
      "Comfortable hoodies and joggers for keeping warm and morning workout routines.",
    fabrics: "100% Cotton, polyester blends",
    features: "Custom printing, DTF, screen print, flex and embroidery",
    moq: "30 pieces",
    price: "Set from NGN 40,000 · Hoodie 25,000 · Joggers 20,000",
    sizes: "S – XXXL",
    image: hoodies,
    pricing: makePricing(40000),
    cardCrop: {
      objectPosition: "center top",
      scale: 1.44,
      transformOrigin: "center top",
    },
  },
  {
    id: "jerseys",
    index: "06",
    name: "Jerseys",
    description: "Stylish and durable sports jerseys for teams and events.",
    fabrics: "Breathable performance blends",
    features: "Sublimation, team names, numbers, crests",
    moq: "30 pieces",
    price: "from NGN 18,000",
    sizes: "S – XXXL",
    image: jerseys,
    pricing: makePricing(18000),
    cardCrop: {
      objectPosition: "14% center",
    },
  },
  {
    id: "uniforms",
    index: "07",
    name: "School & Corporate Uniforms",
    description:
      "Uniforms tailored for schools, professional use, corporate teams and events.",
    fabrics: "Durable cotton blends, suiting fabrics",
    features: "Blazers, crests, monogramming, matching sets",
    moq: "30 pieces",
    price: "from NGN 25,000",
    sizes: "S – XXL",
    image: uniforms,
    pricing: makePricing(25000),
  },
  {
    id: "scrubs",
    index: "08",
    name: "Medical Scrubs",
    description: "Protective medical scrubs for medical and hospitality use.",
    fabrics: "Antimicrobial poly-cotton blends",
    features: "Reinforced stitching, roomy pockets, embroidered branding",
    moq: "30 pieces",
    price: "from NGN 18,000",
    sizes: "S – XXXL",
    image: scrubs,
    pricing: makePricing(18000),
    cardCrop: {
      objectPosition: "center top",
      scale: 1.28,
      transformOrigin: "center top",
    },
  },
  {
    id: "mandarin",
    index: "09",
    name: "Mandarin Collar Shirts",
    description: "Smart collared T-shirts combining style and comfort.",
    fabrics: "Cotton, linen blends",
    features: "Mandarin collar, pleats, custom buttons",
    price: "from NGN 22,000",
    sizes: "S – XXXL",
    image: mandarin,
    pricing: makePricing(22000),
    cardCrop: {
      objectPosition: "center top",
      scale: 1.6,
      transformOrigin: "center top",
    },
  },
  {
    id: "collared",
    index: "10",
    name: "Collared Shirts",
    description: "Smart collared shirts combining style and comfort.",
    fabrics: "Cotton, poplin, striped blends",
    features: "Bespoke sizing, patterned options",
    price: "from NGN 22,000",
    sizes: "S – XXXL",
    image: collared,
    pricing: makePricing(22000),
    cardCrop: {
      objectPosition: "center top",
      scale: 1.55,
      transformOrigin: "center top",
    },
  },
  {
    id: "jackets",
    index: "11",
    name: "Jackets",
    description:
      "Comfortable, premium multipurpose overshirts and bombers for casual and work use.",
    fabrics: "Cotton twill, technical shells",
    features: "Bomber, overshirt, embroidered branding",
    price: "from NGN 35,000",
    sizes: "S – XXXL",
    image: jackets,
    pricing: makePricing(35000),
    cardCrop: {
      objectPosition: "20% center",
      scale: 1.04,
      transformOrigin: "center",
    },
  },
  {
    id: "shorts",
    index: "12",
    name: "Shorts",
    description: "Comfortable shorts for casual or beach activities.",
    fabrics: "Cotton twill, chinos, cargo",
    features: "Cargo, chinos, elasticated options",
    price: "from NGN 15,000",
    sizes: "S – XXXL",
    image: shorts,
    pricing: makePricing(15000),
    cardCrop: {
      objectPosition: "right top",
      scale: 2.45,
      transformOrigin: "50% 35%",
    },
  },
];

export const services = [
  {
    title: "Screen Printing",
    body: "Classic, hard-wearing prints for large runs and bold artwork.",
  },
  {
    title: "DTF / DTG / Sublimation",
    body: "Photographic detail and full-colour graphics on cotton and blends.",
  },
  {
    title: "Embroidery & Monogramming",
    body: "Raised, tactile branding for polos, jackets, uniforms and caps.",
  },
  {
    title: "Logo, Slogan & Team Names",
    body: "Custom placement of names, numbers, crests and team identity.",
  },
  {
    title: "Buttons, Zippers, Collars",
    body: "Hardware and trim swaps to fine-tune the finish of every garment.",
  },
  {
    title: "Branded Packaging",
    body: "Custom-branded packaging available for bulk and corporate orders.",
  },
];

export const orderSteps = [
  { title: "Send your brief", body: "Share your requirements, quantities and reference visuals." },
  { title: "Choose materials", body: "Select design, fabric and customization options together with our team." },
  { title: "Approve & quote", body: "Approve the final design and receive a written quotation." },
  { title: "Production", body: "We hand you a production and delivery timeline you can plan around." },
  { title: "Delivery", body: "Receive your order — packaged, folded and ready to wear." },
];
