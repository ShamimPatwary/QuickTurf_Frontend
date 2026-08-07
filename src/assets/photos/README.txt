Drop downloaded photos here, then update the `image:` field for each item in
src/pages/public/HomePageV2.jsx to import from this folder instead of the SVG
illustrations under src/assets/illustrations/.

All sources below are from Pexels (free to use, no attribution required, modification
allowed - https://www.pexels.com/license/). Click each page link, then use the
"Free download" / "Download" button on that page to get the actual file.

Suggested files and matching source pages:

football-pitch.jpg
  https://www.pexels.com/photo/aerial-photography-of-football-field-goal-net-3507477/
  (night football pitch, floodlit, aerial - good for the Football sport tile)

cricket-ground.jpg
  https://www.pexels.com/photo/panoramic-view-of-melbourne-cricket-ground-33370012/
  (wide cricket ground shot - good for the Cricket sport tile)

news-five-a-side.jpg
  https://www.pexels.com/photo/close-up-of-green-soccer-field-turf-with-white-lines-33267122/

news-cricket-nets.jpg
  https://www.pexels.com/photo/vibrant-cricket-match-at-melbourne-cricket-ground-29949985/

news-floodlit.jpg
  https://www.pexels.com/photo/aerial-photography-of-football-field-goal-net-3507477/

Example swap, in HomePageV2.jsx:

  import footballImage from "../../assets/illustrations/sport-football.svg";
  -->
  import footballImage from "../../assets/photos/football-pitch.jpg";

No other code changes needed - SportCategoryGrid and NewsCardRow already accept
any image URL or local import through the same `image` prop.
