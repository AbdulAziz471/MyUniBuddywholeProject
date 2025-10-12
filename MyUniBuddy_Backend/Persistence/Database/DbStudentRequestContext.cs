using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;


namespace Persistence.Database;

public partial class DbStudentRequestContext : DbContext
{

    public DbStudentRequestContext(DbContextOptions<DbStudentRequestContext> options)
       : base(options)
    {
    }

    public virtual DbSet<MeetingRequest> MeetingRequests { get; set; }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }


    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
    public virtual DbSet<PasswordResetToken> PasswordResetTokens { get; set; }
    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<Answer> Answers { get; set; }
    public virtual DbSet<Question> Questions { get; set; }
    public virtual DbSet<Page> Pages { get; set; }
    public virtual DbSet<SmtpSetting> SmtpSettings { get; set; }

    public virtual DbSet<PagePermission> PagePermissions { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }


    public virtual DbSet<RolePage> RolePages { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<FypTitleSuggestion> FypTitleSuggestions { get; set; }
    public virtual DbSet<EmailTemplate> EmailTemplates { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SmtpSetting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SmtpSetting__3214EC07");

            entity.ToTable("SmtpSetting");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.SmtpServer)
                .HasMaxLength(255)
                .HasColumnName("SmtpServer");
            entity.Property(e => e.Port)
                .HasColumnName("Port");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("Username");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("Password");
            entity.Property(e => e.EnableSsl)
                .HasColumnName("EnableSsl");
            entity.Property(e => e.IsDefault)
                .HasColumnName("IsDefault");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("datetime")
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("CreatedOn");
            entity.Property(e => e.UpdatedOn)
                .HasColumnType("datetime")
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("UpdatedOn");
        });


        modelBuilder.Entity<EmailTemplate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__EmailTemplate__3214EC07");

            entity.ToTable("EmailTemplate");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("Name");
            entity.Property(e => e.SubjectTemplate)
                .HasMaxLength(255)
                .HasColumnName("SubjectTemplate");
            entity.Property(e => e.BodyTemplate)
        .HasColumnType("nvarchar(max)") // Use nvarchar(max) for large Unicode text
        .HasColumnName("BodyTemplate");
            entity.Property(e => e.IsHtml)
                .HasColumnName("IsHtml");
            
            entity.Property(e => e.CreatedOn)
                .HasColumnType("datetime")
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("CreatedOn");
            entity.Property(e => e.UpdatedOn)
                .HasColumnType("datetime")
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("UpdatedOn");
        });

        modelBuilder.Entity<MeetingRequest>(entity =>
        {
            entity.ToTable("MeetingRequests");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Topic).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Description).HasColumnType("nvarchar(max)").IsRequired();
            entity.Property(e => e.Status).HasConversion<int>().IsRequired();
            entity.Property(e => e.AdminNote).HasMaxLength(500);
            entity.Property(e => e.MeetLink).HasMaxLength(500);
            entity.Property(e => e.CreatedAt).HasColumnType("datetime2");
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime2");
        });


        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedName] IS NOT NULL)");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetRoleClaim>(entity =>
        {
            entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

            entity.HasOne(d => d.Role).WithMany(p => p.AspNetRoleClaims).HasForeignKey(d => d.RoleId);
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedUserName] IS NOT NULL)");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "AspNetUserRole",
                    r => r.HasOne<AspNetRole>().WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("FK_AspNetUserRole_Role"),
                    l => l.HasOne<AspNetUser>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_AspNetUserRole_User"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("PK__AspNetUs__AF2760ADA39D6802");
                        j.ToTable("AspNetUserRole");
                    });
        });

        modelBuilder.Entity<AspNetUserClaim>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserLogin>(entity =>
        {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

            entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserToken>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserTokens).HasForeignKey(d => d.UserId);
        });

     
        modelBuilder.Entity<Page>(entity =>
        {
            entity.ToTable("Page"); // Explicitly map to the "Page" table

            entity.HasKey(e => e.Id); // Define primary key
            entity.Property(e => e.Id).ValueGeneratedNever(); // Assuming GUIDs are not generated by the database

            entity.Property(e => e.CreatedBy).HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(50); // As per your provided config
            entity.Property(e => e.Key).HasMaxLength(100);
            entity.Property(e => e.PageUrl).HasMaxLength(200);
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.IsOnlyForSuperAdmin).IsRequired();

            // Configure the one-to-many relationship with RolePage if it's not already handled by conventions
            // entity.HasMany(p => p.RolePages)
            //       .WithOne(rp => rp.Page)
            //       .HasForeignKey(rp => rp.PageId);
        });

        // --- Configuration for the PagePermission junction entity ---
        modelBuilder.Entity<PagePermission>(entity =>
        {
            // CRITICAL: Define the COMPOSITE PRIMARY KEY using both PageId and PermissionId
            entity.HasKey(pp => new { pp.PageId, pp.PermissionId });

            entity.ToTable("PagePermission"); // Explicitly map to the "PagePermission" table

            // This index is typically created automatically by EF Core for foreign keys,
            // but can be explicitly defined if needed for performance or specific naming.
            entity.HasIndex(e => e.PermissionId, "IX_PagePermission_PermissionId");

            // Properties for the composite key parts
            entity.Property(e => e.PageId).ValueGeneratedNever(); // Assuming GUIDs are client-generated
            entity.Property(e => e.PermissionId).ValueGeneratedNever(); // Assuming GUIDs are client-generated

            // Configure the relationship from PagePermission to Page
            // A PagePermission has one Page (pp.Page), and a Page (p) has many PagePermissions (p.PagePermissions)
            entity.HasOne(pp => pp.Page)
                  .WithMany(p => p.PagePermissions) // Use the corrected collection navigation property on Page
                  .HasForeignKey(pp => pp.PageId)
                  .HasConstraintName("FK_PagePermission_Page"); // Match your database constraint name

            // Configure the relationship from PagePermission to Permission
            // A PagePermission has one Permission (pp.Permission), and a Permission (p) has many PagePermissions (p.PagePermissions)
            entity.HasOne(pp => pp.Permission)
                  .WithMany(p => p.PagePermissions) // Use the collection navigation property on Permission
                  .HasForeignKey(pp => pp.PermissionId)
                  .HasConstraintName("FK_PagePermission_Permission"); // Match your database constraint name
        });


        // Question: Student -> Restrict (no cascade from user to question)
        modelBuilder.Entity<Question>(entity =>
        {
            entity.ToTable("Question");
            entity.HasKey(q => q.Id);
            entity.Property(q => q.Title).HasMaxLength(300).IsRequired();
            entity.Property(q => q.Body).HasColumnType("nvarchar(max)").IsRequired();
            entity.Property(q => q.Category).HasMaxLength(150);
            entity.Property(q => q.Status).HasConversion<int>();
            entity.Property(q => q.CreatedAt).HasColumnType("datetime2");
            entity.Property(q => q.UpdatedAt).HasColumnType("datetime2");

            entity.HasOne(q => q.Student)
                  .WithMany()
                  .HasForeignKey(q => q.StudentId)
                  .OnDelete(DeleteBehavior.Restrict)   // <= IMPORTANT
                  .HasConstraintName("FK_Question_Student");
        });

        modelBuilder.Entity<FypTitleSuggestion>(entity =>
        {
            entity.ToTable("FypTitleSuggestion");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).HasMaxLength(300).IsRequired();
            entity.Property(e => e.Domain).HasMaxLength(200);
            entity.Property(e => e.SubDomain).HasMaxLength(200);
            entity.Property(e => e.Difficulty).HasMaxLength(50);
            entity.Property(e => e.ProposedBy).HasMaxLength(200);
            entity.Property(e => e.KeywordsCsv).HasMaxLength(1000);
            entity.Property(e => e.ToolsAndTech).HasMaxLength(1000);
            entity.Property(e => e.ProblemStatement).HasColumnType("nvarchar(max)");
            entity.Property(e => e.Description).HasColumnType("nvarchar(max)");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime2");
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime2");
        });

        // Answer: Question -> Cascade, Admin -> Restrict
        modelBuilder.Entity<Answer>(entity =>
        {
            entity.ToTable("Answer");
            entity.HasKey(a => a.Id);
            entity.Property(a => a.Body).HasColumnType("nvarchar(max)").IsRequired();
            entity.Property(a => a.IsOfficial).HasDefaultValue(true);
            entity.Property(a => a.CreatedAt).HasColumnType("datetime2");

            entity.HasOne(a => a.Question)
                  .WithMany(q => q.Answers)
                  .HasForeignKey(a => a.QuestionId)
                  .OnDelete(DeleteBehavior.Cascade)    // delete answers when question goes
                  .HasConstraintName("FK_Answer_Question");

            entity.HasOne(a => a.Admin)
                  .WithMany()
                  .HasForeignKey(a => a.AdminId)
                  .OnDelete(DeleteBehavior.Restrict)   // <= IMPORTANT
                  .HasConstraintName("FK_Answer_Admin");
        });
        modelBuilder.Entity<Question>()
    .HasIndex(q => q.StudentId);

        modelBuilder.Entity<Answer>()
            .HasIndex(a => a.QuestionId)
            .HasDatabaseName("IX_Answer_QuestionId");

        modelBuilder.Entity<Answer>()
            .HasIndex(a => a.AdminId)
            .HasDatabaseName("IX_Answer_AdminId");

        modelBuilder.Entity<Question>(entity =>
        {
            entity.Property(q => q.CreatedAt)
                  .HasColumnType("datetime2")
                  .HasDefaultValueSql("GETUTCDATE()");
            entity.Property(q => q.UpdatedAt)
                  .HasColumnType("datetime2");
        });

        modelBuilder.Entity<Answer>(entity =>
        {
            entity.Property(a => a.CreatedAt)
                  .HasColumnType("datetime2")
                  .HasDefaultValueSql("GETUTCDATE()");
        });
        // --- Configuration for the Permission entity ---
        modelBuilder.Entity<Permission>(entity =>
        {
            entity.ToTable("Permission"); // Explicitly map to the "Permission" table

            entity.HasKey(e => e.Id); // Define primary key
            entity.Property(e => e.Id).ValueGeneratedNever(); // Assuming GUIDs are not generated by the database

            entity.Property(e => e.CreatedBy).HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(200);
            entity.Property(e => e.Title).HasMaxLength(200);

            // Configure the one-to-many relationship with RolePage if it's not already handled by conventions
            // entity.HasMany(p => p.RolePages)
            //       .WithOne(rp => rp.Permission)
            //       .HasForeignKey(rp => rp.PermissionId);
        });

       modelBuilder.Entity<RolePage>(entity =>
        {
            entity.ToTable("RolePage");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.Page).WithMany(p => p.RolePages)
                .HasForeignKey(d => d.PageId)
                .HasConstraintName("FK_RolePage_Page");

            entity.HasOne(d => d.Permission).WithMany(p => p.RolePages)
                .HasForeignKey(d => d.PermissionId)
                .HasConstraintName("FK_RolePage_Permission");

            entity.HasOne(d => d.Role).WithMany(p => p.RolePages)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_RolePage_AspNetRoles");
        });

         OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
