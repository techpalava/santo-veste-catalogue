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
  gallery?: ProductGalleryImage[];
};

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
  },
  {
    id: "jerseys",
    index: "06",
    name: "Jerseys",
    description: "Stylish and durable sports jerseys for teams and events.",
    fabrics: "Breathable performance blends",
    features: "Sublimation, team names, numbers, crests",
    moq: "30 pieces",
    sizes: "S – XXXL",
    image: jerseys,
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
    sizes: "S – XXL",
    image: uniforms,
  },
  {
    id: "scrubs",
    index: "08",
    name: "Medical Scrubs",
    description: "Protective medical scrubs for medical and hospitality use.",
    fabrics: "Antimicrobial poly-cotton blends",
    features: "Reinforced stitching, roomy pockets, embroidered branding",
    moq: "30 pieces",
    sizes: "S – XXXL",
    image: scrubs,
  },
  {
    id: "mandarin",
    index: "09",
    name: "Mandarin Collar Shirts",
    description: "Smart collared T-shirts combining style and comfort.",
    fabrics: "Cotton, linen blends",
    features: "Mandarin collar, pleats, custom buttons",
    sizes: "S – XXXL",
    image: mandarin,
  },
  {
    id: "collared",
    index: "10",
    name: "Collared Shirts",
    description: "Smart collared shirts combining style and comfort.",
    fabrics: "Cotton, poplin, striped blends",
    features: "Bespoke sizing, patterned options",
    sizes: "S – XXXL",
    image: collared,
  },
  {
    id: "jackets",
    index: "11",
    name: "Jackets",
    description:
      "Comfortable, premium multipurpose overshirts and bombers for casual and work use.",
    fabrics: "Cotton twill, technical shells",
    features: "Bomber, overshirt, embroidered branding",
    sizes: "S – XXXL",
    image: jackets,
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
