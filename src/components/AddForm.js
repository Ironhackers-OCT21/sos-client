import {Button} from  'react-bootstrap'
import {useContext} from 'react';
import {UserContext} from '../context/app.context'

function AddForm(props){

	const {name} = useContext(UserContext)

	// Props will look like
	/*
		props = {
			btnSubmit: Function
		}
	*/


	const {btnSubmit} = props
	return (
		<form onSubmit={btnSubmit}>
			<p>Name is {name} </p>
			<input  name="name"  type="text"  placeholder="Enter name"/>
			<input  name="description"  type="text"  placeholder="Enter desc"/>
			<input  type="file"  name="myImage"  accept="image/png, image/jpg"  />

			<Button  type="submit"  >Submit</Button>
		</form>
	)
}

export default AddForm