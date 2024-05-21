using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactFavoriteBooks.Data;
using ReactFavoriteBooks.Web.Models;
using ReactFavoriteBooks.Web.Services;

namespace ReactFavoriteBooks.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BooksController : ControllerBase
{
    private readonly string _connectionString;
    public BooksController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("ConStr");
    }
    
    [HttpGet("search")]
    [AllowAnonymous]
    public List<Book> Search(string query)
    {
        return new OpenLibraryAPIService().SearchBooks(query);
    }

    [HttpPost("AddToFavorites")]
    public void AddToFavorites(Book book)
    {
        var user = GetCurrentUser();
        var favoriteBook = new FavoriteBook
        {
            Author = book.Author,
            Title = book.Title,
            OpenLibraryId = book.Id,
            CoverUrl = book.CoverUrl,
            UserId = user.Id
        };

        var bookRepo = new FavoriteBooksRepository(_connectionString);
        bookRepo.Add(favoriteBook);
    }

    [HttpPost("removefromfavorites")]
    public void RemoveFromFavorites(RemoveFromFavoritesViewModel viewModel)
    {
        var user = GetCurrentUser();
        var bookRepo = new FavoriteBooksRepository(_connectionString);
        bookRepo.Remove(user.Id, viewModel.FavoriteBookId);
    }

    [HttpGet("GetFavorites")]
    public List<FavoriteBook> GetFavorites()
    {
        var user = GetCurrentUser();
        var bookRepo = new FavoriteBooksRepository(_connectionString);
        return bookRepo.GetForUser(user.Id);
    }

    [HttpPost("SetNote")]
    public void SetNote(UpdateNoteViewModel viewModel)
    {
        var user = GetCurrentUser();
        var bookRepo = new FavoriteBooksRepository(_connectionString);
        if (!bookRepo.DoesBookBelongToUser(user.Id, viewModel.FavoriteBookId))
        {
            return;
        }

        bookRepo.SetNote(viewModel.FavoriteBookId, viewModel.Note); 
    }

    private User GetCurrentUser()
    {
        var userRepo = new UserRepository(_connectionString);
        return userRepo.GetByEmail(User.Identity.Name);
    }
}