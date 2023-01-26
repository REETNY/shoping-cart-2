const cartBtn = document.querySelector(".cart-btn");
const cartItemz = document.querySelector(".cart-items");
const productDom = document.querySelector(".product-dom");
const buyBtn = [...document.querySelectorAll(".buy-btn")];

const cartOverlay = document.querySelector(".cart-overlay");
const cart = document.querySelector(".cart");
const closeCartBtn = document.querySelector(".close-cart");
const cartDom = document.querySelector(".cart-dom");
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clear-cart");
const buyItemzBtn = document.querySelector(".buy-itemz");

const orderSuccess = document.querySelector(".order-success");
const removeMsg = document.querySelector(".remove-msg");
const successMsg = document.querySelector(".success-message");

const footerYear = document.querySelector(".year");



buyBtn.forEach( (btn) => {
    btn.addEventListener("click", (e) => {
        getProductDetails(e);
    })
})


let cartz = [];


function getProductDetails(e) {

    cartz = JSON.parse(localStorage.getItem("cartz")) || [];

    let target = e.target;
    let parentDiv = target.parentElement.parentElement.parentElement;
    
    let productImg = parentDiv.childNodes[1].childNodes[1].src;
    let productPrice = parentDiv.childNodes[3].childNodes[1].childNodes[3].innerText.replace("$","");
    let productName = parentDiv.childNodes[3].childNodes[1].childNodes[1].innerText;

    let inCart = cartz.find( item => {
        return (item.price == productPrice && item.name == productName && item.image == productImg);
    })

    if(inCart){
        InCart(e);
        return;
    }

    let cartItem = {
        image: productImg,
        name: productName,
        price: productPrice,
        amount: 1
    }

    cartz = [cartItem, ...cartz];
    localStorage.setItem("cartz", JSON.stringify(cartz));
    setCartValues(cartz);
    addProductToCart(cartItem);
    cartFunctionality1(cartz);
    cartFunctionality2(cartz);
}


function setCartValues(cartz) {
    let tempTotal = 0;
    let numOfItemInCart = 0;

    cartz.map( (item) => {
        tempTotal += item.price * item.amount;
        numOfItemInCart += 1;
    });

    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItemz.innerText = numOfItemInCart;
}


