import { products } from "./product.js";

let cartContainer = document.getElementById("cart-display");
let itemsInCart = document.getElementById("cartquantity");
let totalPrice = document.getElementById("total")

let cart = [
    ]


// PRODUCT SECTION 

let html = "";   //   declared where the products will be stored as it is looped over
    products.forEach((product) =>{
        html +=`
        <div>
            <div>
                <img src="${product.image.desktop}" alt="" class="rounded-[20px] itemcontainer">
                </div>
                <p class="text-rose-900">${product.category}</p>
                <p class="text-rose-950 text-[1.3rem] font-semibold dish">${product.name}</p>
                <p class="text-rose-800 font-medium text-[1.2rem] price">${product.price.toFixed(2)}</p>
                <div class="flex justify-center sm:justify-start sm:pt-3">
                <div class="flex gap-7 max-w-max bg-rose-800 px-6 py-2 rounded-full hidden number">
                    <img src="./assets/images/icon-decrement-quantity.svg" alt="minus sign" class="border border-white rounded-[50%] py-1 px-[5px] border-2 cursor-pointer decrease">
                    <p class="text-white itemnumber">1</p>
                    <img src="./assets/images/icon-increment-quantity.svg" alt="plus sign" class="border border-white rounded-[50%] py-1 px-[5px] border-2 cursor-pointer increase">
                </div>
                
                <div class="flex justify-center gap-2 max-w-max bg-white border border-rose-900 px-6 py-2 rounded-full cursor-pointer hover:shadow-lg atc"  data-product-name = "${product.name}" data-price = "${product.price}">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart icon">
                    <button">Add to Cart</button>
                </div>
            </div>
        </div>`;
    })
     document.getElementById('display').innerHTML = html;







 //  CART SECTION

 function loadCart() {
    // let cartPrice = 0;
    // let cartQuantity = 0;
    let cartHtml="" ;  //   declared where the items will be stored as it is looped over

    cart.forEach(cartItem =>{ // loop over the cart and add them to the cartHtml 
        cartHtml += `
        <div class="overall">
        <div class="flex items-center justify-between my-5">
            <div>
                <p class="font-bold text-[#463f3a] mb-2"> ${cartItem.name}</p>
                <div class="flex gap-3">
                    <p class="text-[#ab584a] font-bold">${Number(cartItem.quantity)}x</p>
                    <p class="text-[#a1918c]">@ ${cartItem.price.toFixed(2)}</p>
                    <p class="text-[#928380] font-bold">${(cartItem.price.toFixed(2) * cartItem.quantity).toFixed(2)}</p>
                </div>
            </div>

            <div class="removeButton cursor-pointer border-1 border max-w-max max-h-max p-1 rounded-full border-[#9f8b8c]" data-product-name = "${cartItem.name}">
                 <img src="./assets/images/icon-remove-item.svg" alt="remove">
            </div>
      </div>
      <div class="bg-[#c83b0e]/20  h-[1px] m-0"></div>
      <div>
        `
        // console.log(cartItem.price);
        // cartQuantity += cartItem.quantity;
        // cartPrice += cartItem.price * cartItem.quantity
        // console.log(cartPrice)
    })
    // itemsInCart.innerHTML = cartQuantity;
    // totalPrice.innerHTML = cartPrice.toFixed(2);
    updateCart()
    cartContainer.innerHTML = cartHtml;  // displayed the html in the cart
 }

 function updateCart() {
    let cartPrice = 0;
    let cartQuantity = 0;
    cart.forEach(cartItem =>{
        console.log(typeof cartItem.price)
        cartQuantity += Number(cartItem.quantity)
        cartPrice += cartItem.price.toFixed(2) * cartItem.quantity
    })
    console.log(typeof cartPrice)
    itemsInCart.innerHTML = cartQuantity;
    totalPrice.innerHTML = cartPrice.toFixed(2);
 }

   

    document.querySelectorAll('.atc').forEach( atc => {
        atc.addEventListener('click', () =>{
            const productName = atc.dataset.productName;
            const cartItemPrice = Number(atc.dataset.price)

            // console.log()

            addToCart(productName,cartItemPrice);
            loadCart();
            console.log(cart)
            // removeFromCart(productName);
        })
    });

    
    cartContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.removeButton')
        const productName = btn.dataset.productName
        console.log(btn);
        console.log(productName);
        if (btn){
            removeFromCart(productName);
            const cartItemRemoved = btn.closest('.overall');
        if(cartItemRemoved){
            cartItemRemoved.remove()
            updateCart()
             }
        }
        }
    );

    function addToCart(productName,cartItemPrice) {
        let matchingItem;
        cart.forEach((cartItem) => {
            if(productName === cartItem.name){
                matchingItem = cartItem
            }
        })

        if(matchingItem){
            matchingItem.quantity += 1
        }else{
            cart.push({
            "name": productName,
            "price": cartItemPrice,
            "quantity": 1
            })
        }
        // console.log(cart)
        // console.log(typeof cartItemPrice)

    }

    function removeFromCart(productName) {
        let newCart =[];
        cart.forEach((cartItem) =>{
            if(cartItem.name !== productName){
                // console.log(cartItem.name)
                newCart.push(cartItem)
            }
            // cartItem.name;
        })

        // console.log(newCart)
        cart = newCart;
        console.log(cart)
    }

    console.log(cart)
