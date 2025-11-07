// Reveal JS & plugins
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm";
import Zoom from "reveal.js/plugin/zoom/zoom.esm";
import Notes from "reveal.js/plugin/notes/notes.esm";

// Reaveal CSS
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';

// Chosen and custom themes and styles
import 'reveal.js/dist/theme/solarized.css';
import 'highlight.js/styles/atom-one-dark.css'
import './slides.css';

document.addEventListener("DOMContentLoaded", showRequestedSlidesDeck);

async function showRequestedSlidesDeck() {  
  const params = new URLSearchParams(window.location.search)

  // Get the filename from the URL search params
  const filename = params.get("filename");
  if (! filename) { window.location = "/"; }

  // Get the markdown text from the file
  const filepath = `../slides/${filename}.md?raw`;
  let { default: markdownText } = await import(/* @vite-ignore */ filepath);

  // Set the document title
  document.title = `${filename} | Visionneuse de Slides`

  // Change the images URL from relative to absolute // FIXME: this is an ugly hack...
  const dirname = filename.split("/").slice(0, -1).join("/");
  markdownText = markdownText.replaceAll("](./", `](/slides/${dirname}/`);
  markdownText = markdownText.replaceAll('src="./', `src="/slides/${dirname}/`);

  // Set the markdown text to the slides container
  document.getElementById("slides").innerHTML = markdownText;
    
  // Initialize Reveal JS
  new Reveal({ plugins: [
      Markdown,
      Highlight,
      Zoom,
      Notes
  ] }).initialize({
    hashOneBasedIndex: true, // Hashes reflect slide number
    slideNumber: true, // Show slide number
    hash: true, // Hash in URL
    fragmentInURL: true, // Fragment in URL reflects slide number (but ≠ than history: true),
    pdfSeparateFragments: false // Do not print each fragment on a separated slide
  });
}
