(function () {
    const profileMenus = document.querySelectorAll("[data-profile-menu]");

    profileMenus.forEach((menu) => {
        const trigger = menu.querySelector("[data-profile-menu-trigger]");
        const panel = menu.querySelector("[data-profile-menu-panel]");

        if (!trigger || !panel) {
            return;
        }

        const setOpen = (isOpen) => {
            menu.classList.toggle("is-open", isOpen);
            trigger.setAttribute("aria-expanded", String(isOpen));
        };

        trigger.addEventListener("click", () => {
            setOpen(!menu.classList.contains("is-open"));
        });

        document.addEventListener("click", (event) => {
            if (!menu.contains(event.target)) {
                setOpen(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setOpen(false);
                trigger.focus();
            }
        });
    });
})();
