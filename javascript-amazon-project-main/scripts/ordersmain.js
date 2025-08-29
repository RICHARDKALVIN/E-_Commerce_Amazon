import {moneyFormat} from './utils/money.js';
import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct } from '../data/products.js';
import { loadProductsFetch } from '../data/products.js';
import { addToCart, resetCart,calculateQuantity } from '../data/cart.js';
function generateOrders(){
    resetCart();
    let cartQuantityInOrders=calculateQuantity();
    document.querySelector(".js-orderspage-cart-quantity").innerHTML=(cartQuantityInOrders == 0)? '' : cartQuantityInOrders;
    let orderString='';
    orders.forEach((odr)=>{
        const inputDate = odr.orderTime;
        const formattedDate = dayjs(inputDate).format('MMMM D');

        orderString+=`
        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>₹${moneyFormat(odr.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${odr.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${generateInnerOrders(odr.products,odr.id)}
          </div>
        </div>
        `;
        
       
    });



    function generateInnerOrders(raw,newPeram){
        let innerOrderString ='';
        
        raw.forEach((item)=>{
            let product=getProduct(item.productId);
            const inputDate = item.estimatedDeliveryTime;
        const formattedDate = dayjs(inputDate).format('MMMM D');
            innerOrderString+=` <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formattedDate}
              </div>
              <div class="product-quantity">
                Quantity: ${item.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button"data-product-id="${item.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message ">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?proId=${item.productId}&oderId=${newPeram}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div> `;

        });
        return innerOrderString;
    }




    document.querySelector('.orders-grid').innerHTML=orderString;
    
    
    document.querySelectorAll(".js-buy-again-button").forEach((product)=>{
      product.addEventListener('click',()=>{
      product.innerHTML= "✓ Added";

      setTimeout(()=>{
        product.innerHTML=`<img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message ">Buy it again</span>`;
      },1800);

      let matchingProduct=getProduct(product.dataset.productId);
      console.log(matchingProduct);
      addToCart(matchingProduct.id,1);
      document.querySelector(".js-orderspage-cart-quantity").innerHTML=calculateQuantity();
      });
      

    });

    document.querySelector('.js-search-button-ord').addEventListener('click',()=>{
      let searchValue = document.querySelector('.js-search-bar-ord').value;
      window.location.href=`amazon.html?search=${searchValue}`;
      

     });
     document.querySelector('.js-search-bar-ord')
      .addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          let searchValue = document.querySelector('.js-search-bar-ord').value;
          window.location.href = `amazon.html?search=${searchValue}`;
          
        }
     });


}

loadProductsFetch().then(()=>{
    generateOrders();
});
