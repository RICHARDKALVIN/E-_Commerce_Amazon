export let cart= JSON.parse( localStorage.getItem('cart'));
if(!cart){
cart =[
    {
        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity :3
    },
    {
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity :2
    },
    {
        productId : "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
        quantity :2
    }
];

}


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,selectedValue){
   let isnotExist =true;
   cart.forEach((item)=>{
            if(productId === item.productId ){
                item.quantity+= (selectedValue >0)? selectedValue : 1;
                isnotExist=false;
                selectedValue =0;

            }

          });
          if(isnotExist ){
              cart.push({
              productId : productId,
              quantity : (selectedValue >0)? selectedValue : 1
          });
          }
          saveToStorage();
}
export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
        if(productId != cartItem.productId){
            newCart.push(cartItem);
        }
    });
    cart=newCart;
     saveToStorage();
}
export function calculateQuantity(){
    let qu=0;
    cart.forEach((cartItem)=>{
        qu+=cartItem.quantity;
    });
    return qu;
}

export function UpadateSpecificItem(productId,newValue){
    if(newValue<0 || 1000<newValue){
        alert('Quantity Invalid 😐');
        return;
    }
    cart.forEach((cartItem)=>{
        if(cartItem.productId == productId){
            cartItem.quantity=newValue;
            console.log(cartItem);
        }
    });
    
    saveToStorage();

}