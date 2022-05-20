import React, {useState, useEffect} from 'react';
import {InputGroup,FormControl,Button } from 'react-bootstrap';
import { getJsonNode } from '../api/utils';

import Icon from './icon';

const Header : React.FC<any> = (props) => {

    const [inputValue, setValue] = useState('');
    const [enableSearch, setEnableSearch] = useState(true);

    let inputFile = React.createRef<HTMLInputElement>();

    const SearchBC = async () => {
        if(!enableSearch)
        {
            alert("Wait 10 seconds for the next query.");
            return false;
        }

        if(inputValue.length != 0 && props.data.address != inputValue && enableSearch)
        {
            if(inputValue.length < 23)
            {
                alert("Search Key is invalid");
                return false;
            }
            const data = await getJsonNode(inputValue);
            if(data.txs != null ){
                setValue('');
                props.sBC(data);
            }
            setEnableSearch(false);

            setTimeout(() => {
                setEnableSearch(true);
            }, 10*1000);
        }
    };
    const ImportBC = () => {
        inputFile.current?.click();
        inputFile.current?.addEventListener('change',(e:any) => {

            let url = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function() {
                props.sBC(JSON.parse(''+reader.result));
            }
            reader.readAsText(url);
        });
    }
    const ExportBC = () => {

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(props.sigmaData.export())
          )}`;
          const link = document.createElement("a");
          link.href = jsonString;
          link.download = "data.json";

          link.click();
    };

    const ResetView = () => {
        const sigma = props.sigma;
        const nodeDisplayData = sigma.getNodeDisplayData(props.data.address);

        if (nodeDisplayData)
        sigma.getCamera().animate( { ...nodeDisplayData, ratio: 1 }, { duration: 600 } );
    };

    return <>
        <header style={{zIndex:1,width:'100%', height:'50px', background:'rgba(33 33 33 / 83%)', color:'#fff', padding:'5px', justifyContent:'center',alignItems:'center'}}>
            <div style={{"display":"flex","flexDirection":"row","width":"100%","alignItems":"flex-start","justifyContent":"space-between"}} >
                <div>
                    <InputGroup className="mb-3" style={{width:'300px'}}>
                        <FormControl
                        placeholder="Search BTC Address"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        value={inputValue}
                        onChange={(e) => setValue(e.target.value) }
                        />
                        <Button onClick={() => { SearchBC() }} title="Search"><Icon libraryName="magnifying-glass" /></Button>
                    </InputGroup>
                </div>

                <div className="m-2 hidden_device_small" style={{"display":"flex","flexDirection":"row","justifyContent":"space-between","alignItems":"flex-start"}}>
                    <span style={{ textTransform: 'capitalize', marginRight:'5px' }}><strong>BitTelligence - UMass Boston</strong></span>

                </div>

                <div className="mb-3 hidden_device_small2" style={{"display":"flex","minWidth" : '150px',"flexDirection":"row","justifyContent":"space-between","alignItems":"center"}}>
                    <Button onClick={() => ResetView() } title='Reset View'><Icon libraryName="arrows-to-circle" /></Button>
                    <Button variant="success" onClick={() => ImportBC() } title='Import JSON'><Icon libraryName="upload" /></Button>
                    <Button variant="danger" onClick={() => ExportBC() } title="Export JSON"><Icon libraryName="download" /></Button>
                </div>
            </div>
        </header>
        <input type='file' style={{display:'none'}} ref={inputFile} />
    </>
};

export default Header;
