/////////////////////////////[ Products ]/////////////////////////////

var products = [];

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(request.readyState == 4) {
        let list;

        list = request.responseText;

        list.split('\n').forEach(function(product) {
            products.push({
                address: product.split(' ')[0],
                imageAmount: product.split(' ')[1],
                stoneType: product.split(' ')[2],
                type: product.split(' ')[3],
                productName: product.split(' ')[4].replace('-', ' '),
                attributes: product.split(' ')[5]
            });

            initiateProducts();
        });
    }
};
request.open('GET', 'assets/all-products.txt');
request.send();

////////////////////////////[ Functions ]/////////////////////////////

function cardize(product) {
    let address = 'assets/products/thumbnails/' + product.address + '.jpg';
    let productName = product.productName;

    return "<div id='P" + product.address + "' class='card'><img src='" + address + "' alt='Product Image'>" + productName +"<br><a class='button' href='#'>View</a></div>";
}

function initiateProducts() {
    productsSection.innerHTML = '';

    for(i = 0; i < products.length; i++) {
        product = cardize(products[i]);

        
        firstCondition = settings.sort == 'all' || products[i].type == settings.sort;
        secondCondition = settings.stoneSort == 'all' || products[i].stoneType == settings.stoneSort;

        if(firstCondition && secondCondition ) {
            productsSection.innerHTML += product;
        }
    }

    const cards = document.querySelectorAll('.card');

    cards.forEach(function(card) {
        card.addEventListener('click', function(event) {
            event.preventDefault();

            if(event.target.nodeName == 'DIV') {
                initiateProduct(event.target.id);
            } else {
                initiateProduct(event.target.parentNode.id);
            }

            triggerPopUp();
        });
    });
}

function listenEvents() {
    sortRings.addEventListener('click', function() {
        settings.sort = 'ring';
        initiateProducts();
    });
    sortEarrings.addEventListener('click', function() {
        settings.sort = 'earring';
        initiateProducts();
    });
    sortPendants.addEventListener('click', function() {
        settings.sort = 'pendant';
        initiateProducts();
    });
    sortBracelets.addEventListener('click', function() {
        settings.sort = 'bracelet';
        initiateProducts();
    });
    sortAll.addEventListener('click', function() {
        settings.sort = 'all';
        initiateProducts();
    });

    sortOpals.addEventListener('click', function(event) {
        event.preventDefault();
        settings.stoneSort = 'opal';
        initiateProducts();
    });
    sortMorganites.addEventListener('click', function(event) {
        event.preventDefault();
        settings.stoneSort = 'morganite';
        initiateProducts();
    });
    sortAllC.addEventListener('click', function(event) {
        event.preventDefault();
        settings.stoneSort = 'all';
        settings.type = 'all'; // For clearing filter!
        initiateProducts();
    });

    back.addEventListener('click', function(event) {
        event.preventDefault();
        closePopUp();
    });

    ourCustomers.addEventListener('click', function(event) {
        event.preventDefault();

        template.innerHTML = '';

        let h3 = document.createElement('h3');
        h3.innerHTML = 'Our Happy Customers';
        let p = document.createElement('p');
        p.innerHTML = "TEXT###";
        let masonry = document.createElement('div');
        masonry.className = 'masonry';

        ['A', 'B', 'C'].forEach(function(type) {
            let div = document.createElement('div');

            for(i = 1; i <= 31; i++) {
                let img = document.createElement('img');
                img.src = 'assets/img/our-clients/' + type + i + '.jpg';
                img.alt = 'Our Client';

                div.appendChild(img);
            }

            masonry.appendChild(div);
        });
        let div = document.createElement('div');
        div.className = 'bottom';
        masonry.appendChild(div);

        template.appendChild(h3);
        template.appendChild(p);
        template.appendChild(masonry);

        triggerPopUp();
    });

    menu.addEventListener('click', function(event) {
        event.preventDefault();

        template.innerHTML = '';

        let h3 = document.createElement('h3');
        h3.innerHTML = 'Menu';

        template.appendChild(h3);

        let categories = document.createElement('div');
        categories.id = 'categories';
        categories.innerHTML = "<a id='sortRingsM' href='#go'>Rings</a><a id='sortEarringsM' href='#go'>Earrings</a><a id='sortPendantsM' href='#go'>Pendants</a><a id='sortBraceletsM' href='#go'>Bracelets</a><a id='sortAllM' href='#go'>All</a>";

        template.appendChild(categories);

        const sortRingsM = document.querySelector('#sortRingsM');
        const sortEarringsM = document.querySelector('#sortEarringsM');
        const sortPendantsM = document.querySelector('#sortPendantsM');
        const sortBraceletsM = document.querySelector('#sortBraceletsM');
        const sortAllM = document.querySelector('#sortAllM');

        sortRingsM.addEventListener('click', function() {
            settings.sort = 'ring';
            initiateProducts();
            closePopUp();
        });
        sortEarringsM.addEventListener('click', function() {
            settings.sort = 'earring';
            initiateProducts();
            closePopUp();
        });
        sortPendantsM.addEventListener('click', function() {
            settings.sort = 'pendant';
            initiateProducts();
            closePopUp();
        });
        sortBraceletsM.addEventListener('click', function() {
            settings.sort = 'bracelet';
            initiateProducts();
            closePopUp();
        });
        sortAllM.addEventListener('click', function() {
            settings.sort = 'all';
            initiateProducts();
            closePopUp();
        });

        triggerPopUp();
    });
}

