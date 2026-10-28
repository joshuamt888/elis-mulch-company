const G = {
  mulch: {
    h: "How much mulch do you need?",
    p: [
      "Mulch is sold and installed by the cubic yard. To find your number, multiply the length of your bed by its width to get square feet, choose how thick you want the layer, and let the calculator do the rest. It uses area times depth in feet, divided by 27.",
      "Three inches is the standard depth for most flower beds. Go thicker for weed control, or thinner for a quick refresh. As a guide, one cubic yard covers about 108 square feet at 3 inches deep, 162 square feet at 2 inches, and 324 square feet at 1 inch.",
      "Not sure how to measure a curved bed? Break it into rectangles, measure each, and add them together. When you would rather not do the math, we visit your property, measure it in person, and give you an exact price. That quote is free.",
    ],
  },
  sod: {
    h: "How much sod do you need?",
    p: [
      "Sod is sold by the pallet, and a standard pallet typically covers about 450 square feet, though it varies by supplier. To find your number, multiply the length of the area by its width, then add extra for cuts and curves.",
      "The calculator lets you choose that extra: 5 percent for a simple rectangle, 10 percent for most yards, or 15 percent when the shape has lots of curves. It shows your total square feet, square yards, and the number of pallets.",
      "Measuring your lawn is easier than it sounds. Walk the length and width in big steps, about 3 feet each, and multiply. Your lot survey is another good source for exact dimensions.",
    ],
  },
  rock: {
    h: "How much rock or stone do you need?",
    p: [
      "Rock is sold by the ton, not the yard. This calculator converts your area and depth to cubic yards, then to tons using the average density of stone, about 1.4 tons per cubic yard, so you do not over-buy or run short.",
      "Two inches is the most popular depth for ground cover. Go to 3 or 4 inches for solid coverage or a weed barrier, and up to 6 inches for drainage or a dry creek bed. For walkways, multiply the length of the path by its width.",
      "Planning a bigger landscape project? Mulch and rock often go in the same beds. Ask us about mulch installation when you request your quote, and we will give you one clear price.",
    ],
  },
};

export default function ToolGuide({ tool }: { tool: "mulch" | "sod" | "rock" }) {
  const g = G[tool];
  return (
    <section className="tg">
      <h2>{g.h}</h2>
      {g.p.map((t) => (<p key={t}>{t}</p>))}
    </section>
  );
}