function addProductToCart(data) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
        <div class="img-cont">
        <img src="${data.image}" alt="">
        </div>

        <div class="item-details">
            <div class="item-name">${data.name}</div>
            <div class="item-price">$${data.price}</div>
            <div class="number">
                <span class="minus"><i class="fa fa-minus" aria-hidden="true"></i></span>
                <span class="value">${data.amount}</span>
                <span class="plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
            </div>
        </div>

        <div class="delete-btn">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
    `
    cartDom.appendChild(div);
}


function populateCart(cartz) {
    cartz.forEach( (data) => {
        addProductToCart(data);
    })
}


function cartFunctionality1(cartz) {
    const removeBtns = [...document.querySelectorAll(".delete-btn")];
    removeBtns.forEach( btn => {
        btn.addEventListener("click", (e) => {
            const parentDiv = e.target.parentElement.parentElement;
            
            let productImg = parentDiv.children[0].children[0].src;
            let productPrice = parentDiv.children[1].children[1].innerText.replace("$", "");
            let productName = parentDiv.children[1].children[0].innerText;
            
            cartz = cartz.filter( item => {
                return (item.price != productPrice && item.image !== productImg && item.name !== productName);
            })

            localStorage.setItem("cartz", JSON.stringify(cartz));
            cartz = JSON.parse(localStorage.getItem("cartz")) || [];
            setCartValues(cartz);

            cartDom.removeChild(parentDiv);
        })
    })
}

function cartFunctionality2(cartz) {

    const inputz1 = [...document.querySelectorAll(".minus")];
    const inputz2 = [...document.querySelectorAll(".plus")];

    inputz1.forEach( input => {
        input.addEventListener("click", (e) => {
            let parent = e.target.parentElement.parentElement.parentElement.parentElement;
            let productPrice = parent.childNodes[3].childNodes[3].innerText.replace("$","");
            let productImg = parent.childNodes[1].childNodes[1].src;
            let productName = parent.childNodes[3].childNodes[1].innerText;
            
            let tempItem = cartz.find(item => {
                return (item.price == productPrice && item.name == productName && item.image == productImg);
            })

            tempItem.amount -= 1;

            if(tempItem.amount <= 0){
                tempItem.amount = 1;
            }

            localStorage.setItem("cartz", JSON.stringify(cartz));
            setCartValues(cartz);
            e.target.parentElement.nextElementSibling.innerText = tempItem.amount;
        })
    });

    inputz2.forEach( input => {
        input.addEventListener("click", (e) => {
            let parent = e.target.parentElement.parentElement.parentElement.parentElement;
            let productPrice = parent.childNodes[3].childNodes[3].innerText.replace("$","");
            let productImg = parent.childNodes[1].childNodes[1].src;
            let productName = parent.childNodes[3].childNodes[1].innerText;
            
            let tempItem = cartz.find(item => {
                return (item.price == productPrice && item.name == productName && item.image == productImg);
            })

            tempItem.amount += 1;
            localStorage.setItem("cartz", JSON.stringify(cartz));
            e.target.parentElement.previousElementSibling.innerText = tempItem.amount;
            setCartValues(cartz);
        })
    })
}

function InCart(e){
    const div = document.createElement("div");
    div.classList.add("inCart");
    div.innerHTML = `
        <span class="incartMsg">Item in cart already</span>
    `
    let parent = (e.target.parentElement.parentElement.parentElement);
    parent.style.position = `relative`;

    div.style.position = `absolute`;
    div.style.top = `25%`
    div.style.left = `-100%`

    div.style.animation = `showMsg 1s ease-in-out`;
    div.style.animationFillMode = "forwards";

    parent.appendChild(div);

    setTimeout( () => {
        div.style.transform = `translateX(-150%)`;
    }, 3500)

    setTimeout( () => {
        parent.removeChild(div);
    }, 5500)
}



window.addEventListener("DOMContentLoaded", () => {
    cartz = JSON.parse(localStorage.getItem("cartz")) || [];
    setCartValues(cartz);
    populateCart(cartz);
    cartFunctionality1(cartz);
    cartFunctionality2(cartz)


    cartBtn.addEventListener("click", () => {
        cartOverlay.classList.add("show-overlay");
        cart.classList.add("show-cart");
    });

    closeCartBtn.addEventListener("click", () => {
        cartOverlay.classList.remove("show-overlay");
        cart.classList.remove("show-cart");
    });

    clearCartBtn.addEventListener("click", () => {
        if(cartDom.children.length > 0){
            cartz = cartz.filter( item => {
                item;
            })
            localStorage.setItem("cartz", JSON.stringify(cartz));
            setCartValues(cartz);

            while(cartDom.children.length > 0){
                cartDom.removeChild(cartDom.children[0]);
            }
        }else{
            console.log("Nothing in here")
        }
    });

    buyItemzBtn.addEventListener("click", () => {
        if(cartDom.children.length > 0){
            cartOverlay.classList.remove("show-overlay");
            cart.classList.remove("show-cart");

            cartz = cartz.filter( item => {
                item;
            })
            localStorage.setItem("cartz", JSON.stringify(cartz));
            setCartValues(cartz);

            while(cartDom.children.length > 0){
                cartDom.removeChild(cartDom.children[0]);
            }

            orderSuccess.style.visibility = `visible`;
            successMsg.classList.add("show-msg");

            setTimeout( () => {
                orderSuccess.style.visibility = `hidden`;
                successMsg.classList.remove("show-msg");
            }, 10000)
        }else{
            return;
        }
    });

    removeMsg.addEventListener("click", () => {
        orderSuccess.style.visibility = `hidden`;
        successMsg.classList.remove("show-msg");
    })

    let currYear = new Date().getFullYear();
    footerYear.innerText = currYear;
})