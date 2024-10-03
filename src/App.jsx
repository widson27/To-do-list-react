import { useEffect, useState } from 'react';
import './App.css'
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import { v4 } from 'uuid';
import Title from './components/Title';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  )

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {

    async function fetchTasks() {
      //CHAMAR A API
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        method: "GET",
      })
      //PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json()
      //ARMAZENAR E PERSISTIR NO STATE
      setTasks(data)

    }

    //SE VOCÊ QUISER PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
    //fetchTasks()
  }, [])

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      //NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task
    })
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id != taskId)
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    //MONTA A NOVA TAREFA COM OS VALORES DOS INPUTS E ATUALIZA OS ESTADOS DA LISTA DE TAREFAS
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask])

  }

  return (
    <div className='w-screen h-screen bg-slate-500 flex justify-center p-6'>
      <div className='w-[500px] space-y-4'>
        <Title >Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick} />
      </div>
    </div>
  )
}

export default App;
