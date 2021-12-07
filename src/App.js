import { Routes, Route } from  "react-router-dom";
import MyNav from "./components/MyNav";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import {useState, useEffect} from 'react'
import axios from "axios";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm"
import {useNavigate } from 'react-router-dom'
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {API_URL} from './config'

function App(){

  const [todos, setTodos] = useState([])
  // this state stores the logged in user info
  const [user, setUser] = useState(null)
  const [myError, setError] = useState(null)
  // setting it to 'true' so that we can show a loading screen and make the user wait until this API finishes
  const [fetchingUser, setFetchingUser] = useState(true)
  
  // This hook is for us to redirect users to different urls
  const navigate = useNavigate()

  // This runs only --ONCE-- when the component is mounted
  useEffect(() => {

      const getData = async () => {
          let response  = await axios.get(`${API_URL}/todos`,{withCredentials: true})
          setTodos(response.data)

          // -----------------------------------------------
          // we make the user requst here to know if the user is logged in or not
          try {
            let userResponse = await axios.get(`${API_URL}/user`,{withCredentials: true})
            setFetchingUser(false)
            setUser(userResponse.data)
          }
          catch(err){
            // the request will fail if the user is not logged in 
            setFetchingUser(false)
          }
          // -----------------------------------------------

      }

      getData()

  }, [])

  // Runs everytime 'todos' gets updates - a conditional did update
  useEffect(() => {
    navigate('/')
  }, [todos, user])

  const handleSubmit = async (event) => {
      event.preventDefault()
      let newTodo = {
        name: event.target.name.value,
        description: event.target.description.value,
        completed: false,
      }
      // Pass an object as a 2nd param in POST requests
      let response = await axios.post(`${API_URL}/create`, newTodo, {withCredentials: true})
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
      let response = await axios.patch(`${API_URL}/todos/${id}`, editedTodo, {withCredentials: true})
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
    await axios.delete(`${API_URL}/todos/${id}`)

    // Update your state 'todos' and remove the todo that was deleted
    let filteredTodos = todos.filter((elem) => {
      return elem._id !== id
    })

    setTodos(filteredTodos)
  }

  const handleSignIn = async (event) => {
    event.preventDefault()
    try {
      let newUser = {
        email: event.target.email.value,
        password: event.target.password.value
      }
  
      let response = await axios.post(`${API_URL}/signin`, newUser, {withCredentials: true})
      setUser(response.data)
    }
    catch(err){
      //console.log(err.response)
      setError(err.response.data)
    }
  }

  const handleLogout = async () => {
      await axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      setUser(null)
  }

  // Wait for the '/api/user' request to finish so that we know if the user is loggedin or not
  if (fetchingUser) {
    return <p>Loading user info. . . </p>
  }

	return (
		<div>
      <MyNav onLogout={handleLogout} user={user} />
			<h1>Shopping List</h1>
      <Routes>
          <Route path="/" element={<TodoList todos={todos} /> } />
          <Route path="/add-form" element={<AddForm btnSubmit={handleSubmit}/> } />
          <Route path="/todo/:todoId" element={<TodoDetail user={user} btnDelete={handleDelete} />} />
          <Route path="/todo/:todoId/edit" element={<EditForm btnEdit={handleEdit}/>} />
          <Route  path="/signin" element={<SignIn myError={myError} onSignIn={handleSignIn} />}/>
          <Route  path="/signup" element={<SignUp />}/>
      </Routes>
		</div>
	);
}

export  default App;