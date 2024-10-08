import { Task } from "../types";

interface ListComponentProps {
  tasks: Task[];
  delTasks: () => void;
  delLastItem: () => void;
}

const ListComponent: React.FC<ListComponentProps> = ({
  tasks,
  delTasks,
  delLastItem,
}) => {
  return (
    <>
      <div className="flex flex-col items-center text-purple-600">
        <h1 className="text-2xl">Your Tasks:</h1>
        <ul className="flex flex-col items-center w-[30vw] overflow-hidden mt-[20px] gap-[20px]">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`w-[70%] h-[70px] p-[10px] border-2 border-purple-600 rounded-[10px] ${
                task.important ? "border-white" : ""
              }`}
            >
              <h1>{task.name}</h1>
              <p>
                {task.date}, {task.time}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex flex-row items-center w-full justify-evenly">
          <button
            className="p-[10px] border-2 border-purple-600 rounded-[10px] text-center w-[150px] 
          hover:bg-purple-600 hover:text-white duration-[.5s] mt-[20px]"
            onClick={delTasks}
          >
            Clear List
          </button>
          <button
            className="p-[10px] border-2 border-purple-600 rounded-[10px] text-center w-[150px] 
          hover:bg-purple-600 hover:text-white duration-[.5s] mt-[20px]"
            onClick={delLastItem}
          >
            Delete Last
          </button>
        </div>
      </div>
    </>
  );
};

export default ListComponent;
