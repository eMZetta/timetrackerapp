namespace zeitag_grid_init.Domain.Entities;

public class TimeTracking : BaseAuditableEntity
{
    public DateTime StartOfRecord { get; set; }
    public DateTime EndOfRecord { get; set; }
    public string ShortDescription { get; set; }
    public int BookingTypeId { get; set; }
}