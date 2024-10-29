using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoListAPI.DTOs
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } 
        public bool IsDone { get; set; }
        public DateTime? DueDate { get; set; }
        public string PriorityLevel { get; set; }
    }
}