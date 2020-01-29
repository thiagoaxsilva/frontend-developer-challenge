var page = 0;
this.getProducts();

function checkEmail() {
    let emailToCheck = document.getElementById('email');
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    let emailIsValid = emailPattern.test(emailToCheck.value);
    if (!emailIsValid) {
        emailToCheck.className = "input-container-error"
        return false;
    }
    emailToCheck.className = "input-container"
    return true;
}

async function getProducts() {
    page++;
    let requestURL = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=' + page;
    let request = new XMLHttpRequest();

    try {
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = await function () {
            newCarditems(request.response.products);
        }
    } catch (error) {
        alert('Houve um erro, produtos não carregados');
    }
}

function newCarditems(products) {
    let items = document.getElementById('items')
    products.forEach(element => {
        let card = document.createElement('div')
        card.classList.add('card-item')

        let img = document.createElement('img')
        img.classList.add('card-img')
        img.setAttribute('src', "http://" + element.image)

        let title = document.createElement('p')
        title.classList.add('card-title')
        title.innerText = element.name

        let description = document.createElement('p')
        description.classList.add('card-description')
        description.innerText = element.description

        let oldPrice = document.createElement('p')
        oldPrice.classList.add('card-description')
        oldPrice.innerText = 'De: R$ ' + element.oldPrice.toFixed(2)

        let price = document.createElement('p')
        price.classList.add('card-price')
        price.innerText = 'Por: R$ ' + element.price.toFixed(2)

        let installments = document.createElement('p')
        installments.classList.add('card-description')
        installments.innerText = 'ou ' + element.installments.count + 'x de R$ ' + element.installments.value.toFixed(2)

        let btnBuy = document.createElement('button')
        btnBuy.classList.add('card-btn')
        btnBuy.innerText = 'Comprar'

        card.append(img, title, description, oldPrice, price, installments, btnBuy)
        items.append(card)
    })
}