console.log('Working')

let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')
let nightscape = document.querySelector('.nightscape')
const showOverlayBtn = document.querySelector('.specialbtn');
const hideOverlayBtn = document.querySelector('.close')
const specialdiv = document.querySelector('.special')
const wishlist = document.querySelector('.wishlist')
const cart = document.querySelector('.cart')
const foodMenu = document.querySelector('.bx-food-menu')
const user = document.querySelector('.user')
const logo = document.querySelector('.logo-img')
const dropdownContent = document.getElementById('dropdownContent');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}

let sections = document.querySelectorAll('section')
let navlinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY
        let offset = sec.offsetTop - 150
        let height = sec.offsetHeight
        let id = sec.getAttribute('id')

        if(top >= offset && top < offset + height){
            navlinks.forEach(links => {
                links.classList.remove('active')
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    }) 
    let header = document.querySelector('header')
    header.classList.toggle('sticky' , window.scrollY > 100)

    menuIcon.classList.remove('bx-x')
    navbar.classList.remove('active')
}

// Scroll reveal
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration:2000,
    delay: 50, 
})

ScrollReveal().reveal('.home-content , .heading ' , { origin: 'top'})
ScrollReveal().reveal('.home-img , .specialities-container , .gallery-box , .book form , .review form' , { origin: 'bottom'})
ScrollReveal().reveal('.home-content h1, .about-img , .comment' , { origin: 'left'})
ScrollReveal().reveal('.home-content p, .about-content' , { origin: 'right'})

const typed = new Typed('.multiple-text' , {
    strings: ['quick way' , 'and delicious way'],
    typeSpeed: 100,
    backSpeed:50,
    backDelay: 750,
    loop: true
})

let isColorsSet1 = true; // A flag to keep track of the currently applied color set
const imageUrls = ['/images/logo.png', '/images/logo-01.png']
let currentImageIndex = 0

function toggleColors() {
    nightscape.classList.toggle('bxs-brightness-half')
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length
    logo.src = imageUrls[currentImageIndex]

  // Get the root element
  const root = document.documentElement;

  // Toggle between the color sets based on the current state
  if (isColorsSet1) {
    root.classList.remove('colors-set-1'); // Remove the class for color set 1
    root.classList.add('colors-set-2');    // Add the class for color set 2
  } else {
    root.classList.remove('colors-set-2'); // Remove the class for color set 2
    root.classList.add('colors-set-1');    // Add the class for color set 1
  }

  // Update the flag to the opposite state
  isColorsSet1 = !isColorsSet1;
}

nightscape.addEventListener('click' , toggleColors)

//add button for cart
let hrefs = document.querySelectorAll('.add-order')
let cartBtn = document.querySelector('.cartBtn')
for(let i=0 ; i<hrefs.length ; i++){
    hrefs[i].addEventListener('click' , () => {
        cartBtn.classList.toggle('bx-tada')
        cart.style.color = '#39FF14'
        cart.classList.add('bxs-cart-alt')
        setTimeout(() => {
            cartBtn.classList.toggle('bx-tada')
            cart.style.color = 'var(--text-color)'
            cart.classList.remove('bxs-cart-alt')
             if(window.location.href.includes('specialMenu')){
                location.replace(`http://localhost:8001/dashboard/addSpecial?_id=${hrefs[i].classList[1]}&price=${hrefs[i].classList[2]}`)
             } else{
                location.replace(`http://localhost:8001/dashboard/add?_id=${hrefs[i].classList[1]}&price=${hrefs[i].classList[2]}`)
             }
        } , 700)
    })
}

//helper functions
function removeMenuDiv(){
    foodMenu.classList.remove('bxs-food-menu')
        foodMenu.style.color = 'var(--text-color)'
            menuDiv.style.display = 'none'
                removeQueryParam('viewMenu')
}

function showMenuDiv(){
    menuDiv.style.display = 'flex'
        foodMenu.classList.add('bxs-food-menu')
            foodMenu.style.color = 'var(--main-color)'
}

function removeCartDiv(){
    cartDiv.style.display = 'none'
        cart.style.color = 'var(--text-color)'
            cart.classList.remove('bxs-cart-alt')
}

function showCartDiv(){
    cartDiv.style.display = 'flex'
        cart.style.color = '#39FF14'
            cart.classList.add('bxs-cart-alt')
}

function removeUserDiv(){
    user.classList.remove('bxs-user-circle')
    dropdownContent.classList.remove('show')
}

function removeSpecialDiv(){
    removeQueryParam('specialMenu')
    specialdiv.style.display = 'none'
}

function showSpecialDiv(){
    specialdiv.style.display = 'block'
}

