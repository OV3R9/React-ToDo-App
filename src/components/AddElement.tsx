import { useRef, useState } from "react";
import { Task } from "../types";

interface AddElementProps {
  addTask: (task: Task) => void;
}

const AddElement: React.FC<AddElementProps> = ({ addTask }) => {
  const [nameInput, setNameInput] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  function handleOnChange(event: any) {
    setNameInput(event.target.value);
  }

  function handleIsImportant() {
    setIsImportant(!isImportant);
  }

  function handleDateInput(event: any) {
    setDateInput(event.target.value.toString());
  }

  function handleTimeInput(event: any) {
    setTimeInput(event.target.value.toString());
  }

  function areTasksIdentical(task1: Task | null, task2: Task): boolean {
    if (!task1) {
      return false;
    }
    if (
      task1.name === task2.name &&
      task1.date === task2.date &&
      task1.time === task2.time &&
      task1.important === task2.important
    ) {
      return true;
    }
    return false;
  }

  const previousTask = useRef<Task | null>(null);

  function createTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const task: Task = {
      name: nameInput,
      date: dateInput,
      time: timeInput,
      important: isImportant,
    };

    const arrString: string | null = localStorage.getItem("tasks");
    const arr: Task[] = arrString ? JSON.parse(arrString) : [];

    for (let i = 0; i < arr.length; i++) {
      if (areTasksIdentical(arr[i], task)) {
        alert("Don't Add identical tasks!");
        return;
      }
    }

    previousTask.current = task;

    addTask(task);
  }

  return (
    <>
      <form onSubmit={createTask}>
        <div className="flex flex-col items-center gap-10 text-purple-600">
          <div className="flex flex-col w-[30vw] h-full gap-[20px]">
            <h1 className="text-center text-2xl">Submit your task!</h1>
            <div className="flex flex-row justify-center gap-[10px]">
              <input
                type="text"
                placeholder="ex. Walk my dog"
                className="bg-[#242626] border-2 border-purple-600 rounded-[10px] p-[10px] w-[40%] focus:outline-none 
              focus:border-white duration-[.5s]"
                required
                value={nameInput}
                onChange={handleOnChange}
              ></input>
              <div
                className="flex flex-row justify-center items-center w-[28%] gap-[10px] border-2 border-purple-600 rounded-[10px] p-[10px]
            hover:border-white duration-[.5s]"
              >
                <label htmlFor="checkboxImportant" className="text-lg truncate">
                  Important:
                </label>
                <input
                  type="checkbox"
                  onClick={handleIsImportant}
                  name="checkboxImportant"
                  className="bg-[#242626] focus:outline-none w-[20px] h-[20px]"
                ></input>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-[10px]">
              <input
                type="date"
                onChange={handleDateInput}
                required
                className="bg-[#242626] border-2 border-purple-600 rounded-[10px] p-[10px] w-[40%] focus:outline-none
              focus:border-white duration-[.5s]"
              ></input>
              <input
                type="time"
                onChange={handleTimeInput}
                required
                className="bg-[#242626] border-2 border-purple-600 rounded-[10px] p-[10px] w-[28%] focus:outline-none
            focus:border-white duration-[.5s]"
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="border-2 border-purple-600 rounded-[10px] p-[10px] 
          hover:bg-purple-600 hover:text-white duration-[.5s] w-[20%]"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddElement;
