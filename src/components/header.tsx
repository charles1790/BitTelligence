import React, {useState, useEffect} from 'react';
import {InputGroup,FormControl,Button } from 'react-bootstrap';

import { getJsonNode } from '../utils';


const Header : React.FC<any> = (props) => { 

    const [inputValue, setValue] = useState('');

    let inputFile = React.createRef<HTMLInputElement>();
    
    const SearchBC = async () => {
        if(inputValue.length != 0)
        {
            const data = await getJsonNode(inputValue);
            if(data.txs != null ){
                setValue('');
                props.sBC(data);
            }
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

    return <>
        <header style={{position:'relative',width:'100%', height:'50px', background:'#333', color:'#fff', padding:'5px', justifyContent:'center',alignItems:'center'}}>
            <div style={{"display":"flex","flexDirection":"row","width":"100%","alignItems":"flex-start"}} >

                <div style={{width:'100%'}}>
                    <InputGroup className="mb-3" style={{width:'300px'}}>
                        <FormControl
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        value={inputValue}
                        onChange={(e) => setValue(e.target.value) }
                        />
                        <Button onClick={() => { SearchBC() }}>Search</Button>
                    </InputGroup>
                </div>

                <div className="mb-3" style={{"display":"flex","flexDirection":"row","width":"209px","justifyContent":"space-evenly","alignItems":"center"}}>
                    <Button onClick={() => ImportBC() }>Import</Button>
                    <Button onClick={() => ExportBC() }>Export</Button>
                </div>

            </div>
        </header>
        <input type='file' style={{display:'none'}} ref={inputFile} />
    </>
};

export default Header;