using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThorgaApi.Authorization;

namespace ThorgaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public UploadController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (!PermissionHelper.UserHasPermission(User, "content.write"))
            {
                return Forbid();
            }

            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadsDir = Path.Combine(_env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot"), "uploads");
            
            if (!Directory.Exists(uploadsDir))
                Directory.CreateDirectory(uploadsDir);

            var ext = Path.GetExtension(file.FileName);
            var newFileName = Guid.NewGuid().ToString() + ext;
            var filePath = Path.Combine(uploadsDir, newFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return relative URL that will be served by UseStaticFiles
            return Ok(new { url = $"/uploads/{newFileName}" });
        }
    }
}
