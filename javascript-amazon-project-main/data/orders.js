export const orders =JSON.parse(localStorage.getItem('orders')) || [];
export function addOrder(order){
    orders.unshift(order);
    
    saveToLocalStorage();
}
console.log(orders);
function saveToLocalStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

export function findOrder(OrderId){
    let order;
    orders.forEach((odr)=>{
        if(odr.id == OrderId){
            order=odr;
        }
    });
    return order;
}