function triggerPopUp() {
    popUpSection.style.display = 'block';
    window.setTimeout(function() {
        popUp.classList.add('PUTriggered');
        messageBox.classList.add('MBTriggered');
    }, 100);
}

function closePopUp() {
    popUp.classList.remove('PUTriggered');
    messageBox.classList.remove('MBTriggered');

    window.setTimeout(function() {
        popUpSection.style.display = 'none';
    }, 500);
}

function initiateProduct(id) {
    template.innerHTML = '';

    let product = products[parseInt(id.slice(1))];

    let h3 = document.createElement('h3');
    h3.innerHTML = product.productName;

    let viewer = document.createElement('div');
    viewer.id = 'viewer';

    let buttons = "<a id='left' href='#'><i class='fas fa-chevron-circle-left'></i></a><a id='right' href='#'><i class='fas fa-chevron-circle-right'></i></a>";

    var current = 1;

    let image = document.createElement('img');
    image.src = 'assets/products/all/' + product.address + '/' + current + '.jpg';
    image.alt = 'Product Image';
    image.className = 'center';

    viewer.innerHTML = buttons;
    viewer.appendChild(image);

    template.appendChild(h3);
    template.appendChild(viewer);

    let hr = document.createElement('hr');
    hr.className = 'interval';

    let h4 = document.createElement('h4');
    h4.innerHTML = 'Properties';

    let ul = document.createElement('ul');

    product.attributes.split(';').forEach(function (attribute) {
        ul.innerHTML += "<li>" + attribute.replace('-', ' ') + "</li>";
    });

    let p = document.createElement('p');
    p.innerHTML = 'Concact for product:'

    let div = document.createElement('div');
    div.className = 'button-box'

    let whatsapp = document.createElement('a');
    whatsapp.className = 'button whatsapp';
    whatsapp.innerHTML = 'From WhatsApp <i class="fab fa-whatsapp"></i>';
    whatsapp.src = '!'; //////////////////////////////////////////

    let messenger = document.createElement('a');
    messenger.className = 'button messenger';
    messenger.innerHTML = 'From Messenger <i class="fab fa-facebook-messenger"></i>';
    messenger.src = '!'; /////////////////////////////////////////

    div.appendChild(whatsapp);
    div.appendChild(messenger);

    template.appendChild(hr);
    template.appendChild(h4);
    template.appendChild(ul);
    template.appendChild(p);
    template.appendChild(div);

    const left = document.querySelector('#left');
    const right = document.querySelector('#right');

    left.addEventListener('click', function(event) {
        event.preventDefault();

        let nextImage = document.createElement('img');
        nextImage.className = 'left';
        nextImage.alt = 'Product Image';
        let beforeCurrent = assignBefore(current, product.imageAmount);
        nextImage.src = 'assets/products/all/' + product.address + '/' + beforeCurrent + '.jpg';
        viewer.appendChild(nextImage);

        window.setTimeout(function() {
            nextImage.className= 'center';
        }, 50);

        image.className = 'right';

        window.setTimeout(function() {
            image.remove();
            image = nextImage;

            DEBUG.innerHTML = "Current: " + current + " BeforeCurrent: " + beforeCurrent;
            current = beforeCurrent;
        }, 500);
    });

    right.addEventListener('click', function(event) {
        event.preventDefault();

        let nextImage = document.createElement('img');
        nextImage.className = 'right';
        nextImage.alt = 'Product Image';
        let nextCurrent = assignNext(current, product.imageAmount);
        nextImage.src = 'assets/products/all/' + product.address + '/' + nextCurrent + '.jpg';
        viewer.appendChild(nextImage);

        window.setTimeout(function() {
            nextImage.className= 'center';
        }, 50);

        image.className = 'left';

        window.setTimeout(function() {
            image.remove();
            image = nextImage;

            DEBUG.innerHTML = "Current: " + current + " NextCurrent: " + nextCurrent;
            current = nextCurrent;
        }, 500);
    });
}

function assignNext(current, width) {
    if(current < width) {
        return current + 1;
    } else {
        return 1;
    }
}

function assignBefore(current, width) {
    if(current != 1) {
        return current - 1;
    } else {
        return width;
    }
}

///////////////////////////////[ Main ]///////////////////////////////

const productsSection = document.querySelector('#products');

const sortRings = document.querySelector('#sortRings');
const sortEarrings = document.querySelector('#sortEarrings');
const sortPendants = document.querySelector('#sortPendants');
const sortBracelets = document.querySelector('#sortBracelets');
const sortAll = document.querySelector('#sortAll');

const sortOpals = document.querySelector('#sortOpals');
const sortMorganites = document.querySelector('#sortMorganites');
const sortAllC = document.querySelector('#sortAllC');

const popUpSection = document.querySelector('.popUpSection');
const popUp = document.querySelector('.popUp');
const messageBox = document.querySelector('.messageBox');

const ourCustomers = document.querySelector('#ourCustomers');
const menu = document.querySelector('#menu');

const back = document.querySelector('#back');
const template = document.querySelector('#template');

var settings = {sort: 'all', stoneSort: 'all'};

listenEvents();




const DEBUG = document.querySelector('#debug');
DEBUG.style.display = 'none';