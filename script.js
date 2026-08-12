const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button, [data-nav-toggle]");
const primaryNavigation = document.querySelector("#primary-navigation, [data-navigation]");
const navigationLinks = [...document.querySelectorAll("#primary-navigation a[href^='#']")];
const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

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
});

window.addEventListener("scroll", () => {
    updateHeaderState();
    updateCurrentSection();
}, { passive: true });

document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = String(new Date().getFullYear());
});

updateHeaderState();
updateCurrentSection();
initializeRevealAnimation();
