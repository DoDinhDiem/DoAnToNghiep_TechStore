﻿namespace BackEnd_Tech.Models.Dto
{
    public class ChangePassword
    {
        public string Email { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
