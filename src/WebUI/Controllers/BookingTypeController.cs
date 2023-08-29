using Microsoft.AspNetCore.Mvc;
using zeitag_grid_init.Domain.Entities;
using zeitag_grid_init.WebUI.Controllers;

namespace WebUI.Controllers;

public class BookingTypeController : ApiControllerBase
    {
        private static List<BookingType> bookingTypes = new List<BookingType>
        {
            new BookingType{BookingTypeId = 0,Description = "Präsenzzeit"},
            new BookingType{BookingTypeId = 1,Description = "Pause"},
            new BookingType{BookingTypeId = 2,Description = "Krankheit oder Unfall"},
            new BookingType{BookingTypeId = 3,Description = "bezahlte Absenz"},
            new BookingType{BookingTypeId = 4,Description = "unbezahlte Absenz"},
        };

        // GET: api/TimeTracking
        [HttpGet]
        public ActionResult<IEnumerable<BookingType>> GetAll()
        {
            return bookingTypes;
        }
    }
