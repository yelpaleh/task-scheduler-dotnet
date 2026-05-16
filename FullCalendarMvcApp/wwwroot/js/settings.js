(function () {
    const form = document.querySelector("[data-settings-form]");
    const all = document.getElementById("settingsAllStatuses");
    const message = document.querySelector("[data-settings-message]");

    if (!form || !all) {
        return;
    }

    const boxes = Array.from(form.querySelectorAll("input[name='notificationStatuses']"));

    const syncAll = () => {
        all.checked = boxes.every((box) => box.checked);
        all.indeterminate = !all.checked && boxes.some((box) => box.checked);
    };

    all.addEventListener("change", () => {
        boxes.forEach((box) => {
            box.checked = all.checked;
        });
        all.indeterminate = false;
    });

    boxes.forEach((box) => box.addEventListener("change", syncAll));

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        message.textContent = "Settings saved.";
        window.setTimeout(() => {
            message.textContent = "";
        }, 2500);
    });
})();
