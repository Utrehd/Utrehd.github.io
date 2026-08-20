const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const primaryNavigation = document.querySelector("#primary-navigation");
const navigationLinks = [...document.querySelectorAll("#primary-navigation a[href^='#']")];
const navigationSections = getNavigationSections(navigationLinks);
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const introSequenceClassNames = [
    "intro-sequence-staging",
    "intro-sequence-active",
    "intro-typing-started",
    "intro-brand-visible",
    "intro-evidence-visible",
    "intro-navigation-visible",
];
const topDestinationHashes = new Set(["", "#top", "#paper"]);
let requestTypewriterUpdate = () => {};

initializePortfolio();

function initializePortfolio() {
    initializeRevealAnimation();
    initializeTypewriterScroll();
    initializePremiumMotion();
    initializeImageLightbox();
    initializeNavigationEvents();
    initializeViewportEvents();
    updateFooterYear();
    updateViewportState();
}

function getNavigationSections(links) {
    const matchingSections = [];

    for (const link of links) {
        const sectionSelector = link.getAttribute("href");
        const section = document.querySelector(sectionSelector);
        if (section) matchingSections.push(section);
    }

    return matchingSections;
}

function initializeNavigationEvents() {
    menuButton?.addEventListener("click", toggleNavigation);

    for (const link of navigationLinks) {
        link.addEventListener("click", closeNavigation);
    }

    document.addEventListener("click", closeNavigationAfterOutsideClick);
    document.addEventListener("keydown", closeNavigationWithEscape);
}

function initializeViewportEvents() {
    window.addEventListener("resize", handleViewportResize);
    window.addEventListener("scroll", updateViewportState, { passive: true });
}

function updateViewportState() {
    updateHeaderState();
    updateCurrentSection();
    updatePageEndState();
    updateReadingProgress();
    requestTypewriterUpdate();
}

function handleViewportResize() {
    const desktopBreakpoint = document.body.classList.contains("case-page") ? 820 : 720;
    const isDesktopViewport = window.innerWidth > desktopBreakpoint;
    if (isDesktopViewport) closeNavigation();

    updateViewportState();
}

function updateFooterYear() {
    const currentYear = String(new Date().getFullYear());
    const yearElements = document.querySelectorAll("[data-year]");

    for (const yearElement of yearElements) {
        yearElement.textContent = currentYear;
    }
}

function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
}

function isAtTopDestination() {
    const isNearPageTop = window.scrollY < 80;
    const isTopHash = topDestinationHashes.has(window.location.hash);
    return isNearPageTop && isTopHash;
}

function clearIntroSequenceClasses() {
    document.documentElement.classList.remove(...introSequenceClassNames);
}

function createTypewriterStates(elements) {
    const states = [];

    for (const element of elements) {
        const state = wrapTypewriterCharacters(element);
        if (state) states.push(state);
    }

    return states;
}

function getTopLevelTypewriterElements(selector, excludedElements) {
    const matchingElements = document.querySelectorAll(selector);
    const topLevelElements = [];

    for (const element of matchingElements) {
        if (excludedElements.has(element)) continue;

        const matchingParent = element.parentElement?.closest(selector);
        if (matchingParent) continue;

        topLevelElements.push(element);
    }

    return topLevelElements;
}

