

// const cartBtn = document.querySelectorAll(".atc");
// const increaseBtn = document.querySelectorAll(".increase");
// const decreaseBtn = document.querySelectorAll(".decrease");
// const numOfItems = document.querySelectorAll(".number")
// const containers = document.querySelectorAll(".itemcontainer")
// const dishes = document.querySelectorAll(".dish")
// const price = document.querySelectorAll(".price")
// let itemNumber = document.querySelectorAll(".itemnumber")
// let cartContainer = document.getElementById("cart");
// let itemsInCart = document.getElementById("cartquantity");
// let cart = [];

// for(let i = 0 ; i < cartBtn.length ; i++){
// //    blocks[i]{
//         let times = 0;
//      cartBtn[i].addEventListener("click",function (){
//         numOfItems[i].classList.remove("hidden");
//         this.classList.add("hidden");
//         containers[i].classList.add("border","border-rose-900","border-3");

//         // creating container for the item
//         const itemContainer = document.createElement("div");

//         const item = document.createElement("p")
//         item.textContent = dishes[i].textContent;
        
//         const itemPrice = document.createElement("p")
//         itemPrice.textContent += price[i].textContent;
       
//        times = document.createElement("p");
//        times.classList.add("qty");
//        times.classList.add(".qt")
//         times.innerHTML = 1;

//         itemContainer.appendChild(item);
//         itemContainer.appendChild(itemPrice)
//         itemContainer.appendChild(times)
//         cartContainer.appendChild(itemContainer);
//     });


//     increaseBtn[i].addEventListener("click", function(){
//       let quantity = Number(itemNumber[i].innerHTML) ;
//         // console.log( quantity);
//         // console.log(typeof quantity)
//         quantity++
//         itemNumber[i].innerHTML = quantity;
//         // times[i].innerText = itemNumber[i].innerHTML
//         // times = document.createElement("p")
//         // console.log(quantity);
        
//         let itemNumberInCart = document.querySelectorAll(".qty");
//         let each = Number(itemNumberInCart[i].innerText);
//         // let each = Number(itemNumberInCart[i].textContent);
//         console.log(each)
//         each++;
//         times.innerText= each;
//     })

//     decreaseBtn[i].addEventListener("click", function(){
//        let quantity = Number(itemNumber[i].innerHTML) ;
//         if(quantity > 1){
//             quantity--
//         }else{
//             quantity = 1
//         }
        
//         itemNumber[i].innerHTML = quantity;
//         let itemNumberInCart = document.querySelectorAll(".qty");
//         let each = Number(itemNumberInCart[i].innerText);
//         each--;
//         times.innerText = each;
//         // console.log(quantity);
//     })

   
//      itemsInCart.innerHTML = `Your cart(${cart.length})`
//     // };

// }


let html = "";
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(food => {
            // console.log(food.name) 
             html +=`
            <div>
                <div>
                <img src="${food.image.desktop}" alt="" class="rounded-[20px] itemcontainer">
                </div>
                <p class="text-rose-900">${food.category}</p>
                <p class="text-rose-950 text-[1.3rem] font-semibold dish">${food.name}</p>
                <p class="text-rose-800 font-medium text-[1.2rem] price">${food.price.toFixed(2)}</p>
                <div class="flex justify-center sm:justify-start sm:pt-3">
                <div class="flex gap-7 max-w-max bg-rose-800 px-6 py-2 rounded-full hidden number">
                    <img src="./assets/images/icon-decrement-quantity.svg" alt="minus sign" class="border border-white rounded-[50%] py-1 px-[5px] border-2 cursor-pointer decrease">
                    <p class="text-white itemnumber">1</p>
                    <img src="./assets/images/icon-increment-quantity.svg" alt="plus sign" class="border border-white rounded-[50%] py-1 px-[5px] border-2 cursor-pointer increase">
                </div>
                <div class="flex justify-center gap-2 max-w-max bg-white border border-rose-900 px-6 py-2 rounded-full cursor-pointer hover:shadow-lg atc">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart icon">
                    <p>Add to Cart</p>
                </div>
                </div>
            </div>`;
         });
         console.log(html)
        document.getElementById('display').innerHTML = html;

    })
    .catch(error => {
        console.error('Error:',error)
    })


