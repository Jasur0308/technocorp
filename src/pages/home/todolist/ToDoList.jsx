import { BsCheckLg } from "react-icons/bs";
import { GiSave } from "react-icons/gi";
import { BiX } from "react-icons/bi";
import { RiPencilFill } from "react-icons/ri";
import { useState } from "react";

const initialTasks = [
    { id: 1, task: "Launch this theme on Themeforest", label: "Alex", color: "bg-gray-300" },
    { id: 2, task: "Manage Pending Orders", label: "Today", color: "bg-orange-400" },
    { id: 3, task: "Make your desk clean", label: "Admin", color: "bg-gray-500" },
    { id: 4, task: "Today we celebrate the theme", label: "08.03.2013", color: "bg-blue-500" },
    { id: 5, task: "Manage all the orders", label: "12.03.2013", color: "bg-red-500" },
];

const TodoList = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleEdit = (id, currentText) => {
        setEditingId(id);
        setEditText(currentText);
    };

    const handleSave = (id) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, task: editText } : t))
        );
        setEditingId(null);
    };

    const handleDelete = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="pb-2 bg-white rounded shadow w-full space-y-4 border-[0.5px] border-gray-300">
            <div className="flex items-center border-b-[1px] border-gray-300 p-2 gap-2 bg-gray-100">
                <div className="flex items-center text-[18px] text-gray-700">
                    <BsCheckLg />
                </div>
                <div className="flex items-center text-[14px] font-semibold text-gray-700">
                    <h2>To Do List</h2>
                </div>
            </div>

            {tasks.map(({ id, task, label, color }, index) => (
                <div
                    key={id}
                    className={`px-6 pb-3 ${index < tasks.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                    <div className="flex justify-between items-center group">
                        <div className="text-sm text-gray-700 flex items-center gap-2 w-full">
                            {editingId === id ? (
                                <input
                                    className="border px-2 py-1 rounded w-full text-sm"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            ) : (
                                <>
                                    {task}
                                    <span className={`text-white px-2 py-0.5 rounded text-xs ${color}`}>
                                        {label}
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="flex gap-2 group-hover:opacity-100 transition-opacity ml-2">
                            {editingId === id ? (
                                <button
                                    className="text-green-600 hover:text-green-800 cursor-pointer"
                                    onClick={() => handleSave(id)}
                                >
                                    <GiSave />
                                </button>
                            ) : (
                                <button
                                    className="text-gray-500 hover:text-blue-600 cursor-pointer"
                                    onClick={() => handleEdit(id, task)}
                                >
                                    <RiPencilFill />
                                </button>
                            )}
                            <button
                                className="text-gray-500 hover:text-red-600 cursor-pointer"
                                onClick={() => handleDelete(id)}
                            >
                                <BiX className="text-[18px]" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;