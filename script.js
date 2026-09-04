const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light"){
    document.documentElement.dataset.theme ="light";
    themeToggle.textContent="☀️"

}
themeToggle.addEventListener("click",() => {
    const isLight = document.documentElement.dataset.theme === "light";
    if (isLight){
        document.documentElement.removeAttribute("data-theme");
        themeToggle.textContent="🌙";
        localStorage.setItem("theme","dark");
    }else{
        document.documentElement.dataset.theme="light";
        themeToggle.textContent="☀️";
        localStorage.setItem("theme","light");
    }

});
const observer = new IntersectionObserver(("entries") => {
    CustomElementRegistry.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);

        }
    });
    {threshold: 0.15;}
});
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));