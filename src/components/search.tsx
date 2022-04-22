import React,{ FC,KeyboardEvent,ChangeEvent,useEffect, useState } from 'react';
import { Modal,Button,Form,Dropdown,DropdownButton}  from 'react-bootstrap';
import { useSigma, useLoadGraph,useRegisterEvents } from 'react-sigma-v2'

import { Attributes } from "graphology-types";
import { FiltersState } from "../api/types";
import { parse } from 'node:path/win32';

const Search: FC<{ filters : FiltersState}> = ( { filters }) => {

    const sigma = useSigma();
  
    const [search, setSearch] = useState<string>("");
    const [values, setValues] = useState<Array<{ id: string; label: string }>>([]);
    const [selected, setSelected] = useState<string | null>(null);

    const refreshValues = () => {
        const newValues: Array<{ id: string; label: string }> = [];
        const lcSearch = search.toLowerCase();
        if (!selected && search.length > 1) {
          sigma.getGraph().forEachNode((key: string, attributes: Attributes): void => {
              if (!attributes.hidden && attributes.label && attributes.label.toLowerCase().indexOf(lcSearch) === 0)
              newValues.push({ id: key, label: attributes.label });
          });
        }
        setValues(newValues);
    };

    // Refresh values when search is updated:
    useEffect(() => refreshValues(), [search]);

    // Refresh values when filters are updated (but wait a frame first):
    useEffect(() => {
        requestAnimationFrame(refreshValues);
    }, [filters]);

    useEffect(() => {
        if (!selected) return;

        sigma.getGraph().setNodeAttribute(selected, "highlighted", true);
        const nodeDisplayData = sigma.getNodeDisplayData(selected);

        if (nodeDisplayData)
        sigma.getCamera().animate(
            { ...nodeDisplayData, ratio: 0.05 },
            {
            duration: 600,
            },
        );

        return () => {
        sigma.getGraph().setNodeAttribute(selected, "highlighted", false);
        };
    }, [selected]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchString = e.target.value;
        const valueItem = values.find((value) => value.label === searchString);
        if (valueItem) {
          setSearch(valueItem.label);
          //setValues([]);
          setSelected(valueItem.id);
        } else {
          setSelected(null);
          setSearch(searchString);
        }
    };

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && values.length) {
          setSearch(values[0].label);
          setSelected(values[0].id);
        }
    };

    return (<div className="search-wrapper" style={{"minWidth":"200px","padding":"10px","borderRadius":"10px","border":"1px solid hsl(0deg 0% 35% / 62%)","boxShadow":"rgb(0 0 0 / 35%) 4px -3px 6px 1px","position":"absolute","bottom":"10px","left":"10px","outline":"none","background":"rgb(255 255 255 / 63%)"}}>
      <input
        type="search"
        placeholder="Search in nodes..."
        list="nodes"
        value={search}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        style={{"background":"transparent","border":"0px","color":"#rgb(51 51 51)","outline":"none"}}
      />
      <datalist id="nodes">
        {values.map((value: { id: string; label: string }) => (
          <option key={value.id} value={value.label}>
            {value.label}
          </option>
        ))}
      </datalist>
    </div>);
}

export default Search;