(function () {
    const form = document.querySelector("[data-create-intervention-form]");
    const scrollTopButton = document.querySelector("[data-scroll-top]");
    const message = document.querySelector("[data-create-message]");

    if (!form || !scrollTopButton) {
        return;
    }

    const sampleInterventions = {
        "INT-1001": {
            title: "Site Inspection",
            interventionId: "INT-1001",
            schemeName: "Derby North Readiness",
            interventionType: "Inspection",
            priority: "Medium",
            status: "Proposed",
            county: "Derbyshire",
            controlGroup: "Derby North",
            assetType: "DBS",
            assetReference: "DBS-DER-001",
            siteName: "Derby",
            siteLocation: "Derby",
            sgiRequired: "Yes",
            riskLevel: "Medium",
            description: "Telecom tower readiness review",
            requesterName: "Harshal Yelpale",
            requesterEmail: "harshal.yelpale@example.com",
            requesterPhone: "07123 456789",
            businessUnit: "Operations",
            contractorName: "Field Works Ltd",
            contractorEmail: "fieldworks@example.com",
            emergencyContact: "Ops Duty Manager",
            emergencyPhone: "07000 000001",
            approverName: "Regional Approver",
            approverEmail: "approver@example.com",
            approvalLevel: "Regional",
            approvalDueDate: "2026-05-20",
            accessApproval: "Yes",
            safetyApproval: "Yes",
            approverNotes: "Review access plan before scheduling.",
            requestedStartDate: "2026-05-28",
            requestedEndDate: "2026-05-29",
            startTime: "09:00",
            endTime: "17:00",
            outageRequired: "No",
            outageHours: "0",
            customerImpact: "Low",
            trafficManagement: "Not required",
            weatherSensitive: "No",
            workingPattern: "Day",
            schedulingConstraints: "Avoid school drop-off period.",
            documentReference: "DOC-1001"
        },
        "INT-1002": {
            title: "Access Road Closure",
            interventionId: "INT-1002",
            schemeName: "Rugby Access Works",
            interventionType: "Maintenance",
            priority: "High",
            status: "Scheduled",
            county: "Warwickshire",
            controlGroup: "Rsa(Warks)",
            assetType: "DSR",
            assetReference: "DSR-WAR-014",
            siteName: "Rugby",
            siteLocation: "Rugby",
            sgiRequired: "No",
            riskLevel: "High",
            description: "Civil access coordination and closure window",
            requesterName: "Harshal Yelpale",
            requesterEmail: "harshal.yelpale@example.com",
            requesterPhone: "07123 456789",
            businessUnit: "Network Planning",
            contractorName: "Civils Partner",
            contractorEmail: "civils@example.com",
            emergencyContact: "Traffic Lead",
            emergencyPhone: "07000 000002",
            approverName: "Access Approver",
            approverEmail: "access.approver@example.com",
            approvalLevel: "Local",
            approvalDueDate: "2026-05-22",
            accessApproval: "Yes",
            safetyApproval: "Yes",
            approverNotes: "Traffic management evidence required.",
            requestedStartDate: "2026-06-01",
            requestedEndDate: "2026-06-03",
            startTime: "08:00",
            endTime: "18:00",
            outageRequired: "No",
            outageHours: "0",
            customerImpact: "Medium",
            trafficManagement: "Road closure",
            weatherSensitive: "Yes",
            workingPattern: "Day",
            schedulingConstraints: "Coordinate with council notice period.",
            documentReference: "DOC-1002"
        },
        "INT-1003": {
            title: "Pipeline Maintenance",
            interventionId: "INT-1003",
            schemeName: "Chesterfield Pipeline",
            interventionType: "Maintenance",
            priority: "Medium",
            status: "Confirmed",
            county: "Derbyshire",
            controlGroup: "Draycote",
            assetType: "DBS",
            assetReference: "DBS-DER-022",
            siteName: "Chesterfield",
            siteLocation: "Chesterfield",
            sgiRequired: "Yes",
            riskLevel: "Medium",
            description: "Routine field maintenance",
            requesterName: "Harshal Yelpale",
            requesterEmail: "harshal.yelpale@example.com",
            requesterPhone: "07123 456789",
            businessUnit: "Maintenance",
            contractorName: "Pipeline Services",
            contractorEmail: "pipeline@example.com",
            emergencyContact: "Maintenance Lead",
            emergencyPhone: "07000 000003",
            approverName: "Safety Approver",
            approverEmail: "safety@example.com",
            approvalLevel: "Regional",
            approvalDueDate: "2026-05-25",
            accessApproval: "No",
            safetyApproval: "Yes",
            approverNotes: "Confirmed subject to final toolbox talk.",
            requestedStartDate: "2026-06-04",
            requestedEndDate: "2026-06-07",
            startTime: "10:30",
            endTime: "16:00",
            outageRequired: "Yes",
            outageHours: "4",
            customerImpact: "Low",
            trafficManagement: "Not required",
            weatherSensitive: "No",
            workingPattern: "Day",
            schedulingConstraints: "Complete within agreed outage window.",
            documentReference: "DOC-1003"
        }
    };

    [
        ["INT-1004", "Crane Lift Review", "Warwickshire", "Draft", "Lift plan and safety checks", "Campion", "Warwick", "High Pressure"],
        ["INT-1005", "Power Isolation", "Derbyshire", "Deferred", "Planned power isolation and restore", "Derby South", "Buxton", "Low Pressure"],
        ["INT-1006", "Permit Re-issue", "Warwickshire", "Await New Dates", "Waiting on revised contractor dates", "North Warwickshire", "Stratford-upon-Avon", "Network Asset"],
        ["INT-1007", "Emergency Drill", "Derbyshire", "Completed", "Operational readiness drill", "Derby North", "Matlock", "DBS"],
        ["INT-1008", "Vegetation Clearance", "Warwickshire", "Cancelled", "Cancelled due to weather constraints", "Bedworth", "Nuneaton", "DSR"],
        ["INT-1009", "Valve Replacement", "Leicestershire", "Started", "Replace isolation valve and complete reinstatement", "Hinckley", "Leicester", "Network Asset"],
        ["INT-1010", "Network Survey", "Staffordshire", "Conflict Check", "Survey works pending access review", "Stafford North", "Stafford", "Network Asset"],
        ["INT-1011", "Customer Notice Review", "Gloucestershire", "Change Request", "Revised customer notice required", "Cheltenham", "Cheltenham", "Low Pressure"],
        ["INT-1012", "Archive Migration", "Cheshire", "Archive", "Historic intervention package archived", "Chester", "Chester", "Network Asset"],
        ["INT-1013", "Pressure Test", "Worcestershire", "Closed", "Final records closed after verification", "Worcester North", "Worcester", "High Pressure"],
        ["INT-1014", "Site Reinstatement", "Leicestershire", "Scheduled", "Reinstatement after network repair", "Field Head", "Loughborough", "DSR"],
        ["INT-1015", "Permit Extension", "Shropshire", "Proposed", "Permit extension proposal for long duration works", "Shrewsbury", "Shrewsbury", "Network Asset"],
        ["INT-1016", "Design Review", "Nottinghamshire", "Draft", "Initial design review and markups", "Mansfield", "Mansfield", "DBS"],
        ["INT-1017", "Low Pressure Works", "Staffordshire", "Confirmed", "Low pressure network maintenance", "Tamworth", "Tamworth", "Low Pressure"],
        ["INT-1018", "High Pressure Audit", "Gloucestershire", "Started", "Audit high pressure asset readiness", "Stroud", "Stroud", "High Pressure"],
        ["INT-1019", "Outage Coordination", "Warwickshire", "Conflict Check", "Outage window conflicts with adjacent works", "Nuneaton", "Nuneaton", "DSR"],
        ["INT-1020", "Document Refresh", "Derbyshire", "Deferred", "Awaiting revised RAMS documents", "Mid Derby", "Derby", "DBS"],
        ["INT-1021", "Access Gate Repair", "Cheshire", "Completed", "Repair completed and signed off", "Crewe", "Crewe", "Network Asset"],
        ["INT-1022", "SGI Planning", "Worcestershire", "Proposed", "SGI plan awaiting technical review", "Redditch Area", "Redditch", "High Pressure"],
        ["INT-1023", "Road Closure", "Shropshire", "Scheduled", "Traffic management booked", "Ludlow", "Ludlow", "DSR"],
        ["INT-1024", "Control Room Test", "Leicestershire", "Confirmed", "Control room communications test", "Scraptoft", "Hinckley", "Network Asset"],
        ["INT-1025", "Emergency Repair", "Nottinghamshire", "Started", "Reactive repair in progress", "Newark", "Newark-on-Trent", "Low Pressure"],
        ["INT-1026", "Cancellation Review", "Staffordshire", "Cancelled", "Cancelled after contractor availability change", "Stoke-on-Trent", "Stoke-on-Trent", "DSR"]
    ].forEach(([id, title, county, status, description, controlGroup, siteName, assetType]) => {
        sampleInterventions[id] = sampleInterventions[id] || {
            title,
            interventionId: id,
            schemeName: `${siteName} Works`,
            interventionType: "Maintenance",
            priority: status === "Conflict Check" || status === "Started" ? "High" : "Medium",
            status,
            county,
            controlGroup,
            assetType,
            assetReference: `${assetType.replace(/\s/g, "-").toUpperCase()}-${id}`,
            siteName,
            siteLocation: siteName,
            sgiRequired: "No",
            riskLevel: "Medium",
            description,
            requesterName: "Harshal Yelpale",
            requesterEmail: "harshal.yelpale@example.com",
            requesterPhone: "07123 456789",
            businessUnit: "Operations",
            contractorName: "Field Partner",
            contractorEmail: "field.partner@example.com",
            emergencyContact: "Duty Manager",
            emergencyPhone: "07000 000000",
            approverName: "Regional Approver",
            approverEmail: "approver@example.com",
            approvalLevel: "Regional",
            approvalDueDate: "2026-06-01",
            accessApproval: "Yes",
            safetyApproval: "Yes",
            approverNotes: "Review package before approval.",
            requestedStartDate: "2026-06-10",
            requestedEndDate: "2026-06-12",
            startTime: "09:00",
            endTime: "17:00",
            outageRequired: "No",
            outageHours: "0",
            customerImpact: "Low",
            trafficManagement: "Not required",
            weatherSensitive: "No",
            workingPattern: "Day",
            schedulingConstraints: "Coordinate with field team.",
            documentReference: `DOC-${id.replace("INT-", "")}`
        };
    });

    const fillForm = (data) => {
        Object.entries(data).forEach(([name, value]) => {
            const field = form.elements[name];
            if (!field || field.type === "file") {
                return;
            }

            if (field.tagName === "SELECT" && !Array.from(field.options).some((option) => option.value === value)) {
                field.append(new Option(value, value));
            }

            field.value = value;
        });
    };

    const setReadOnly = () => {
        Array.from(form.elements).forEach((field) => {
            if (field.type !== "hidden" && field.type !== "button" && field.type !== "submit") {
                field.disabled = true;
            }
        });
    };

    const mode = form.dataset.mode || "create";
    const interventionId = form.dataset.interventionId;
    const record = sampleInterventions[interventionId] || {
        interventionId,
        title: interventionId ? `Intervention ${interventionId}` : ""
    };

    if (mode === "edit" || mode === "view") {
        fillForm(record);
    }

    if (mode === "view") {
        setReadOnly();
    }

    const toggleScrollTop = () => {
        scrollTopButton.classList.toggle("is-visible", window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleScrollTop, { passive: true });

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        message.textContent = mode === "edit" ? "Intervention updated." : "Intervention submitted.";
        window.setTimeout(() => {
            message.textContent = "";
        }, 2500);
    });

    toggleScrollTop();
})();
