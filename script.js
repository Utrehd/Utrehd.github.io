const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navigation = document.querySelector("[data-navigation]");
const filterButtons = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("[data-project]");
const filterEmpty = document.querySelector("[data-filter-empty]");
const revealItems = document.querySelectorAll(".reveal");

const closeNavigation = () => {
    if (!navToggle || !navigation) return;

    navToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("nav-open");
};

const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const filterProjects = (filter) => {
    let visibleProjects = 0;

    projects.forEach((project) => {
        const categories = project.dataset.category?.split(" ") ?? [];
        const isVisible = filter === "all" || categories.includes(filter);
        project.hidden = !isVisible;
        if (isVisible) visibleProjects += 1;
    });

    if (filterEmpty) {
        filterEmpty.hidden = visibleProjects !== 0;
    }
};

navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((candidate) => {
            const isActive = candidate === button;
            candidate.classList.toggle("is-active", isActive);
            candidate.setAttribute("aria-pressed", String(isActive));
        });

        filterProjects(button.dataset.filter ?? "all");
    });
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
