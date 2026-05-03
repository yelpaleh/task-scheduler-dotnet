using System.Text.Json.Serialization;

namespace FullCalendarMvcApp.Models;

public sealed class InterventionDto
{
    [JsonPropertyName("id")]
    public int Id { get; init; }

    [JsonPropertyName("title")]
    public required string Title { get; init; }

    [JsonPropertyName("start")]
    public DateTime ScheduledStart { get; init; }

    [JsonPropertyName("end")]
    public DateTime ScheduledEnd { get; init; }

    [JsonPropertyName("description")]
    public string Description { get; init; } = string.Empty;

    [JsonPropertyName("county")]
    public required string County { get; init; }

    [JsonPropertyName("siteLocation")]
    public required string SiteLocation { get; init; }

    [JsonPropertyName("controlGroup")]
    public required string ControlGroup { get; init; }

    [JsonPropertyName("assetType")]
    public required string AssetType { get; init; }

    [JsonPropertyName("sgi")]
    public bool Sgi { get; init; }

    [JsonPropertyName("status")]
    public required string Status { get; init; }

    [JsonPropertyName("category")]
    public string Category => Status;
}
