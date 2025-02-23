/* =============== 실행 =============== */
onresize = (e) => {
  moveWrap();
  indexClickMove();
};
window.onload = () => {
  // document.querySelector(".loading_wrap").style.display = `none`;
  document.querySelector(".load_comple").style.display = `block`;
  //alert("로드 완료");
  document.addEventListener("mousemove", mouseMoveEffect); // 메인 마우스 움직일때
  changeImg(); // 메인화면 text 이미지 바꾸기
  indexHover(); // index배경 hover에 따라 바꾸기
  //document.querySelectorAll('.main .first_main_wrap .main_foreground .text_wrap h1 span').classList.add('active');
  const mainSpan = document.querySelectorAll(".main .first_main_wrap .main_foreground .text_wrap h1 span");
  setTimeout(() => {
    document.querySelector(".main .first_main_wrap").classList.add("active");
    mainSpan.forEach((el, i) => {
      el.classList.add("active");
      el.style.cssText = `--reveal-delay: 0.${i + 3}s`;
      //console.log(el);
      //document.querySelector('.port_wrap').style.cssText =`--backgroundColor:#eee1d2;`;
    });
  }, 500);
  
  popup(); //popup
  moveWrap(); // move scroll
  indexClickMove(); // index 클릭시 스크롤 이동
  workSlide(); // work 슬라이드
};

/* ==================================== */

// 스크롤 이벤트
const second_main = document.querySelector(".main .second_main_wrap");
const main_fore_Wrap = document.querySelector(".main .first_main_wrap .main_foreground");
const main_back_Wrap = document.querySelector(".main .first_main_wrap .main_background");
let lastScrollTop = 0;
let nowScrollTop;
// second_main.style.opacity = 0;
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
  let mainTextTop = document.querySelector(".main .first_main_wrap .main_foreground .text_wrap").offsetHeight;
  let introduceTop = document.querySelector(".main .second_main_wrap .introduce_text_wrap").offsetHeight;

  if (scrollTop > 50) {
    document.querySelector(".main_scroll_wrap").style.opacity = 0;
  } else {
    document.querySelector(".main_scroll_wrap").style.opacity = 1;
  }

  //console.log(scrollTop);
  // console.log(mainTextTop);
  // console.log(introduceTop);
  let percentage = (scrollTop - (mainTextTop - 200)) / (introduceTop - mainTextTop);
  if (scrollTop === 0) {
    second_main.style.opacity = 0;
    main_fore_Wrap.style.opacity = 1;
    main_back_Wrap.style.opacity = 1;
    main_fore_Wrap.style.transform = `translateY(0%)`;
    main_back_Wrap.style.transform = `translateY(0%)`;
  }
  if (scrollTop > mainTextTop - 200 && scrollTop < introduceTop + 200) {
    second_main.style.opacity = percentage;
    main_fore_Wrap.style.opacity = 1 - percentage;
    main_back_Wrap.style.opacity = 1 - percentage;
    main_fore_Wrap.style.transform = `translateY(${percentage * -40}%)`;
    main_back_Wrap.style.transform = `translateY(${percentage * -40}%)`;
    //console.log(percentage);
    //console.log(1-percentage);
  }
  if (scrollTop > introduceTop) {
    second_main.style.opacity = 1;
  }

  // 헤더 나타나고 사라짐
  nowScrollTop = true;
  if (nowScrollTop) {
    nowScrollTop = false;
    if (scrollTop > lastScrollTop) {
      document.querySelector(".header").classList.add("hide");
    } else {
      document.querySelector(".header").classList.remove("hide");
    }
    lastScrollTop = scrollTop;
  }

  //index 영역
  const indexTop = document.querySelector(".port_wrap .menu_list .menu_item .menu_item_txt").getBoundingClientRect().top;
  indexHover(indexTop);
  //console.log(indexTop);
  // console.log(scrollTop);

  // about 영역
  if (indexTop < 0) {
    document.querySelector(".port_wrap").style.backgroundColor = "#b6d4e9";
    document.querySelector(".about_wrap").style.backgroundColor = "#b6d4e9";
    document.querySelector(".about_wrap .heading_wrap > span").classList.add("active");
    document.querySelector(".about_wrap .heading_wrap .cont_title").classList.add("active");
    document.querySelector(".heading_wrap .cont_img_wrap .image_mask").classList.add("active");
  } else {
    document.querySelector(".port_wrap").style.backgroundColor = "#f1f1f1";
    document.querySelector(".about_wrap").style.backgroundColor = "#f1f1f1";
    document.querySelector(".about_wrap .heading_wrap > span").classList.remove("active");
    document.querySelector(".about_wrap .heading_wrap .cont_title").classList.remove("active");
    document.querySelector(".heading_wrap .cont_img_wrap .image_mask").classList.remove("active");
  }
  const aboutWrapTop = document.querySelector(".about_wrap").getBoundingClientRect().top;
  if (aboutWrapTop < 0) {
    document.querySelector(".about_wrap .cont_text").classList.add("active");
  } else {
    document.querySelector(".about_wrap .cont_text").classList.remove("active");
  }

  // work 영역
  const aboutImgTop = document.querySelector(".about_wrap .heading_wrap .cont_img_wrap .image_mask").getBoundingClientRect().top;
  const aboutContTop = document.querySelector(".about_wrap .cont_text").getBoundingClientRect().top;
  // console.log(aboutImgTop);
  if (aboutImgTop + 200 < 0) {
    document.querySelector(".work_wrap .heading_wrap > span").classList.add("active");
    document.querySelector(".work_wrap .heading_wrap .cont_title").classList.add("active");
  } else {
    document.querySelector(".work_wrap .heading_wrap > span").classList.remove("active");
    document.querySelector(".work_wrap .heading_wrap .cont_title").classList.remove("active");
  }

  if (aboutContTop < 0) {
    document.querySelector(".flipster_cont").classList.add("active");
  } else {
    document.querySelector(".flipster_cont").classList.remove("active");
  }

  // example 영역
  const workSlideTop = document.querySelector(".work_slide_wrap").getBoundingClientRect().top;
  if (workSlideTop < 0) {
    document.querySelector(".example_wrap .title_wrap div.move1").classList.add("active");
    document.querySelector(".example_wrap .title_wrap div.move2").classList.add("active");
    document.querySelector(".example_wrap .cont_text").classList.add("active");
  } else {
    document.querySelector(".example_wrap .title_wrap div.move1").classList.remove("active");
    document.querySelector(".example_wrap .title_wrap div.move2").classList.remove("active");
    document.querySelector(".example_wrap .cont_text").classList.remove("active");
  }

  // animation 영역
  const animationTop = document.querySelector(".example_wrap .animation_iframe").getBoundingClientRect().top;
  if (animationTop + 200 < 0) {
    document.querySelector(".animation_wrap").classList.add("on");
    document.querySelector(".animation_wrap .cont_text").classList.add("active");
  } else {
    document.querySelector(".animation_wrap").classList.remove("on");
    document.querySelector(".animation_wrap .cont_text").classList.remove("active");
  }
  // console.log(scrollTop);
  // console.log(animationTxt.getBoundingClientRect().top);
  // console.log(animationTxt.getBoundingClientRect().top + scrollTop);

  // contact 영역
  const lastAniTop = document.querySelector(".animation_wrap .animation_list .list_area:last-child .codepen_cont").getBoundingClientRect().top;
  //console.log(lastAniTop);
  if (lastAniTop + 300 < 0) {
    document.querySelector(".contact_wrap .heading_wrap > span").classList.add("active");
    document.querySelector(".contact_wrap .heading_wrap .cont_title").classList.add("active");
  } else {
    document.querySelector(".contact_wrap .heading_wrap > span").classList.remove("active");
    document.querySelector(".contact_wrap .heading_wrap .cont_title").classList.remove("active");
  }
});

