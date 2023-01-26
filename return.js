const cartBtn = document.querySelector(".cart-btn");
const cartItem = document.querySelector(".cart-items");
const productDom = document.querySelector(".product-dom");
const buyBtn = [...document.querySelectorAll(".buy-btn")];

const cartOverlay = document.querySelector(".cart-overlay");
const cart = document.querySelector(".cart");
const closeCartBtn = document.querySelector('.close-cart');
const cartDom = document.querySelector('.cart-dom');
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clear-cart");
const buyItemzBtn = document.querySelector(".buy-itemz");

const orderSuccess = document.querySelector(".order-success");
const successMsg = document.querySelector(".success-message");
const removeMsg = document.querySelector(".remove-msg");


window.addEventListener("load", () => {
    cartz = JSON.parse(localStorage.getItem("cartz")) || [];
    setCartValues(cartz);
    populate(cartz);
    cartFunctionality1(cartz);
    cartFunctionality2(cartz)
});


cartBtn.addEventListener("click", () => {
    cartOverlay.classList.add("show-overlay");
    cart.classList.add("show-cart")
});

closeCartBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("show-overlay");
    cart.classList.remove("show-cart");
});


let cartz = [];

console.log(cartz.length)

buyBtn.forEach( btn => {
    btn.addEventListener("click", (e) => {
        getDetails(e);
    })
})

function getDetails(e){

    cartz = JSON.parse(localStorage.getItem("cartz")) || [];

    const parentDiv = e.target.parentElement.parentElement.parentElement;

    let img = parentDiv.childNodes[1].childNodes[1].src;
    let priz = parentDiv.childNodes[3].childNodes[1].childNodes[3].innerText.replace("$","");
    let name = parentDiv.children[1].children[0].children[0].innerText;

    let inCart = cartz.find( item => {
        return (item.info == name && item.image == img)
    }) 

    if(inCart){
        return;
    }else{
        let eachItem = {
            image: img,
            price: priz,
            info: name,
            amount: 1
        }
        
        addItemToCart(eachItem);
        cartz = [eachItem, ...cartz];
        setCartValues(cartz);
        cartFunctionality1(cartz);
        cartFunctionality2(cartz)
        localStorage.setItem("cartz", JSON.stringify(cartz));
    }
}

function addItemToCart(data){
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
        <div class="img-cont">
        <img src="${data.image}" alt="">
        </div>

        <div class="item-details">
            <div class="item-name">${data.info}</div>
            <div class="item-price">$${data.price}</div>
            <input type="number" id="item-amount" value="${data.amount}">
        </div>

        <div class="delete-btn">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
    `
    cartDom.appendChild(div);
}

function cartFunctionality1(cartz){

    let inputz = [...cartDom.querySelectorAll("#item-amount")];
    inputz.forEach( (input) => {
        input.addEventListener("change", (e) => {
            if(e.target.value <= 0){
                e.target.value = 1;
            }else{
                let tempItem;
                const price = e.target.previousElementSibling.innerText.replace("$","");
                const name = e.target.parentElement.children[0].innerText;

                tempItem = cartz.find( item => {
                    return (item.price == price && item.info == name);
                } )
                tempItem.amount = e.target.value;
                localStorage.setItem("cartz", JSON.stringify(cartz));
                cartz = JSON.parse(localStorage.getItem("cartz")) || [];
                setCartValues(cartz)
            }
        })
    });
}

function cartFunctionality2(cartz){
    let removeBtn = [...cartDom.querySelectorAll(".delete-btn")];
    removeBtn.forEach( btn => {

        btn.addEventListener("click", (e) => {
            let tempItemz;
            let cartItem = e.target.parentElement.parentElement;
            const name = e.target.parentElement.previousElementSibling.children[0].innerText;
            const price = e.target.parentElement.previousElementSibling.children[1].innerText.replace("$", "");

            tempItemz = cartz.find( item => {
                return (item.price == price && item.info == name);
            })

            cartz = cartz.filter( item => {
                return item != tempItemz;
            });

            localStorage.setItem("cartz", JSON.stringify(cartz));
            cartz = JSON.parse(localStorage.getItem("cartz")) || [];
            setCartValues(cartz);
            cartDom.removeChild(cartItem);
        })
    })
}

function setCartValues(cartz){
    let tempTotal = 0;
    let itemzNum = 0;

    cartz.map( cart => {
        tempTotal += cart.price * cart.amount;
        itemzNum += 1;
    })
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItem.innerText = itemzNum;
}

function populate(cartz){
    cartz.forEach( data => {
        addItemToCart(data);
    })
}

clearCartBtn.addEventListener( "click", () => {
    cartz = cartz.filter( item => {
        item;
    });
    setCartValues(cartz);
    localStorage.setItem("cartz", JSON.stringify(cartz));
    cartz = JSON.parse(localStorage.getItem("cartz")) || [];

    while(cartDom.children.length > 0){
        cartDom.removeChild(cartDom.children[0]);
    }
});

buyItemzBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("show-overlay");
    cart.classList.remove("show-cart");

    if(cartDom.children.length > 0){
        cartz = cartz.filter( item => {
            item;
        });
        setCartValues(cartz);
        localStorage.setItem("cartz", JSON.stringify(cartz));
        cartz = JSON.parse(localStorage.getItem("cartz")) || [];
    
        while(cartDom.children.length > 0){
            cartDom.removeChild(cartDom.children[0]);
        }
        
        orderSuccess.style.visibility = `visible`;
        successMsg.classList.add("show-msg");

    }else{
        return
    }

    setTimeout( () => {
        orderSuccess.style.visibility = `hidden`;
        successMsg.classList.remove("show-msg");
    }, 10000)
})

removeMsg.addEventListener("click", () => {
    orderSuccess.style.visibility = `hidden`;
    successMsg.classList.remove("show-msg");
})