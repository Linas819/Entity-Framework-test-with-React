using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ReactTest.StarWars
{
    public partial class starwarsContext : DbContext
    {
        public starwarsContext()
        {
        }

        public starwarsContext(DbContextOptions<starwarsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Character> Characters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=;database=starwars");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Character>(entity =>
            {
                entity.ToTable("characters");

                entity.Property(e => e.Id)
                    .HasColumnType("int(20)")
                    .HasColumnName("ID");

                entity.Property(e => e.BirthYear)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("BIRTH_YEAR");

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("GENDER");

                entity.Property(e => e.Height)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("HEIGHT");

                entity.Property(e => e.Mass)
                    .IsRequired()
                    .HasColumnName("MASS");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("NAME");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
