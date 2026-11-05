// Short local histories, researched 2026-11-03 from Wikipedia city pages. Only confirmed facts; nothing invented.
export type CityHistoryT = { origin: string; timeline: { year: string; text: string }[]; now: string };
export const CITY_HISTORY: Record<string, CityHistoryT> = {
 "apple-valley": {
  "origin": "The area was first established in 1859 as Lebanon Township, and voters approved incorporation in 1968 and chose the name Apple Valley over Lebanon Valley.",
  "timeline": [
   {
    "year": "1859",
    "text": "The area was first established as Lebanon Township and remained a farming community for nearly a century."
   },
   {
    "year": "1968",
    "text": "Township voters approved incorporation and chose the name Apple Valley over Lebanon Valley, 1376 to 757."
   },
   {
    "year": "2020",
    "text": "The census counted 56,374 residents, making Apple Valley the state's 17th most populous city."
   }
  ],
  "now": "Apple Valley is a Twin Cities suburb in northwestern Dakota County with 56,374 residents at the 2020 census."
 },
 "bloomington": {
  "origin": "Peter and Louisa Quinn built the first European settler cabin in 1843, and residents incorporated the Town of Bloomington in 1858, naming it after Bloomington, Illinois.",
  "timeline": [
   {
    "year": "1843",
    "text": "Peter and Louisa Quinn, the first European settlers, built a cabin along the Minnesota River."
   },
   {
    "year": "1952",
    "text": "Toro Manufacturing Company, the first large business, moved to Bloomington."
   },
   {
    "year": "1992",
    "text": "The Mall of America opened to the public."
   }
  ],
  "now": "Bloomington is a large suburb south of Minneapolis, home to the Mall of America, with 89,987 residents at the 2020 census."
 },
 "burnsville": {
  "origin": "Irish, Scottish and Norwegian farmers settled the area from the 1850s, and it incorporated in 1964, with the name attributed to settler William Byrne, recorded as Burns.",
  "timeline": [
   {
    "year": "1855",
    "text": "William Byrne settled at what is now the junction of County Road 34 and Judicial Road."
   },
   {
    "year": "1964",
    "text": "Burnsville incorporated after fending off an annexation attempt by Bloomington."
   },
   {
    "year": "1977",
    "text": "Burnsville Center, a regional mall, opened."
   }
  ],
  "now": "Burnsville is a Dakota County suburb about 15 miles south of downtown Minneapolis, with 64,317 residents at the 2020 census."
 },
 "carver": {
  "origin": "Norwegian immigrant Axel Jorgenson claimed the land by 1852, and Carver incorporated as a village in 1877, named for explorer Jonathan Carver.",
  "timeline": [
   {
    "year": "1857",
    "text": "The town was platted and its lots were divided among seven investors."
   },
   {
    "year": "1871",
    "text": "The Minneapolis and St. Louis Railway arrived, shifting traffic away from the river and marking the start of Carver's decline."
   },
   {
    "year": "1980",
    "text": "The Carver Historic District was placed on the National Register of Historic Places."
   }
  ],
  "now": "Carver is a small river city that has kept much of its historic character and is a Preserve America Community, with 5,829 residents at the 2020 census."
 },
 "chanhassen": {
  "origin": "The area was first established in June 1852, and Chanhassen incorporated as a village in 1896 and a city in 1967, with a name from the Dakota word for sugar-maple tree.",
  "timeline": [
   {
    "year": "1852",
    "text": "Joseph Vogel and his brothers, the first recorded settlers, settled on Rice Marsh Lake."
   },
   {
    "year": "1855",
    "text": "The first school in Chanhassen and Carver County opened at Susan Hazeltine's residence."
   },
   {
    "year": "1967",
    "text": "Chanhassen was incorporated as a city on May 8."
   }
  ],
  "now": "Chanhassen is an outer southwestern Twin Cities suburb, headquarters of Life Time Fitness and former home of Prince's Paisley Park, with 25,947 residents at the 2020 census."
 },
 "chaska": {
  "origin": "Chaska was settled after the 1851 Treaty of Traverse des Sioux, when Thomas Andrew Holmes claimed the townsite, and its name anglicizes a Dakota word for first-born son.",
  "timeline": [
   {
    "year": "1857",
    "text": "Brick making began, supported by the area's high-quality clay."
   },
   {
    "year": "1871",
    "text": "The village of Chaska was incorporated."
   },
   {
    "year": "1873",
    "text": "The Minneapolis and St. Louis Railway was built through town, leading to rapid expansion."
   }
  ],
  "now": "Chaska is the county seat of Carver County and an outer-ring Twin Cities suburb, with 27,810 residents at the 2020 census."
 },
 "eagan": {
  "origin": "Eagan was settled as an Irish farming community and named for Patrick Eagan, first chairman of the town board of supervisors, and it was incorporated in 1972.",
  "timeline": [
   {
    "year": "1972",
    "text": "Eagan was incorporated."
   },
   {
    "year": "1980",
    "text": "A six-lane Minnesota River bridge was completed as part of Highway 77 work, contributing to the city's largest growth period."
   },
   {
    "year": "2018",
    "text": "The Minnesota Vikings' Twin Cities Orthopedics Performance Center opened as a year-round training facility."
   }
  ],
  "now": "Eagan is a Dakota County suburb on the south bank of the Minnesota River, south of Saint Paul, with 68,855 residents at the 2020 census."
 },
 "eden-prairie": {
  "origin": "Pioneers settled the area after an 1851 treaty opened land west of the Mississippi, and writer Elizabeth F. Ellet named it Eden in 1853 for its beautiful prairie.",
  "timeline": [
   {
    "year": "1853",
    "text": "Writer Elizabeth F. Ellet named the settlement Eden, admiring the beautiful prairie in the southern part of town."
   },
   {
    "year": "1858",
    "text": "The town board held its first meeting in a log schoolhouse on the day Minnesota became a state."
   },
   {
    "year": "1974",
    "text": "Eden Prairie became a statutory city, having been a village since 1962."
   }
  ],
  "now": "Eden Prairie had 64,198 residents at the 2020 census and is home to corporate headquarters including SuperValu and C.H. Robinson Worldwide."
 },
 "edina": {
  "origin": "Edina began as part of Richfield Township as a farming and milling community along Minnehaha Creek, and in 1888 residents voted to form a separate village named for Andrew Craik's former hometown in Scotland.",
  "timeline": [
   {
    "year": "1869",
    "text": "Andrew Craik bought a mill and renamed it Edina after his former hometown in Scotland."
   },
   {
    "year": "1888",
    "text": "Residents met to consider forming a new village separate from Richfield Township, and the idea was accepted."
   },
   {
    "year": "1966",
    "text": "Morningside, which had seceded as a separate village in 1920, rejoined Edina."
   }
  ],
  "now": "Edina is a first-ring Minneapolis suburb of 53,494 residents at the 2020 census, known for its schools, parks and Southdale Center, the oldest indoor mall in the United States."
 },
 "excelsior": {
  "origin": "Excelsior was established in 1853 by a group of settlers from upstate New York, the first white settlement on Lake Minnetonka, and was incorporated in 1878.",
  "timeline": [
   {
    "year": "1822",
    "text": "Teenagers Joe Brown and Will Snelling were the first known Euro-Americans to visit Lake Minnetonka."
   },
   {
    "year": "1853",
    "text": "A group of settlers from upstate New York established Excelsior on Lake Minnetonka."
   },
   {
    "year": "1878",
    "text": "Excelsior was incorporated."
   }
  ],
  "now": "Excelsior had 2,355 residents at the 2020 census and sits on Lake Minnetonka's south shore, where its Water Street commercial district is on the National Register of Historic Places."
 },
 "lakeville": {
  "origin": "Lakeville was settled after J. J. Brackett platted a site halfway between Saint Paul and Saint Peter in 1855, and it was incorporated as a city in 1967, named for Prairie Lake, later renamed Lake Marion.",
  "timeline": [
   {
    "year": "1855",
    "text": "J. J. Brackett platted a site halfway between Saint Paul and Saint Peter, which led to settlement."
   },
   {
    "year": "1858",
    "text": "Lakeville was established as Lakeville Township."
   },
   {
    "year": "1967",
    "text": "Lakeville was incorporated as a city."
   }
  ],
  "now": "Lakeville had 69,490 residents at the 2020 census and is the largest city in Dakota County, known for Airlake Industrial Park."
 },
 "maple-grove": {
  "origin": "The Winnebago (Ho-Chunk) were the only inhabitants until 1851, when Louis Gervais came to the area, which was known for its large stands of maple trees and maple syrup.",
  "timeline": [
   {
    "year": "1851",
    "text": "Louis Gervais came to the Maple Grove area and put down roots."
   },
   {
    "year": "1854",
    "text": "The Pierre Bottineau House, the first wood-frame house in Maple Grove Township, was built."
   },
   {
    "year": "1987",
    "text": "On July 23, an F3 tornado damaged homes and businesses in Maple Grove before moving into Brooklyn Park."
   }
  ],
  "now": "Maple Grove had 70,253 residents at the 2020 census, is Minnesota's 11th most populous city, and is home to the state's largest Hindu temple."
 },
 "minnetonka": {
  "origin": "A claim staked on Minnehaha Creek in 1852 led to Minnetonka Mills, the first permanent European-American settlement west of Minneapolis in Hennepin County, and the name comes from the Dakota words mni (water) and tanka (big).",
  "timeline": [
   {
    "year": "1851",
    "text": "The Dakota were forced to sell the area to the United States through the Treaty of Traverse des Sioux."
   },
   {
    "year": "1852",
    "text": "A claim was staked on Minnehaha Creek near McGinty Road, beginning the settlement of Minnetonka Mills."
   },
   {
    "year": "1956",
    "text": "Minnetonka was incorporated."
   }
  ],
  "now": "Minnetonka is a western Twin Cities suburb and the headquarters of Cargill, the country's largest privately owned company."
 },
 "plymouth": {
  "origin": "Antoine LeCounte, the first settler, arrived in 1848 but did not settle until 1852, and Plymouth began as a town in 1855 on the northwest shore of Parkers Lake.",
  "timeline": [
   {
    "year": "1855",
    "text": "Plymouth began as a town on the northwest shore of what is now Parkers Lake."
   },
   {
    "year": "1955",
    "text": "Plymouth incorporated as a village on May 18."
   },
   {
    "year": "1992",
    "text": "Plymouth became a home rule charter city after voters adopted a charter on November 3."
   }
  ],
  "now": "Plymouth had 81,026 residents at the 2020 census, making it Minnesota's 7th-largest city, about 10 miles west of downtown Minneapolis."
 },
 "prior-lake": {
  "origin": "Prior Lake was founded in 1872, and its lake was renamed for Charles Prior, who was associated with the Chicago, Milwaukee and St. Paul Railroad.",
  "timeline": [
   {
    "year": "1872",
    "text": "Prior Lake was founded."
   },
   {
    "year": "1891",
    "text": "Prior Lake was incorporated as a village on February 11."
   },
   {
    "year": "1921",
    "text": "Prior Lake was incorporated as a city on June 1."
   }
  ],
  "now": "Prior Lake is a city about 20 miles southwest of Minneapolis, with 27,617 residents at the 2020 census."
 },
 "richfield": {
  "origin": "Richfield Township was established by Hennepin County on April 10, 1858, and residents picked the name Richfield at their 1858 meeting.",
  "timeline": [
   {
    "year": "1837",
    "text": "Franklin Steele reached the area and worked as a sutler, selling goods to soldiers."
   },
   {
    "year": "1858",
    "text": "Hennepin County established the Town of Richfield on April 10."
   },
   {
    "year": "1950",
    "text": "Residents voted for a city-manager form of government on November 7."
   }
  ],
  "now": "Richfield is an inner-ring Minneapolis suburb of 36,994 residents in the 2020 census and is home to Best Buy's headquarters."
 },
 "savage": {
  "origin": "Traders set up a post at the Credit River and Minnesota River confluence in 1852, the village of Hamilton incorporated in 1892, and it was renamed Savage in 1904 after Marion Willis Savage, owner of the racehorse Dan Patch.",
  "timeline": [
   {
    "year": "1852",
    "text": "Traders set up a small post at the confluence of the Credit River and the Minnesota River."
   },
   {
    "year": "1906",
    "text": "Dan Patch set a world pacing mile record at the Minnesota State Fair."
   },
   {
    "year": "1942",
    "text": "Camp Savage, a Japanese-language military intelligence school, was established."
   }
  ],
  "now": "Savage had 32,465 residents in the 2020 census and is a suburban city with an industrial manufacturing job center and parts of the Minnesota Valley National Wildlife Refuge."
 },
 "shakopee": {
  "origin": "Thomas A. Holmes set up a trading post in 1851, the city incorporated in 1857, and it is named after Chief Shakopee II of the Mdewakanton Dakota.",
  "timeline": [
   {
    "year": "1851",
    "text": "After the Treaty of Traverse des Sioux, Thomas Holmes established a trading post west of the Dakota."
   },
   {
    "year": "1857",
    "text": "The city of Shakopee was incorporated."
   },
   {
    "year": "1870",
    "text": "The city incorporated again, having surrendered its charter in 1861."
   }
  ],
  "now": "Shakopee is the Scott County seat with 43,698 residents in the 2020 census and is known for Valleyfair and Canterbury Park."
 },
 "shorewood": {
  "origin": "Shorewood was incorporated out of Excelsior Township in 1956 to avoid annexation by neighboring municipalities.",
  "timeline": [
   {
    "year": "1956",
    "text": "Shorewood was incorporated out of Excelsior Township to avoid annexation by neighboring municipalities."
   }
  ],
  "now": "Shorewood had 7,783 residents in the 2020 census and sits on the southern shore of Lake Minnetonka, including Spray and Shady Islands."
 },
 "victoria": {
  "origin": "Michael Diethelm is believed to be the first settler, building a shelter in 1851, and the city is named after St. Victoria Church.",
  "timeline": [
   {
    "year": "1851",
    "text": "Michael Diethelm built a shelter for his wife and two children near the present-day St. Victoria Church."
   },
   {
    "year": "1857",
    "text": "St. Victoria Church was built on 30 acres just north of Lake Bavaria."
   },
   {
    "year": "1858",
    "text": "Steamboats from St. Paul began delivering supplies to settlers, and the Laketown Moravian Brethren's Church was established."
   }
  ],
  "now": "Victoria had 10,546 residents in the 2020 census."
 },
 "waconia": {
  "origin": "The city took its name from Lake Waconia.",
  "timeline": [
   {
    "year": "1860",
    "text": "A post office has been in operation at Waconia since 1860."
   },
   {
    "year": "1884",
    "text": "The Coney Island of the West resort on Lake Waconia began attracting tourists."
   }
  ],
  "now": "Waconia is a Carver County city of 13,033 residents in the 2020 census that draws visitors to Lake Waconia."
 },
 "wayzata": {
  "origin": "Oscar E. Garrison laid out the town in 1854, it was incorporated as a village in 1883, and the name comes from the Dakota word wazíyata, meaning north or north shore.",
  "timeline": [
   {
    "year": "1854",
    "text": "Oscar E. Garrison laid out the town of Wayzata."
   },
   {
    "year": "1867",
    "text": "The Saint Paul and Pacific Railroad extended its tracks to Wayzata, making it the area's transportation hub."
   },
   {
    "year": "1883",
    "text": "Wayzata was officially incorporated as a village."
   }
  ],
  "now": "Wayzata had 4,434 residents in the 2020 census and is known for its upscale shopping and restaurant district along the Lake Minnetonka shoreline."
 }
};
