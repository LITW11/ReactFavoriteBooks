using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactFavoriteBooks.Data;

public class FavoriteBooksDataContextFactory : IDesignTimeDbContextFactory<FavoriteBooksDataContext>
{
    public FavoriteBooksDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}ReactFavoriteBooks.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new FavoriteBooksDataContext(config.GetConnectionString("ConStr"));
    }
}