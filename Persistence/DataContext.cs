using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Activity> Activities { get; set; }
    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //{
    //    var configuration = new ConfigurationBuilder()
    //        .SetBasePath(Directory.GetCurrentDirectory())
    //        .AddJsonFile("appsettings.json")
    //        .Build();

    //    var connectionString = configuration.GetConnectionString("AppDb");
    //    optionsBuilder.UseSqlite(connectionString);
    //}
}