//헤더 클릭시 스크롤 이동
function moveWrap() {
  const headerLiArr = document.querySelectorAll(".header_wrap .nav ul li");
  const aboutTop = document.querySelector(".about_wrap").offsetTop;
  const workTop = document.querySelector(".work_wrap").offsetTop;
  //const workTop = window.pageYOffset + document.querySelector(".work_wrap").getBoundingClientRect().top;
  const contactTop = document.querySelector(".contact_wrap").offsetTop;
  //window.pageYOffset + menuList.getBoundingClientRect().top

  headerLiArr.forEach((el, i) => {
    el.onclick = (e) => {
      e.preventDefault();
      //console.log(e, i, aboutTop);
      if (i === 0) {
        window.scroll({ top: aboutTop, behavior: "smooth" });
      } else if (i === 1) {
        window.scroll({ top: workTop, behavior: "smooth" });
      } else if (i === 2) {
        window.scroll({ top: contactTop, behavior: "smooth" });
        //window.scroll({ top: document.body.scrollHeight, behavior: "smooth" }); // 맨 아래로
      }
    };
  });
}

// index 클릭시 스크롤 이동
function indexClickMove() {
  const menuItemArr = document.querySelectorAll(".port_wrap .menu_list .menu_item");
  const aboutTop = document.querySelector(".about_wrap").offsetTop;
  const workTop = document.querySelector(".work_wrap").offsetTop;
  const contactTop = document.querySelector(".contact_wrap").offsetTop;

  menuItemArr.forEach((el, i) => {
    el.onclick = (e) => {
      e.preventDefault();
      if (i === 0) {
        window.scroll({ top: aboutTop, behavior: "smooth" });
      } else if (i === 1) {
        window.scroll({ top: workTop, behavior: "smooth" });
      } else if (i === 2) {
        window.scroll({ top: contactTop, behavior: "smooth" }); // 맨 아래로
      }
    };
  });
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
  const imgArr = document.querySelectorAll(".main .main_foreground .text_wrap h1 span img");
  let imgIndex = 0;

  setInterval(function () {
    imgArr.forEach((el, i) => {
      el.classList.remove("active");
    });
    // console.log(imgArr[imgIndex++]);
    imgArr[imgIndex++];
    if (imgIndex === imgArr.length) {
      imgIndex = 0;
    }
    imgArr[imgIndex].classList.add("active");
  }, 800);
  // console.log(imgArr);
}

