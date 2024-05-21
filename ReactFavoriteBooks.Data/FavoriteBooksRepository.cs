using Microsoft.EntityFrameworkCore;

namespace ReactFavoriteBooks.Data;

public class FavoriteBooksRepository
{
    private readonly string _connectionString;

    public FavoriteBooksRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public void Add(FavoriteBook book)
    {
        using var context = new FavoriteBooksDataContext(_connectionString);
        context.FavoriteBooks.Add(book);
        context.SaveChanges();
    }
    
    public void Remove(int userId, int favoriteId)
    {
        using var context = new FavoriteBooksDataContext(_connectionString);
        context.Database.ExecuteSqlInterpolated(
            $"DELETE FROM FavoriteBooks WHERE Id = {favoriteId} AND UserId = {userId}");
    }

    public List<FavoriteBook> GetForUser(int userId)
    {
        using var context = new FavoriteBooksDataContext(_connectionString);
        return context.FavoriteBooks.Where(f => f.UserId == userId).ToList();
    }

    public bool DoesBookBelongToUser(int userId, int favoriteBookId)
    {
        using var context = new FavoriteBooksDataContext(_connectionString);
        return context.FavoriteBooks.Any(b => b.UserId == userId && b.Id == favoriteBookId);
    }

    public void SetNote(int favoriteBookId, string note)
    {
        using var context = new FavoriteBooksDataContext(_connectionString);
        var book = context.FavoriteBooks.FirstOrDefault(b => b.Id == favoriteBookId);
        if (book == null)
        {
            return;
        }

        book.Note = note;
        context.SaveChanges();
    }
}