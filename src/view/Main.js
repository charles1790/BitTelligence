import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";




const Main = () => {

    const [joined, setJoined] = useState("");
    const history = useNavigate();
    const [tname, setTitleName] = useState("");



   /* const levelNode = [
        {name:'Default', color:'#999', size:10},
        {name:'Level 1', color:'#ff0', size:15},
        {name:'Level 2', color:'#ff8805', size:20},
        {name:'Level 3', color:'#ff0000', size:25}
      ];*/

    return (
        
        <div className="container"><br /> <br />
            <header>

                <div>
                    <h1>  BitIntellegence  </h1>
                    <p>  Provide a starting point for analysis and
                        investigation of potentially criminal bitcoin wallets. </p>
                    <Link to="/graph">Get Started</Link>
                </div>

            </header>


            <main>
                <section className="services">
                    <h2>About Bitelligence</h2>

                    <div className="service-container">
                        <div className="services-card service-one"></div>
                        <div className="service-description">

                            <h3>Why Track Wallets?</h3>
                            <div>Suspicious activity has been an issue with cryptocurrency,
                                and its only getting worse. To help find this suspicious activity,
                                we are providing a starting point for analysis and
                                investigation of potentially criminal bitcoin wallets,
                                by automatically collecting and displaying information
                                that may be useful in an investigation</div>

                        </div>
                    </div>



                    <div className="service-container">

                        <div className="services-card service-two"></div>
                        <div className="service-description">
                            <h3>How The Graph Works</h3>
                            <div> The information displayed on the graph will include
                                the balance of the wallet as well as a directed graph
                                of all other wallets which have transacted with the
                                target along with the amount, direction, and time of all transactions.</div>
                        </div>
                    </div>



                    <div className="service-container">
                        <div className="services-card service-three"></div>
                        <div className="service-description">
                            <h3>Marking Suspicious Activity</h3>
                            <div>In the graph, you can flag the suspicious wallets
                                that the user wants to keep and eye on. You can flag
                                wallet with three different sevarity levels, green,
                                yellow and red. </div>
                        </div>

                    </div>
                </section>


        </main>


        </div >
    )
}


export default Main;