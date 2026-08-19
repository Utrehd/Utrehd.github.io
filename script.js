document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button, [data-nav-toggle]");
const primaryNavigation = document.querySelector("#primary-navigation, [data-navigation]");
const navigationLinks = [...document.querySelectorAll("#primary-navigation a[href^='#']")];
const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
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
    const remainingScroll = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
    document.body.classList.toggle("is-at-page-end", remainingScroll < 24);
}

function updateReadingProgress() {
    if (!document.body.classList.contains("case-page")) return;

    const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
    const readingProgress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;
    document.documentElement.style.setProperty("--reading-progress", String(Math.min(Math.max(readingProgress, 0), 1)));
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
        const textFragment = document.createElement("span");
        textFragment.className = "typewriter-fragment";
        let wordElement = null;

        [...textNode.nodeValue].forEach((character) => {
            if (/\s/.test(character)) {
                textFragment.append(character);
                wordElement = null;
                return;
            }

            if (!wordElement) {
                wordElement = document.createElement("span");
                wordElement.className = "typewriter-word";
                textFragment.append(wordElement);
            }

            const characterElement = document.createElement("span");
            characterElement.className = "typewriter-character";
            characterElement.textContent = character;
            wordElement.append(characterElement);
            characters.push(characterElement);
        });

        textNode.replaceWith(textFragment);
    });

    if (!characters.length) return null;

    element.classList.add("typewriter-block");
    return { element, characters, revealedCharacterCount: 0, revealProgress: 0, isComplete: false };
}

function revealTypewriterState(state, progress) {
    if (state.isComplete) return;

    state.revealProgress = Math.max(state.revealProgress, Math.min(Math.max(progress, 0), 1));

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
}

function getIntroTypewriterDuration(element, characterCount) {
    if (element.matches("h1")) {
        return Math.min(Math.max(characterCount * 24, 520), 860);
    }

    if (element.matches(".portfolio-thesis, .paper-thesis")) {
        return Math.min(Math.max(characterCount * 7, 820), 1400);
    }

    return Math.min(Math.max(characterCount * 14, 380), 680);
}

function animateIntroTypewriter(states) {
    if (!states.length) return;

    const isTopOfPage = window.scrollY < 80;
    const isTopDestination = !window.location.hash || ["#top", "#paper"].includes(window.location.hash);

    if (!isTopOfPage || !isTopDestination) {
        states.forEach((state) => revealTypewriterState(state, 1));
        return;
    }

    let currentStateIndex = 0;

    function startNextState() {
        const state = states[currentStateIndex];
        if (!state) return;

        const duration = getIntroTypewriterDuration(state.element, state.characters.length);
        const startedAt = performance.now();
        state.element.classList.add("is-typewriter-intro-active");

        function updateIntroState(currentTime) {
            const progress = (currentTime - startedAt) / duration;
            revealTypewriterState(state, progress);

            if (!state.isComplete) {
                window.requestAnimationFrame(updateIntroState);
                return;
            }

            state.element.classList.remove("is-typewriter-intro-active");
            currentStateIndex += 1;
            window.setTimeout(startNextState, 110);
        }

        window.requestAnimationFrame(updateIntroState);
    }

    window.setTimeout(startNextState, 160);
}

function initializeTypewriterScroll() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const introSelector = [
        ".portfolio-intro .paper-active-label",
        ".portfolio-intro .portfolio-thesis",
        ".case-page .paper-title-block .paper-active-label",
        ".case-page .paper-title-block h1",
        ".case-page .paper-title-block .paper-thesis",
    ].join(",");

    const introElements = [...document.querySelectorAll(introSelector)];
    const introElementSet = new Set(introElements);
    const introStates = introElements
        .map(wrapTypewriterCharacters)
        .filter(Boolean);

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
        ".case-page main h1",
        ".case-page main h2",
        ".case-page main h3",
        ".case-page main p",
        ".case-page main dt",
        ".case-page main dd",
        ".case-page main li",
        ".case-page main strong",
        ".case-page main .paper-back-link",
        ".case-page main .paper-index",
        ".case-page main .paper-active-label",
        ".case-page main article > span",
        ".case-page main figcaption > span",
        ".case-page main .paper-callout > span",
        ".case-page main .architecture-source-link",
        ".case-page main .button",
        ".case-page .case-site-footer p",
        ".case-page .case-site-footer a",
    ].join(",");

    const targetElements = [...document.querySelectorAll(targetSelector)]
        .filter((element) => !introElementSet.has(element))
        .filter((element) => !element.parentElement?.closest(targetSelector));

    const states = targetElements
        .map(wrapTypewriterCharacters)
        .filter(Boolean);

    animateIntroTypewriter(introStates);
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

            const currentProgress = (revealStart - bounds.top) / revealDistance;
            revealTypewriterState(state, currentProgress);
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

