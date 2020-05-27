window.onload(function() {
    $('#body').show();
    $('#msg').hide();
});

//---------------------------- first part animation ------------------------------
// Wrap every letter in a span
var textWrapper = document.querySelector('.titleanime .mytitle');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.titleanime .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i+1)
  });

let domilk = document.querySelector('#domilk'); 
setInterval(function() {
    domilk.style.display = 'block';
}, 800);


$('#scroll-next').on('click', function(){
    let firsthieght = document.querySelector("#con-first").offsetHeight;
    let nexthieght = document.querySelector(".bg-white-after").offsetHeight;
    let lasthieght = firsthieght + nexthieght;
    window.scrollTo({
            top: lasthieght,
            behavior: 'smooth',
          })
});

let scrollnext = document.querySelector('.first-button-part'); 
setInterval(function() {
    scrollnext.style.display = 'block';
}, 2500);

//---------------------------- second part profile ------------------------------


function ExpContext(){
    let expHTML = ''
    for (let i = 0; i < myExp.length; i++) {
        expHTML += 
            `<div class="exp-img">
                <div class="exp-img-first" data-expstart=${i}></div>
                <div class="exp-img-second exp-img-${myExp[i].type}"></div>
                <div class="exp-img-third" data-expend=${i}></div>
            </div>
            <div class="exp-text">
                <div class="exp-text-first">
                </div>
                <div class="exp-text-second">
                <span class="exp-text-time"><b>${myExp[i].time}</b></span><span>${myExp[i].text}</span>
                </div>
                <div class="exp-text-third"></div>
            </div>`;
    }
    return expHTML
}

let profileExp = document.querySelector("#profile-exp") ;
profileExp.innerHTML = ExpContext();

let expImgFirst = document.querySelectorAll(".exp-img-first");
let expImgEnd = document.querySelectorAll(".exp-img-third");
expImgFirst.forEach((e) => {
    if(e.dataset.expstart==0){
        e.classList.add("exp-img-none")
    }})
    expImgEnd.forEach((e) => {
    if(e.dataset.expend==7){
        e.classList.add("exp-img-none")
    }})



//---------------------------- forth part pictures ------------------------------
// ----------------------------- get array, output html -----------------------------
function PicContext(myArr){
    let picHTML = ''
    for (let i = 0; i < myArr.length; i++) {
        picHTML += 
            `<div class='picture pic-${myArr[i].type}'
                         data-id='${myArr[i].num}'>
                <img src='${myArr[i].src}' class='img-fluid'>
            </div>`;
    }
    return picHTML
}

function UpdateDiv(myHtml) {
    let picInner = document.querySelector(".picInner");
    picInner.innerHTML = myHtml;
    const pictures = document.querySelectorAll(".picture");
    pictures.forEach(e => e.addEventListener('click', discPic));

}

//--------------------- print all works on page load -----------------------------

const allWorkHtml = PicContext(imgData);
UpdateDiv(allWorkHtml);

//-----------------------------  picture sort ----------------------------------

function sortOrigin(){
    const newArr = imgData.sort(function (a, b) {
        return Number(a.num) - Number(b.num);
      });
      return newArr;
}

function sortOld(){
    const newArr = imgData.sort(function (a, b) {
        return a.date - b.date;
      });
      return newArr;
}


function sortNew(){
    const newArr = imgData.sort(function(a, b) {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
    });
    return newArr;
}

function letsortOrigin(){
    const sortedArray = sortOrigin(); // 新的陣列
    let newHtml = PicContext(sortedArray); // 新的陣列轉乘的ＨＴＭＬ字串
    UpdateDiv(newHtml); //更新DIV
}

function clickNewBtn(){
    const sortedArray = sortNew(); // 新的陣列
    let newHtml = PicContext(sortedArray); // 新的陣列轉乘的ＨＴＭＬ字串
    UpdateDiv(newHtml); //更新DIV
}

function clickOldBtn(){
    const sortedArray = sortOld();
    let newHtml = PicContext(sortedArray);
    UpdateDiv(newHtml); //更新DIV
    
}

//-----------------------------  modal & clickpicture ----------------------------------

const modal = document.querySelector("#myModal");
const modalPic = document.querySelector(".modal-pic");

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function discPic() {
    modal.style.display = "block";
    let lastNum = this.dataset.id;
    const foundWork = imgData.find(function(item){
        return item.num === lastNum;           // 取得大於五歲的
      });
      
    let context = "<img src=" + foundWork.src + " class='img-fluid'>";
    modalPic.innerHTML = context;
}


//-----------------------------  picture selector ----------------------------------
const picInner = document.querySelector("#pic-inner")
const picBtns = document.querySelectorAll(".pic-buttons button")
picBtns.forEach(e=> e.addEventListener('click',picSelector))


// filter
function picSelector(){
    switch(this.name){
        case "all" : 
            picInner.classList.remove("is-show-illust", "is-show-cute", "is-show-charactor", "is-show-background");
            letsortOrigin();
            break;
        case "illust" : 
            picInner.classList.toggle("is-show-illust");
            this.classList.toggle("my-btn-toggle");
            break;
        case "cute" : 
            picInner.classList.toggle("is-show-cute");
            this.classList.toggle("my-btn-toggle");
            break;
        case "charactor" : 
            picInner.classList.toggle("is-show-charactor"); 
            this.classList.toggle("my-btn-toggle");
            break;
        case "background" : 
            picInner.classList.toggle("is-show-background"); 
            this.classList.toggle("my-btn-toggle");
            break;
    }

}

//------------------------- scroll top --------------------------------
$(window).scroll(function() {
    if ($(this).scrollTop() > 50 ) {
        $('.scrolltop:hidden').stop(true, true).fadeIn();
    } else {
        $('.scrolltop').stop(true, true).fadeOut();
    }
});
$(function(){$(".scroll").click(function(){window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })})})
