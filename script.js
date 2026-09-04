document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        if (themeToggle) themeToggle.textContent = "☀️";
    } else {
        document.documentElement.removeAttribute("data-theme");
        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLight = document.documentElement.getAttribute("data-theme") === "light";

            if (isLight) {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "dark");
                themeToggle.textContent = "🌙";
            } else {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                themeToggle.textContent = "☀️";
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const id = link.getAttribute("href");

            if (id === "#") {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                return;
            }

            const target = document.querySelector(id);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("show");
        });
    }

    const navbar = document.querySelector("nav");

    if (navbar) {
        const updateNavbar = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        };

        window.addEventListener("scroll", updateNavbar, { passive: true });
        updateNavbar();
    }
});
