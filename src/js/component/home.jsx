import { useState } from "react";
import React from "react";
import Item from "./Item.jsx";
//create your first component




const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [isEmpty, setIsEmpty] = useState(true);

	const removeTask = (taskToRemove) => {
		setTasks(tasks.filter(task => task !== taskToRemove));
		if(tasks.length === 1){
			setIsEmpty(true);
		}
		
	};

	const addTask = () => {
		if (newTask.trim() !== "") {
			setTasks([...tasks, newTask]);
			setNewTask("");
			setIsEmpty(false)
		}
	};

	const handleChange = (event) => {
		setNewTask(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			addTask();
		}
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<h1 className="text-body-secondary fw-light my-3 fs-1">todos</h1>
			<ul className="list-group list-group-flush border w-75 text-start">
				<li className="list-group-item"><input type="text" onChange={handleChange} value={newTask} onKeyDown={handleKeyDown} className="border-0 fs-4 mx-5" placeholder="What needs to be done?" /></li>

				{tasks.map((task, index) => (
					<Item key={index} TaskName={task} onDelete={() => removeTask(task)} />
				))}



				{isEmpty && (
					<li className="list-group-item text-body-secondary fw-light">
						No tasks, add tasks.
					</li>
				)}
				{!isEmpty && (
					<li className="list-group-item text-body-secondary fw-light">
						{tasks.length} item{tasks.length !== 1 ? "s" : ""} left
					</li>
				)}

			</ul>
		</div>
	);
};

export default Home;
