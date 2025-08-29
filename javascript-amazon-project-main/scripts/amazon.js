import  {cart , addToCart} from '../data/cart.js';
import { products,loadProductsFetch } from '../data/products.js';
import {moneyFormat}from './utils/money.js'
// loadProducts(renderProductsGrid);

// new Promise((resolve)=>{
//   loadProducts(()=>{
//     resolve();
//   });
// }).then(()=>{
//   renderProductsGrid();
// });
loadProductsFetch ().then(()=>{
  renderAmazonPage();
  
});
function renderAmazonPage(){

  const url = new URL(window.location.href);
  let searchString=url.searchParams.get('search');
  if(searchString){
    RenderSearchPage(searchString);
  }else{
     renderProductsGrid();
  }

}


function renderProductsGrid(){
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
                ₹${moneyFormat(product.priceCents)}
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

     
     document.querySelector('.js-search-button-amz').addEventListener('click',()=>{
      let searchValue = document.querySelector('.js-search-bar-amz').value;
      window.location.href=`amazon.html?search=${searchValue}`;
      renderAmazonPage();

     });
     document.querySelector('.js-search-bar-amz')
      .addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          let searchValue = document.querySelector('.js-search-bar-amz').value;
          window.location.href = `amazon.html?search=${searchValue}`;
          renderAmazonPage();
        }
     });




    function updateCartQuantity(){

              let totalQuantity=0;
              cart.forEach((itemm)=>{
                  totalQuantity += itemm.quantity;

              });
              return totalQuantity;
              
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
            document.querySelector(".js-cart-quantity").innerHTML=updateCartQuantity();
        
    });

    });

}

function RenderSearchPage(searchString){

  let productString='';

    products.forEach((product)=>{


      if(product.name.toLowerCase().includes(searchString.toLowerCase())){
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
                          ₹${moneyFormat(product.priceCents)}
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


      }else{
                product.keywords.forEach((keyword)=>{
                    if(keyword.toLowerCase().includes(searchString.toLowerCase())){
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
                          ₹${moneyFormat(product.priceCents)}
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


        }
      });
    }




        
    });
    
    document.querySelector('.js-search-button-amz').addEventListener('click',()=>{
      let searchValue = document.querySelector('.js-search-bar-amz').value;
      window.location.href=`amazon.html?search=${searchValue}`;
      renderAmazonPage();

     });

     document.querySelector('.js-search-bar-amz')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        let searchValue = document.querySelector('.js-search-bar-amz').value;
        window.location.href = `amazon.html?search=${searchValue}`;
        renderAmazonPage();
      }
  });


    function updateCartQuantity(){

              let totalQuantity=0;
              cart.forEach((itemm)=>{
                  totalQuantity += itemm.quantity;

              });
              return totalQuantity;
              
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
            document.querySelector(".js-cart-quantity").innerHTML=updateCartQuantity();
        
    });

    });

  
}
