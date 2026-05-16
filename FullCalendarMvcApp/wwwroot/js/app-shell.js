(function () {
    const shell = document.querySelector("[data-app-shell]");
    const toggle = document.querySelector("[data-sidebar-toggle]");

    if (!shell || !toggle) {
        return;
    }

    const storageKey = "interventionSidebarCollapsed";

    const setCollapsed = (isCollapsed) => {
        shell.classList.toggle("is-sidebar-collapsed", isCollapsed);
        toggle.setAttribute("aria-expanded", String(!isCollapsed));
        toggle.setAttribute("aria-label", isCollapsed ? "Expand menu" : "Collapse menu");
    };

    const savedState = window.localStorage.getItem(storageKey);
    setCollapsed(savedState !== "false");

    toggle.addEventListener("click", () => {
        const isCollapsed = !shell.classList.contains("is-sidebar-collapsed");
        setCollapsed(isCollapsed);
        window.localStorage.setItem(storageKey, String(isCollapsed));
    });
})();
