using Microsoft.EntityFrameworkCore;
using Wedding.Models;

namespace Wedding.Data;

public class GuestContext : DbContext
{
    public DbSet<Guest> Guests { get; set; }

    public GuestContext(DbContextOptions<GuestContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Guest>().ToTable("guest");
    }

    public Guest? WithEmail(string email)
    {
        return Guests.Where(g => g.Email == email).FirstOrDefault();
    }
}


