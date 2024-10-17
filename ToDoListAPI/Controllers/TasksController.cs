using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoListAPI.Data;
using ToDoListAPI.Models;
using ToDoListAPI.Services;

namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet("All")]
    public async Task<IEnumerable<TaskItem>> GetTasks()
    {
        return await _taskService.GetTasks();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> GetTask(int id)
    {
        var task = await _taskService.GetTask(id);
        if (task == null)
        {
            return NotFound();
        }
        return task;
    }

    [HttpPost("add")]
    public async Task<ActionResult<TaskItem>> AddTask(TaskItem task)
    {
        var newTask = await _taskService.CreateTask(task);
        return CreatedAtAction(nameof(GetTask), new { id = newTask.Id }, newTask);
    }
}
}
