namespace ReactFavoriteBooks.Data;

public class UserRepository
{
    private readonly string _connectionString;

    public UserRepository(string connectionString)
    {
        _connectionString = connectionString;    
    }

    public void AddUser(User user, string password)
    {
        var hash = BCrypt.Net.BCrypt.HashPassword(password);
        user.PasswordHash = hash;
        using var context = new FavoriteBooksDataContext(_connectionString);
        context.Users.Add(user);
        context.SaveChanges();
    }

    public User Login(string email, string password)
    {
        var user = GetByEmail(email);
        if (user == null)
        {
            return null;
        }

        var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        if (!isValidPassword)
        {
            return null;
        }

        return user;

    }

    public User GetByEmail(string email)
    {
        using var ctx = new FavoriteBooksDataContext(_connectionString);
        return ctx.Users.FirstOrDefault(u => u.Email == email);
    }

    public bool EmailExists(string email)
    {
        using var ctx = new FavoriteBooksDataContext(_connectionString);
        return ctx.Users.Any(u => u.Email == email);
    } 
}