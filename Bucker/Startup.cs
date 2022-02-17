using Bucker.Data.Context;
using Bucker.Data.Repositories;
using Bucker.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MySqlConnector;
using System.Text;

namespace Bucker
{
    public class Startup
    {
        private readonly string _specificOriginPolicy = "AllowSpecificOrigin";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettings = Configuration.GetSection("Application").Get<AppSettings>();
            var jwtSettings = Configuration.GetSection("JwtSettings");
            var dbConnString = BuildMySqlConnectionString(appSettings);

            services.AddCors(options =>
            {
                if (!string.IsNullOrWhiteSpace(appSettings.AllowedOrigins))
                {
                    var origins = appSettings.AllowedOrigins.Split(',');
                    options.AddPolicy(_specificOriginPolicy, builder =>
                    {
                        builder.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod();
                    });
                }
            });
            services.AddControllers().AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.WriteIndented = true;
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Bucker", Version = "v1" });
            });

            services.AddDbContext<Context>(x => x.UseMySql(dbConnString, ServerVersion.AutoDetect(dbConnString)));
            services.Configure<JwtSettings>(jwtSettings);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Get<JwtSettings>().SecretKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true
                };
            });

            services.AddScoped<IContext, Context>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IConceptRepository, ConceptRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bucker v1"));
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(_specificOriginPolicy);
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        #region Private
        private string BuildMySqlConnectionString(AppSettings s)
        {
            var sb = new MySqlConnectionStringBuilder
            {
                Server = s.DataSource.Server,
                Database = s.DataSource.Database,
                Port = s.DataSource.Port > 0 ? s.DataSource.Port : 3306,
                UserID = s.DataSource.User,
                Password = s.DataSource.Password
            };

            return sb.ConnectionString;
        }
        #endregion Private
    }
}
