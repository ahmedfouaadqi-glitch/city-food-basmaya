// Stable Vite entry for the deployed CITY FOOD application.
// Keep the verified deployment assets unchanged while application modules
// are reconstructed and tested incrementally.
const stylesheet = document.createElement("link");
stylesheet.rel = "stylesheet";
stylesheet.href = "/assets/index-Ch2lSZuo.css";
document.head.append(stylesheet);
import(/* @vite-ignore */ "/assets/index-3pBSppkn.js").catch((error) => {
  console.error("CITY FOOD failed to initialize", error);
});
