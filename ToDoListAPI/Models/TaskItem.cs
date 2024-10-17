using System;
using System.ComponentModel.DataAnnotations;

namespace ToDoListAPI.Models;

public class TaskItem
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = null!;
    public string? Desription { get; set; }
    public bool IsDone { get; set; }
    public DateTime? DueDate { get; set; }
    public Priority PriorityLevel { get; set; }
}
