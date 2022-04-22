import {FC, useEffect} from 'react';

// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';


const Icon: FC<any> = (props) => {
    library.add(fab);
    library.add(far);
    library.add(fas);
    return(<FontAwesomeIcon icon={props.libraryName} />)
    
};

export default Icon;