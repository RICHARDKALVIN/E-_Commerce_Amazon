import {cart,removeFromCart,calculateQuantity,UpadateSpecificItem} from '../data/cart.js';
import { products} from '../data/products.js';
import {moneyFormat}from './utils/money.js';
let TotalItemCout=document.querySelector('.js-item-count');
let currentItemCount=calculateQuantity();
TotalItemCout.innerHTML=(currentItemCount == 0)? '' : `${currentItemCount} items`;
let cartStr='';
cart.forEach((cartItem)=>{
    const productId =cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>{
        if(product.id == productId){
            matchingProduct=product;

        }
    });
    cartStr+=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    
     
});
document.querySelector('.js-order-summary').innerHTML=cartStr;
document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removeFromCart(productId);
    let removeProduct=`.js-cart-item-container-${productId}`;
    document.querySelector(removeProduct).remove();
    let AfterDeleteCartCount=calculateQuantity();
    TotalItemCout.innerHTML=(AfterDeleteCartCount == 0)? '' : `${AfterDeleteCartCount} items`;
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
        console.log(AfterUpadateCartCount);
        TotalItemCout.innerHTML=(AfterUpadateCartCount == 0)? '' : `${AfterUpadateCartCount} items`;
        document.querySelector(`.js-check-quantity-hider-${upButton.dataset.productId}`).innerHTML=document.querySelector(`.js-up-input-${upButton.dataset.productId}`).value;
        document.querySelector(`.js-up-input-${upButton.dataset.productId}`).classList.add("is-editing-quantity");
        document.querySelector(`.js-save-${upButton.dataset.productId}`).classList.add("is-editing-quantity");
        document.querySelector(`.js-check-quantity-hider-${upButton.dataset.productId}`).classList.remove("is-editing-quantity");
        upButton.classList.remove("is-editing-quantity");
        
      });
    });
  });
});

