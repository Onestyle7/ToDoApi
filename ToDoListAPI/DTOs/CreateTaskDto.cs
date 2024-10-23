using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ToDoListAPI.Models;

namespace ToDoListAPI.DTOs
{
    public class CreateTaskDto
    {   
        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, ErrorMessage = "Title cannot be longer the 100 characters")]
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        [EnumDataType(typeof(Priority), ErrorMessage = "Priority must be Low, Medium or High")]
        public Priority PriorityLevel { get; set; }
    }
}