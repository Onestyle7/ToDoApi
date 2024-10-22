using System;
using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Data;
using ToDoListAPI.Models;
using ToDoListAPI.Repositories;

namespace ToDoListAPI.Services;

public class TaskServices : ITaskService
{
    private readonly ITaskRepository _repository;

    public TaskServices(ITaskRepository repository)
    {
        _repository = repository;
    }
        
    public async Task<TaskItem> CreateTask(TaskItem task)
    {
        return await _repository.CreateTask(task);
    }

    public async Task DeleteTask(int id)
    {
       await _repository.DeleteTask(id);
    }

    public async Task<TaskItem?> GetTask(int id)
    {
        return await _repository.GetTask(id);
    }

    public async Task<List<TaskItem>> GetTasks()
    {
        return await _repository.GetTasks();
    }

    public async Task<TaskItem> EditTask(int id, TaskItem task)
    {
       return await _repository.EditTask(id, task);
    }
}
