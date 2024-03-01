using BackEnd_Tech.Models.Libraries;
using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackEnd_Tech.Models.Dto;
using Microsoft.AspNetCore.Authorization;

namespace BackEnd_Tech.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VNPAYController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public VNPAYController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [Route("VnPay")]
        [HttpPost]
        public async Task<IActionResult> CreatePaymentUrl([FromBody] HoaDon model)
        {
            var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(_configuration["TimeZoneId"]);
            var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);
            var tick = DateTime.Now.Ticks.ToString();
            var pay = new VnPayLibrary();
            var urlCallBack = _configuration["PaymentCallBack:ReturnUrl"];

            // Kiểm tra model có null không
            if (model == null)
            {
                return BadRequest("Invalid payload");
            }
            pay.AddRequestData("vnp_Version", _configuration["Vnpay:Version"]);
            pay.AddRequestData("vnp_Command", _configuration["Vnpay:Command"]);
            pay.AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]);
            pay.AddRequestData("vnp_Amount", (model.TongTien * 100).ToString());
            pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]);
            var ipAddress = HttpContext.Connection.RemoteIpAddress.ToString();
            pay.AddRequestData("vnp_IpAddr", ipAddress);
            pay.AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]);
            pay.AddRequestData("vnp_OrderInfo", $"name={model.HoTen} phone={model.SoDienThoai} email={model.Email} address={model.DiaChi} notes={model.GhiChu} discount={model.GiamGia}");
            pay.AddRequestData("vnp_OrderType", "Thanh toán sản phẩm");
            pay.AddRequestData("vnp_ReturnUrl", urlCallBack);
            pay.AddRequestData("vnp_TxnRef", tick);

            var paymentUrl =
                pay.CreateRequestUrl(_configuration["Vnpay:BaseUrl"], _configuration["Vnpay:HashSecret"]);

            return Ok(new { linkUrl = paymentUrl });
        }
    }
}
