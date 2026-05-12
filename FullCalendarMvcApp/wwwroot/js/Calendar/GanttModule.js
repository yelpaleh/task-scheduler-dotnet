(function (app) {
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    });

const shortDateFormatter = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short"
});

const escapeHtml = (value) => value?.toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;") || "";

const toDate = (value) => {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
};

const addDays = (date, days) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
};

const differenceInDays = (start, end) => {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.max(0, Math.round((toDate(end) - toDate(start)) / msPerDay));
};

const getStatusClass = (status) => status.toString().toLowerCase().replaceAll(" ", "-");

    app.GanttModule = (() => {
    let activePopover = null;
    let chart;
    let panel;
    let rangeCount;
    let currentInterventions = [];
    let currentFilters = {};
    let viewMode = "day";

    const disposePopover = () => {
        if (activePopover) {
            activePopover.dispose();
            activePopover = null;
        }
    };

    const getInterventionById = (id) => currentInterventions
        .find((item) => item.id.toString() === id.toString());

    const getDetailsHtml = (item) => `
        <dl class="gantt-popover-details">
            <div><dt>Site</dt><dd>${escapeHtml(item.siteLocation)}</dd></div>
            <div><dt>County</dt><dd>${escapeHtml(item.county)}</dd></div>
            <div><dt>Status</dt><dd>${escapeHtml(item.status)}</dd></div>
            <div><dt>SGI</dt><dd>${item.sgi ? "Yes" : "No"}</dd></div>
            <div><dt>Start</dt><dd>${escapeHtml(dateFormatter.format(new Date(item.start)))}</dd></div>
            <div><dt>End</dt><dd>${escapeHtml(dateFormatter.format(new Date(item.end)))}</dd></div>
            <div><dt>Description</dt><dd>${escapeHtml(item.description)}</dd></div>
        </dl>`;

    const showPopover = (bar) => {
        const intervention = getInterventionById(bar.dataset.interventionId);

        if (!intervention) {
            return;
        }

        disposePopover();

        activePopover = new bootstrap.Popover(bar, {
            title: escapeHtml(intervention.title),
            content: getDetailsHtml(intervention),
            html: true,
            sanitize: false,
            placement: "auto",
            trigger: "manual",
            container: "body"
        });

        activePopover.show();
    };

    const getTimelineBounds = () => {
        if (currentFilters.scheduledStart && currentFilters.scheduledEnd) {
            return {
                start: toDate(currentFilters.scheduledStart),
                end: toDate(currentFilters.scheduledEnd)
            };
        }

        if (currentInterventions.length === 0) {
            const today = toDate(new Date());
            return { start: today, end: addDays(today, 14) };
        }

        return {
            start: new Date(Math.min(...currentInterventions.map((item) => toDate(item.start).getTime()))),
            end: new Date(Math.max(...currentInterventions.map((item) => toDate(item.end).getTime())))
        };
    };

    const getGanttUnit = () => ({
        day: 1,
        week: 7,
        month: 30,
        year: 365
    })[viewMode];

    const buildHeaders = (start, end) => {
        const unit = getGanttUnit();
        const totalDays = differenceInDays(start, end) + 1;
        const columnCount = Math.max(1, Math.ceil(totalDays / unit));
        const headers = [];

        for (let index = 0; index < columnCount; index += 1) {
            const headerDate = addDays(start, index * unit);
            let label = shortDateFormatter.format(headerDate);

            if (viewMode === "week") {
                label = `W${index + 1}`;
            }

            if (viewMode === "month") {
                label = headerDate.toLocaleDateString(undefined, { month: "short", year: "numeric" });
            }

            if (viewMode === "year") {
                label = headerDate.getFullYear().toString();
            }

            headers.push(label);
        }

        return { columnCount, headers, unit };
    };

    const draw = () => {
        disposePopover();

        const { start, end } = getTimelineBounds();
        const { columnCount, headers, unit } = buildHeaders(start, end);
        rangeCount.textContent = (differenceInDays(start, end) + 1).toString();

        if (currentInterventions.length === 0) {
            chart.innerHTML = '<div class="empty-state">No interventions match the selected filters.</div>';
            return;
        }

        const headerCells = headers
            .map((header) => `<div class="gantt-header-cell">${header}</div>`)
            .join("");

        const rows = currentInterventions.map((item) => {
            const itemStartOffset = Math.max(0, Math.floor(differenceInDays(start, item.start) / unit));
            const itemDuration = Math.max(1, Math.ceil((differenceInDays(item.start, item.end) + 1) / unit));
            const barStart = Math.min(columnCount, itemStartOffset + 1);
            const barEnd = Math.min(columnCount + 1, barStart + itemDuration);
            const statusClass = getStatusClass(item.status);

            return `
                <div class="gantt-row-label">
                    <strong>${escapeHtml(item.title)}</strong>
                    <span>${escapeHtml(item.siteLocation)} - ${escapeHtml(item.status)}</span>
                </div>
                <div class="gantt-row-track" style="--gantt-columns:${columnCount}">
                    <div class="gantt-bar status-${statusClass}" style="grid-column:${barStart} / ${barEnd}" role="button" tabindex="0" data-intervention-id="${item.id}" aria-label="Show details for ${escapeHtml(item.title)}">
                        ${escapeHtml(item.county)}
                    </div>
                </div>`;
        }).join("");

        const today = toDate(new Date());
        const totalDays = differenceInDays(start, end) + 1;

        let todayMarker = "";

        if (today >= start && today <= end) {
            const todayOffsetDays = differenceInDays(start, today);
            const todayPercent = (todayOffsetDays / totalDays) * 100;

            const todayLabel = today.toLocaleDateString(undefined, {
                day: "2-digit"
            });

            todayMarker = `
        <div class="gantt-today-marker" style="left:${todayPercent}%">
            <div class="gantt-today-badge">${todayLabel}</div>
            <div class="gantt-today-line"></div>
        </div>
    `;
        }

        chart.innerHTML = `
            <div class="gantt-grid">
                <div class="gantt-label-spacer"></div>
                <div class="gantt-header-wrapper">
    <div class="gantt-header" style="--gantt-columns:${columnCount}">
        ${headerCells}
    </div>
    ${todayMarker}
</div>
                ${rows}
            </div>`;
    };

    return {
        init({ chartElement, panelElement, toggleElement, rangeCountElement, viewButtons }) {
            chart = chartElement;
            panel = panelElement;
            rangeCount = rangeCountElement;

            chart.addEventListener("click", (event) => {
                const bar = event.target.closest(".gantt-bar");

                if (bar) {
                    showPopover(bar);
                    return;
                }

                disposePopover();
            });

            chart.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") {
                    return;
                }

                const bar = event.target.closest(".gantt-bar");

                if (bar) {
                    event.preventDefault();
                    showPopover(bar);
                }
            });

            document.addEventListener("click", (event) => {
                if (!activePopover || event.target.closest(".gantt-bar") || event.target.closest(".popover")) {
                    return;
                }

                disposePopover();
            });

            toggleElement.addEventListener("click", () => {
                const isExpanded = toggleElement.getAttribute("aria-expanded") === "true";
                toggleElement.setAttribute("aria-expanded", (!isExpanded).toString());
                panel.hidden = isExpanded;

                if (isExpanded) {
                    disposePopover();
                }

                if (!isExpanded) {
                    draw();
                }
            });

            viewButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    viewButtons.forEach((item) => item.classList.remove("active"));
                    button.classList.add("active");
                    viewMode = button.dataset.ganttView;
                    draw();
                });
            });
        },

        render(interventions, filters) {
            currentInterventions = interventions;
            currentFilters = filters;
            draw();
        }
    };
    })();
})(window.InterventionCalendar = window.InterventionCalendar || {});
