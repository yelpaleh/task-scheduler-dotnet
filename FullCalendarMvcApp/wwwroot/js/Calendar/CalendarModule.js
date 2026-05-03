(function (app) {
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    });

const setText = (id, value) => {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value || "Not provided";
    }
};

const escapeHtml = (value) => value?.toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;") || "";

const getStatusClass = (status) => status.toString().toLowerCase().replaceAll(" ", "-");

    app.CalendarModule = (() => {
    let calendar;
    let calendarSiteRail;

    const renderSiteRail = (interventions) => {
        if (!calendarSiteRail) {
            return;
        }

        if (interventions.length === 0) {
            calendarSiteRail.innerHTML = '<div class="site-rail-empty">No sites</div>';
            return;
        }

        const siteGroups = interventions.reduce((groups, item) => {
            const existing = groups.get(item.siteLocation) || {
                county: item.county,
                count: 0
            };

            existing.count += 1;
            groups.set(item.siteLocation, existing);

            return groups;
        }, new Map());

        calendarSiteRail.innerHTML = Array.from(siteGroups.entries())
            .sort(([siteA], [siteB]) => siteA.localeCompare(siteB))
            .map(([site, details]) => `
                <div class="site-rail-item">
                    <strong>${escapeHtml(site)}</strong>
                    <span>${escapeHtml(details.county)} - ${details.count} intervention${details.count === 1 ? "" : "s"}</span>
                </div>`)
            .join("");
    };

    return {
        init({ calendarElement, siteRailElement }) {
            calendarSiteRail = siteRailElement;

            calendar = new FullCalendar.Calendar(calendarElement, {
                themeSystem: "bootstrap5",
                initialView: "timeGridWeek",
                height: "auto",
                nowIndicator: true,
                selectable: true,
                editable: false,
                allDaySlot: true,
                slotMinTime: "06:00:00",
                slotMaxTime: "22:00:00",
                expandRows: true,
                dayMaxEvents: true,
                events: [],
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                },
                buttonText: {
                    today: "Today",
                    month: "Month",
                    week: "Week",
                    day: "Day"
                },
                eventTimeFormat: {
                    hour: "2-digit",
                    minute: "2-digit",
                    meridiem: "short"
                },
                eventClassNames(info) {
                    const status = info.event.extendedProps.status || "default";

                    return [`status-${getStatusClass(status)}`];
                },
                eventContent(info) {
                    const wrapper = document.createElement("div");
                    const time = document.createElement("div");
                    const title = document.createElement("div");
                    const site = document.createElement("div");

                    wrapper.className = "calendar-event-content";
                    time.className = "fc-event-time";
                    time.textContent = info.timeText;
                    title.className = "fc-event-title";
                    title.textContent = info.event.title;
                    site.className = "fc-event-site";
                    site.textContent = info.event.extendedProps.siteLocation || "";

                    if (info.timeText) {
                        wrapper.append(time);
                    }

                    wrapper.append(title, site);

                    return { domNodes: [wrapper] };
                },
                eventDidMount(info) {
                    new bootstrap.Tooltip(info.el, {
                        title: `${info.event.extendedProps.siteLocation || ""} - ${info.event.extendedProps.description || info.event.title}`,
                        placement: "top",
                        trigger: "hover",
                        container: "body"
                    });
                },
                eventClick(info) {
                    const { event } = info;

                    setText("eventCategory", event.extendedProps.status);
                    setText("eventTitle", event.title);
                        setText("eventCounty", event.extendedProps.county);
                    setText("eventControlGroup", event.extendedProps.controlGroup);
                    setText("eventAssetType", event.extendedProps.assetType);
                    setText("eventSite", event.extendedProps.siteLocation);
                    setText("eventSgi", event.extendedProps.sgi ? "Yes" : "No");
                    setText("eventStart", event.start ? dateFormatter.format(event.start) : "");
                    setText("eventEnd", event.end ? dateFormatter.format(event.end) : "");
                    setText("eventDesc", event.extendedProps.description);

                    bootstrap.Modal.getOrCreateInstance(document.getElementById("eventModal")).show();
                }
            });

            calendar.render();
        },

        render(interventions) {
            calendar.removeAllEvents();
            calendar.addEventSource(interventions);
            renderSiteRail(interventions);
        }
    };
    })();
})(window.InterventionCalendar = window.InterventionCalendar || {});
