using DatingApp.Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Api.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options){}

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Like>()
                .HasKey(k=>new {k.LikerId,k.LikeeId });
            builder.Entity<Like>()
                .HasOne(a => a.Likee)
                .WithMany(a=>a.Likers)
                .HasForeignKey(a=>a.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Like>()
               .HasOne(a => a.Liker)
               .WithMany(a => a.Likees)
               .HasForeignKey(a => a.LikerId)
               .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
