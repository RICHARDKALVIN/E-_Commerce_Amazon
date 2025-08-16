export function moneyFormat(value){
    value=(Math.round(value/8)).toFixed(2)
    return value;
}
export default moneyFormat;