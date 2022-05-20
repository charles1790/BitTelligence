import {useState} from "react";

const Comments = () => {

    const [value, setValue] = useState('Comments:');

    return (<textarea value={value} onChange={(e:any) => setValue(e.target.value) } />)
}
export default Comments
