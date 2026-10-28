import { AREAS } from "@/lib/areas";
import { CITY_FACTS } from "@/lib/cityFacts";

export type QA = { question: string; answer: string };
export const SITE = "https://mulchcompanymn.com";
const PHONE = "(952) 314-4797";
const list = (a: string[]) => (a.length > 2 ? `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}` : a.join(" and "));
const CITIES = list(AREAS.map((a) => a.name));

// Shared answers, reused across pages so the facts never drift. Every claim is from this site's own pages (quote process, calculator formula and tips, colors page).
const A = {
  cost: `It depends on the size of your beds, how deep you want the layer, and the type of mulch. That is why we quote in person: we visit your property, measure, and give you an exact price, free. You can also use our free mulch calculator to see how much you need.`,
  amount: `One cubic yard of mulch covers about 108 square feet at 3 inches deep. Multiply your bed's length by its width, then use our free mulch calculator to get cubic yards for 1 to 4 inches. Three inches is the standard depth for most flower beds.`,
  depth: `Three inches is standard for most flower beds. Go thicker for weed control, or thinner for a quick refresh. Our mulch calculator shows the cubic yards for 1, 2, 3 and 4 inches.`,
  types: `We install hardwood mulch, cedar mulch, black mulch, brown mulch, red mulch and playground mulch, and our colors page also shows dark brown, gold and natural. Your quote includes a recommendation for your landscape.`,
  when: `Spring, once the ground has thawed and the beds are cleaned up, is the most popular time to mulch in Minnesota. Many homeowners also add a fresh layer in fall before the freeze. Call ${PHONE} and we will schedule your install week.`,
  quote: `Yes. Every quote is free and in person. We visit your property, assess your beds, and give you accurate pricing, with no online guesswork.`,
  time: `Many yards are finished in a single day, depending on size. Our crew arrives on your scheduled week, installs fresh mulch with even coverage and clean edges, and leaves the beds tidy.`,
  insured: `Yes. Mulch Company is fully insured and locally owned, based in Chanhassen, MN.`,
  book: `Call ${PHONE} or request a free quote online. We visit your property and quote it in person, then confirm your install week, and our crew handles the rest.`,
  tools: `Yes. We have three free calculators on this site: a mulch calculator, a sod calculator, and a rock and stone calculator. Enter your area and the depth you want and each one shows the amount you need.`,
};

export function cityFaqs(name: string, slug: string): QA[] {
  const f = CITY_FACTS[slug];
  const l1 = f?.landmarks[0];
  const l2 = f?.landmarks[1];
  const out: QA[] = [
    { question: `Do you install mulch in ${name}, MN?`, answer: `Yes. ${name} is part of our Twin Cities service area, and we install mulch for homes and businesses there. ${slug === "chanhassen" ? "Chanhassen is our home base. " : ""}Call ${PHONE} or request a free in-person quote.` },
    { question: `How much does mulch installation cost in ${name}?`, answer: A.cost },
    { question: `How much mulch do I need for my ${name} yard?`, answer: A.amount },
    { question: `How thick should mulch be?`, answer: A.depth },
    { question: `What types of mulch do you install in ${name}?`, answer: A.types },
    { question: `When is the best time to mulch in ${name}?`, answer: A.when },
    { question: `Do you offer free mulch quotes in ${name}?`, answer: A.quote },
    { question: `How long does a mulch installation take?`, answer: A.time },
    { question: `Is Mulch Company insured?`, answer: A.insured },
    { question: `How do I book mulch installation in ${name}?`, answer: A.book },
  ];
  if (f) {
    out.splice(1, 0, { question: `What is mulching like in ${name}?`, answer: `${f.housing} Our crews install mulch around beds, trees and shrubs across ${name}${l1 && l2 ? `, including near ${l1} and ${l2}` : ""}.` });
    out.push({ question: `Which parts of ${name} do you serve?`, answer: `All of ${name}${l1 && l2 ? `. If you are near ${l1} or ${l2}, we are already working in the area` : ""}. We serve ${AREAS.length} Twin Cities cities in all, including ${CITIES}.` });
  }
  return out;
}

