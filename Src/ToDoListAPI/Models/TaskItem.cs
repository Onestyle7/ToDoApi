using System;
using System.ComponentModel.DataAnnotations;

namespace ToDoListAPI.Models;

public class TaskItem
{
    public int Id { get; set; }
    [Required(ErrorMessage = "Title is required")]
    [StringLength(100, ErrorMessage = "Title cannot be longer the 100 characters")]
    public string Title { get; set; } = null!;
    public string? Desription { get; set; }
    public bool IsDone { get; set; }
    public DateTime? DueDate { get; set; }
    [EnumDataType(typeof(Priority), ErrorMessage = "Priority must be Low, Medium or High")]
    public Priority PriorityLevel { get; set; }
}
