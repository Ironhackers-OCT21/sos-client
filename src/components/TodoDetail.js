import {useState, useEffect} from 'react'
import {useParams, Link, Navigate} from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
import axios from 'axios'
import {API_URL} from '../config'

function TodoDetail(props) {
    // We get this 'todoId' from the <Route path="/todo/:todoId "> we defined in App.js
    const {todoId} = useParams()

    const [todoDetail, setTodoDetail] = useState(null)

    // This will run just ONCE after the component has mounted
    useEffect(() => {
        const getData = async () => {
           // Fetching info for a single todo  
           let response = await axios.get(`${API_URL}/todos/${todoId}`,{withCredentials: true})
           setTodoDetail(response.data)
        }
        getData()
    }, [])

    // Ensuring only logged in users see the page
    if (!props.user) {
        return <Navigate to="/signin" />
    }

    if(!todoDetail) {
        return <Spinner animation="grow" variant="dark" />
    }

    const {btnDelete} = props

    return (
        <div>
            <h2>Todo Detail Component</h2>
            <h4>Name: {todoDetail.name}</h4>
            <h4>Desc: {todoDetail.description}</h4>
            <button>
                <Link to={`/todo/${todoDetail._id}/edit`} >Edit</Link>
            </button>
            <button onClick={() => { btnDelete(todoDetail._id)  }  } >Delete</button>
        </div>
    )
}

export default TodoDetail
