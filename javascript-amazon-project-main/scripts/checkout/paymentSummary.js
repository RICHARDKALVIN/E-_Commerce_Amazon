import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import {moneyFormat} from '../utils/money.js'
import {getDeliveryOption} from '../../data/deliveryOption.js';
export function renderPaymentSummary (){
  let productPriceCents = 0;
  let ShippingPriceCents=0;
  cart.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);
    productPriceCents+= Number(moneyFormat(product.priceCents) * cartItem.quantity);
    const deliveryOption =getDeliveryOption(cartItem.deliveryOptionId);
    ShippingPriceCents +=Number(moneyFormat(deliveryOption.priceCents));
  });
 const totalBeforeTax=productPriceCents+ShippingPriceCents;
 const taxCents =(totalBeforeTax *0.1).toFixed(2);
 const totalCents=(Number(taxCents) +Number(totalBeforeTax)).toFixed(2);
  const paymentSummaryHTML= `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">₹${productPriceCents}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${ShippingPriceCents}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">₹${taxCents}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${totalCents}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

          document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;

}