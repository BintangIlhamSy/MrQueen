using Microsoft.EntityFrameworkCore;
using API.Entities;
using System.Diagnostics.CodeAnalysis;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
    }
}