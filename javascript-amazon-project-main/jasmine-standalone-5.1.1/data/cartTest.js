import {cart,addToCart} from '../../data/cart.js';

// describe('Test Suit : add to cart',()=>{

//   it('adds a new product to the cart ',()=>{

//     spyOn(localStorage,'getItem').and.callFake(()=>{
//         return JSON.stringify([]);
//     });
//     console.log(localStorage.getItem('cart'));
//     addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart.length).toEqual(1);
//   });


//     it('adds the same product',()=>{
//         addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//         expect(cart.length).toEqual(1);
//   });



//   it('adding another product from cart',()=>{
//     addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
//     expext(cart.length).toEqual(2);
//   });
//   it('checking quqntity',()=>{
//     expect(cart[0].quantity).toEqual(1);
//   });
// });