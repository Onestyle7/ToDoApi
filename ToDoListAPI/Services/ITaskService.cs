using System;
using ToDoListAPI.Models;

namespace ToDoListAPI.Services;

public interface ITaskService
{
    Task<List<TaskItem>> GetTasks();
    Task<TaskItem?> GetTask(int id);
    Task<TaskItem> CreateTask(TaskItem task);
    Task<TaskItem> UpdateTask(int id, TaskItem task);
    void DeleteTask(int id);

}
