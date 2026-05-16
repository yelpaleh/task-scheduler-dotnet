(function () {
    const chart = document.querySelector("[data-powerbi-chart] .powerbi-bars");
    const totalElement = document.getElementById("powerBiTotal");

    if (!chart || !totalElement) {
        return;
    }

    const data = [
        ["Draft", 13],
        ["Proposed", 45],
        ["Scheduled", 19],
        ["Closed", 3],
        ["Cancelled", 4],
        ["Completed", 7],
        ["Conflict Check", 12],
        ["Await New Dates", 2],
        ["Started", 42],
        ["Change Request", 7],
        ["Confirmed", 23],
        ["Deferred", 5],
        ["Archive", 8]
    ];

    const max = Math.max(...data.map((item) => item[1]));
    const total = data.reduce((sum, item) => sum + item[1], 0);

    totalElement.textContent = total.toString();

    data.forEach(([label, value]) => {
        const row = document.createElement("div");
        row.className = "powerbi-bar";

        const name = document.createElement("span");
        name.textContent = label;

        const track = document.createElement("div");
        track.className = "powerbi-track";

        const fill = document.createElement("div");
        fill.className = "powerbi-fill";
        fill.style.width = `${Math.max(4, (value / max) * 100)}%`;

        const count = document.createElement("strong");
        count.textContent = value.toString();

        track.append(fill);
        row.append(name, track, count);
        chart.append(row);
    });
})();
