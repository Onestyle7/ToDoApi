using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoListAPI.Models;

namespace ToDoListAPI.Repositories
{
    public interface ITaskRepository
    {
        Task<List<TaskItem>> GetTasks();
        Task<TaskItem?> GetTask(int id);
        Task<TaskItem> CreateTask(TaskItem task);
        Task<TaskItem> EditTask(int id, TaskItem task);
        Task DeleteTask(int id);
    }
}