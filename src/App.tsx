import { useEffect, useState } from "react";
import AddElement from "./components/AddElement";
import { Task } from "./types";
import ListComponent from "./components/ListComponent";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const localTasks = localStorage.getItem("tasks");
    return localTasks ? JSON.parse(localTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const delTasks = () => {
    setTasks([]);
  };

  const delLastItem = () => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.slice(0, prevTasks.length - 1);
      return newTasks;
    });
  };

  return (
    <>
      <h1 className="text-center text-purple-600 text-2xl">React TO-DO App</h1>
      <div className="w-full flex flex-row justify-around mt-[20px]">
        <AddElement addTask={addTask}></AddElement>
        <ListComponent
          tasks={tasks}
          delTasks={delTasks}
          delLastItem={delLastItem}
        ></ListComponent>
      </div>
    </>
  );
}

export default App;
