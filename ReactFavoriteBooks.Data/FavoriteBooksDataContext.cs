using Microsoft.EntityFrameworkCore;

namespace ReactFavoriteBooks.Data;

public class FavoriteBooksDataContext : DbContext
{
    private readonly string _connectionString;

    public FavoriteBooksDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<FavoriteBook> FavoriteBooks { get; set; }
}