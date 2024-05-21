using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using ReactFavoriteBooks.Data;
using ReactFavoriteBooks.Web.Models;

namespace ReactFavoriteBooks.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly string _connectionString;

    public AccountController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("ConStr");
    }

    [HttpPost]
    [Route("signup")]
    public void Signup(SignupViewModel user)
    {
        var repo = new UserRepository(_connectionString);
        repo.AddUser(user, user.Password);
    }

    [HttpPost]
    [Route("login")]
    public User Login(LoginViewModel loginViewModel)
    {
        var repo = new UserRepository(_connectionString);
        var user = repo.Login(loginViewModel.Email, loginViewModel.Password);
        if (user == null)
        {
            return null;
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, loginViewModel.Email)
        };

        HttpContext.SignInAsync(new ClaimsPrincipal(
            new ClaimsIdentity(claims, "Cookies", ClaimTypes.Email, "role"))).Wait();

        return user;
    }

    [HttpGet]
    [Route("getcurrentuser")]
    public User GetCurrentUser()
    {
        if (!User.Identity.IsAuthenticated)
        {
            return null;
        }

        var repo = new UserRepository(_connectionString);
        return repo.GetByEmail(User.Identity.Name);
    }

    [HttpPost]
    [Route("logout")]
    public void Logout()
    {
        HttpContext.SignOutAsync().Wait();
    }

    [HttpGet("EmailExists")]
    public object EmailExists(string email)
    {
        var repo = new UserRepository(_connectionString);
        return new { exists = repo.EmailExists(email) };
    }
}