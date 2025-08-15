export function moneyFormat(value){
    value=(Math.round(value)*2).toFixed(2)
    return value;
}
export default moneyFormat;