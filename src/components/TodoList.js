import React from 'react'
import {Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function TodoList(props) {

    const {todos} = props

    if(!todos.length) {
        return <Spinner animation="grow" variant="dark" />
    }

    return (
        <div>
            <p>TodoList Component</p>
            {
                todos.map((elem) => {
                    return (
                        <div>
                            <Link to={`/todo/${elem._id}`}>{elem.name}</Link>
                        </div>    
                    )
                })
            }
        </div>
    )
}

export default TodoList
