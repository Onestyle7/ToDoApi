import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import TaskList from "./components/TaskList";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { fetchProtectedData } from "./services/authService"; 
import TaskForm from "./components/TaskForm";

interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    priority: "Low" | "Medium" | "High";
}

const App: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [showRegister, setShowRegister] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
    const [tasks, setTasks] = useState<Task[]>([]); 
    const [showTaskForm, setShowTaskForm] = useState(false); // Kontrola modalu

    const loadTasks = async () => {
        const data = await fetchProtectedData();
        setTasks(data); 
    };

    const handleAddTask = () => {
        setSelectedTask(undefined);
        setShowTaskForm(true);
    };

    const handleEditTask = (task: Task) => {
        setSelectedTask(task);
        setShowTaskForm(true);
    };

    useEffect(() => {
        if (isAuthenticated()) {
            loadTasks(); // Załaduj zadania po zalogowaniu
        }
    }, [isAuthenticated]);

    return (
        <Container>
            <Navbar bg="dark" variant="dark" className="mb-4">
                <Navbar.Brand>ToDoApp</Navbar.Brand>
                <Nav className="ml-auto">
                    {isAuthenticated() ? (
                        <Button variant="outline-light" onClick={logout}>Wyloguj</Button>
                    ) : (
                        showRegister ? <RegisterForm /> : <LoginForm />
                    )}
                </Nav>
            </Navbar>

            <h2>Witaj, {user ? user.name : "Użytkowniku"}!</h2>

            {isAuthenticated() ? (
                <>
                    <Button variant="primary" onClick={handleAddTask}>Dodaj zadanie</Button>
                    <TaskForm 
                        task={selectedTask} 
                        onSave={() => {
                            loadTasks();
                            setShowTaskForm(false);
                        }} 
                        show={showTaskForm} 
                        onHide={() => setShowTaskForm(false)}
                    />
                    <TaskList tasks={tasks} onEditTask={handleEditTask} onDeleteTask={loadTasks} />
                </>
            ) : (
                <>
                    <p>Proszę się zalogować lub zarejestrować, aby zobaczyć swoje zadania.</p>
                    <Button variant="link" onClick={() => setShowRegister(!showRegister)}>
                        {showRegister ? "Masz już konto? Zaloguj się" : "Nie masz konta? Zarejestruj się"}
                    </Button>
                </>
            )}
        </Container>
    );
};

export default App;
