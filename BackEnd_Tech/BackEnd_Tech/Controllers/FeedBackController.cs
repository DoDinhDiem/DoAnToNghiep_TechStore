using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private TechStoreContext _context;
        public FeedBackController(TechStoreContext context)
        {
            _context = context;
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

        [Route("Create_FeedBack")]
        [HttpPost]
        public async Task<IActionResult> CreateFeedBack([FromBody] FeedBack model)
        {
            try
            {
                _context.FeedBacks.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new {message = "Phản hồi đã được lưu giữ"});
            }catch (Exception ex)
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

                //if (!string.IsNullOrEmpty(tenLoai))
                //{
                //    query = query.Where(l => l.TenLoai.Contains(tenLoai));
                //}

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
