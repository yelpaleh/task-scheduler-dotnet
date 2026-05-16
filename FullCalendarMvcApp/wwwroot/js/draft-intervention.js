(function () {
    const form = document.querySelector("[data-draft-form]");

    if (!form || !window.bootstrap) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const modalElement = document.getElementById("draftInterventionModal");
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.hide();
        form.reset();
    });
})();
