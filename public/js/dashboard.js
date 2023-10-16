console.log('working')
const accountDiv = document.querySelector('.account-details')
const bookingsDiv = document.querySelector('.bookings')
const ordersDiv = document.querySelector('.orders')

const accountTab = document.querySelector('.account-tab')
const bookingTab = document.querySelector('.booking-tab')
const orderTab = document.querySelector('.order-tab')

//update query
function removeQueryParam(key) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete(key);
    const newUrl = window.location.pathname + '?' + urlSearchParams.toString();
    window.history.replaceState({ path: newUrl }, '', newUrl);
}

//helper functions
function viewAccountDetails(){
    ordersDiv.style.display = 'none'
            bookingsDiv.style.display = 'none'
                accountDiv.style.display = 'block'
}

function viewBookingDetails(){
    ordersDiv.style.display = 'none'
            bookingsDiv.style.display = 'block'
                accountDiv.style.display = 'none'
}

function viewOrdersDetails(){
    ordersDiv.style.display = 'block'
            bookingsDiv.style.display = 'none'
                accountDiv.style.display = 'none'
}

if(window.location.href.includes('bookings')){
    viewBookingDetails()
        removeQueryParam('bookings')
} else if(window.location.href.includes('orders')){
    viewOrdersDetails()
        removeQueryParam('orders')
} else{
    viewAccountDetails()
        removeQueryParam('accountDetails')
}

accountTab.addEventListener('click' , () => {
    viewAccountDetails()
})

bookingTab.addEventListener('click' , () => {
    viewBookingDetails()
})

orderTab.addEventListener('click' , () => {
    viewOrdersDetails()
})

// Scroll reveal
ScrollReveal({
    //reset: true,
    distance: '100px',
    duration: 2000,
    delay: 50, 
})

ScrollReveal().reveal('.home-content , .heading-content h3 , header h1' , { origin: 'top'})
ScrollReveal().reveal('.dashboard', { origin: 'bottom'})
ScrollReveal().reveal('.heading-content h1', { origin: 'left'})
ScrollReveal().reveal('.header-container img , header h2' , { origin: 'right'})

const typed = new Typed('.multiple-text' , {
    strings: ['Welcome' , "How you doing'?"],
    typeSpeed: 100,
    backSpeed:50,
    backDelay: 750,
    loop: true
})