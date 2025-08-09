export const cart=[];

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
}