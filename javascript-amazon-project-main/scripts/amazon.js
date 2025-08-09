import  {cart , addToCart} from '../data/cart.js';
import { products } from '../data/products.js';

let productString='';

products.forEach((product)=>{
    productString +=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ₹${(product.priceCents*3).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}" >
              <option selected value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart  checkId-${product.id}"  >
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`;

});


function updateCartQuantity(){

          let totalQuantity=0;
          cart.forEach((itemm)=>{
              totalQuantity += itemm.quantity;

          });
          document.querySelector(".js-cart-quantity").innerHTML=totalQuantity;

}

document.querySelector(".js-product-grid").innerHTML=productString;
document.querySelectorAll(".js-add-to-cart").forEach((button)=>{

    button.addEventListener('click',()=>{

          const productId = button.dataset.productId;
          document.querySelector(`.checkId-${productId}`).classList.add("addedStyle");
          let quId='.js-quantity-selector-'+productId;
          let selectedValue=Number(document.querySelector(quId).value);
          setTimeout(()=>{
            document.querySelector(`.checkId-${productId}`).classList.remove("addedStyle");
          },3000);


         addToCart(productId,selectedValue);
         updateCartQuantity();

    
});

});


