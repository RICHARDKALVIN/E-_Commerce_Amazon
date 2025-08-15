import {cart,removeFromCart,calculateQuantity,UpadateSpecificItem, updateDeliverOptions} from '../../data/cart.js';
import { products,getProduct} from '../../data/products.js';
import {moneyFormat}from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOption} from '../../data/deliveryOption.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function renderOrderSummary(){
let TotalItemCout=document.querySelector('.js-item-count');
let currentItemCount=calculateQuantity();
TotalItemCout.innerHTML=(currentItemCount == 0)? '' : `${currentItemCount} items`;
let cartStr='';
cart.forEach((cartItem)=>{
    const productId =cartItem.productId;
    let matchingProduct =getProduct(productId);
    
    const delOptionId= cartItem.deliveryOptionId;
    let delop;
    deliveryOption.forEach((option)=>{
      if(option.id ==delOptionId)delop=option;
    });
    const today=dayjs();
    const deliveryDate=today.add(delop.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartStr+=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                ₹${moneyFormat(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-check-quantity-hider-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-button-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input type="number" class="quantity-update-input is-editing-quantity js-up-input-${matchingProduct.id}">
                  <span class="link-primary is-editing-quantity js-save-${matchingProduct.id} js-common-save">save</span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${DeliveryOptionHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
    `;
    
     
});

function DeliveryOptionHTML(matchingProduct,cartItem){
  let html='';
  deliveryOption.forEach((deliveryOp)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryOp.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString =(deliveryOp.priceCents == 0)? 'FREE' : `₹${moneyFormat(deliveryOp.priceCents)} -`;
    const isChecked =deliveryOp.id === cartItem.deliveryOptionId;
    html+=`<div class="delivery-option js-delivery-option"
     data-product-id="${matchingProduct.id}" 
     data-delivery-option-id="${deliveryOp.id}">
        <input type="radio"
          ${isChecked ? 'checked':'' }
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `

  });
  return html;
}





document.querySelector('.js-order-summary').innerHTML=cartStr;
document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removeFromCart(productId);
    let removeProduct=`.js-cart-item-container-${productId}`;
    document.querySelector(removeProduct).remove();
    let AfterDeleteCartCount=calculateQuantity();
    TotalItemCout.innerHTML=(AfterDeleteCartCount == 0)? '' : `${AfterDeleteCartCount} items`;
    renderPaymentSummary();
  })
});

document.querySelectorAll(".js-update-button-link").forEach((upButton)=>{
  upButton.addEventListener('click',()=>{
    document.querySelector(`.js-up-input-${upButton.dataset.productId}`).classList.remove("is-editing-quantity");
    document.querySelector(`.js-up-input-${upButton.dataset.productId}`).value=Number(document.querySelector(`.js-check-quantity-hider-${upButton.dataset.productId}`).innerHTML);
    document.querySelector(`.js-save-${upButton.dataset.productId}`).classList.remove("is-editing-quantity");
    document.querySelector(`.js-check-quantity-hider-${upButton.dataset.productId}`).classList.add("is-editing-quantity");
    upButton.classList.add("is-editing-quantity");
    
      document.querySelectorAll(".js-common-save").forEach((savelink)=>{
      savelink.addEventListener('click',()=>{
        UpadateSpecificItem(upButton.dataset.productId, Number(document.querySelector(`.js-up-input-${upButton.dataset.productId}`).value));
        let AfterUpadateCartCount=calculateQuantity();
        
        TotalItemCout.innerHTML=(AfterUpadateCartCount == 0)? '' : `${AfterUpadateCartCount} items`;
        document.querySelector(`.js-check-quantity-hider-${upButton.dataset.productId}`).innerHTML=document.querySelector(`.js-up-input-${upButton.dataset.productId}`).value;
        document.querySelector(`.js-up-input-${upButton.dataset.productId}`).classList.add("is-editing-quantity");
        document.querySelector(`.js-save-${upButton.dataset.productId}`).classList.add("is-editing-quantity");
        document.querySelector(`.js-check-quantity-hider-${upButton.dataset.productId}`).classList.remove("is-editing-quantity");
        upButton.classList.remove("is-editing-quantity");
        renderPaymentSummary();
      });
    });
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=element.dataset;
    updateDeliverOptions(productId,deliveryOptionId);
    console.log(productId,deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
 });

});

}
