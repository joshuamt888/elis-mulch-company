// Verified local facts per city (Wikipedia and city/county sources, researched 2026-10-27). Only what was confirmed; nothing is invented.
export type CityFacts = { county: string; housing: string; landmarks: string[] };
export const CITY_FACTS: Record<string, CityFacts> = {
 "chanhassen": {
  "county": "Carver",
  "housing": "Chanhassen is one of the more recently developed cities in the region, and its population is up more than 120 percent since 1990. Housing runs from 1980s to 2000s two-stories and ramblers to townhome communities and higher-end homes by Lotus Lake, Lake Ann and Lake Minnewashta.",
  "landmarks": [
   "Minnesota Landscape Arboretum",
   "Lake Ann Park",
   "Lotus Lake",
   "Lake Minnewashta",
   "Chanhassen Dinner Theatres",
   "Paisley Park"
  ]
 },
 "eden-prairie": {
  "county": "Hennepin",
  "housing": "Eden Prairie was slow to grow until the 1950s, then took off, with most of its housing built from the 1960s through the 1980s and since. It is largely suburban, with a lot of two-story homes.",
  "landmarks": [
   "Staring Lake",
   "Round Lake",
   "Lake Riley",
   "Bryant Lake Regional Park",
   "Purgatory Creek Park",
   "Eden Prairie Center",
   "Minnesota River Bluffs LRT Regional Trail"
  ]
 },
 "chaska": {
  "county": "Carver",
  "housing": "Chaska is the Carver County seat, and a brick-making center from 1857. It adds a few hundred new homes a year, with a planned 600-acre residential development, and brick downtown storefronts sit beside brand-new subdivisions.",
  "landmarks": [
   "Minnesota River",
   "Hazeltine National Golf Club",
   "Chaska Curling Center",
   "Chaska Community Center"
  ]
 },
 "shakopee": {
  "county": "Scott",
  "housing": "Shakopee grew as a bedroom community after US-169 was realigned in 1996. It mixes established subdivisions like Southbridge and Dean Lakes with active new-construction areas like Valley Crest and Highview Park.",
  "landmarks": [
   "Minnesota River",
   "Canterbury Park",
   "Valleyfair",
   "Minnesota Renaissance Festival",
   "Mystic Lake Amphitheater"
  ]
 },
 "savage": {
  "county": "Scott",
  "housing": "Savage has an old downtown that grew from the historic Hamilton area in the late 1800s, but the city stayed largely undeveloped after the war and grew quickly from the 1980s and 90s. It is mostly single-family homes, with some townhouses and apartments.",
  "landmarks": [
   "Minnesota River",
   "Murphy-Hanrehan Park Reserve",
   "Eagle Creek",
   "Savage Fen",
   "McColl Pond",
   "Dan Patch Days"
  ]
 },
 "excelsior": {
  "county": "Hennepin",
  "housing": "Excelsior was founded in 1853 as the first settlement on Lake Minnetonka, and beyond downtown it keeps much of its Victorian-era housing, with building rules that protect the historic look.",
  "landmarks": [
   "Lake Minnetonka",
   "Excelsior Commons",
   "Water Street Historic District",
   "Minnesota Streetcar Museum",
   "Apple Days"
  ]
 },
 "minnetonka": {
  "county": "Hennepin",
  "housing": "Minnetonka was incorporated in 1956 and stayed partly rural into the 1960s before filling in as a suburb. Most of it is residential, with lakes, creeks and parkland running through it.",
  "landmarks": [
   "Lake Minnetonka",
   "Minnehaha Creek",
   "Lone Lake Park",
   "Big Willow Park",
   "Shady Oak Lake Park",
   "Minnetonka Town Hall"
  ]
 },
 "prior-lake": {
  "county": "Scott",
  "housing": "Prior Lake is built around Upper Prior Lake, Lower Prior Lake and Spring Lake. Housing runs from older lake cottages to newer villa-style homes and estates, with newer and custom builds in The Wilds, Pike Lake Landing, Sunset Shore and Tara Farms.",
  "landmarks": [
   "Upper Prior Lake",
   "Lower Prior Lake",
   "Spring Lake",
   "Lakefront Park",
   "Sand Point Beach Park",
   "The Wilds Golf Club"
  ]
 },
 "victoria": {
  "county": "Carver",
  "housing": "Victoria had 10,546 residents and 3,719 housing units at the 2020 census. It is a city of lakes and parks, with 13 lakes and 25 parks, settled around 1851 as a farming area.",
  "landmarks": [
   "Lake Bavaria",
   "Carver Park Reserve",
   "St. Victoria Church"
  ]
 },
 "waconia": {
  "county": "Carver",
  "housing": "Waconia grew from 2,646 housing units (2000) to 4,112 (2010) to 4,826 (2020), with a population of 13,033 in 2020. It sits on Lake Waconia and has several NRHP-listed historic houses alongside newer growth.",
  "landmarks": [
   "Lake Waconia",
   "Lake Waconia Regional Park",
   "Carver County Historical Society Museum",
   "Windmill Creek Park"
  ]
 },
 "shorewood": {
  "county": "Hennepin",
  "housing": "Shorewood was incorporated in 1956 out of Excelsior Township and lies on the south shore of Lake Minnetonka. The 2020 census counted 7,783 people and 3,023 housing units, 70.1% of households married-couple.",
  "landmarks": [
   "Lake Minnetonka",
   "Lake Minnetonka Regional Trail",
   "Mary Lake"
  ]
 },
 "carver": {
  "county": "Carver",
  "housing": "Carver was platted in 1857 and incorporated as a village in 1877; its old core is the Carver Historic District (NRHP 1980, 87 buildings), with historic homes preserved by decades of stagnation after 1871. Population grew from 1,266 (2000) to 5,829 (2020), with 1,916 housing units in 2020.",
  "landmarks": [
   "Carver Historic District",
   "Minnesota River",
   "Temperance Hotel",
   "Carver Steamboat Days"
  ]
 },
 "plymouth": {
  "county": "Hennepin",
  "housing": "Plymouth was mostly farmland until the mid-1900s and became a village in 1955. Steady growth since then means homes of a wide range of ages across the city.",
  "landmarks": [
   "Medicine Lake",
   "Parkers Lake",
   "Medicine Lake Regional Trail",
   "Hilde Performance Center"
  ]
 },
 "maple-grove": {
  "county": "Hennepin",
  "housing": "Maple Grove grew quickly after the highways opened in the 1970s, so most of its housing is newer suburban construction. A large former gravel mining area is slated for new residential and commercial development.",
  "landmarks": [
   "Elm Creek Park Reserve",
   "Rice Lake",
   "Weaver Lake",
   "Fish Lake",
   "Medicine Lake Regional Trail",
   "The Shoppes at Arbor Lakes"
  ]
 },
 "wayzata": {
  "county": "Hennepin",
  "housing": "Wayzata is a historic lakeside town, platted in 1854. Large country estates were built on Ferndale Shore in the 1890s, summer cottages became year-round homes after World War II, and some downtown homes have been replaced by condos and offices.",
  "landmarks": [
   "Lake Minnetonka",
   "Wayzata Beach",
   "Great Northern Depot",
   "Dakota Rail Regional Trail"
  ]
 },
 "edina": {
  "county": "Hennepin",
  "housing": "Edina is more than 95 percent developed and grew from a streetcar suburb into a car-oriented one in the 1950s and 60s, which left many mid-century ramblers. It also has historic districts, including Country Club, Baird and Grimes.",
  "landmarks": [
   "Southdale Center",
   "Centennial Lakes Park",
   "Edinborough Park",
   "Braemar Golf Course",
   "Minnehaha Creek",
   "Nine Mile Creek Regional Trail"
  ]
 },
 "bloomington": {
  "county": "Hennepin",
  "housing": "Bloomington grew fast after World War II, so much of its housing dates from the 1950s through the 1970s. West Bloomington is mostly newer residential, while the east side has most of the city's more affordable housing.",
  "landmarks": [
   "Mall of America",
   "Hyland Lake Park Reserve",
   "Bush Lake",
   "Normandale Lake",
   "Minnesota Valley National Wildlife Refuge"
  ]
 },
 "burnsville": {
  "county": "Dakota",
  "housing": "Burnsville grew fast after I-35W opened, with 1950s and 60s ramblers and split-levels, then 1990s upscale housing and apartments, and 2000s condos in the Heart of the City redevelopment.",
  "landmarks": [
   "Crystal Lake",
   "Keller Lake",
   "Buck Hill",
   "Burnsville Center",
   "Ames Center",
   "Minnesota Valley National Wildlife Refuge"
  ]
 },
 "lakeville": {
  "county": "Dakota",
  "housing": "Lakeville is the largest city in Dakota County, with heavy new construction in master-planned communities and established neighborhoods like Knob Hill. It is mostly single-family homes, with townhomes, villas and custom enclaves.",
  "landmarks": [
   "Lake Marion",
   "Antlers Park",
   "Orchard Lake",
   "Valley Lake",
   "Ritter Farm Park",
   "Vermillion River"
  ]
 },
 "apple-valley": {
  "county": "Dakota",
  "housing": "Apple Valley turned from farmland into suburbs from the mid-1950s, and became a village in 1969. Most of the housing is postwar suburban stock, with newer planned neighborhoods like Cobblestone Lake.",
  "landmarks": [
   "Minnesota Zoo",
   "Lebanon Hills Regional Park",
   "Valleywood Golf Course",
   "Redwood Park",
   "Hayes Park",
   "Farquar Lake"
  ]
 },
 "eagan": {
  "county": "Dakota",
  "housing": "Most of Eagan was built between the 1970s and the 1990s, with two-story traditionals, ramblers, split-levels and split-entry townhomes. Many of those homes are now 30 to 50 years old, alongside newer custom infill, villas and the Viking Lakes development.",
  "landmarks": [
   "Lebanon Hills Regional Park",
   "Cascade Bay",
   "Caponi Art Park",
   "Patrick Eagan Park",
   "Central Park",
   "Rahn Park"
  ]
 },
 "richfield": {
  "county": "Hennepin",
  "housing": "Richfield was one of the earliest postwar suburbs, settled by returning World War II veterans. It has about 10,000 single-family homes, mostly from the 1950s, and about 5,000 apartment units from the 1960s and early 1970s.",
  "landmarks": [
   "Wood Lake Nature Center",
   "Wood Lake",
   "Richfield Ice Arena",
   "Fort Snelling (nearby)"
  ]
 }
};