function revealElementsOnEntry(elements, visibleClass, observerOptions) {
    if (!elements.length) return;

    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add(visibleClass));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(visibleClass);
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    elements.forEach((element) => observer.observe(element));
}

function initializePremiumMotion() {
    const lineElements = [...document.querySelectorAll(".paper-active-head")];
    lineElements.forEach((element) => element.classList.add("line-reveal"));
    revealElementsOnEntry(lineElements, "is-line-visible", { rootMargin: "0px 0px -8%", threshold: 0.35 });

    const mediaElements = [...document.querySelectorAll([
        ".showcase-media",
        ".project-preview",
        ".dashboard-image-link",
        ".architecture-image-link",
    ].join(","))];
    mediaElements.forEach((element) => element.classList.add("media-reveal"));
    revealElementsOnEntry(mediaElements, "is-media-visible", { rootMargin: "0px 0px -6%", threshold: 0.12 });

    const metricElements = [...document.querySelectorAll([
        ".summary-proof strong",
        ".outcome-grid strong",
        ".project-facts dd",
    ].join(","))];
    metricElements.forEach((element) => element.classList.add("metric-emphasis"));
    revealElementsOnEntry(metricElements, "is-metric-visible", { rootMargin: "0px 0px -7%", threshold: 0.45 });
}

function initializeImageLightbox() {
    const imageLinks = [...document.querySelectorAll(".case-page .dashboard-image-link, .case-page .architecture-image-link")];
    if (!imageLinks.length || typeof HTMLDialogElement === "undefined") return;

    const dialog = document.createElement("dialog");
    dialog.className = "image-lightbox";
    dialog.setAttribute("aria-label", "Project image viewer");
    dialog.innerHTML = [
        '<div class="image-lightbox-frame">',
        '<button class="image-lightbox-close" type="button" aria-label="Close image viewer">Close</button>',
        '<img class="image-lightbox-image" alt="">',
        '<p class="image-lightbox-caption"></p>',
        "</div>",
    ].join("");
    document.body.append(dialog);

    const closeButton = dialog.querySelector(".image-lightbox-close");
    const lightboxImage = dialog.querySelector(".image-lightbox-image");
    const lightboxCaption = dialog.querySelector(".image-lightbox-caption");
    let triggerElement = null;
    let closeTimer = 0;

    function closeLightbox() {
        if (!dialog.open) return;

        dialog.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
        window.clearTimeout(closeTimer);

        const closeDelay = reducedMotionQuery.matches ? 0 : 180;
        closeTimer = window.setTimeout(() => {
            dialog.close();
            triggerElement?.focus();
        }, closeDelay);
    }

    imageLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const sourceImage = link.querySelector("img");
            if (!sourceImage) return;

            event.preventDefault();
            triggerElement = link;
            lightboxImage.src = link.href;
            lightboxImage.alt = sourceImage.alt;

            const figure = link.closest("figure");
            const figureCaption = figure?.querySelector("figcaption")?.textContent?.trim();
            lightboxCaption.textContent = figureCaption || sourceImage.alt;
            lightboxCaption.hidden = !lightboxCaption.textContent;

            document.body.classList.add("lightbox-open");
            dialog.showModal();
            window.requestAnimationFrame(() => dialog.classList.add("is-open"));
            closeButton.focus();
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeLightbox();
    });
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) closeLightbox();
    });
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
    updateReadingProgress();
    requestTypewriterUpdate();
});

window.addEventListener("scroll", () => {
    updateHeaderState();
    updateCurrentSection();
    updatePageEndState();
    updateReadingProgress();
    requestTypewriterUpdate();
}, { passive: true });

document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = String(new Date().getFullYear());
});

updateHeaderState();
updateCurrentSection();
updatePageEndState();
updateReadingProgress();
initializeRevealAnimation();
initializeTypewriterScroll();
initializePremiumMotion();
initializeImageLightbox();
