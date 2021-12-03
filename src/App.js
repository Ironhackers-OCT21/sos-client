import { Routes, Route } from  "react-router-dom";
import MyNav from "./components/MyNav";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import {useState, useEffect} from 'react'
import axios from "axios";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm"
import {useNavigate } from 'react-router-dom'
import Marcos from './components/Marcos'

function App(){

  const [todos, setTodos] = useState([])
  
  // This hook is for us to redirect users to different urls
  const navigate = useNavigate()
  // This runs only --ONCE-- when the component is mounted
  useEffect(() => {

      const getData = async () => {
          let response  = await axios.get('http://localhost:5005/api/todos')
          setTodos(response.data)
      }

      getData()

  }, [])

  // Runs everytime 'todos' gets updates - a conditional did update
  useEffect(() => {
    navigate('/')
  }, [todos])

  const handleSubmit = async (event) => {
      event.preventDefault()
      let newTodo = {
        name: event.target.name.value,
        description: event.target.description.value,
        completed: false,
      }
      // Pass an object as a 2nd param in POST requests
      let response = await axios.post('http://localhost:5005/api/create', newTodo)
      setTodos([response.data, ...todos])
  }

  const handleEdit = async (event, id) => {
      event.preventDefault()
      let editedTodo = {
        name: event.target.name.value,
        description: event.target.description.value,
        completed: false,
      }
      // Pass an object as a 2nd param in POST requests
      let response = await axios.patch(`http://localhost:5005/api/todos/${id}`, editedTodo)
      // Update our state 'todos' with the edited todo so that the user see the upadted info without refrshing the page

      // We have the updated todo here
      console.log(response.data)

      let updatedTodos = todos.map((elem) => {
          if (elem._id == id) {
              elem.name = response.data.name
              elem.description = response.data.description
          }
          return elem
      })

      setTodos(updatedTodos)
      
  }

  const handleDelete = async (id) => {
    // make a request to the server to delete it from the database
    await axios.delete(`http://localhost:5005/api/todos/${id}`)

    // Update your state 'todos' and remove the todo that was deleted
    let filteredTodos = todos.filter((elem) => {
      return elem._id !== id
    })

    setTodos(filteredTodos)
  }

	return (
		<div>
      <MyNav />
			<h1>Shopping List</h1>
      <Routes>
          <Route path="/" element={<TodoList todos={todos} /> } />
          <Route path="/add-form" element={<AddForm btnSubmit={handleSubmit}/> } />
          <Route path="/todo/:todoId" element={<TodoDetail btnDelete={handleDelete} />} />
          <Route path="/todo/:todoId/edit" element={<EditForm btnEdit={handleEdit}/>} />
      </Routes>
		</div>
	);
}

export  default App;