//update query
function removeQueryParam(key) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete(key);
    const newUrl = window.location.pathname + '?' + urlSearchParams.toString();
    window.history.replaceState({ path: newUrl }, '', newUrl);
}

function addQueryParam(key, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.append(key, value);
  
    const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams}`;
    window.history.pushState({}, '', newUrl);
}

let closeBtn = document.querySelector('.close-btn')
let menuDiv = document.querySelector('.show-menu-div')

closeBtn.addEventListener('click' , () => {
    removeQueryParam('viewMenu')
        removeMenuDiv()
})

if(window.location.href.includes('viewMenu')){
    showMenuDiv()
}

//removing cart
const backArrow = document.querySelector('.bx-arrow-back')
const cartDiv = document.querySelector('.view-cart-div')
backArrow.addEventListener('click' , () => {
    removeCartDiv()
        showMenuDiv()
        removeQueryParam('viewCart')
})

//showing cart
const cartLink = document.querySelector('.cart-link')
cartLink.addEventListener('click' , () => {
    removeMenuDiv()
        removeSpecialDiv()
            showCartDiv()
                addQueryParam('viewCart' , '')
})

//cart button functions
cart.addEventListener('click' , () => {
    if(cartDiv.style.display == 'none'){
        removeMenuDiv()
            showCartDiv()
                removeUserDiv()
                    removeSpecialDiv()
                    addQueryParam('viewCart' , '')
    } else{
        removeCartDiv()
            removeQueryParam('viewCart')
    }
})

if(window.location.href.includes('viewCart')){
    showCartDiv()
}

const deleteBtns = document.querySelectorAll('.deleteItem')
const increaseBtns = document.querySelectorAll('.increaseQty')

for(let i = 0 ; i < deleteBtns.length ; i++){
    deleteBtns[i].addEventListener('click' , () => {
        deleteBtns[i].classList.add('bx-tada')
        setTimeout(() => {
            deleteBtns[i].classList.add('bx-tada')
            location.replace(`http://localhost:8001/dashboard/delete?_id=${deleteBtns[i].classList[3]}&price=${deleteBtns[i].classList[4]}`)
        } , 500)
    })
}

for(let i = 0 ; i < increaseBtns.length ; i++){
    increaseBtns[i].addEventListener('click' , () => {
        increaseBtns[i].classList.add('bx-tada')
        setTimeout(() => {
            increaseBtns[i].classList.add('bx-tada')
            location.replace(`http://localhost:8001/dashboard/increase?_id=${increaseBtns[i].classList[3]}&number=${increaseBtns[i].classList[4]}`)
        } , 500)
    })
}

//foodMenu icon
foodMenu.addEventListener('click' , () => {
    console.log('hey')
    if(menuDiv.style.display == 'none'){
        removeCartDiv()
            showMenuDiv()
                removeUserDiv()
                    addQueryParam('viewMenu','')
                        removeSpecialDiv()
    } else{
        removeQueryParam('viewMenu')
            removeMenuDiv()
    }
})

//user button functions
user.addEventListener('click' , () => {
    removeCartDiv()
        removeMenuDiv()
            removeSpecialDiv()
            
    user.classList.toggle('bxs-user-circle')
        dropdownContent.classList.toggle('show')
})

//wishlist button functions
wishlist.addEventListener('mouseover' , () => {
    wishlist.style.color = 'red'
    wishlist.classList.toggle('bxs-heart')
})

wishlist.addEventListener('mouseout' , () => {
    wishlist.style.color = 'var(--text-color)'
    wishlist.classList.toggle('bxs-heart')
})

const specilalitiesContainer = document.querySelector('.specialities-container')
const wishLinks = specilalitiesContainer.querySelectorAll('a')
wishLinks.forEach((wishLink) => {
    wishLink.addEventListener('click' , () => {
        wishlist.style.color = 'red'
        wishlist.classList.toggle('bxs-heart')
        setTimeout(() => {
            wishlist.style.color = 'var(--text-color)'
            wishlist.classList.toggle('bxs-heart')
        } , 1000)
    })
})

// Function to show or hide the container
function toggleContainer() {
    if (specialdiv.style.display === 'none') {
        specialdiv.style.display = 'block';
            removeUserDiv()
                removeCartDiv()
                    removeMenuDiv()
                        addQueryParam('specialMenu' , '?')
    } else {
        removeQueryParam('specialMenu')
        specialdiv.style.display = 'none';
    }
}

if(window.location.href.includes('specialMenu')){
    specialdiv.style.display = 'block'
}

hideOverlayBtn.addEventListener('click' , toggleContainer)
showOverlayBtn.addEventListener('click', toggleContainer);
