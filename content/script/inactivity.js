// Dit script zorgt ervoor dat de gebruiker na 3 minuten inactiviteit terug wordt gestuurd naar het beginscherm

// Definieer variabelen
const CURRENT_URL = window.location.href;
const INACTIVITY_TIMEOUT = 180000;  
let inactivityTimer;
let HOME_PAGE_URL;

// Rare manier om te checken of de huidige pagina een van de volgende is
// Maar "If it ain't broke, don't fix it"
if (
    CURRENT_URL.indexOf("fitness-wellness") >= 0 ||
    CURRENT_URL.indexOf("vr-holodeck") >= 0 ||
    CURRENT_URL.indexOf("spaceship") >= 0 ||
    CURRENT_URL.indexOf("flight") >= 0 ||
    CURRENT_URL.indexOf("movies") >= 0 ||
    CURRENT_URL.indexOf("music") >= 0 ||
    CURRENT_URL.indexOf("books") >= 0 ||
    CURRENT_URL.indexOf("games") >= 0
) {
    HOME_PAGE_URL = "../../";
    console.info(`Path set to ${HOME_PAGE_URL}`);
}
else {
    HOME_PAGE_URL = "../";
    console.info(`Path set to ${HOME_PAGE_URL}`);
}

// Functie om de timer te resetten en de gebruiker terug te sturen naar het beginscherm
const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        window.location.href = HOME_PAGE_URL;
    }, INACTIVITY_TIMEOUT);
};
resetTimer();

// Detecteer activiteit en reset de timer
window.addEventListener("touchstart", resetTimer);
window.addEventListener("mousemove", resetTimer);
window.addEventListener("click", resetTimer);
