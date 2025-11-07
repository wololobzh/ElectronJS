import 'reveal.js/dist/theme/solarized.css';
import "./home.css";

document.addEventListener("DOMContentLoaded", showAllAvailableSlides);

async function showAllAvailableSlides() {
  const files = import.meta.glob('../slides/**/*.md');
  const slides = Object.keys(files)
    .map(filename => filename.replace("\.\./slides/", ""))
    .map(filename => filename.replace("\.md", ""))
    .map(filename => {
      const displayedFilename = filename
        .split("/").slice(0, -1).join(" / ") // Remove file name, only keep folder name
        .substring(3) // Remove indexes
        .replaceAll("-", " ")
      ;
      return `
        <li>
          <a href="/slides?filename=${filename}">
            ${displayedFilename}
          </a>
          <a href="/slides?filename=${filename}&print-pdf" title="Version imprimable en PDF" style="margin-left: .5em">
            🖨️
          </a>
        </li>
      `;
    })
    .join("");
  
  document.querySelector("ul").innerHTML = slides;
}
