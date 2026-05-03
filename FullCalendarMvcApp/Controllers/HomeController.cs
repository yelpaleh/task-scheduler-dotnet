using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using FullCalendarMvcApp.Models;

namespace FullCalendarMvcApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return Calendar();
        }

        public IActionResult Calendar()
        {
            return View("~/Views/Calendar/calendar.cshtml");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public IActionResult GetInterventions()
        {
            var query = Request.Query;
            var county = query["county"].ToString();
            var controlGroup = query["controlGroup"].ToString();
            var assetType = query["assetType"].ToString();
            var siteLocation = query["siteLocation"].ToString();
            bool? sgi = bool.TryParse(query["sgi"].ToString(), out var parsedSgi) ? parsedSgi : null;
            DateTime? scheduledStart = DateTime.TryParse(query["scheduledStart"].ToString(), out var parsedStart) ? parsedStart : null;
            DateTime? scheduledEnd = DateTime.TryParse(query["scheduledEnd"].ToString(), out var parsedEnd) ? parsedEnd : null;
            var statuses = query["statuses"]
                .Where(status => !string.IsNullOrWhiteSpace(status))
                .ToList();

            var interventions = GetSampleInterventions().AsEnumerable();

            if (!string.IsNullOrWhiteSpace(county))
            {
                interventions = interventions.Where(i => i.County.Equals(county, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrWhiteSpace(controlGroup))
            {
                interventions = interventions.Where(i => i.ControlGroup.Equals(controlGroup, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrWhiteSpace(assetType))
            {
                interventions = interventions.Where(i => i.AssetType.Equals(assetType, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrWhiteSpace(siteLocation))
            {
                interventions = interventions.Where(i => i.SiteLocation.Equals(siteLocation, StringComparison.OrdinalIgnoreCase));
            }

            if (sgi.HasValue)
            {
                interventions = interventions.Where(i => i.Sgi == sgi.Value);
            }

            if (scheduledStart.HasValue)
            {
                interventions = interventions.Where(i => i.ScheduledEnd.Date >= scheduledStart.Value.Date);
            }

            if (scheduledEnd.HasValue)
            {
                interventions = interventions.Where(i => i.ScheduledStart.Date <= scheduledEnd.Value.Date);
            }

            if (statuses.Count > 0)
            {
                var selectedStatuses = statuses
                    .Where(status => !string.IsNullOrWhiteSpace(status))
                    .ToHashSet(StringComparer.OrdinalIgnoreCase);

                interventions = interventions.Where(i => selectedStatuses.Contains(i.Status));
            }

            return Json(interventions.OrderBy(i => i.ScheduledStart));
        }

        [HttpGet]
        public IActionResult GetEvents()
        {
            return GetInterventions();
        }

        private static List<InterventionDto> GetSampleInterventions()
        {
            return new List<InterventionDto>
            {
                new()
                {
                    Id = 1,
                    Title = "Site Inspection",
                    ScheduledStart = new DateTime(2026, 4, 28, 9, 0, 0),
                    ScheduledEnd = new DateTime(2026, 4, 28, 15, 0, 0),
                    Description = "Telecom tower readiness review",
                    County = "Derbyshire",
                    ControlGroup = "Derby North",
                    AssetType = "DBS",
                    SiteLocation = "Derby",
                    Sgi = true,
                    Status = "Proposed"
                },
                new()
                {
                    Id = 2,
                    Title = "Access Road Closure",
                    ScheduledStart = new DateTime(2026, 4, 29, 9, 0, 0),
                    ScheduledEnd = new DateTime(2026, 5, 1, 17, 0, 0),
                    Description = "Civil access coordination and closure window",
                    County = "Warwickshire",
                    ControlGroup = "Rsa(Warks)",
                    AssetType = "DSR",
                    SiteLocation = "Rugby",
                    Sgi = false,
                    Status = "Scheduled"
                },
                new()
                {
                    Id = 3,
                    Title = "Pipeline Maintenance",
                    ScheduledStart = new DateTime(2026, 5, 4, 10, 30, 0),
                    ScheduledEnd = new DateTime(2026, 5, 7, 16, 0, 0),
                    Description = "Routine field maintenance",
                    County = "Derbyshire",
                    ControlGroup = "Draycote",
                    AssetType = "DBS",
                    SiteLocation = "Chesterfield",
                    Sgi = true,
                    Status = "Confirmed"
                },
                new()
                {
                    Id = 4,
                    Title = "Crane Lift Review",
                    ScheduledStart = new DateTime(2026, 5, 8, 8, 0, 0),
                    ScheduledEnd = new DateTime(2026, 5, 9, 18, 0, 0),
                    Description = "Lift plan and safety checks",
                    County = "Warwickshire",
                    ControlGroup = "Campion",
                    AssetType = "High Pressure",
                    SiteLocation = "Warwick",
                    Sgi = true,
                    Status = "Draft"
                },
                new()
                {
                    Id = 5,
                    Title = "Power Isolation",
                    ScheduledStart = new DateTime(2026, 5, 13, 7, 0, 0),
                    ScheduledEnd = new DateTime(2026, 5, 15, 19, 0, 0),
                    Description = "Planned power isolation and restore",
                    County = "Derbyshire",
                    ControlGroup = "Derby South",
                    AssetType = "Low Pressure",
                    SiteLocation = "Buxton",
                    Sgi = false,
                    Status = "Deferred"
                },
                new()
                {
                    Id = 6,
                    Title = "Permit Re-issue",
                    ScheduledStart = new DateTime(2026, 5, 18, 9, 0, 0),
                    ScheduledEnd = new DateTime(2026, 5, 20, 17, 0, 0),
                    Description = "Waiting on revised contractor dates",
                    County = "Warwickshire",
                    ControlGroup = "North Warwickshire",
                    AssetType = "Network Asset",
                    SiteLocation = "Stratford-upon-Avon",
                    Sgi = false,
                    Status = "Awaiting New Dates"
                },
                new()
                {
                    Id = 7,
                    Title = "Emergency Drill",
                    ScheduledStart = new DateTime(2026, 5, 21, 10, 0, 0),
                    ScheduledEnd = new DateTime(2026, 5, 21, 14, 0, 0),
                    Description = "Operational readiness drill",
                    County = "Derbyshire",
                    ControlGroup = "Derby North",
                    AssetType = "DBS",
                    SiteLocation = "Matlock",
                    Sgi = true,
                    Status = "Completed"
                },
                new()
                {
                    Id = 8,
                    Title = "Vegetation Clearance",
                    ScheduledStart = new DateTime(2026, 5, 24, 8, 30, 0),
                    ScheduledEnd = new DateTime(2026, 5, 25, 16, 30, 0),
                    Description = "Cancelled due to weather constraints",
                    County = "Warwickshire",
                    ControlGroup = "Bedworth",
                    AssetType = "DSR",
                    SiteLocation = "Nuneaton",
                    Sgi = true,
                    Status = "Cancelled"
                }
            };
        }
    }
}
