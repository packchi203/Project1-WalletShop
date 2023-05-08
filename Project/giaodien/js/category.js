const itemSlideBar = document.querySelectorAll(".category-left-li")
itemSlideBar.forEach(function(menu,index){
    menu.addEventListener("click",function(){
        menu.classList.toggle("block")
    })
})