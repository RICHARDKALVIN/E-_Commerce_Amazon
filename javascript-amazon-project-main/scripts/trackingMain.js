import {findOrder} from '../data/orders.js';
import { getProduct ,loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { calculateQuantity } from '../data/cart.js';





function renderTrackingPage(){

const url = new URL(window.location.href);
console.log(url.searchParams.get('proId'));
console.log(url.searchParams.get('oderId'));
  
let cartQuantityInOrders=calculateQuantity();
document.querySelector(".js-cart-quantity-track").innerHTML=(cartQuantityInOrders == 0)? '' : cartQuantityInOrders;

let MatchingOrder=findOrder(url.searchParams.get('oderId'));
let MathingPro=getProduct(url.searchParams.get('proId'));
let quantity=1;
let inputDate = MatchingOrder.orderTime;

MatchingOrder.products.forEach((item)=>{
   if( item.productId == url.searchParams.get('proId')){
     quantity=item.quantity;
     inputDate=item.estimatedDeliveryTime;
   }

});
const formattedDate = dayjs(inputDate).format('MMMM D');


const orderTime = MatchingOrder.orderTime;   
const deliveryTime = inputDate; 
const currentTime = dayjs(); 


const start = dayjs(orderTime);
const end = dayjs(deliveryTime);
const now = dayjs(currentTime);


const totalDuration = end.diff(start, "millisecond");


const elapsed = now.diff(start, "millisecond");


let progress = (elapsed / totalDuration) * 100;
progress = Math.min(100, Math.max(0, progress));










console.log('product');
console.log(MathingPro);
console.log('matchingOrder');
console.log(MatchingOrder);



let orderHtml=`<div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formattedDate}
        </div>

        <div class="product-info">
          ${MathingPro.name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${MathingPro.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${Math.round(progress.toFixed(2))+10}%"></div>
        </div>
      </div>`;

      document.querySelector('.js-tracking-main').innerHTML=orderHtml;

        document.querySelector('.js-search-button-track').addEventListener('click',()=>{
          let searchValue = document.querySelector('.js-search-bar-track').value;
          window.location.href=`amazon.html?search=${searchValue}`;
          

        });
        document.querySelector('.js-search-bar-track')
          .addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              let searchValue = document.querySelector('.js-search-bar-track').value;
              window.location.href = `amazon.html?search=${searchValue}`;
              
            }
        });

}

loadProductsFetch().then(()=>{
    renderTrackingPage();
});