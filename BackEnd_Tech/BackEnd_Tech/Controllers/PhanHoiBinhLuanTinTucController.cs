using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Role_Admin, Role_User")]
    public class PhanHoiBinhLuanTinTucController : ControllerBase
    {
        private TechStoreContext _context;
        public PhanHoiBinhLuanTinTucController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_PhanHoiBinhLuan/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetAllPhanHoiBinhLuan(int id)
        {
            try
            {
                var query = await _context.PhanHoiBinhLuanTinTucs
                                          .Where(x => x.BinhLuanId == id)
                                          .Select(x => new
                                          {
                                              id = x.Id,
                                              hoTen = x.HoTen,
                                              noiDung = x.NoiDung,
                                              avatarClient = _context.KhachHangs.Where(a => a.Id == x.KhachHangId).Select(a => a.HoTen).FirstOrDefault(),
                                              avatar = _context.NhanViens.Where(a => a.Id == x.NhanVienId).Select(a => a.Avatar).FirstOrDefault(),
                                              createdAt = x.CreatedAt,
                                              trangThai = x.TrangThai
                                          })
                                          .ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_PhanHoiBinhLuan/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdPhanHoiBinhLuan(int id)
        {
            try
            {
                var query = await _context.PhanHoiBinhLuanTinTucs.FindAsync(id);
                if(query == null)
                {
                    return BadRequest(new { message = "Phản hồi không tồn tại!" });
                }    
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_PhanHoiBinhLuan")]
        [HttpPost]
        public async Task<IActionResult> CreatePhanHoiBinhLuan([FromBody] PhanHoiBinhLuanTinTuc model)
        {
            try
            {   model.HoTen = _context.NhanViens.Where(a => a.Id == model.NhanVienId).Select(a => a.HoTen).FirstOrDefault();
                _context.PhanHoiBinhLuanTinTucs.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new {message = "Bình luận thành công"});
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
