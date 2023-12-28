using Microsoft.EntityFrameworkCore;
using Wedding.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureServices(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();


void ConfigureServices(WebApplicationBuilder builder)
{
    builder.Services.AddDbContext<GuestContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
       
    builder.Services.AddControllersWithViews();
}



