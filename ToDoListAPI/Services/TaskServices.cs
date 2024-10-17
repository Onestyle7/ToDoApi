using System;
using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Data;
using ToDoListAPI.Models;

namespace ToDoListAPI.Services;

public class TaskServices : ITaskService
{
    private readonly ApplicationDbContext _context;

    public TaskServices(ApplicationDbContext context)
    {
        _context = context;
    }
        
    public async Task<TaskItem> CreateTask(TaskItem task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public void DeleteTask(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<TaskItem?> GetTask(int id)
    {
        return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<List<TaskItem>> GetTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    public Task<TaskItem> UpdateTask(int id, TaskItem task)
    {
        throw new NotImplementedException();
    }
}
