using BackEnd_Tech.Models;
using BackEnd_Tech.Models.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;


namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private TechStoreContext _context;
        private readonly MailSettings _mailSettings;

        public FeedBackController(TechStoreContext context, IOptions<MailSettings> mailSettings)
        {
            _context = context;
            _mailSettings = mailSettings.Value;
        }

        [Route("GetById_FeedBack/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdFeedBack(int id)
        {
            try
            {
                var query =  await _context.FeedBacks.FindAsync(id);
                if(query == null)
                {
                    return BadRequest(new {message = "FeedBack không tồn tại!"});
                }

                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("SendEmail")]
        [HttpPost]
        public IActionResult SendEmail([FromBody] EmailRequest emailRequest)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail));
                message.To.Add(new MailboxAddress("", emailRequest.To));
                message.Subject = emailRequest.Subject;

                message.Body = new TextPart("html")
                {
                    Text = emailRequest.Content
                };

                using (var client = new SmtpClient())
                {
                    client.Connect(_mailSettings.Host, _mailSettings.Port, false);
                    client.Authenticate(_mailSettings.Mail, _mailSettings.Password);
                    client.Send(message);
                    client.Disconnect(true);
                }

                return Ok(new { message = "Email đã được gửi thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi máy chủ nội bộ: {ex.Message}");
            }
        }

        [Route("TrangThai/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateTrangThai(int id)
        {
            try
            {
                var query = await _context.FeedBacks.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy loại sản phẩm cần sửa" });
                }

                query.TrangThai = !query.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Cập nhật trạng thái thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_FeedBack")]
        [HttpGet]
        public async Task<IActionResult> SearchFeedBack([FromQuery] int page = 1, int pageSize = 10)
        {
            try
            {
                if (page < 1)
                {
                    page = 1;
                }

                if (pageSize < 1)
                {
                    pageSize = 10;
                }

                var query = _context.FeedBacks.AsQueryable();

                var totalItems = await query.CountAsync();

                var FeedBackList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = FeedBackList
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
