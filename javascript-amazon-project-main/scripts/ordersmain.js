import {moneyFormat} from './utils/money.js';
import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct } from '../data/products.js';
import { loadProductsFetch } from '../data/products.js';
function generateOrders(){
    
    
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
            ${generateInnerOrders(odr.products,formattedDate)}
          </div>
        </div>
        `;
        
       
    });



    function generateInnerOrders(raw,date){
        let innerOrderString ='';
        
        raw.forEach((item)=>{
            let product=getProduct(item.productId);
            innerOrderString+=` <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${date}
              </div>
              <div class="product-quantity">
                Quantity: ${item.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div> `;

        });
        return innerOrderString;
    }







    document.querySelector('.orders-grid').innerHTML=orderString;
}

loadProductsFetch().then(()=>{
    generateOrders();
});
