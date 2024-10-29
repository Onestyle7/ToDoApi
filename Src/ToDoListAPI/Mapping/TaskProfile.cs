using AutoMapper;
using ToDoListAPI.Models;
using ToDoListAPI.DTOs;

public class TaskProfile : Profile
{
    public TaskProfile()
    {
        CreateMap<TaskItem, TaskDto>();
        CreateMap<CreateTaskDto, TaskItem>();
        CreateMap<UpdateTaskDto, TaskItem>();
    }
}