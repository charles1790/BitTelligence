import {FC} from 'react';

const Info: FC<any> = (props) => {
  return (<div style={{"minWidth":"200px","padding":"10px","borderRadius":"10px","border":"1px solid hsl(0deg 0% 35% / 62%)","boxShadow":"rgb(0 0 0 / 35%) 4px -3px 6px 1px","color":"rgb(204, 204, 204)","display":"flex","flexDirection":"column","position":"absolute","top":"67px","left":"10px","background":"rgb(255 255 255 / 63%)"}}>
    {props.content && props.content.map( (item:any, index:any) => {
        return (<div key={index} style={item.style}>{item.title} {item.value}</div>)
    } )}
  </div>);
}

export default Info;