import { AnyPtrRecord } from "dns";
import { getJSDocOverrideTagNoCache } from "typescript";

export const getRandomPosition = () => ({
    x: (Math.random() - .5) * 100,
    y: (Math.random() - .5) * 100
});
  
export const randomisePosition = (position: { x: number, y: number }) => ({
    x: position.x - (Math.random() - .5) * 10,
    y: position.y - (Math.random() - .5) * 10
});

  
export function formatMoney(number:number, places:number = 0, symbol:string = '', thousand:string = '', decimal:string = ''){
    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 0;
    symbol = symbol !== undefined ? symbol : "$ ";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "";
    var i : string = parseInt(Math.abs(+number || 0).toFixed(places), 10) + "";
    var j : number = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - parseInt(i)).toFixed(places).slice(2) : "");
}



export const getJsonNode = async (node:any)  : Promise<any> => {
    const response = await fetch('https://blockchain.info/rawaddr/'+node+'?limit=10');
    const data = await response.json(); 
    return data;
};