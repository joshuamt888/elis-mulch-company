// Real jobs, photographed by Eli (sent to Josh 2026-11-01). Re-saved as webp with location data removed.
export type WorkPhoto = { file: string; alt: string };

export const WORK: WorkPhoto[] = [
 {
  "file": "staircase-bed-black-mulch",
  "alt": "Terraced bed with fresh dark mulch, rock and plantings beside a staircase"
 },
 {
  "file": "black-mulch-edging-evergreens",
  "alt": "Fresh dark mulch with crisp edging along evergreens and lawn"
 },
 {
  "file": "driveway-island-mulch-bed",
  "alt": "Rock-edged mulch bed in a driveway island with new plantings"
 },
 {
  "file": "blue-spruce-rock-bed",
  "alt": "Rock-lined garden bed with a blue spruce and fresh mulch beside a home"
 },
 {
  "file": "arborvitae-row-mulch-edging",
  "alt": "Row of arborvitae with mulch and crisp lawn edging"
 },
 {
  "file": "black-mulch-stone-house-entry",
  "alt": "Fresh black mulch bed with shrubs against a stone-faced house"
 },
 {
  "file": "terraced-rock-beds-steps",
  "alt": "Terraced garden beds with natural rock and fresh mulch beside timber steps"
 },
 {
  "file": "stepping-stone-path-woods",
  "alt": "Stepping-stone path with fieldstone edging and red mulch under trees"
 },
 {
  "file": "red-mulch-stepping-stones",
  "alt": "Fresh red mulch bed with stepping stones and plants beside a brick pillar"
 },
 {
  "file": "dahlias-dark-mulch",
  "alt": "Dahlias blooming in dark mulch along a brick wall"
 },
 {
  "file": "blue-spruce-garden-boulders",
  "alt": "Garden bed with a blue spruce, boulders and fresh dark mulch"
 },
 {
  "file": "mulch-bed-edge-evergreens",
  "alt": "Mulch bed along a lawn edge under evergreens"
 },
 {
  "file": "rock-border-bed-lawn",
  "alt": "Boulder-bordered garden bed with ground cover and mulch"
 },
 {
  "file": "rock-lined-bed-black-mulch",
  "alt": "Rock-lined bed with ground cover and fresh black mulch"
 },
 {
  "file": "fresh-mulch-mounds-trees",
  "alt": "Fresh mulch being spread under mature trees"
 },
 {
  "file": "stepping-stone-bed-mulch",
  "alt": "Garden bed with stepping stones, plants and mulch beside a driveway"
 },
 {
  "file": "black-mulch-stone-house-walkway",
  "alt": "Black mulch bed with shrubs along a walkway by a stone-faced house"
 },
 {
  "file": "arborvitae-row-fence",
  "alt": "Arborvitae row along a white fence with a mulched edge"
 },
 {
  "file": "hillside-garden-steps",
  "alt": "Landscaped hillside garden with a timber staircase beside a home"
 },
 {
  "file": "hillside-garden-timber-steps",
  "alt": "Hillside garden with timber steps and a mulched bed"
 }
];

export const workSrc = (file: string) => `/images/work/${file}.webp`;
export const WORK_W = 1200;
export const WORK_H = 1600;
