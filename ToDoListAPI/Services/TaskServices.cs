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

    public async Task DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if(task == null){
            throw new KeyNotFoundException($"Task with id {id} not found");
        }
        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        
    }

    public async Task<TaskItem?> GetTask(int id)
    {
        return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<List<TaskItem>> GetTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    public async Task<TaskItem> EditTask(int id, TaskItem task)
    {
        _context.Entry(task).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return task;
    }
}
