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
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id){
        try
        {
            await _taskService.DeleteTask(id);
            return Ok("Task deleted successfully!");
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
    [HttpPut("edit/{id}")]
    public async Task<ActionResult<TaskItem>> EditTask(int id, TaskItem task){
        if(id != task.Id){
            return BadRequest("There is no task with the given id");
        }
        if(task == null){
            return BadRequest("Task is null");
        }
       try{
            var UpdateTask = await _taskService.EditTask(id, task);
            if(UpdateTask == null){
                return NotFound();
            }
            return Ok(UpdateTask);
       } catch (Exception ex){
            Console.WriteLine(ex.Message);
            return StatusCode(500, "An error occured while updating the task");
    }
}
}}