export const homeFaqs: QA[] = [
  { question: "What does Mulch Company do?", answer: "Mulch Company is a locally owned mulch installation company based in Chanhassen, MN. We visit your property, quote it in person, and our crew installs fresh mulch with even coverage and clean edges. You never lift a finger." },
  { question: "Which cities do you serve?", answer: `We serve ${AREAS.length} Twin Cities cities: ${CITIES}. Each has its own page with local details.` },
  { question: "Why do Chanhassen homeowners trust Mulch Company?", answer: "We are locally owned and based in Chanhassen. You can request your installation online in minutes, we visit your property for an in-person quote so the pricing is accurate, and our crew installs with even coverage, clean edges and zero mess. We are fully insured, and the quote is free." },
  { question: "How much does mulch installation cost?", answer: A.cost },
  { question: "How much mulch do I need?", answer: A.amount },
  { question: "How thick should mulch be?", answer: A.depth },
  { question: "What types of mulch do you install?", answer: A.types },
  { question: "When is the best time to mulch in Minnesota?", answer: A.when },
  { question: "Do you offer free quotes?", answer: A.quote },
  { question: "How long does a mulch installation take?", answer: A.time },
  { question: "Are you insured?", answer: A.insured },
  { question: "Do you have free calculators?", answer: A.tools },
  { question: "How do I get started?", answer: A.book },
];

export const aboutFaqs: QA[] = [
  { question: "Who owns Mulch Company?", answer: "Mulch Company MN is a family-owned business based in Chanhassen, founded by brothers Eli and Owen Sweeney." },
  { question: "Where is Mulch Company based?", answer: `We are based in Chanhassen, MN, and we install mulch across ${AREAS.length} Twin Cities cities, including ${CITIES}.` },
  { question: "What does Mulch Company install?", answer: A.types },
  { question: "How does the process work?", answer: A.book },
  { question: "Do you offer free quotes?", answer: A.quote },
  { question: "Are you insured?", answer: A.insured },
  { question: "How long does an install take?", answer: A.time },
  { question: "Do you have free tools?", answer: A.tools },
];

export const serviceFaqs: QA[] = [
  { question: "What is included in a mulch installation?", answer: "We visit your property and quote it in person, confirm your install week, and our crew installs fresh mulch with even coverage and clean edges. You never lift a finger." },
  { question: "How much does mulch installation cost?", answer: A.cost },
  { question: "How much mulch do I need?", answer: A.amount },
  { question: "How thick should the mulch layer be?", answer: A.depth },
  { question: "Which mulch types can you install?", answer: A.types },
  { question: "When should I mulch?", answer: A.when },
  { question: "How long will it take?", answer: A.time },
  { question: "Is the quote really free?", answer: A.quote },
  { question: "Are you insured?", answer: A.insured },
  { question: "Where do you install mulch?", answer: `We install mulch across ${AREAS.length} Twin Cities cities, including ${CITIES}.` },
];

export const estimateFaqs: QA[] = [
  { question: "How do I get a mulch quote?", answer: A.book },
  { question: "Is the in-person estimate free?", answer: A.quote },
  { question: "How much does mulch cost?", answer: A.cost },
  { question: "Can I price it out myself first?", answer: A.tools },
  { question: "How much mulch do I need?", answer: A.amount },
  { question: "What mulch types can I choose from?", answer: A.types },
  { question: "How soon can you install?", answer: `We confirm your install week when we quote. ${A.time}` },
  { question: "When are you available by phone?", answer: `You can call or text ${PHONE}, Monday to Friday, 8 AM to 6 PM, or email info@mulchcompanymn.com.` },
  { question: "Which cities do you serve?", answer: `${CITIES}.` },
  { question: "Are you insured?", answer: A.insured },
];

