class DottedBackground extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          position: fixed; inset: 0; z-index: -1; pointer-events: none;
          background-color: #fafaf7;
          background-image: radial-gradient(#d9d9d9 1px, transparent 1px);
          background-size: 24px 24px;
        }
      </style>`;
  }
}
customElements.define("dotted-background", DottedBackground);

class UnitHeader extends HTMLElement {
  connectedCallback() {
    const course = this.getAttribute("course") || "MYP Year 5 Mathematics";
    const unit = this.getAttribute("unit") || "Unit 1";
    const part = this.getAttribute("part") || "";
    const title = this.getAttribute("title") || "";
    const soi = this.getAttribute("soi") || "";

    const navItems = [...this.querySelectorAll("nav-item")];
    const navHTML = navItems
      .map((item, i) => {
        const id = item.getAttribute("section") || `s${i + 1}`;
        return `<a class="nav-item" href="#${id}">${item.innerHTML}</a>`;
      })
      .join("");

    this.innerHTML = `
      <header class="hero">
        <div class="hero-inner">
          <p class="hero-eyebrow">${course} · ${unit} · ${part}</p>
          <h1 class="hero-title">${title}</h1>
          ${soi ? `<p class="hero-soi">${soi}</p>` : ""}
        </div>
      </header>
      <nav class="chapter-nav">
        <div class="chapter-nav-inner">
          <a class="nav-item" href="index.html">← All Notes</a>
          <span class="nav-divider"></span>
          ${navHTML}
        </div>
      </nav>`;

    requestAnimationFrame(() => {
      const sections = document.querySelectorAll("[id]");
      const items = document.querySelectorAll('.chapter-nav .nav-item:not([href="index.html"])');
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              items.forEach((n) => n.classList.remove("active"));
              const a = document.querySelector(`.chapter-nav a[href="#${e.target.id}"]`);
              if (a) a.classList.add("active");
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px" },
      );
      sections.forEach((s) => obs.observe(s));
    });
  }
}
customElements.define("unit-header", UnitHeader);

const BOX_CFG = {
  definition: { label: "Definition", stripe: "#1e3a5f", bg: "#eff6ff", lc: "#1d4ed8", tc: "#1e3a5f" },
  theorem: { label: "Theorem", stripe: "#14532d", bg: "#f0fdf4", lc: "#16a34a", tc: "#14532d" },
  example: { label: "Example", stripe: "#7c2d12", bg: "#fff7ed", lc: "#c2410c", tc: "#7c2d12" },
  proof: { label: "Proof", stripe: "#44403c", bg: "#fafaf8", lc: "#78716c", tc: "#44403c" },
};

class MathBox extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute("type") || "definition";
    const title = this.getAttribute("title") || "";
    const num = this.getAttribute("number");
    const cfg = BOX_CFG[type] || BOX_CFG.definition;
    const slot = this.querySelector('[slot="body"]');
    const body = slot ? slot.innerHTML : "";
    if (slot) slot.remove();

    const labelText = num ? `${cfg.label} ${num}` : cfg.label;

    this.innerHTML = `
      <div class="mb-wrap" style="background:${cfg.bg}">
        <div class="mb-stripe" style="background:${cfg.stripe}"></div>
        <div class="mb-body-wrap">
          <div class="mb-label" style="color:${cfg.lc}">${labelText}</div>
          ${title ? `<div class="mb-title" style="color:${cfg.tc}">${title}</div>` : ""}
          <div class="mb-content">${body}</div>
        </div>
      </div>`;

    _mj(this);
  }
}
customElements.define("math-box", MathBox);

class SideNote extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label") || "Note";
    const content = this.innerHTML;
    this.innerHTML = `
      <div class="sn-wrap">
        <div class="sn-label">${label}</div>
        <div class="sn-text">${content}</div>
      </div>`;
    _mj(this);
  }
}
customElements.define("side-note", SideNote);

const IB_TERM_DICTIONARY = {
  analyse: "Break down in order to bring out the essential elements or structure.",
  annotate: "Add brief notes to a diagram or graph.",
  apply: "Use knowledge and understanding in response to a given situation.",
  applying: "Use knowledge and understanding in response to a given situation.",
  calculate: "Obtain a numerical answer showing the relevant stages in the working.",
  comment: "Give a judgment based on a given statement or result of a calculation.",
  compare: "Give an account of the similarities between two or more items.",
  construct: "Display information in a diagrammatic or logical form.",
  convert: "Change from one form to another.",
  contrast: "Give an account of the differences between two or more items.",
  deduce: "Reach a conclusion from the information given.",
  define: "Give the precise meaning of a word, phrase, concept or physical quantity.",
  demonstrate: "Make clear by reasoning or evidence, illustrating with examples.",
  derive: "Manipulate a mathematical relationship to give a new equation or relationship.",
  describe: "Give a detailed account of a situation, event, pattern or process.",
  determine: "Obtain the only possible answer.",
  discuss: "Offer a considered review that includes a range of arguments or factors.",
  discussing: "Offer a considered review that includes a range of arguments or factors.",
  distinguish: "Make clear the differences between two or more concepts or items.",
  estimate: "Obtain an approximate value for an unknown quantity.",
  evaluate: "Make an appraisal by weighing up the strengths and limitations.",
  explain: "Give a detailed account including reasons or causes.",
  find: "Obtain an answer showing relevant stages in the working.",
  hence: "Use the preceding work to obtain the required result.",
  identify: "Provide an answer from a number of possibilities.",
  identifying: "Provide an answer from a number of possibilities.",
  interpret: "Use knowledge to recognize trends and draw conclusions from given information.",
  interpreting: "Use knowledge to recognize trends and draw conclusions from given information.",
  investigate: "Observe or study in order to establish facts and reach new conclusions.",
  justify: "Give valid reasons or evidence to support an answer or conclusion.",
  outline: "Give a brief account or summary.",
  round: "Express to a specified degree of precision.",
  predict: "Give an expected result of an upcoming action or event.",
  prove: "Use a sequence of logical steps to obtain the required result in a formal way.",
  select: "Choose from a list or group.",
  selecting: "Choose from a list or group.",
  show: "Give the steps in a calculation or derivation.",
  sketch: "Represent by means of a diagram or graph labelled as appropriate.",
  solve: "Obtain the answer using algebraic, numerical, or graphical methods.",
  state: "Give a specific name, value or other brief answer without explanation.",
  suggest: "Propose a solution, hypothesis or other possible answer.",
  suggesting: "Propose a solution, hypothesis or other possible answer.",
  verify: "Provide evidence that validates the result.",
};

class IBTerm extends HTMLElement {
  static isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  static activePopup = null;

  connectedCallback() {
    this.term = this.textContent.trim();
    this.definition = IB_TERM_DICTIONARY[this.term.toLowerCase()] || "No definition found.";
    this.classList.add("ib-term-trigger");
    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "button");
    this.setAttribute("aria-haspopup", "true");
    this._injectStyleOnce();
    this._buildPopup();

    if (IBTerm.isTouchDevice) {
      this.addEventListener("click", (e) => { e.stopPropagation(); this._togglePopup(); });
    } else {
      this.addEventListener("mouseenter", () => this._showPopup());
      this.addEventListener("mouseleave", () => this._hidePopup());
      this.addEventListener("focus", () => this._showPopup());
      this.addEventListener("blur", () => this._hidePopup());
    }

    window.addEventListener("scroll", () => {
      if (this.popup.classList.contains("visible")) this._positionPopup();
    }, true);
    window.addEventListener("resize", () => {
      if (this.popup.classList.contains("visible")) this._positionPopup();
    });
  }

  disconnectedCallback() {
    if (this.popup && this.popup.parentNode) this.popup.parentNode.removeChild(this.popup);
  }

  _injectStyleOnce() {
    if (document.getElementById("ib-term-style")) return;
    const style = document.createElement("style");
    style.id = "ib-term-style";
    style.textContent = `
      .ib-term-trigger { color: #0a5cb8; text-decoration: underline dotted; text-underline-offset: 3px; cursor: pointer; font-weight: 600; position: relative; outline: none; }
      .ib-term-trigger:hover, .ib-term-trigger:focus { color: #08407f; }
      .ib-term-popup { position: fixed; z-index: 1000; background: #1a1a1a; color: #fff; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 400; line-height: 1.4; width: max-content; max-width: 260px; box-shadow: 0 6px 16px rgba(0,0,0,0.2); opacity: 0; pointer-events: none; transition: opacity 0.15s ease; }
      .ib-term-popup.visible { opacity: 1; pointer-events: auto; }
      .ib-term-popup::after { content: ""; position: absolute; border: 6px solid transparent; }
      .ib-term-popup.arrow-top::after { top: 100%; left: 50%; transform: translateX(-50%); border-top-color: #1a1a1a; }
      .ib-term-popup.arrow-bottom::after { bottom: 100%; left: 50%; transform: translateX(-50%); border-bottom-color: #1a1a1a; }
      .ib-term-popup .ib-term-label { display: block; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.04em; color: #8ec7ff; margin-bottom: 4px; }
    `;
    document.head.appendChild(style);
  }

  _buildPopup() {
    this.popup = document.createElement("span");
    this.popup.className = "ib-term-popup";
    this.popup.innerHTML = `<span class="ib-term-label">${this._escape(this.term)}</span>${this._escape(this.definition)}`;
    document.body.appendChild(this.popup);
  }

  _positionPopup() {
    const triggerRect = this.getBoundingClientRect();
    this.popup.style.left = "0px";
    this.popup.style.top = "0px";
    const popupRect = this.popup.getBoundingClientRect();
    const gap = 8, margin = 8;
    let placeAbove = triggerRect.top - popupRect.height - gap >= margin;
    let top = placeAbove ? triggerRect.top - popupRect.height - gap : triggerRect.bottom + gap;
    let left = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - popupRect.width - margin));
    this.popup.style.top = `${top}px`;
    this.popup.style.left = `${left}px`;
    this.popup.classList.remove("arrow-top", "arrow-bottom");
    this.popup.classList.add(placeAbove ? "arrow-top" : "arrow-bottom");
  }

  _showPopup() { this.popup.classList.add("visible"); this._positionPopup(); }
  _hidePopup() { this.popup.classList.remove("visible"); }
  _togglePopup() {
    const isVisible = this.popup.classList.contains("visible");
    if (IBTerm.activePopup && IBTerm.activePopup !== this) IBTerm.activePopup._hidePopup();
    if (isVisible) { this._hidePopup(); IBTerm.activePopup = null; }
    else { this._showPopup(); IBTerm.activePopup = this; }
  }
  _escape(str) { const div = document.createElement("div"); div.textContent = str; return div.innerHTML; }
}

customElements.define("ib-term", IBTerm);

document.addEventListener("click", () => {
  if (IBTerm.activePopup) { IBTerm.activePopup._hidePopup(); IBTerm.activePopup = null; }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && IBTerm.activePopup) { IBTerm.activePopup._hidePopup(); IBTerm.activePopup = null; }
});

window.toggleProof = function (btn) {
  const reveal = btn.nextElementSibling;
  const open = reveal.classList.toggle("open");
  btn.classList.toggle("open", open);
  btn.querySelector(".chevron").textContent = open ? "▼" : "▶";
  const textNode = [...btn.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
  if (textNode) textNode.textContent = open ? " Hide proof" : " Show proof";
  if (open) _mj(reveal);
};

function _mj(el) { if (window.MathJax?.typesetPromise) MathJax.typesetPromise([el]); }

const _mjWait = setInterval(() => {
  if (window.MathJax?.startup?.promise) {
    clearInterval(_mjWait);
    MathJax.startup.promise.then(() => MathJax.typesetPromise([document.body]));
  }
}, 80);
