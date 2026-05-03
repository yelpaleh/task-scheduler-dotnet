(function (app) {
    const { CalendarModule, GanttModule, InterventionService } = app;
    const elements = {
        filterForm: document.getElementById("interventionFilters"),
        countyFilter: document.getElementById("countyFilter"),
        controlGroupFilter: document.getElementById("controlGroupFilter"),
        sgiFilter: document.getElementById("sgiFilter"),
        assetTypeFilter: document.getElementById("assetTypeFilter"),
        scheduledStartFilter: document.getElementById("scheduledStartFilter"),
        scheduledEndFilter: document.getElementById("scheduledEndFilter"),
        statusAll: document.getElementById("statusAll"),
        visibleCount: document.getElementById("visibleCount"),
        rangeCount: document.getElementById("rangeCount"),
        calendar: document.getElementById("calendar"),
        ganttChart: document.getElementById("ganttChart"),
        ganttPanel: document.getElementById("ganttPanel"),
        ganttToggle: document.getElementById("ganttToggle")
    };

    const requiredElements = Object.values(elements);

    if (!requiredElements.every(Boolean) || !window.FullCalendar) {
        return;
    }

    const populateSelect = (select, options, placeholder) => {
        select.replaceChildren();
        select.append(new Option(placeholder, ""));

        options.forEach((option) => {
            select.append(new Option(option, option));
        });
    };

    const populateCountyFilter = () => {
        populateSelect(elements.countyFilter, InterventionService.getCountyNames(), "Choose...");
    };

    const populateControlGroupFilter = () => {
        populateSelect(
            elements.controlGroupFilter,
            InterventionService.getControlGroupNames(elements.countyFilter.value),
            "Choose..."
        );
    };

    const populateAssetTypeFilter = () => {
        populateSelect(elements.assetTypeFilter, InterventionService.getAssetTypeNames(), "Choose...");
    };

    const getSelectedStatuses = () => Array.from(elements.filterForm.querySelectorAll("input[name='statuses']:checked"))
        .map((input) => input.value);

    const getDefaultStatusInputs = () => Array.from(elements.filterForm.querySelectorAll("input[name='statuses'][data-default='true']"));

    const syncStatusCheckboxes = (changedInput) => {
        const defaultInputs = getDefaultStatusInputs();

        if (changedInput === elements.statusAll) {
            defaultInputs.forEach((input) => {
                input.checked = elements.statusAll.checked;
            });
            return;
        }

        elements.statusAll.checked = defaultInputs.every((input) => input.checked);
    };

    const readFilters = () => ({
        county: elements.countyFilter.value,
        controlGroup: elements.controlGroupFilter.value,
        sgi: elements.sgiFilter.value,
        assetType: elements.assetTypeFilter.value,
        scheduledStart: elements.scheduledStartFilter.value,
        scheduledEnd: elements.scheduledEndFilter.value,
        statuses: getSelectedStatuses()
    });

    const renderAll = (interventions, filters) => {
        elements.visibleCount.textContent = interventions.length.toString();
        CalendarModule.render(interventions);
        GanttModule.render(interventions, filters);
        syncStatusCheckboxes(null);
    };

    const loadAndRender = async () => {
        const filters = readFilters();
        const interventions = await InterventionService.load(elements.filterForm.dataset.interventionsUrl, filters);
        renderAll(interventions, filters);
    };

    CalendarModule.init({
        calendarElement: elements.calendar
    });

    GanttModule.init({
        chartElement: elements.ganttChart,
        panelElement: elements.ganttPanel,
        toggleElement: elements.ganttToggle,
        rangeCountElement: elements.rangeCount,
        viewButtons: Array.from(document.querySelectorAll("[data-gantt-view]"))
    });

    populateCountyFilter();
    populateControlGroupFilter();
    populateAssetTypeFilter();

    elements.filterForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await loadAndRender();
    });

    elements.filterForm.addEventListener("reset", () => {
        window.setTimeout(() => {
            populateControlGroupFilter();
            populateAssetTypeFilter();
            elements.statusAll.checked = true;
            syncStatusCheckboxes(elements.statusAll);
            loadAndRender();
        }, 0);
    });

    elements.filterForm.addEventListener("change", (event) => {
        if (event.target === elements.countyFilter) {
            populateControlGroupFilter();
        }

        if (event.target === elements.statusAll || event.target.name === "statuses") {
            syncStatusCheckboxes(event.target);
        }
    });

    loadAndRender().catch(() => {
        elements.ganttChart.innerHTML = '<div class="empty-state">Interventions could not be loaded.</div>';
    });
})(window.InterventionCalendar = window.InterventionCalendar || {});
