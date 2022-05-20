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

export function formatMoneyToBTC(number:number){
    return (number/100000000)+"";
}


export const getJsonNode = async (node:any)  : Promise<any> => {
    const response = await fetch('https://blockchain.info/rawaddr/'+node);//+'?limit=10'
    const data = await response.json(); 
    return data;
};

export const getBTC = async ()  : Promise<any> => {
    const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD');
    const data = await response.json(); 
    return data;
};