function updateHeaderState() {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeNavigation() {
    setNavigationOpen(false);
}

function toggleNavigation() {
    if (!menuButton || !primaryNavigation) return;

    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setNavigationOpen(!isOpen);
}

function setNavigationOpen(isOpen) {
    if (!menuButton || !primaryNavigation) return;

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    primaryNavigation.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
}

function closeNavigationAfterOutsideClick(event) {
    if (!primaryNavigation?.classList.contains("is-open")) return;

    const clickedNavigation = primaryNavigation.contains(event.target);
    const clickedMenuButton = menuButton?.contains(event.target);
    if (clickedNavigation || clickedMenuButton) return;

    closeNavigation();
}

function closeNavigationWithEscape(event) {
    if (event.key === "Escape") closeNavigation();
}

function updateCurrentSection() {
    if (!navigationSections.length) return;

    const marker = window.scrollY + window.innerHeight * 0.3;
    let currentSection = navigationSections[0];

    for (const section of navigationSections) {
        if (section.offsetTop <= marker) currentSection = section;
    }

    for (const link of navigationLinks) {
        const isCurrent = link.getAttribute("href") === `#${currentSection.id}`;
        if (isCurrent) {
            link.setAttribute("aria-current", "true");
        } else {
            link.removeAttribute("aria-current");
        }
    }
}

function updatePageEndState() {
    const remainingScroll = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
    document.body.classList.toggle("is-at-page-end", remainingScroll < 24);
}

function updateReadingProgress() {
    const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
    const readingProgress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;
    const clampedProgress = clamp(readingProgress, 0, 1);
    document.documentElement.style.setProperty("--reading-progress", String(clampedProgress));
}

function getTypewriterTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
            if (node.parentElement?.closest("[aria-hidden='true']")) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        },
    });

    while (walker.nextNode()) textNodes.push(walker.currentNode);
    return textNodes;
}

function createTypewriterFragment(text) {
    const fragment = document.createElement("span");
    fragment.className = "typewriter-fragment";

    const characters = [];
    let currentWord = null;

    for (const character of text) {
        if (/\s/.test(character)) {
            fragment.append(character);
            currentWord = null;
            continue;
        }

        if (!currentWord) {
            currentWord = document.createElement("span");
            currentWord.className = "typewriter-word";
            fragment.append(currentWord);
        }

        const characterElement = document.createElement("span");
        characterElement.className = "typewriter-character";
        characterElement.textContent = character;
        currentWord.append(characterElement);
        characters.push(characterElement);
    }

    return { fragment, characters };
}

function wrapTypewriterCharacters(element) {
    const textNodes = getTypewriterTextNodes(element);
    const characters = [];

    for (const textNode of textNodes) {
        const fragmentResult = createTypewriterFragment(textNode.nodeValue);
        textNode.replaceWith(fragmentResult.fragment);
        characters.push(...fragmentResult.characters);
    }

    if (!characters.length) return null;

    element.classList.add("typewriter-block");
    return {
        element,
        characters,
        previewCharacters: [],
        cursorCharacter: null,
        revealedCharacterCount: 0,
        revealProgress: 0,
        isComplete: false,
    };
}

function revealTypewriterState(state, progress) {
    if (state.isComplete) return;

    state.previewCharacters.forEach((character) => character.classList.remove("is-typewriter-preview"));
    state.previewCharacters = [];
    state.cursorCharacter?.classList.remove("is-typewriter-cursor");
    state.cursorCharacter = null;

    const clampedProgress = clamp(progress, 0, 1);
    state.revealProgress = Math.max(state.revealProgress, clampedProgress);

    const nextCharacterCount = Math.ceil(state.characters.length * state.revealProgress);
    for (let index = state.revealedCharacterCount; index < nextCharacterCount; index += 1) {
        state.characters[index].classList.add("is-typed");
    }

    state.revealedCharacterCount = nextCharacterCount;
    state.element.style.setProperty("--typewriter-blur", `${(1 - state.revealProgress) * 6}px`);

    if (state.element.matches(".portfolio-thesis") && state.revealedCharacterCount < state.characters.length) {
        const previewEnd = Math.min(state.revealedCharacterCount + 5, state.characters.length);
        state.previewCharacters = state.characters.slice(state.revealedCharacterCount, previewEnd);
        state.previewCharacters.forEach((character) => character.classList.add("is-typewriter-preview"));

        if (state.revealedCharacterCount > 0) {
            state.cursorCharacter = state.characters[state.revealedCharacterCount - 1];
            state.cursorCharacter.classList.add("is-typewriter-cursor");
        }
    }

    if (state.revealedCharacterCount < state.characters.length) return;

    state.isComplete = true;
    state.element.classList.add("is-typewriter-complete");
    state.element.style.removeProperty("--typewriter-blur");
}

function getIntroTypewriterDuration(element, characterCount) {
    if (element.matches("h1")) {
        return clamp(characterCount * 24, 520, 860);
    }

    if (element.matches(".portfolio-thesis, .paper-thesis")) {
        return clamp(characterCount * 7, 820, 1400);
    }

    return clamp(characterCount * 14, 380, 680);
}

