import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Button,Form,Dropdown,DropdownButton}  from 'react-bootstrap';
function Search() {
    return (
       
        <div>
            <input type="search" placeholder="Address"></input>
            <Button variant="outline-secondary" size='sm'>Set Node</Button>
         </div>
    );
}

export default Search;