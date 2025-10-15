using Domain.Entities;
//using Recaptcha.Net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistence.Database;
using Persistence.Interfaces;
using Persistence.Services;
using QuestPDF.Infrastructure;
using RazorLight;
using StudentDocumantRequestPortal.Middlewares;
using System.Text;
var builder = WebApplication.CreateBuilder(args);

QuestPDF.Settings.License = LicenseType.Community;

builder.Services.AddLogging(builder =>
{
    builder.AddConsole(); // Adds console logging
    builder.AddDebug();   // Adds debug logging
});
// ⛽ Configure DbContext
builder.Services.AddDbContext<DbStudentRequestContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Add MailKit (no global config needed, as you'll configure per-send)
builder.Services.AddSingleton<RazorLightEngine>(new RazorLightEngineBuilder().UseEmbeddedResourcesProject(typeof(Program).Assembly).UseMemoryCachingProvider().Build());

// 🔐 Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromMinutes(1),
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"❌ Token authentication failed: {context.Exception.Message}");
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                Console.WriteLine($"Raw Authorization Header: {context.Request.Headers["Authorization"]}");
            }
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            Console.WriteLine("✅ Token successfully validated.");
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddHttpClient();

// 🔐 Authorization
builder.Services.AddAuthorization();
builder.Services.AddScoped<IDDL, DDLServices>();
builder.Services.AddScoped<IPermission, PermissionService>();
builder.Services.AddScoped<IAuth, AuthService>();
builder.Services.AddScoped<IPage, PageService>();
builder.Services.AddScoped<IAdminUser, AdminUserService>();
builder.Services.AddScoped<IPagePermission, PagePermissionService>();
builder.Services.AddScoped<IRole, RoleService>();
builder.Services.AddScoped<IRolePage, RolePageService>();
builder.Services.AddScoped<IChangePassword, ChangePasswordService>();
builder.Services.AddScoped<ISmtpSetting, SmtpSettingService>();
builder.Services.AddScoped<IEmail ,  EmailService>();
builder.Services.AddScoped<IEmailTemplate, EmailTemplateService>();
builder.Services.AddScoped<IForgotPasswordService, ForgotPasswordService>();
builder.Services.AddScoped<IPasswordResetTokenService, PasswordResetTokenService>();
builder.Services.AddScoped<IBook, BookService>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IFypTitleSuggestion, FypTitleSuggestionService>();
builder.Services.AddRazorPages();
builder.Services.AddScoped<IMeetingRequestService, MeetingRequestService>();

// 🌐 CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:8080")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 📘 Swagger with JWT and API Key support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Student Document Request Portal API", Version = "v1" });

    // 🔐 API Key
    c.AddSecurityDefinition("AppKey", new OpenApiSecurityScheme
    {
        Description = "API Key authentication using the 'AppKey' header",
        Name = "AppKey",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "ApiKey"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "AppKey"
                }
            },
            new string[] { }
        }
    });

    // 🔐 JWT Bearer
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// 🧪 Swagger (only in development)
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

// 🌍 HTTPS
app.UseHttpsRedirection();

app.UseStaticFiles();
// 🌐 CORS
app.UseCors("AllowReactApp");

// 🔐 Custom API Key Middleware (Optional)
app.UseMiddleware<ApiKeyMiddleware>();

// 🔒 Auth Middleware
app.UseAuthentication(); // MUST be before UseAuthorization
app.UseAuthorization();


// 🎯 Map routes
app.MapControllers();
app.MapRazorPages();

// 🚀 Start app
app.Run();
