﻿using System.Security.Cryptography;

namespace BackEnd_Tech.Models.Helpers
{
    public class PasswordHasher
    {

        private static RNGCryptoServiceProvider rngCsp = new RNGCryptoServiceProvider();
        private static readonly int SaltSize = 16;
        private static readonly int HashSize = 20;
        private static readonly int Iterations = 10000;

        //Hàm này để băm mật khẩu
        public static string HashPassword(string password)
        {
            byte[] salt;
            rngCsp.GetBytes(salt = new byte[SaltSize]);
            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            var hash = key.GetBytes(HashSize);

            var hashByte = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashByte, 0, SaltSize);
            Array.Copy(hash, 0, hashByte, SaltSize, HashSize);

            var base64Hash = Convert.ToBase64String(hashByte);

            return base64Hash;
        }

        //Hàm này để mã hóa mật khẩu
        public static bool VerifyPassword(string password, string base64Hash)
        {
            var hashBytes = Convert.FromBase64String(base64Hash);

            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);
            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            byte[] hash = key.GetBytes(HashSize);

            return hashBytes.Skip(SaltSize).SequenceEqual(hash);
        }

    }
}
