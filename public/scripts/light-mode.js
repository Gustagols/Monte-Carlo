const body = document.body;
const themeIcon = document.querySelector(".light-mode-icon");

themeIcon.addEventListener("click", () => { 
    body.classList.toggle("light-mode"); 
});

export function getThemeColors() {
    const isLight = document.body.classList.contains("light-mode");
    
    return {
        inside: isLight ? "blue" : "aqua",
        outside: isLight ? "red" : "orangered" 
    };
}