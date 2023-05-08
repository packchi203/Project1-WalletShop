

let loader = document.querySelector('.loader');
let user = JSON.parse(sessionStorage.user || null);
const becomeSeller = document.querySelector('.become-seller');
const applyFrom = document.querySelector('.apply-form');
const showApplyFromBtn = document.querySelector('#apply-btn');
const productListElement = document.querySelector('.product-listing');

 window.onload = () => {
    /*if (sessionStorage.user) {


        if (compareToken(user.authToken, user.email)) {
            if (!user.seller) {
                becomeSellerElement.classList.remove('hide');
            } else {
                loader.style.display = 'block';
                setupProducts();
            }

        }

        location.replace('/login')
    } else {
        location.replace('/login')
    }*/

    showApplyFromBtn.addEventListener('click', () => {
        becomeSellerElement.classList.remove('hide');
    })
    const applyFromButton = document.querySelector('#apply-form-btn');
    const businessName = document.querySelector('#business-name');
    const address = document.querySelector('#business-add');
    const about = document.querySelector('#about');
    const number = document.querySelector('#number');
    const tac = document.querySelector('#terms-and-cond');
    const legitInfo = document.querySelector('#legitInfo');


    applyFromButton.addEventListener('click', () => {
        if (!businessName.value.length || !address.value.length || !about.value.length || !number.value.length) {
            showAlert('Fill all the inputs');
        } else if (!tac.checked || !legitInfo.checked) {
            showAlert('You must agree to out terms and cond');
        } else {
            loader.style.display = 'block';
            sendData('/seller', {
                name: businessName.value,
                address: address.value,
                about: about.value,
                number: number.value,
                tac: tac.checked,
                legit: legitInfo.checked,
                email: JSON.parse(sessionStorage.user).email

            })
        }

    })
}


const setupProducts = () => {
    fetch('/ger-product', {
        method: 'post',
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email: user.email})

    })
        .then(res => res.json())
        .then(data => {
            loader.style.display = null;
            productListElement.classList.remove('hide');
            if(data == 'no products'){
                let emptySvg= document.querySelector('.no-product-image');
                emptySvg.classList.remove('hide');

            } else {
                data.forEach(product => createProduct(product));

            }
        });
}