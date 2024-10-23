using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoListAPI.Data;
using ToDoListAPI.DTOs;
using ToDoListAPI.Models;
using ToDoListAPI.Services;

namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly IMapper _mapper;
    public TasksController(ITaskService taskService, IMapper mapper)
    {
        _taskService = taskService;
        _mapper = mapper;
    }

    [HttpGet("All")]
    public async Task<IEnumerable<TaskDto>> GetTasks(
        bool? isCompleted = null,
        Priority? priority = null,
        DateTime? dueDate = null,
        string sortBy = "Title",
        bool descending = false
    )
    {
        IEnumerable<TaskItem> tasks = await _taskService.GetTasks();

        if(isCompleted.HasValue)
        {
            tasks = tasks.Where(t => t.IsDone == isCompleted.Value);
        }
        if(priority.HasValue)
        {
            tasks = tasks.Where(t => t.PriorityLevel == priority.Value);
        }
        if(dueDate.HasValue)
        {
            tasks = tasks.Where(t => t.DueDate == dueDate.Value);
        }
        tasks = sortBy switch
        {
            "title" => descending ? tasks.OrderByDescending(t => t.Title) : tasks.OrderBy(t => t.Title),
            "priority" => descending ? tasks.OrderByDescending(t => t.PriorityLevel) : tasks.OrderBy(t => t.PriorityLevel),
            "dueDate" => descending ? tasks.OrderByDescending(t => t.DueDate) : tasks.OrderBy(t => t.DueDate),
            _ => tasks
        };

        var taskDtos = _mapper.Map<IEnumerable<TaskDto>>(tasks);

        return taskDtos.ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDto>> GetTask(int id)
    {
        var task = await _taskService.GetTask(id);
        if (task == null)
        {
            return NotFound();
        }
        var taskDto = _mapper.Map<TaskDto>(task);
        return Ok(taskDto);
    }

    [HttpPost("Add")]
    public async Task<ActionResult<TaskDto>> AddTask([FromBody] CreateTaskDto createTaskDto)
    {
        if(!ModelState.IsValid) 
        {
            return BadRequest(ModelState);
        }
        var task = _mapper.Map<TaskItem>(createTaskDto);
        var newTask = await _taskService.CreateTask(task);

        var taskDto = _mapper.Map<TaskDto>(newTask);
        return CreatedAtAction(nameof(GetTask), new { id = taskDto.Id }, taskDto);


    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id){
        try
        {
            await _taskService.DeleteTask(id);
            return Ok("Task deleted successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, "An error occurred while deleting the task");
        }
    }
    [HttpPut("Edit/{id}")]
    public async Task<ActionResult<TaskDto>> EditTask(int id,[FromBody] UpdateTaskDto updateTaskDto){
        if(id != updateTaskDto.Id){
            return BadRequest("There is no task with the given id");
        }
        if(!ModelState.IsValid){
            return BadRequest(ModelState);
        }
       try{
           var task = await _taskService.GetTask(id);
           if(task == null){
               return NotFound();
           }

           _mapper.Map(updateTaskDto, task);
           var updatedTask = await _taskService.EditTask(id, task);

           var taskDto = _mapper.Map<TaskDto>(updatedTask);
           return Ok(taskDto);
    }catch(Exception ex){
        Console.WriteLine(ex.Message);
        return StatusCode(500, "An error occurred while updating the task");
}
}}}
