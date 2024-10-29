using System;
using ToDoListAPI.Models;

namespace ToDoListAPI.Services;

public interface ITaskService
{
    Task<List<TaskItem>> GetTasks();
    Task<TaskItem?> GetTask(int id);
    Task<TaskItem> CreateTask(TaskItem task);
    Task<TaskItem> EditTask(int id, TaskItem task);
    Task DeleteTask(int id);

}
