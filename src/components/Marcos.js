import {useState, useEffect} from 'react'

function Marcos(props) {

    const {start} = props // read only 
    let manish = 1
    let [age, setAge] = useState( start)

    useEffect(() => {
        console.log('Marcos Mounted')
    }, [])

    // useEffect(() => {
    //     console.log('Marcos Rendering')
    // })

    useEffect(() => {
        console.log('Marcos conditional update')
    }, [age])

    // let age = 21;

    function add(){
        console.log('add gets called')
        setAge(age + 1)
    }

    function startUpdate(){
        manish = manish + 1
    }

    return (
        <div>
            Hey, don't worry Marcos!
            <p>He is: {age} </p>
            <button onClick={add}>Add age</button>
            <button onClick={startUpdate}>Update start</button>
        </div>
    )
}



export default Marcos