export const colorsFaqs: QA[] = [
  { question: "What mulch colors do you offer?", answer: "We offer black, dark brown, gold, natural, red, western red cedar and playground chips. Your quote includes a recommendation for your landscape." },
  { question: "Which mulch color is best for my yard?", answer: "It depends on your house, plants and edging. Dark colors like black and dark brown make green plants and stone stand out, while red and gold add warmth. We recommend a color when we quote your property." },
  { question: "Can I pick my color when I request a quote?", answer: "Yes. Let us know the color you like when you request your quote, or ask for a recommendation." },
  { question: "What is playground mulch?", answer: "Playground chips are wood chips for play areas, installed to cover the whole space evenly." },
  { question: "How much mulch do I need?", answer: A.amount },
  { question: "How thick should mulch be?", answer: A.depth },
  { question: "Do you install it for me?", answer: A.time },
  { question: "How do I get a quote?", answer: A.book },
];

export const toolFaqs = (tool: "mulch" | "sod" | "rock"): QA[] => {
  const how = {
    mulch: "Enter the area in square feet and how thick you want the layer (1 to 4 inches), and it shows how many cubic yards of mulch you need. It uses area times depth in feet, divided by 27, and rounds up so you are not short.",
    sod: "Enter the area in square feet and pick how much extra to allow for curves and edges: 5 percent for a simple rectangle, 10 percent for most yards, or 15 percent for lots of curves. It shows total square feet, square yards, and pallets of sod.",
    rock: "Enter the area in square feet and the depth you want (1, 2, 3, 4 or 6 inches). It converts to cubic yards, then to tons using about 1.4 tons per cubic yard, because rock is sold by the ton.",
  }[tool];
  const unit = { mulch: "mulch", sod: "sod", rock: "rock and stone" }[tool];
  const facts: Record<string, QA> = {
    mulch: { question: "What does a cubic yard of mulch cover?", answer: "One cubic yard covers about 324 square feet at 1 inch deep, 162 square feet at 2 inches, 108 square feet at 3 inches, and 81 square feet at 4 inches." },
    sod: { question: "How much does a pallet of sod cover?", answer: "A standard pallet of sod typically covers about 450 square feet, but it varies by supplier. The calculator uses 450 square feet per pallet." },
    rock: { question: "How much does a cubic yard of rock weigh?", answer: "Rock is sold by the ton. The calculator uses the average density of stone, about 1.4 tons per cubic yard." },
  };
  return [
    { question: `How does the ${unit} calculator work?`, answer: how },
    { question: "How do I measure my area?", answer: "Multiply the length of your bed or yard by its width. For odd shapes, break the area into rectangles, measure each, and add them together. Walking it off works too: one big step is roughly 3 feet." },
    facts[tool],
    { question: "Is the calculator free?", answer: "Yes. It is free, and you do not need an account or to enter your email." },
    { question: "Can you install it for me?", answer: `Yes. We install mulch across ${AREAS.length} Twin Cities cities. ${A.book}` },
    { question: "Is the amount exact?", answer: "It is a close estimate. We confirm exact amounts when we visit your property and quote it in person." },
    { question: "Do you have other free calculators?", answer: A.tools },
    { question: "Where do you work?", answer: `We serve ${AREAS.length} Twin Cities cities, including ${CITIES}.` },
  ];
};

// ---- JSON-LD builders ----
export const faqLd = (items: QA[]) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })) });
export const crumbsLd = (trail: { name: string; path: string }[]) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: `${SITE}${t.path}` })) });
export const serviceLd = (name: string, path: string, city?: string) => ({ "@context": "https://schema.org", "@type": "Service", "@id": `${SITE}${path}#service`, name, serviceType: "Mulch installation", url: `${SITE}${path}`, provider: { "@id": `${SITE}/#localbusiness` }, ...(city ? { areaServed: { "@type": "City", name: `${city}, MN` } } : {}) });
