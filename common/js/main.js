const $win = window;

/* =============== 실행 =============== */
mainHeight();
/* resize시 */
onresize = (e) => {
  mainHeight();
};
document.addEventListener("mousemove", mouseMoveEffect);  // 메인 마우스 움직일때
changeImg();  // 메인화면 text 이미지 바꾸기
indexHover(); // index배경 hover에 따라 바꾸기
// document.querySelectorAll('.main .first_main_wrap .main_foreground .text_wrap h1 span').classList.add('active');
const mainSpan = document.querySelectorAll('.main .first_main_wrap .main_foreground .text_wrap h1 span');
mainSpan.forEach(el => {
  el.classList.add('active');
})

/* ==================================== */

// 스크롤 이벤트
const second_main = document.querySelector('.main .second_main_wrap');
const main_fore_Wrap = document.querySelector('.main .first_main_wrap .main_foreground');
const main_back_Wrap = document.querySelector('.main .first_main_wrap .main_background');
let lastScrollTop = 0;
let nowScrollTop;
// second_main.style.opacity = 0;
window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
  let mainTextTop = document.querySelector('.main .first_main_wrap .main_foreground .text_wrap').offsetHeight;
  let introduceTop = document.querySelector('.main .second_main_wrap .introduce_text_wrap').offsetHeight;

  if(scrollTop > 50){
    document.querySelector('.main_scroll_wrap').style.opacity=0;
  }else{
    document.querySelector('.main_scroll_wrap').style.opacity=1;
  }

  //console.log(scrollTop);
  // console.log(mainTextTop);
  // console.log(introduceTop);
  let percentage = ((scrollTop - (mainTextTop-200))/(introduceTop - mainTextTop));
  if(scrollTop === 0){
    second_main.style.opacity = 0;
    main_fore_Wrap.style.opacity = 1;
    main_back_Wrap.style.opacity = 1;
  }
  if(scrollTop > mainTextTop-200 && scrollTop < introduceTop+200){
    second_main.style.opacity = percentage;
    main_fore_Wrap.style.opacity = 1-percentage;
    main_back_Wrap.style.opacity = 1-percentage;
    main_fore_Wrap.style.transform = `translateY(${percentage*(-40)}%)`;
    main_back_Wrap.style.transform = `translateY(${percentage*(-40)}%)`;
    // console.log(percentage*(-40));
    //console.log(1-percentage);
  }
  if(scrollTop > introduceTop){
    second_main.style.opacity = 1;
  }

  // 헤더 나타나고 사라짐
  nowScrollTop = true;
  if(nowScrollTop){
    nowScrollTop = false;
    if(scrollTop > lastScrollTop){
      document.querySelector('.header').classList.add('hide');
    }else {
      document.querySelector('.header').classList.remove('hide');
    }
    lastScrollTop = scrollTop;
  }
});

// 메인화면 브라우저 높이로 main 높이 설정
function mainHeight() {
  let browserHeight = $win.innerHeight * 2;
  // console.log(browserHeight);
  const mainHeight = document.querySelector(".main");
  mainHeight.style.height = `${browserHeight}px`;
}

// 메인화면 마우스에 따라 움직이기
function mouseMoveEffect(e) {
  let pageX = 0,
  pageY = 0;

  // 마우스 값
  pageX = e.pageX;
  pageY = e.pageY;

  const img1 = document.querySelector(".main .main_background .back_img1");
  const img2 = document.querySelector(".main .main_background .back_img2");
  const img3 = document.querySelector(".main .main_background .back_img3");
  const img4 = document.querySelector(".main .main_background .back_img4");
  
  img1.style.transform = `translate(${pageX / 20}px, ${pageY / 20}px)`;
  img2.style.transform = `translate(${pageX / 18}px, ${pageY / 20}px)`;
  img3.style.transform = `translate(${pageX / 30}px, ${pageY / 20}px)`;
  img4.style.transform = `translate(${pageX / 15}px, ${pageY / 20}px)`;
}

// 메인화면 text 바꾸기
function changeImg() {
  const imgArr = document.querySelectorAll('.main .main_foreground .text_wrap h1 span img');
  let imgIndex = 0;

  setInterval(function(){
    imgArr.forEach((el,i) => {
      el.classList.remove('active');
    })
    // console.log(imgArr[imgIndex++]);
    imgArr[imgIndex++];
    if(imgIndex === imgArr.length){
      imgIndex = 0;
    }
    imgArr[imgIndex].classList.add('active');
  }, 800);
  // console.log(imgArr);
}

// index hover에 따라 바꾸기
function indexHover() {
  const menuItemArr = document.querySelectorAll('.port_wrap .menu_list .menu_item');
  const menuImage = document.querySelector('.port_wrap .menu_list .menu_image');
  const menuImageInner = document.querySelectorAll('.port_wrap .menu_list .menu_image .menu_image_mask img');
  
  menuItemArr.forEach((el, index) => {
    el.onmouseenter = () => {
      console.log(index);
      if(index === 0){
        // document.querySelector('.menu_wrap').style.cssText =`--backgroundColor:#d19e95;`;
        document.querySelector('.port_wrap').style.cssText =`--backgroundColor:#eee1d2;`;
        menuImage.style.transform=`translate(17px, 171px)`;
        console.log(menuImageInner[index]);
        menuImageInner[0].classList.add('active');
      } else if(index === 1){
        document.querySelector('.port_wrap').style.cssText =`--backgroundColor:#bcdace;`;
        menuImage.style.transform=`translate(156px, 315px)`;
        menuImageInner[index].classList.add('active');
      } else if(index === 2){
        document.querySelector('.port_wrap').style.cssText =`--backgroundColor:#b6d4e9;`;
        menuImage.style.transform=`translate(235px, 461px)`;
        menuImageInner[index].classList.add('active');
      }
    }
    el.onmouseleave = () => {
      document.querySelector('.port_wrap').style.cssText =`--backgroundColor:#f1f1f1;`;
      menuImageInner.forEach(el => {
        el.classList.remove('active');
      })
    }
  })

}