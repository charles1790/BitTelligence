import React, {useState} from "react";
import Icon from '../components/icon';
import { useNavigate } from "react-router-dom";
import '../static/css/index.css';

//import Icon from '../components/icon';

const Contact = () => {

    const history = useNavigate();
    const goBack = () => {
        history('/');
    }

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    const sendEmail = async(e) =>{
        e.preventDefault();

        let email = {
            title,
            content,
            contactEmail
        }

        console.log("sending email", email);
    }

//<Icon libraryName="upload" />
    return(
        <React.Fragment>
           <button className="back" onClick={(e) => goBack()}> &larr; Go Back</button>
           <br></br>
           <br></br>
            <hr></hr>
            <div className="container">
                     <h2 className="desc">Staff Members</h2>
                     <hr/>

                     <div className="desc-container">
                         <div className="desc-card desc-one"></div>
                         <div className="desc-description">

                            <h3>Harvey M. Paniagua <Icon libraryName='crown' />  </h3>
                            <div><b>Roles. Adm</b><br/><hr/>
                            <b>Work</b><br/>
                                -. Problem solver<br/>
                                -. Back-end<br/>
                                -. Front-end<br/>

                                <b>Contact information</b><br/>
                                      Email: harveympv16@gmail.com<br/>
                                      </div>

                         </div>
                    </div>



                    <div className="desc-container">

                      <div className="desc-card desc-two"></div>
                      <div className="desc-description">
                          <h3>Muhaned Ghabour <Icon libraryName='computer' /></h3>
                          <div><b>Roles. Coordinator</b><br/><hr/>
                          <b>Work</b><br/>
                                -. User Interface<br/>
                                -. Research<br/>
                                -. Back-end Developer<br/>

                                <b>Contact information</b><br/>
                                      Email: muhaned@ghabour.net<br/>
                                      </div>
                      </div>
                    </div>



                    <div className="desc-container">
                        <div className="desc-card desc-three"></div>
                        <div className="desc-description">
                            <h3>Charles Whittlesey <Icon libraryName='bullhorn' /></h3>
                            <div><b>Roles. Representative</b><br/><hr/>
                            <b>Work</b><br/>
                                -. Front-end<br/>
                                -. User Interface<br/>
                                -. Research<br/>

                                <b>Contact information</b><br/>
                                      Email: c.whittlesey001@umb.edu<br/>
                                      </div>
                        </div>

                    </div>

                    <div className="desc-container">
                        <div className="desc-card desc-fourth"></div>
                        <div className="desc-description">
                            <h3>Drew Jackson <Icon libraryName='keyboard' /></h3>
                            <div><b>Roles. Management </b><br/><hr/>
                                <b>Work</b><br/>
                                -. Front-end<br/>
                                -. Research<br/>
                                -. Writer<br/>

                                <b>Contact information</b><br/>
                                      Email: drew.jackson@umb.edu<br/>
                                      </div>
                        </div>

                    </div>
                    </div>





        </React.Fragment>
    )

}


export default Contact;
