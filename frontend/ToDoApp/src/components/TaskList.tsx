import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { deleteTask } from "../services/authService";

interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    priority: "Low" | "Medium" | "High";
}

interface TaskListProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onDeleteTask: () => void; 
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask }) => {

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        onDeleteTask(); 
    };

    return (
        <ListGroup>
            {tasks.map((task) => (
                <ListGroup.Item key={task.id} className="task-item">
                    <span>{task.title}</span>
                    <div className="task-buttons">
                        <Button variant="warning" size="sm" onClick={() => onEditTask(task)}>Edytuj</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>Usuń</Button>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TaskList;
