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
            <div class="selected" data-product-name = "${product.name}">
                <img src="${product.image.desktop}" alt="" class="rounded-[20px] itemcontainer">
            </div>
            <p class="text-rose-900">${product.category}</p>
            <p class="text-rose-950 text-[1.3rem] font-semibold dish">${product.name}</p>
            <p class="text-rose-800 font-medium text-[1.2rem] price">${product.price.toFixed(2)}</p>

            <div class="quantity-container flex justify-center sm:justify-start sm:pt-3">
                <div class="flex gap-7 max-w-max bg-[#b8370d] px-6 py-2 rounded-full number hidden">
                    <img src="./assets/images/icon-decrement-quantity.svg" alt="minus sign" class="border border-white rounded-[50%] py-1 px-[5px] border-2 cursor-pointer decrease" data-product-name = "${product.name}">
                    
                    <p class="text-white itemnumber" data-product-name = "${product.name}"></p>

                    <img src="./assets/images/icon-increment-quantity.svg" alt="plus sign" class="border border-white rounded-[50%] py-1 px-[5px] border-2 cursor-pointer increase atc" data-product-name = "${product.name}" data-price="${product.price}">
                </div>

                <div class="flex justify-center gap-2 max-w-max bg-white border border-rose-900 px-6 py-2 rounded-full cursor-pointer hover:shadow-lg atc original"  data-product-name = "${product.name}" data-price="${product.price}">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart icon">
                    <button">Add to Cart</button>
                </div>
            </div>
        </div>`;
    })
     document.getElementById('display').innerHTML = html;







 //  CART SECTION

 function loadCart() {
    let cartHtml="" ;  //   declared where the items will be stored as it is looped over

    cart.forEach(cartItem =>{ // loop over the cart and add them to the cartHtml 
        cartHtml += `
        <div class="flex items-center justify-between my-5 overall  border-b-[1px] border-[#c83b0e]/20 pb-5">
            <div>
                <p class="font-bold text-[#463f3a] mb-2"> ${cartItem.name}</p>
                <div class="flex gap-3">
                    <p class="text-[#ab584a] font-bold">${Number(cartItem.quantity)}x</p>
                    <p class="text-[#a1918c]">@ ${cartItem.price.toFixed(2)}</p>
                    <p class="text-[#928380] font-bold">${(cartItem.price.toFixed(2) * cartItem.quantity).toFixed(2)}</p>
                </div>
            </div>

            <div class="removeButton cursor-pointer border-2 transition ease border max-w-max max-h-max p-1 rounded-full border-[#9f8b8c] hover:border-[#463f3a] " data-product-name = "${cartItem.name}">
                <img src="./assets/images/icon-remove-item.svg" alt="remove">
            </div>
      </div>
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
        // console.log(typeof cartItem.price)
        cartQuantity += Number(cartItem.quantity)
        cartPrice += cartItem.price.toFixed(2) * cartItem.quantity
    })
    // console.log(typeof cartPrice)
    itemsInCart.innerHTML = cartQuantity;
    totalPrice.innerHTML = cartPrice.toFixed(2);
 }

   

    document.querySelectorAll('.atc').forEach( atc => {
        atc.addEventListener('click', () =>{
            const productName = atc.dataset.productName;
            const cartItemPrice = Number(atc.dataset.price);
            
            // this.classList.add('hidden')
            // console.log()

            addToCart(productName,cartItemPrice);
            loadCart();
            console.log(cart)            
            // 
            // console.log(matchingItem)
            // removeFromCart(productName);
        })
    });

    document.querySelectorAll('.decrease').forEach(decreaseButton => {
        decreaseButton.addEventListener('click' , () => {
            // console.log('clicked')
            const productName = decreaseButton.dataset.productName

            reduceFromCart(productName)
             loadCart();
            console.log(cart)  
        })
    })

    
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
                matchingItem = cartItem;
                // console.log(matchingItem)
                // document.querySelector('.selected').classList.add('border-2' ,'rounded-[20px]','border-red-500')
            }
        })

        if(matchingItem){
            matchingItem.quantity += 1
            document.querySelectorAll('.itemnumber').forEach(span => {
             if (span.dataset.productName === productName) {
                  span.textContent = matchingItem.quantity;
             }
            });
        }else{
            cart.push({
            "name": productName,
            "price": cartItemPrice,
            "quantity": 1
            })
            document.querySelectorAll('.itemnumber').forEach(span => {
             if (span.dataset.productName === productName) {
                  span.textContent = 1;
             }
       });
        }

        document.querySelectorAll('.selected').forEach(select => {
                if(select.dataset.productName === productName) {
                    select.classList.add('border-3' ,'rounded-[20px]','border-[#b8370d]')
                }
            })
    }

    function reduceFromCart(productName) {
        let matchingItem;
        cart.forEach((cartItem) => {
            if(productName === cartItem.name){
                matchingItem = cartItem
            }
        })

        if(matchingItem){
            if(matchingItem.quantity > 1){
                matchingItem.quantity -=1
                document.querySelectorAll('.itemnumber').forEach(span => {
                    if (span.dataset.productName === productName) {
                  span.textContent = matchingItem.quantity;
                }
              });
            }
            
        }
    }

    function removeFromCart(productName) {
        let newCart =[];
        cart.forEach((cartItem) =>{
            if(cartItem.name !== productName){
                // console.log(cartItem.name)
                newCart.push(cartItem)
                
            }

            document.querySelectorAll('.itemnumber').forEach(span => {
                    if (span.dataset.productName === productName) {
                  span.textContent = 1;
                }
              });
            document.querySelectorAll('.selected').forEach(select => {
                if(select.dataset.productName === productName) {
                    select.classList.remove('border-3','rounded-[30px]','border-[#b8370d]')
                }
            })

             const container = document.querySelector(`.quantity-container [data-product-name="${productName}"]`)?.closest(".quantity-container");

            if (container) {
                // Hide quantity block
                container.querySelector(".number").classList.add("hidden");

                // Show "Add to Cart" button
                container.querySelector(".original").classList.remove("hidden");

                // Reset quantity display to 0
                const numberEl = container.querySelector(`.itemnumber[data-product-name="${productName}"]`);
                if (numberEl) numberEl.textContent = 0;

            
        }
    })

        // console.log(newCart)
        cart = newCart;
        // console.log(cart)
    }


    document.querySelectorAll(".atc.original").forEach(addBtn => {
  addBtn.addEventListener("click", () => {
    const productName = addBtn.dataset.productName;

    // Find the parent container
    const container = addBtn.closest(".quantity-container");

    // Show the quantity block
    const quantityBlock = container.querySelector(".number");
    quantityBlock.classList.remove("hidden");

    // Hide the "Add to Cart" button
    addBtn.classList.add("hidden");

    // Initialize the item number to 1
    const numberEl = container.querySelector(`.itemnumber[data-product-name="${productName}"]`);
    numberEl.textContent = 1;

    // You’d also add the item to your cart array here
  });
});