function animateIntroTypewriter(states, onComplete, initialDelay = 260) {
    if (!states.length) {
        onComplete();
        return;
    }

    if (!isAtTopDestination()) {
        states.forEach((state) => revealTypewriterState(state, 1));
        onComplete();
        return;
    }

    let currentStateIndex = 0;
    let isComplete = false;

    function completeIntroSequence() {
        if (isComplete) return;

        isComplete = true;
        onComplete();
    }

    function startNextState() {
        const state = states[currentStateIndex];
        if (!state) {
            completeIntroSequence();
            return;
        }

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

    window.setTimeout(startNextState, initialDelay);
}

function revealIntroCapability() {
    const phrases = document.querySelectorAll(".intro-capability-phrase");

    for (const phrase of phrases) {
        phrase.classList.add("is-visible");
    }
}

function animateIntroCapability(onComplete) {
    const phrases = [...document.querySelectorAll(".intro-capability-phrase")];
    if (!phrases.length) {
        onComplete();
        return;
    }

    const blankDuration = 520;
    const phraseStagger = 280;
    const flightDuration = 480;
    const completedHeadingPause = 620;

    window.setTimeout(() => {
        document.documentElement.classList.add("intro-typing-started");

        for (const [phraseIndex, phrase] of phrases.entries()) {
            window.setTimeout(() => phrase.classList.add("is-visible"), phraseIndex * phraseStagger);
        }

        const finalPhraseDelay = (phrases.length - 1) * phraseStagger;
        window.setTimeout(onComplete, finalPhraseDelay + flightDuration + completedHeadingPause);
    }, blankDuration);
}

function initializeTypewriterScroll() {
    if (reducedMotionQuery.matches) {
        window.clearTimeout(window.__portfolioIntroFallback);
        clearIntroSequenceClasses();
        return;
    }

    const introSelector = [
        ".portfolio-intro .portfolio-thesis",
        ".case-page .paper-title-block .paper-active-label",
        ".case-page .paper-title-block h1",
        ".case-page .paper-title-block .paper-thesis",
    ].join(",");

    const introElements = [...document.querySelectorAll(introSelector)];
    const introElementSet = new Set(introElements);
    const introStates = createTypewriterStates(introElements);

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
        ".case-page main .paper-active-label",
        ".case-page main article > span",
        ".case-page main figcaption > span",
        ".case-page main .paper-callout > span",
        ".case-page main .architecture-source-link",
        ".case-page main .button",
        ".case-page .case-site-footer p",
        ".case-page .case-site-footer a",
    ].join(",");

    const targetElements = getTopLevelTypewriterElements(targetSelector, introElementSet);
    const states = createTypewriterStates(targetElements);

    const hasIntroCapability = document.querySelector(".intro-capability-phrase") !== null;
    const shouldSequenceIntro = hasIntroCapability && introStates.length > 0 && isAtTopDestination();
    let isIntroSequenceComplete = false;

    if (shouldSequenceIntro) {
        document.documentElement.classList.add("intro-sequence-active");
    }

    function completeIntroSequence() {
        isIntroSequenceComplete = true;
        window.clearTimeout(window.__portfolioIntroFallback);

        if (shouldSequenceIntro) {
            document.documentElement.classList.add("intro-evidence-visible");
            document.documentElement.classList.remove("intro-sequence-active");
            window.setTimeout(() => document.documentElement.classList.add("intro-navigation-visible"), 420);
            window.setTimeout(() => {
                clearIntroSequenceClasses();
            }, 1050);
        } else {
            clearIntroSequenceClasses();
        }

        requestTypewriterUpdate();
    }

    function startIntroText() {
        document.documentElement.classList.add("intro-brand-visible");
        animateIntroTypewriter(introStates, completeIntroSequence, 160);
    }

    function startIntroSequence() {
        if (!shouldSequenceIntro) {
            revealIntroCapability();
            animateIntroTypewriter(introStates, completeIntroSequence);
            return;
        }

        animateIntroCapability(startIntroText);
    }

    if (!states.length) {
        startIntroSequence();
        return;
    }

    let animationFrame = 0;

    function updateTypewriterProgress() {
        animationFrame = 0;
        if (!isIntroSequenceComplete) return;

        const revealStart = window.innerHeight * 0.98;
        const revealEnd = window.innerHeight * 0.7;
        const revealDistance = Math.max(revealStart - revealEnd, 1);
        const isAtPageEnd = document.body.classList.contains("is-at-page-end");

        for (const state of states) {
            if (state.isComplete || state.element.offsetParent === null) continue;

            if (isAtPageEnd) {
                revealTypewriterState(state, 1);
                continue;
            }

            const bounds = state.element.getBoundingClientRect();
            if (bounds.top > revealStart) continue;

            const currentProgress = (revealStart - bounds.top) / revealDistance;
            revealTypewriterState(state, currentProgress);
        }
    }

    requestTypewriterUpdate = () => {
        if (animationFrame) return;
        animationFrame = window.requestAnimationFrame(updateTypewriterProgress);
    };

    document.querySelectorAll("details").forEach((detailsElement) => {
        detailsElement.addEventListener("toggle", requestTypewriterUpdate);
    });

    startIntroSequence();
}

