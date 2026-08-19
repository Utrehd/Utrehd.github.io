const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button, [data-nav-toggle]");
const primaryNavigation = document.querySelector("#primary-navigation, [data-navigation]");
const navigationLinks = [...document.querySelectorAll("#primary-navigation a[href^='#']")];
const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
let requestTypewriterUpdate = () => {};

function updateHeaderState() {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeNavigation() {
    if (!menuButton || !primaryNavigation) return;

    menuButton.setAttribute("aria-expanded", "false");
    if (menuButton.classList.contains("menu-button")) {
        menuButton.setAttribute("aria-label", "Open navigation");
    }
    primaryNavigation.classList.remove("is-open");
    document.body.classList.remove("nav-open");
}

function toggleNavigation() {
    if (!menuButton || !primaryNavigation) return;

    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    if (menuButton.classList.contains("menu-button")) {
        menuButton.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
    }
    primaryNavigation.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("nav-open", willOpen);
}

function updateCurrentSection() {
    if (!sections.length) return;

    const marker = window.scrollY + window.innerHeight * 0.3;
    let currentSection = sections[0];

    sections.forEach((section) => {
        if (section.offsetTop <= marker) currentSection = section;
    });

    navigationLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${currentSection.id}`;
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
    });
}

function updatePageEndState() {
    if (!document.querySelector(".home-paper")) return;

    const remainingScroll = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
    document.body.classList.toggle("is-at-page-end", remainingScroll < 24);
}

function wrapTypewriterCharacters(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
            if (node.parentElement?.closest("[aria-hidden='true']")) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        },
    });

    while (walker.nextNode()) textNodes.push(walker.currentNode);

    const characters = [];
    textNodes.forEach((textNode) => {
        const fragment = document.createDocumentFragment();

        [...textNode.nodeValue].forEach((character) => {
            if (/\s/.test(character)) {
                fragment.append(character);
                return;
            }

            const characterElement = document.createElement("span");
            characterElement.className = "typewriter-character";
            characterElement.textContent = character;
            fragment.append(characterElement);
            characters.push(characterElement);
        });

        textNode.replaceWith(fragment);
    });

    if (!characters.length) return null;

    element.classList.add("typewriter-block");
    return { element, characters, revealedCharacterCount: 0, revealProgress: 0, isComplete: false };
}

function initializeTypewriterScroll() {
    if (!document.querySelector(".home-paper")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targetSelector = [
        ".home-section .paper-active-label",
        ".home-section .section-heading > p",
        ".showcase-copy h3",
        ".showcase-copy > p",
        ".showcase-copy .case-link",
        ".skill-accordion summary",
        ".skill-accordion > p",
        ".principle-accordion summary",
        ".principle-accordion > p",
        ".sources-details summary",
        ".sources-details > p",
        ".story-details > summary",
        ".story-long h3",
        ".story-long p",
        ".contact-panel > span",
        ".contact-panel h2",
        ".contact-panel .button",
        ".site-footer:not(.case-site-footer) strong",
        ".site-footer:not(.case-site-footer) .footer-inner > div:first-child > span",
        ".site-footer:not(.case-site-footer) .footer-links a",
        ".site-footer:not(.case-site-footer) small",
    ].join(",");

    const states = [...document.querySelectorAll(targetSelector)]
        .map(wrapTypewriterCharacters)
        .filter(Boolean);

    if (!states.length) return;

    let animationFrame = 0;

    function updateTypewriterProgress() {
        animationFrame = 0;
        const revealStart = window.innerHeight * 0.98;
        const revealEnd = window.innerHeight * 0.7;
        const revealDistance = Math.max(revealStart - revealEnd, 1);

        states.forEach((state) => {
            if (state.isComplete || state.element.offsetParent === null) return;

            const bounds = state.element.getBoundingClientRect();
            if (bounds.top > revealStart) return;

            const currentProgress = Math.min(Math.max((revealStart - bounds.top) / revealDistance, 0), 1);
            state.revealProgress = Math.max(state.revealProgress, currentProgress);

            const nextCharacterCount = Math.ceil(state.characters.length * state.revealProgress);
            for (let index = state.revealedCharacterCount; index < nextCharacterCount; index += 1) {
                state.characters[index].classList.add("is-typed");
            }

            state.revealedCharacterCount = nextCharacterCount;
            state.element.style.setProperty("--typewriter-blur", `${(1 - state.revealProgress) * 6}px`);

            if (state.revealedCharacterCount < state.characters.length) return;

            state.isComplete = true;
            state.element.classList.add("is-typewriter-complete");
            state.element.style.removeProperty("--typewriter-blur");
        });
    }

    requestTypewriterUpdate = () => {
        if (animationFrame) return;
        animationFrame = window.requestAnimationFrame(updateTypewriterProgress);
    };

    document.querySelectorAll("details").forEach((detailsElement) => {
        detailsElement.addEventListener("toggle", requestTypewriterUpdate);
    });

    requestTypewriterUpdate();
}

function initializeRevealAnimation() {
    const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");

    if (!revealItems.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { rootMargin: "0px 0px -9%", threshold: 0.06 },
    );

    revealItems.forEach((item) => observer.observe(item));
}

menuButton?.addEventListener("click", toggleNavigation);
navigationLinks.forEach((link) => link.addEventListener("click", closeNavigation));

document.addEventListener("click", (event) => {
    if (!primaryNavigation?.classList.contains("is-open")) return;
    if (primaryNavigation.contains(event.target) || menuButton?.contains(event.target)) return;
    closeNavigation();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
});

window.addEventListener("resize", () => {
    const desktopBreakpoint = document.body.classList.contains("case-page") ? 820 : 720;
    if (window.innerWidth > desktopBreakpoint) closeNavigation();
    updatePageEndState();
    requestTypewriterUpdate();
});

window.addEventListener("scroll", () => {
    updateHeaderState();
    updateCurrentSection();
    updatePageEndState();
    requestTypewriterUpdate();
}, { passive: true });

document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = String(new Date().getFullYear());
});

updateHeaderState();
updateCurrentSection();
updatePageEndState();
initializeRevealAnimation();
initializeTypewriterScroll();
