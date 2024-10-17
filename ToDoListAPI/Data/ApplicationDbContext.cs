using System;
using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Models;

namespace ToDoListAPI.Data;

public class ApplicationDbContext : DbContext
{
    private readonly DbContextOptions<ApplicationDbContext> _options;
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        _options = options;
    }
    public DbSet<TaskItem> Tasks { get; set; }
}