function initializeRevealAnimation() {
    const revealElements = [...document.querySelectorAll(".reveal:not(.is-visible)")];
    const observerOptions = { rootMargin: "0px 0px -9%", threshold: 0.06 };
    revealElementsWhenVisible(revealElements, "is-visible", observerOptions);
}

function revealElementsWhenVisible(elements, visibleClass, observerOptions) {
    if (!elements.length) return;

    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
        for (const element of elements) {
            element.classList.add(visibleClass);
        }
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            entry.target.classList.add(visibleClass);
            observer.unobserve(entry.target);
        }
    }, observerOptions);

    for (const element of elements) {
        observer.observe(element);
    }
}

function initializeObservedMotion(selector, preparedClass, visibleClass, observerOptions) {
    const elements = [...document.querySelectorAll(selector)];

    for (const element of elements) {
        element.classList.add(preparedClass);
    }

    revealElementsWhenVisible(elements, visibleClass, observerOptions);
}

function initializePremiumMotion() {
    initializeObservedMotion(
        ".paper-active-head",
        "line-reveal",
        "is-line-visible",
        { rootMargin: "0px 0px -8%", threshold: 0.35 },
    );

    const mediaSelector = [
        ".showcase-media",
        ".dashboard-image-link",
        ".architecture-image-link",
    ].join(",");
    initializeObservedMotion(
        mediaSelector,
        "media-reveal",
        "is-media-visible",
        { rootMargin: "0px 0px -6%", threshold: 0.12 },
    );

    const metricSelector = [
        ".summary-proof strong",
        ".outcome-grid strong",
    ].join(",");
    initializeObservedMotion(
        metricSelector,
        "metric-emphasis",
        "is-metric-visible",
        { rootMargin: "0px 0px -7%", threshold: 0.45 },
    );
}

function isPlainPrimaryClick(event) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    return event.button === 0 && !hasModifier;
}

function getLightboxCaption(link, sourceImage) {
    const figure = link.closest("figure");
    const figureCaption = figure?.querySelector("figcaption")?.textContent?.trim();
    return figureCaption || sourceImage.alt;
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

    function openLightbox(event, link) {
        if (!isPlainPrimaryClick(event)) return;

        const sourceImage = link.querySelector("img");
        if (!sourceImage) return;

        event.preventDefault();
        triggerElement = link;
        lightboxImage.src = link.href;
        lightboxImage.alt = sourceImage.alt;

        lightboxCaption.textContent = getLightboxCaption(link, sourceImage);
        lightboxCaption.hidden = !lightboxCaption.textContent;

        document.body.classList.add("lightbox-open");
        dialog.showModal();
        window.requestAnimationFrame(() => dialog.classList.add("is-open"));
        closeButton.focus();
    }

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

    for (const link of imageLinks) {
        link.addEventListener("click", (event) => openLightbox(event, link));
    }

    closeButton.addEventListener("click", closeLightbox);
    dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeLightbox();
    });
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) closeLightbox();
    });
}
