using System.Text.Json;
using System.Text.Json.Serialization;

namespace ReactFavoriteBooks.Web.Services;

public class Book
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string CoverUrl { get; set; }
}

public class OpenLibrarySearchResult
{
    public Doc[] Docs { get; set; }
}

public class Doc
{
    public string Key { get; set; }

    public string Title { get; set; }

    [JsonPropertyName("author_name")]
    public string[] AuthorName { get; set; }

    [JsonPropertyName("cover_i")]
    public int? CoverI { get; set; }
}

public class OpenLibraryAPIService
{
    public List<Book> SearchBooks(string query)
    {
        var client = new HttpClient();
        var searchResult = client.GetFromJsonAsync<OpenLibrarySearchResult>($"https://openlibrary.org/search.json?q={query}").Result;
        var books = new List<Book>();

        foreach (var doc in searchResult.Docs)
        {
            var book = new Book
            {
                Id = doc.Key,
                Title = doc.Title,
                Author = doc.AuthorName?.Length > 0 ? doc.AuthorName[0] : "Unknown Author",
                CoverUrl = doc.CoverI.HasValue ? $"https://covers.openlibrary.org/b/id/{doc.CoverI}-M.jpg" : "https://via.placeholder.com/150"
            };
            books.Add(book);
        }

        return books;
    }
}