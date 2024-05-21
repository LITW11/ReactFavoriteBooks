namespace ReactFavoriteBooks.Data;

public class FavoriteBook
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string CoverUrl { get; set; }
    public string Note { get; set; }
    public string OpenLibraryId { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }
}