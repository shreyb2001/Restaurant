console.log('working')

const dashboard = document.querySelector('.admin-dashboard')
const userInfo = document.querySelector('.alphabeta')
const updateSpecials = document.querySelector('.update-specials')
const updateMenu = document.querySelector('.update-menu')
const editComments = document.querySelector('.edit-comments')
const addDiv = document.querySelector('.add-items')
const updateDiv = document.querySelector('.update-menu-items')

const dash = document.querySelector('.dash')
const info = document.querySelector('.userInfo')
const specials = document.querySelector('.updateSpecials')
const menu = document.querySelector('.updateMenu')
const comment = document.querySelector('.editComments')
const add = document.querySelector('.add')
const update = document.querySelector('.update')

function hideAll(){
    dashboard.style.display = 'none'
    userInfo.style.display = 'none'
    updateSpecials.style.display = 'none'
    updateMenu.style.display = 'none'
    editComments.style.display = 'none'

    dash.classList.remove('active')
    info.classList.remove('active')
    specials.classList.remove('active')
    menu.classList.remove('active')
    comment.classList.remove('active')
}

if(window.location.href.includes('dashboard')){
    hideAll()
        dash.classList.add('active')
            dashboard.style.display = 'flex'
}

if(window.location.href.includes('userInfo')){
    hideAll()
        info.classList.add('active')
            userInfo.style.display = 'grid'
}

if(window.location.href.includes('updateSpecial')){
    hideAll()
        specials.classList.add('active')
            updateSpecials.style.display = 'grid'
}

if(window.location.href.includes('updateItem?')){
    hideAll()
        menu.classList.add('active')
            updateMenu.style.display = 'block'
}

if(window.location.href.includes('editComments')){
    hideAll()
        comment.classList.add('active')
            editComments.style.display = 'block'
}

add.addEventListener('click' , () => {
    if(addDiv.style.display = 'none'){
        addDiv.style.display = 'block'
        updateDiv.style.display = 'none'
    }else{
        addDiv.style.display = 'none'
        updateDiv.style.display = 'grid'
    }
})

update.addEventListener('click' , () => {
    if(updateDiv.style.display == 'none'){
        updateDiv.style.display = 'grid'
            addDiv.style.display = 'none'
    }else{
        updateDiv.style.display = 'none'
            addDiv.style.display = 'block'
    }
})

// Scroll reveal
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration:2000,
    delay: 50, 
})

ScrollReveal().reveal('.admin-display img' , { origin: 'top'})
ScrollReveal().reveal('' , { origin: 'bottom'})
ScrollReveal().reveal('.left-container' , { origin: 'left'})
ScrollReveal().reveal('.admin-heading' , { origin: 'right'})

// const typed = new Typed('.multiple-text' , {
//     strings: ['quick way' , 'and delicious way'],
//     typeSpeed: 100,
//     backSpeed:50,
//     backDelay: 750,
//     loop: true
// })