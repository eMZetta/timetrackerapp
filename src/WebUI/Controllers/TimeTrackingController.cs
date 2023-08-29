using Microsoft.AspNetCore.Mvc;
using zeitag_grid_init.Domain.Entities;
using zeitag_grid_init.WebUI.Controllers;

namespace WebUI.Controllers;

public class TimeTrackingController : ApiControllerBase
    {
        private static List<TimeTracking> timeTrackings = new List<TimeTracking>
        {
            // Mock data for test purpose
            new TimeTracking
            {
                Id = 1,
                StartOfRecord = DateTime.UtcNow.AddHours(-2),
                EndOfRecord = DateTime.UtcNow,
                ShortDescription = "Umsetzung Zeiterfassung mit Angular",
                BookingTypeId = 0
            }
        };

        // GET: api/TimeTracking
        [HttpGet]
        public ActionResult<IEnumerable<TimeTracking>> GetAll()
        {
            return timeTrackings;
        }

        // GET: api/TimeTracking/5
        [HttpGet("{id}")]
        public ActionResult<TimeTracking> GetById(int id)
        {
            var item = timeTrackings.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        // POST: api/TimeTracking
        [HttpPost]
        public ActionResult<TimeTracking> Create(TimeTracking item)
        {
            timeTrackings.Add(item);
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        // PUT: api/TimeTracking/1
        [HttpPut("{id}")]
        public IActionResult Update(int id, TimeTracking item)
        {
            var existingItem = timeTrackings.FirstOrDefault(x => x.Id == id);
            if (existingItem == null)
            {
                return NotFound();
            }
            existingItem.StartOfRecord = item.StartOfRecord;
            existingItem.EndOfRecord = item.EndOfRecord;
            existingItem.ShortDescription = item.ShortDescription;
            existingItem.BookingTypeId = item.BookingTypeId;

            return NoContent();
        }

        // DELETE: api/TimeTracking/1
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = timeTrackings.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            timeTrackings.Remove(item);
            return NoContent();
        }
    }
