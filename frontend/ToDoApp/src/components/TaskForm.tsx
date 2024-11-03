import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { addTask, updateTask } from "../services/authService";

interface TaskFormProps {
    task?: {
        id: number;
        title: string;
        description?: string;
        dueDate?: string;
        priority: "Low" | "Medium" | "High";
    };
    onSave: () => void; // Funkcja do odświeżenia listy zadań po zapisaniu
    show: boolean; // Kontrola widoczności modalu
    onHide: () => void; // Funkcja do zamknięcia modalu
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, show, onHide }) => {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [dueDate, setDueDate] = useState<string | undefined>(task?.dueDate || undefined);
    const [priority, setPriority] = useState<"Low" | "Medium" | "High">(task?.priority || "Low");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (task) {
            await updateTask(task.id, { title, description, dueDate, priority });
        } else {
            await addTask({ title, description, dueDate, priority });
        }
        onSave();
    };

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || "");
            setDueDate(task.dueDate || undefined);
            setPriority(task.priority || "Low");
        } else {
            setTitle("");
            setDescription("");
            setDueDate(undefined);
            setPriority("Low");
        }
    }, [task]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{task ? "Edytuj zadanie" : "Dodaj nowe zadanie"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Tytuł zadania</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wprowadź tytuł zadania"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Opis</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Wprowadź opis"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data ukończenia</Form.Label>
                        <Form.Control
                            type="date"
                            value={dueDate || ""}
                            onChange={(e) => setDueDate(e.target.value || undefined)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Priorytet</Form.Label>
                        <Form.Control
                            as="select"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
                        >
                            <option value="Low">Niski</option>
                            <option value="Medium">Średni</option>
                            <option value="High">Wysoki</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">{task ? "Zapisz" : "Dodaj"}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TaskForm;