// index hover에 따라 바꾸기
function indexHover(indexTop) {
  const menuItemArr = document.querySelectorAll(".port_wrap .menu_list .menu_item");
  const menuImage = document.querySelector(".port_wrap .menu_list .menu_image");
  const menuImageInner = document.querySelectorAll(".port_wrap .menu_list .menu_image .menu_image_mask img");

  const menuList = document.querySelector(".port_wrap .menu_list");
  let menuListTop = window.pageYOffset + menuList.getBoundingClientRect().top;
  let menuImgH = document.querySelector(".port_wrap .menu_list .menu_image").offsetHeight;
  let menuImgH2 = menuImgH / 4;
  //console.log(menuImgH2);

  menuItemArr.forEach((el, index) => {
    let memuItemArrTop = window.pageYOffset + menuItemArr[index].getBoundingClientRect().top;
    el.onmouseenter = () => {
      //console.log(index);
      if (index === 0) {
        document.querySelector(".port_wrap").style.cssText = `--backgroundColor:#b6d4e9;`;
        menuImage.style.transform = `translate(17px, ${memuItemArrTop - menuListTop - menuImgH2}px)`;
        //console.log(menuImageInner[index]);
        menuImageInner[0].classList.add("active");
        document.querySelector(".about_wrap").style.backgroundColor = "#b6d4e9";
      } else if (index === 1) {
        document.querySelector(".port_wrap").style.cssText = `--backgroundColor:#bcdace;`;
        menuImage.style.transform = `translate(150px, ${memuItemArrTop - menuListTop - menuImgH2}px)`;
        menuImageInner[index].classList.add("active");
        document.querySelector(".about_wrap").style.backgroundColor = "#bcdace";
      } else if (index === 2) {
        document.querySelector(".port_wrap").style.cssText = `--backgroundColor:#eee1d2;`;
        menuImage.style.transform = `translate(220px, ${memuItemArrTop - menuListTop - menuImgH2}px)`;
        menuImageInner[index].classList.add("active");
        document.querySelector(".about_wrap").style.backgroundColor = "#eee1d2";
      }
    };
    if (indexTop < 0) {
      el.onmouseleave = () => {
        document.querySelector(".port_wrap").style.cssText = `--backgroundColor:#f1f1f1;`;
        menuImageInner.forEach((el) => {
          el.classList.remove("active");
        });
        document.querySelector(".port_wrap").style.backgroundColor = "#b6d4e9";
        document.querySelector(".about_wrap").style.backgroundColor = "#b6d4e9";
      };
    } else {
      el.onmouseleave = () => {
        document.querySelector(".port_wrap").style.cssText = `--backgroundColor:#f1f1f1;`;
        menuImageInner.forEach((el) => {
          el.classList.remove("active");
        });
        document.querySelector(".about_wrap").style.backgroundColor = "#f1f1f1";
      };
    }
  });
}

// work slide
function workSlide() {
  let carousel = $(".work_slide_wrap .flipster_cont").flipster({
    style: "carousel",
    spacing: -0.5,
    loop: false,
    buttons: true,
    scrollwheel: false,
    start: 4,
  });

  let carousel2 = $(".work_wrap .flipster_info").flipster({
    style: "flat",
    spacing: -0.5,
    loop: false,
    // buttons: true,
    scrollwheel: false,
    start: 4,
  });
  
  // "Prev" 또는 "Next" 버튼이 클릭될 때 두 개의 슬라이드가 함께 이동하도록 설정
  $(".work_slide_wrap .flipster_cont").on("click", ".flipster__button--prev", function() {
    carousel2.flipster('prev');
  });

  $(".work_slide_wrap .flipster_cont").on("click", ".flipster__button--next", function() {
    carousel2.flipster('next');
  });

  $(".work_wrap .flipster_info").on("click", ".flipster__button--prev", function() {
    carousel.flipster('prev');
  });

  $(".work_wrap .flipster_info").on("click", ".flipster__button--next", function() {
    carousel.flipster('next');
  });
  
}

//popup
function popup() {
  const slideLi = document.querySelectorAll(".flipster_cont ul li");
  const popupDivs = document.querySelectorAll(".popup");

  slideLi.forEach((el, i) => {
    slideLi[i].onclick = (e) => {
      e.preventDefault();
      slideLi.forEach((el, i) => {
        //console.log(popupDivs[i]);
        slideLi[i].classList.remove("on");
        popupDivs[i].classList.remove("on");
        document.body.classList.add("popon");
      });
      slideLi[i].classList.add("on");
      popupDivs[i].classList.add("on");
    };
  });

  // closebtn 클릭
  const closeBtn = document.querySelectorAll(".popup .popup_header .close_btn");
  closeBtn.forEach((el, i) => {
    closeBtn[i].onclick = () => {
      closeBtn.forEach((el, i) => {
        popupDivs[i].classList.remove("on");
        document.body.classList.remove("popon");
      });
    };
  });
}
