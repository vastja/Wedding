using Microsoft.AspNetCore.Mvc;
using PostmarkDotNet;
using Wedding.Data;
using Wedding.Models;

namespace Wedding.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuestController : ControllerBase
	{
        private readonly GuestContext _guests;
        private readonly string _email;
        private readonly string _postmarkToken;

        public GuestController(GuestContext guests)
		{
			_guests = guests;
        }

        [HttpPost]
        public async Task<ActionResult> CreateGuest([FromBody] Guest guest)
        {
            try
            {
                if (guest is null)
                {
                    return BadRequest();
                }

                var registeredGuestWithEmail = _guests.WithEmail(guest.Email);
                if (registeredGuestWithEmail is not null)
                {
                    ModelState.AddModelError("email", "Host se zadaným emailem už existuje.");
                    return BadRequest(ModelState);
                }

                _guests.Guests.Add(guest);
                await _guests.SaveChangesAsync();

                await SendConfirmationEmail(guest);

                return new OkResult();
            }
            catch(Exception)
            {
                return StatusCode(500);
            }
        }

        

        public async Task SendConfirmationEmail(Guest guest)
        {
            var message = new TemplatedPostmarkMessage()
            {
                From = _email,
                To = guest.Email,
                Cc = _email,
                TemplateId = 33832077,
                TemplateModel = new
                {
                    first_name = guest.FirstName,
                    last_name = guest.LastName,
                    plus_one = guest.PlusOne ? "Ano" : "Ne",
                    help = guest.Help ? "Ano" : "Ne"
                }
            };
            var client = new PostmarkClient(_postmarkToken);
            await client.SendMessageAsync(message);
        }
    }
}


