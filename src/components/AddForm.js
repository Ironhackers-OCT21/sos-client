import {Button} from  'react-bootstrap'

function AddForm(props){
	// Props will look like
	/*
		props = {
			btnSubmit: Function
		}
	*/

	const {btnSubmit} = props
	return (
		<form onSubmit={btnSubmit}>
			<input  name="name"  type="text"  placeholder="Enter name"/>
			<input  name="description"  type="text"  placeholder="Enter desc"/>
			<Button  type="submit"  >Submit</Button>
		</form>
	)
}

export default AddForm