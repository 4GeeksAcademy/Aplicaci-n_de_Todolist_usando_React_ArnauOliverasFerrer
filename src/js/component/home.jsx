import { useState, useEffect } from "react";
import React from "react";
import Item from "./Item.jsx";
//create your first component




const Home = () => {
	const [todos, setTodos] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [isEmpty, setIsEmpty] = useState(true);
	const [isFirstTime, setIsFirstTime] = useState(true);

	const removeTask = (taskToRemove) => {
		setTodos(todos.filter(task => task !== taskToRemove));
		if (todos.length === 1) {
			setIsEmpty(true);
		}

		fetch('https://playground.4geeks.com/todo/todos/' + taskToRemove.id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Será true si la respuesta es exitosa
				console.log(resp.status); // El código de estado 200, 300, 400, etc.
				//console.log(resp.text()); // Intentará devolver el resultado exacto como string
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});

	};

	const cleanTodosList = () => {
		setTodos([]);
		setIsEmpty(true);
		todos.forEach((todo) => {
			fetch('https://playground.4geeks.com/todo/todos/' + todo.id, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					console.log(resp.status); // El código de estado 200, 300, 400, etc.
					//console.log(resp.text()); // Intentará devolver el resultado exacto como string
					return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});
		});
	}

	const addTask = () => {
		if (newTask.trim() !== "") {
			const newTodo = {
				label: newTask.trim(),
				is_done: false
			};
			setTodos([...todos, newTodo]);
			setNewTask("");
			setIsEmpty(false)

			fetch('https://playground.4geeks.com/todo/todos/arnauolifer', {
				method: "POST",
				body: JSON.stringify(newTodo),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					console.log(resp.status); // El código de estado 200, 300, 400, etc.
					//console.log(resp.text()); // Intentará devolver el resultado exacto como string
					return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});
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

	useEffect(() => {
		if (todos.length === 0 && isFirstTime) {
			setIsFirstTime(false);
			console.log('Load List');

			fetch('https://playground.4geeks.com/todo/users/arnauolifer', {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					console.log(resp.status); // El código de estado 200, 300, 400, etc.
					//console.log(resp.text()); // Intentará devolver el resultado exacto como string
					return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
					setTodos(data.todos);
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});


		}
		else {
			console.log('Save List');

		}

	}, [todos]);

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<h1 className="text-body-secondary fw-light my-3 fs-1">To Do</h1>
			<button type="button" onClick={cleanTodosList} className="btn btn-secondary m-3">Clean Todo List</button>
			<ul className="list-group list-group-flush border w-75 text-start">
				<li className="list-group-item"><input type="text" onChange={handleChange} value={newTask} onKeyDown={handleKeyDown} className="border-0 fs-4 mx-5" placeholder="What needs to be done?" /></li>

				{todos.map((todo, index) => (
					<Item key={index} TaskName={todo.label} onDelete={() => removeTask(todo)} />
				))}



				{isEmpty && (
					<li className="list-group-item text-body-secondary fw-light">
						No todos, add todos.
					</li>
				)}
				{!isEmpty && (
					<li className="list-group-item text-body-secondary fw-light">
						{todos.length} item{todos.length !== 1 ? "s" : ""} left
					</li>
				)}


			</ul>
		</div>
	);
};

export default Home;
