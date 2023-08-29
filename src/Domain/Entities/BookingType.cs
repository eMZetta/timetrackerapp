namespace zeitag_grid_init.Domain.Entities;

public class BookingType : BaseAuditableEntity
{
    public int BookingTypeId { get; set; }
    public string Description { get; set; }
}