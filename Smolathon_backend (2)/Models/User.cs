

using System.ComponentModel.DataAnnotations.Schema;
namespace Smolathon_backend.Models
{
    [Table("users")] // Указываем имя таблицы в БД
    public class User
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("username")]
        public string Username { get; set; }

        [Column("password_hash")]
        public string PasswordHash { get; set; }

        [Column("role")]
        public string Role { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}


