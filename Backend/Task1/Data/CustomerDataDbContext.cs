using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Task1.Data.Configurations;

namespace Task1.Data
{
    public class CustomerDataDbContext : IdentityDbContext<ApiUser>
    {
        public CustomerDataDbContext(DbContextOptions options) : base (options)
        {
            
        }

        public DbSet<Branch> Branches { get; set; }
        public DbSet<City> Cities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new BranchConfiguration());
            modelBuilder.ApplyConfiguration(new CityConfiguration());
        }
    }
}
