(function () {
    const tableBody = document.getElementById("dashboardTableBody");
    const searchInput = document.getElementById("dashboardSearch");
    const statusSelect = document.getElementById("dashboardStatus");
    const countySelect = document.getElementById("dashboardCounty");
    const pageSizeSelect = document.getElementById("dashboardPageSize");
    const roleSelect = document.getElementById("dashboardRole");
    const summary = document.getElementById("dashboardPageSummary");
    const pageNumber = document.getElementById("dashboardPageNumber");
    const prevButton = document.getElementById("dashboardPrev");
    const nextButton = document.getElementById("dashboardNext");
    const deleteModalElement = document.getElementById("deleteInterventionModal");
    const deleteName = document.getElementById("deleteInterventionName");
    const confirmDeleteButton = document.getElementById("confirmDeleteIntervention");

    if (!tableBody) {
        return;
    }

    const interventions = [
        ["INT-1001", "Site Inspection", "Derbyshire", "Proposed", "Telecom tower readiness review", "Derby North", "Derby"],
        ["INT-1002", "Access Road Closure", "Warwickshire", "Scheduled", "Civil access coordination and closure window", "Rsa(Warks)", "Rugby"],
        ["INT-1003", "Pipeline Maintenance", "Derbyshire", "Confirmed", "Routine field maintenance", "Draycote", "Chesterfield"],
        ["INT-1004", "Crane Lift Review", "Warwickshire", "Draft", "Lift plan and safety checks", "Campion", "Warwick"],
        ["INT-1005", "Power Isolation", "Derbyshire", "Deferred", "Planned power isolation and restore", "Derby South", "Buxton"],
        ["INT-1006", "Permit Re-issue", "Warwickshire", "Await New Dates", "Waiting on revised contractor dates", "North Warwickshire", "Stratford-upon-Avon"],
        ["INT-1007", "Emergency Drill", "Derbyshire", "Completed", "Operational readiness drill", "Derby North", "Matlock"],
        ["INT-1008", "Vegetation Clearance", "Warwickshire", "Cancelled", "Cancelled due to weather constraints", "Bedworth", "Nuneaton"],
        ["INT-1009", "Valve Replacement", "Leicestershire", "Started", "Replace isolation valve and complete reinstatement", "Hinckley", "Leicester"],
        ["INT-1010", "Network Survey", "Staffordshire", "Conflict Check", "Survey works pending access review", "Stafford North", "Stafford"],
        ["INT-1011", "Customer Notice Review", "Gloucestershire", "Change Request", "Revised customer notice required", "Cheltenham", "Cheltenham"],
        ["INT-1012", "Archive Migration", "Cheshire", "Archive", "Historic intervention package archived", "Chester", "Chester"],
        ["INT-1013", "Pressure Test", "Worcestershire", "Closed", "Final records closed after verification", "Worcester North", "Worcester"],
        ["INT-1014", "Site Reinstatement", "Leicestershire", "Scheduled", "Reinstatement after network repair", "Field Head", "Loughborough"],
        ["INT-1015", "Permit Extension", "Shropshire", "Proposed", "Permit extension proposal for long duration works", "Shrewsbury", "Shrewsbury"],
        ["INT-1016", "Design Review", "Nottinghamshire", "Draft", "Initial design review and markups", "Mansfield", "Mansfield"],
        ["INT-1017", "Low Pressure Works", "Staffordshire", "Confirmed", "Low pressure network maintenance", "Tamworth", "Tamworth"],
        ["INT-1018", "High Pressure Audit", "Gloucestershire", "Started", "Audit high pressure asset readiness", "Stroud", "Stroud"],
        ["INT-1019", "Outage Coordination", "Warwickshire", "Conflict Check", "Outage window conflicts with adjacent works", "Nuneaton", "Nuneaton"],
        ["INT-1020", "Document Refresh", "Derbyshire", "Deferred", "Awaiting revised RAMS documents", "Mid Derby", "Derby"],
        ["INT-1021", "Access Gate Repair", "Cheshire", "Completed", "Repair completed and signed off", "Crewe", "Crewe"],
        ["INT-1022", "SGI Planning", "Worcestershire", "Proposed", "SGI plan awaiting technical review", "Redditch Area", "Redditch"],
        ["INT-1023", "Road Closure", "Shropshire", "Scheduled", "Traffic management booked", "Ludlow", "Ludlow"],
        ["INT-1024", "Control Room Test", "Leicestershire", "Confirmed", "Control room communications test", "Scraptoft", "Hinckley"],
        ["INT-1025", "Emergency Repair", "Nottinghamshire", "Started", "Reactive repair in progress", "Newark", "Newark-on-Trent"],
        ["INT-1026", "Cancellation Review", "Staffordshire", "Cancelled", "Cancelled after contractor availability change", "Stoke-on-Trent", "Stoke-on-Trent"]
    ].map(([id, title, county, status, description, controlGroup, siteName]) => ({
        id,
        title,
        county,
        status,
        description,
        controlGroup,
        siteName
    }));

    let currentPage = 1;
    let pendingDeleteId = "";

    const unique = (key) => Array.from(new Set(interventions.map((item) => item[key]))).sort();

    const populateSelect = (select, options) => {
        options.forEach((option) => select.append(new Option(option, option)));
    };

    const getFiltered = () => {
        const query = searchInput.value.trim().toLowerCase();
        const status = statusSelect.value;
        const county = countySelect.value;

        return interventions.filter((item) => {
            const matchesSearch = !query || item.id.toLowerCase().includes(query);
            const matchesStatus = !status || item.status === status;
            const matchesCounty = !county || item.county === county;
            return matchesSearch && matchesStatus && matchesCounty;
        });
    };

    const buildInterventionUrl = (mode, id) => `/Home/CreateIntervention?mode=${encodeURIComponent(mode)}&id=${encodeURIComponent(id)}`;

    const createLink = (label, variant, href) => {
        const link = document.createElement("a");
        link.className = `btn btn-${variant} btn-sm`;
        link.href = href;
        link.textContent = label;
        return link;
    };

    const createButton = (label, variant, item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `btn btn-${variant} btn-sm`;
        button.textContent = label;
        button.addEventListener("click", () => {
            pendingDeleteId = item.id;
            deleteName.textContent = `${item.id} - ${item.title}`;
            window.bootstrap.Modal.getOrCreateInstance(deleteModalElement).show();
        });
        return button;
    };

    const render = () => {
        const pageSize = Number(pageSizeSelect.value);
        const filtered = getFiltered();
        const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
        currentPage = Math.min(currentPage, pageCount);

        const start = (currentPage - 1) * pageSize;
        const rows = filtered.slice(start, start + pageSize);

        tableBody.replaceChildren();

        rows.forEach((item) => {
            const row = document.createElement("tr");
            const cells = [item.id, item.title, item.county, item.status, item.description, item.controlGroup, item.siteName];
            const actions = document.createElement("td");
            const group = document.createElement("div");
            actions.className = "actions-column";
            group.className = "table-actions";
            group.append(
                createLink("View", "outline-primary", buildInterventionUrl("view", item.id)),
                createLink("Edit", "outline-secondary", buildInterventionUrl("edit", item.id))
            );

            if (roleSelect.value === "Approver") {
                group.append(createButton("Delete", "outline-danger", item));
            }

            actions.append(group);
            row.append(actions);

            cells.forEach((value, index) => {
                const cell = document.createElement("td");
                if (index === 3) {
                    const pill = document.createElement("span");
                    pill.className = "status-pill";
                    pill.textContent = value;
                    cell.append(pill);
                } else {
                    cell.textContent = value;
                }
                row.append(cell);
            });
            tableBody.append(row);
        });

        if (rows.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.colSpan = 8;
            cell.textContent = "No interventions found.";
            row.append(cell);
            tableBody.append(row);
        }

        summary.textContent = filtered.length ? `Showing ${start + 1}-${Math.min(start + pageSize, filtered.length)} of ${filtered.length}` : "Showing 0 of 0";
        pageNumber.textContent = `Page ${currentPage} of ${pageCount}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === pageCount;
    };

    populateSelect(statusSelect, unique("status"));
    populateSelect(countySelect, unique("county"));

    [searchInput, statusSelect, countySelect, pageSizeSelect, roleSelect].forEach((input) => {
        input.addEventListener("input", () => {
            currentPage = 1;
            render();
        });
        input.addEventListener("change", () => {
            currentPage = 1;
            render();
        });
    });

    prevButton.addEventListener("click", () => {
        currentPage -= 1;
        render();
    });

    nextButton.addEventListener("click", () => {
        currentPage += 1;
        render();
    });

    confirmDeleteButton.addEventListener("click", () => {
        if (!pendingDeleteId) {
            return;
        }

        const index = interventions.findIndex((item) => item.id === pendingDeleteId);
        if (index >= 0) {
            interventions.splice(index, 1);
        }

        pendingDeleteId = "";
        window.bootstrap.Modal.getOrCreateInstance(deleteModalElement).hide();
        render();
    });

    render();
})();
