function showItem(mouseDom, showDom) {
  let mouseDome = document.getElementsByClassName(mouseDom)[0];
  let showDome = document.getElementsByClassName(showDom)[0];
  mouseDome.addEventListener("mouseover", function () {
    showDome.style.display = "block";
  });

  mouseDome.addEventListener("mouseleave", function () {
    showDome.style.display = "none";
  });
}

/* 封装的获取Scroll的函数 */
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}

//防抖
function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

//实现输入框输入时搜索符号消失
function searchShow(originInput) {
  let searchInput = document.getElementsByClassName(originInput)[0],
    leftInputIcon = document.getElementsByClassName("left-input-icon")[0],
    val;

  searchInput.addEventListener("input", function () {
    if (this.value) {
      leftInputIcon.style.display = "none";
    } else {
      leftInputIcon.style.display = "block";
    }
  });
}

//阻止事件冒泡
function stopBubble(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.stopBubble();
  }
}

// 实现选中单个列表项并执行一定的操作
function checkedClick(theList) {
  let theListDom = document.getElementsByClassName(theList)[0];
  let pre = theListDom.children[0];
  let preInput = "baobei";
  theListDom.addEventListener("click", function (e) {
    let target = e.target || e.srcElement,
      targetInputName;

    if (target.className != "searcher-active" && target != theListDom) {
      target.className = "searcher-active";

      /* 策略类 ：通过data-id转化成对应的代号 */
      let changeInputName = {
        2: function () {
          return "mall";
        },
        1: function () {
          return "tian-mao";
        },
        0: function () {
          return "baobei";
        },
      };

      /* 环境类 */
      let getInfo = function (data) {
        return changeInputName[data]();
      };

      targetInputName = getInfo(target.getAttribute("data-id"));

      /* input 的一列操作 */
      let inputEvent = function (targetInput) {
        let targetInputDom = document.getElementsByClassName(targetInput)[0];

        document.getElementsByClassName(preInput)[0].style.display = "none";
        targetInputDom.style.display = "block";
        targetInputDom.addEventListener("focus", function () {
          this.value = document.getElementsByClassName(preInput)[0].value;
        });
        targetInputDom.focus();
        searchShow(targetInput);

        pre.className = "";
        pre = target;
        preInput = targetInput;
      };

      /* 策略类 */
      let strategies = {
        "tian-mao": function () {
          inputEvent("tian-mao");
          document.getElementsByClassName("right-input-icon")[0].style.display =
            "none";
          document.getElementsByClassName("bottom-list-show")[0].style.display =
            "none";
        },
        mall: function () {
          inputEvent("mall");
          document.getElementsByClassName("right-input-icon")[0].style.display =
            "none";
          document.getElementsByClassName("bottom-list-show")[0].style.display =
            "block";
        },
        baobei: function () {
          inputEvent("baobei");
          document.getElementsByClassName("right-input-icon")[0].style.display =
            "block";
          document.getElementsByClassName("bottom-list-show")[0].style.display =
            "block";
        },
      };

      /* 环境类 */
      let changetheme = function (title) {
        return strategies[title]();
      };

      changetheme(targetInputName);
    }
  });
}

/* 侧边栏移动显示对应的内容 */
function mouseShowBox(origin) {
  let theOrigin = document.getElementsByClassName(origin)[0];
  let theLi = theOrigin.children;
  let theLiLength = theLi.length;
  let preItemShow;

  document
    .getElementsByClassName("main-content-left")[0]
    .addEventListener("mouseleave", function () {
      document.getElementsByClassName("detail-box")[0].style.display = "none";
    });

  for (let i = 0; i < theLiLength; i++) {
    theLi[i].addEventListener(
      "mouseover",
      function () {
        let dataGroupId = this.getAttribute("data-groupid");

        document.getElementsByClassName("detail-box")[0].style.display =
          "block";

        switch (dataGroupId) {
          case "0":
            if (preItemShow) {
              preItemShow.style.display = "none";
            }
            preItemShow = document.getElementsByClassName("item-show")[0];
            preItemShow.style.display = "block";
            break;
          case "1":
            if (preItemShow) {
              preItemShow.style.display = "none";
            }
            preItemShow = document.getElementsByClassName("item-show")[1];
            preItemShow.style.display = "block";
            break;
        }
      },
      true
    );
  }
}

//点击一次遍消失
function hiddenAfterOneClick(origin, target) {
  document
    .getElementsByClassName(origin)[0]
    .addEventListener("click", function () {
      document.getElementsByClassName(target)[0].style.display = "none";
    });
}

/*右边小导航栏的功能实现 */
function mainRightNav(origin) {
  let theOrigin = document.getElementsByClassName(origin)[0];
  let theOriginLi = theOrigin.children;
  let theOriginLiLength = theOriginLi.length;
  let preId = 0;

  for (let i = 0; i < theOriginLiLength; i++) {
    theOriginLi[i].addEventListener("mouseover", function () {
      setTimeout(() => {
        theOriginLi[preId].className = "";
        document.getElementsByClassName("show-info-wrapper")[
          preId
        ].style.display = "none";
        this.className = "selected";
        document.getElementsByClassName("show-info-wrapper")[i].style.display =
          "block";
        preId = i;
      }, 300);
    });
  }
}

//categroy前三个li的功能;
function categroyThreeLi(parentUl) {
  let theparentUl = document.getElementsByClassName(parentUl)[0];
  let theChildren = theparentUl.children;
  let fBox = document.getElementsByClassName("f-box")[0];
  let pre = theChildren[0];

  document
    .getElementsByClassName("x-btn")[0]
    .addEventListener("click", function () {
      fBox.style.display = "none";
      pre.className = "item";
    });

  for (let i = 0; i < 3; i++) {
    theChildren[i].addEventListener("mouseover", function () {
      pre.className = "item";
      pre = this;
      this.className = "item" + " " + "active";
      fBox.style.display = "block";
    });
  }
}

/* 实现信息的详细展示与隐藏 */
(function () {
  showItem("tel", "tel-list"); //大陆信息
  showItem("mytaobao-li", "myTaobao"); //我的淘宝
  showItem("collection-li", "my-collection"); //我的收藏
  showItem("sale-center", "myCenter"); //千牛卖家中心
  showItem("seaver", "my-seaver"); //联系客服
  showItem("net-nav-li", "net-show"); //网站导航
})();

/* 固定搜索框的显示和隐藏 */
(function () {
  let sticky = document.getElementsByClassName("stiky-search")[0];
  let fixNav = document.getElementsByClassName("fix-nav")[0];
  let backTop = document.getElementsByClassName("back-top")[0];
  let pzhh = document.getElementsByClassName("pzhh")[0];
  let zhibo = document.getElementsByClassName("zhibo")[0];
  let rmsh = document.getElementsByClassName("rmsh")[0];
  let fixCnxh = document.getElementsByClassName("fix-cnxh")[0];

  /* 给li标签添加点击事件 */
  function setClick(target) {
    let targetLi = document.getElementsByClassName(target)[0].children;

    for (let i = 0; i <= 4; i++) {
      targetLi[i].addEventListener("click", function () {
        let t = this.getAttribute("targetLocal");
        window.scrollTo(0, parseInt(t));
      });
    }
  }

  setClick("fix-nav-list");

  document.addEventListener("scroll", function () {
    //到达一定位置后右侧边栏不动
    if (getScrollOffset().y >= 453) {
      fixNav.style.position = "fixed";
      fixNav.style.top = "75px";
    } else {
      fixNav.style.position = "absolute";
      fixNav.style.top = "552px";
    }

    //到达一定位置后返回顶点按钮出现
    if (getScrollOffset().y >= 800) {
      backTop.style.display = "block";
    } else {
      backTop.style.display = "none";
    }

    //到达指定位置后相应的a激活
    if (getScrollOffset().y < 1294) {
      pzhh.className = "pzhh get";
      zhibo.className = "zhibo";
      rmsh.className = "rmsh";
      fixCnxh.className = "fix-cnxh";
    } else if (getScrollOffset().y < 2130) {
      pzhh.className = "pzhh";
      zhibo.className = "zhibo get";
      rmsh.className = "rmsh";
      fixCnxh.className = "fix-cnxh";
    } else if (getScrollOffset().y <= 3104) {
      zhibo.className = "zhibo";
      pzhh.className = "pzhh";
      rmsh.className = "rmsh get";
      fixCnxh.className = "fix-cnxh";
    } else {
      zhibo.className = "zhibo";
      pzhh.className = "pzhh";
      rmsh.className = "rmsh";
      fixCnxh.className = "fix-cnxh get";
    }

    if (getScrollOffset().y >= 280) {
      sticky.style.display = "block";
    } else {
      sticky.style.display = "none";
    }
  });
})();

/* 固定搜索框输入框的切换 */
(function () {
  let theOrigin = document.getElementsByClassName("tbortm-list")[0];
  let inputArray = document.getElementsByClassName("sticky-search-center")[0]
    .children;
  let preInput = document.getElementsByClassName("sticky-baobei")[0];

  for (let i = 0; i < 3; i++) {
    inputArray[i].addEventListener("input", function () {
      if (!this.value) {
        document.getElementsByClassName("sticky-left-icon")[0].style.display =
          "block";
      } else {
        document.getElementsByClassName("sticky-left-icon")[0].style.display =
          "none";
      }
    });
  }

  theOrigin.addEventListener("click", function (e) {
    let target = e.target || e.srcElement;
    let targetText = target.innerText;
    let firstLi = document.getElementsByClassName("tbortm-list-first")[0];
    let submit = document.getElementsByClassName("sticky-submit")[0];
    let icon = document.getElementsByClassName("sticky-icon-camera")[0];

    function changeInput(target) {
      let value = preInput.value;
      let theTarget = document.getElementsByClassName(target)[0];

      preInput.style.display = "none";
      theTarget.style.display = "block";
      theTarget.value = value;
      theTarget.focus();
      preInput = theTarget;
    }

    target.innerText = firstLi.innerText;
    firstLi.innerText = targetText;

    if (firstLi.innerText == "天猫") {
      changeInput("sticky-tian-mao");
      submit.className = "submit sticky-submit tianmao-submit";
      icon.style.display = "none";
    } else if (firstLi.innerText == "宝贝") {
      console.log(preInput);

      changeInput("sticky-baobei");
      submit.className = "submit sticky-submit";
      icon.style.display = "block";
    } else {
      changeInput("sticky-dp");
      submit.className = "submit sticky-submit";
      icon.style.display = "none";
    }
  });
})();

searchShow("search-center-input"); //实现第一个输出框搜索符号的消失
checkedClick("detaile-item"); // 选项卡功能的实现
hiddenAfterOneClick("shut", "code"); //点击一次隐藏
mouseShowBox("left-list"); //左侧侧边栏的功能实现
mainRightNav("right-nav-list"); //mian 右边小导航栏的功能实现
categroyThreeLi("content-list"); //categroy前三个li的功能

/* 轮播图功能的实现 */
{
  let swiper = document.getElementsByClassName("swiper-img-box")[0];
  let arrowLeft = document.getElementsByClassName("left-arrow")[0];
  let arrowRight = document.getElementsByClassName("right-arrow")[0];
  let swiperWrapper = document.getElementsByClassName("swiper-top")[0];
  let dots = document.getElementsByClassName("dots-list")[0].children;
  let index = 1;
  let timer = null;

  swiper.style.transition = "0.5s";
  dots[index - 1].className = "selected";
  swiper.style.left = "-520px";

  document
    .getElementsByClassName("dots-list")[0]
    .addEventListener("click", function (e) {
      let pre = index;
      let target = e.target || e.srcElement;
      let targetNumber = parseInt(target.innerHTML);

      if (targetNumber == targetNumber) {
        index = parseInt(target.innerHTML);
        swiper.style.left = -520 * index + "px";
        dots[index - 1].className = "selected";
        dots[pre - 1].className = "";
      }
    });

  /* 移动到下一个index位置 */
  function clickMove() {
    setTimeout(() => {
      swiper.style.transition = "0.5s";
      swiper.style.left = -520 * index + "px";

      dots[(index - 2) % 5].className = "";
      dots[(index - 1) % 5].className = "selected";
    }, 1);
  }

  /*设置自动轮播 */
  function setTimer() {
    timer = setInterval(() => {
      index++;

      if (index == 7) {
        swiper.style.transition = "";
        swiper.style.left = "-520px";
        index = 2;
      }

      clickMove();
    }, 2000);
  }

  swiperWrapper.addEventListener("mouseover", function () {
    clearTimeout(timer);
  });
  swiperWrapper.addEventListener("mouseleave", function () {
    setTimer();
  });

  arrowLeft.addEventListener("click", function () {
    index--;

    if (index == -1) {
      swiper.style.transition = "";
      swiper.style.left = "-2600px";
      index = 4;
    }

    setTimeout(() => {
      swiper.style.transition = "0.5s";
      swiper.style.left = -520 * index + "px";
      if (index == 0) {
        dots[4].className = "selected";
        dots[0].className = "";
      } else {
        dots[index - 1].className = "selected";
        dots[index % 5].className = "";
      }
    }, 1);
  });

  arrowRight.addEventListener("click", function () {
    index++;

    if (index == 7) {
      swiper.style.transition = "";
      swiper.style.left = "-520px";
      index = 2;
    }

    clickMove();
  });

  setTimer();
}

{
  let swiper = document.getElementsByClassName("swiper-bottom-img-wrapper")[0];
  let swiperWrapper = document.getElementsByClassName("swiper-bottom-box")[0];
  let leftArrow = document.getElementsByClassName("bottom-left-bottom")[0];
  let rightArrow = document.getElementsByClassName("bottom-right-bottom")[0];
  let swiperPage = document.getElementsByClassName("swiper-bottom-page-list")[0]
    .children;

  let pageNumber = document.getElementsByClassName("now-page")[0];
  let timer = null;
  let index = 1;

  document
    .getElementsByClassName("swiper-bottom-page-list")[0]
    .addEventListener("click", function (e) {
      let pre = index;
      let target = e.target || e.srcElement;
      let targetNumber = parseInt(target.innerHTML);

      if (targetNumber == targetNumber) {
        index = parseInt(target.innerHTML);
        swiper.style.left = -520 * index + "px";
        swiperPage[index - 1].className = "selected";
        swiperPage[pre - 1].className = "";
        pageNumber.innerHTML = index;
      }
    });

  function clickMove() {
    setTimeout(() => {
      swiper.style.transition = "0.5s";
      swiper.style.left = -520 * index + "px";

      swiperPage[(index - 2) % 6].className = "";
      swiperPage[(index - 1) % 6].className = "selected";
      pageNumber.innerHTML = ((index - 1) % 6) + 1;
    }, 1);
  }

  /*设置自动轮播 */
  function setTimer() {
    timer = setInterval(() => {
      index++;

      if (index == 8) {
        swiper.style.transition = "";
        swiper.style.left = "-520px";
        index = 2;
      }

      clickMove();
    }, 2000);
  }

  swiperWrapper.addEventListener("mouseover", function () {
    clearTimeout(timer);
  });
  swiperWrapper.addEventListener("mouseleave", function () {
    setTimer();
  });

  leftArrow.addEventListener("click", function () {
    index--;

    if (index == -1) {
      swiper.style.transition = "";
      swiper.style.left = "-3120px";
      index = 5;
    }

    setTimeout(() => {
      swiper.style.transition = "0.5s";
      swiper.style.left = -520 * index + "px";
      if (index == 0) {
        swiperPage[5].className = "selected";
        swiperPage[0].className = "";
        pageNumber.innerHTML = 0;
      } else {
        swiperPage[index - 1].className = "selected";
        swiperPage[index % 6].className = "";
        pageNumber.innerHTML = index;
      }
    }, 1);
  });

  rightArrow.addEventListener("click", function () {
    index++;

    if (index == 8) {
      swiper.style.transition = "";
      swiper.style.left = "-520px";
      index = 2;
    }

    clickMove();
  });

  setTimer();
}

let changeBackDiv = function () {
  let getDiv = function (target, attri, inner) {
    let createDiv = document.createElement(target);
    createDiv.setAttribute("class", attri);
    if (inner) {
      createDiv.innerHTML = inner;
    }

    return createDiv;
  };

  let createDiv = getDiv("div", "shadow");

  let createWrapper = getDiv("div", "shadow-wrapper");
  createDiv.appendChild(createWrapper);

  let createHeader = document.createElement("div");
  createHeader.setAttribute("class", "model-shadow-dialog");
  createWrapper.appendChild(createHeader);

  let createDialogHeader = document.createElement("div");
  createDialogHeader.setAttribute("class", "model-dialog-header");
  createHeader.appendChild(createDialogHeader);
  let h = document.createElement("h5");
  h.innerHTML = "说说我在淘宝首页的问题";
  let a = document.createElement("a");
  a.setAttribute("class", "shadow-close");
  a.setAttribute("href", "javascript:void(0)");
  a.addEventListener("click", function () {
    createDiv.style.display = "none";
  });
  createDialogHeader.appendChild(h);
  createDialogHeader.appendChild(a);

  let shadowMain = getDiv("div", "model-shadow-main");
  createHeader.appendChild(shadowMain);

  let mainCheck = getDiv("div", "main-check");
  shadowMain.appendChild(mainCheck);
  let Btn1 = getDiv("div", "btn actived", "我是买家");
  mainCheck.appendChild(Btn1);
  let Btn2 = getDiv("div", "btn", "我是卖家");
  mainCheck.appendChild(Btn2);
  Btn1.addEventListener("click", function () {
    this.className = "btn actived";
    Btn2.className = "btn";
  });
  Btn2.addEventListener("click", function () {
    this.className = "btn actived";
    Btn1.className = "btn";
  });

  let form = getDiv("form", "");
  let primePart = getDiv("div", "prime-part shadow-margin");
  form.appendChild(primePart);
  let question = getDiv("div", "question");
  let span1 = getDiv("span", "", "*");
  span1.style.color = "#f40";
  let span2 = getDiv("span", "", "问题描述");
  question.appendChild(span1);
  question.appendChild(span2);
  primePart.appendChild(question);

  let getText = getDiv("div", "get-text");
  let textRead = getDiv("textarea", "get-text-main");
  textRead.setAttribute(
    "placeholder",
    "至少5个字。不要输入您的隐私信息，如：支付宝密码。"
  );
  getText.appendChild(textRead);
  primePart.appendChild(getText);

  let partInput = getDiv("div", "part-input shadow-margin");
  let p = getDiv("p", "part-input-title", "联系方式");
  let yourWay = getDiv("input", "your-way");
  partInput.appendChild(p);
  partInput.appendChild(yourWay);
  primePart.appendChild(partInput);
  shadowMain.appendChild(form);

  let getPic = getDiv(
    "div",
    "get-pic shadow-margin",
    `<button class="get-pic-btn">
  <span class="img"></span>
  添加截图
</button>`
  );

  form.appendChild(getPic);

  let modelLast = getDiv("div", "model-shadow-main-last");
  let btn3 = getDiv("button", "submit", "提交");
  modelLast.appendChild(btn3);
  shadowMain.appendChild(modelLast);

  document.body.appendChild(createDiv);

  return createDiv;
};

let getSingle = function (fn) {
  let result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

let creatSingleBackFrame = getSingle(changeBackDiv);

document
  .getElementsByClassName("backframe")[0]
  .addEventListener("click", function () {
    let onlyBackFrame = creatSingleBackFrame();
    onlyBackFrame.style.display = "block";
  });

//点击显示要显示的内容，在别处点击隐藏
function clickShowOuterClickHidden(originClass, targetClass) {
  let origin = document.getElementsByClassName(originClass)[0];
  origin.addEventListener("click", function (e) {
    stopBubble(e);
    let target = document.getElementsByClassName(targetClass)[0];
    target.style.display = "block";

    window.addEventListener("click", function () {
      if (target.style.display == "block") {
        target.style.display = "none";
      }
    });
  });
}

// 充话费的功能
{
  let ChoiceValue = document.getElementsByClassName("choice-value")[0];

  clickShowOuterClickHidden("chuafeidianhuapu", "tel-tip");
  clickShowOuterClickHidden("choice-input", "choice-value-wrapper");
  clickShowOuterClickHidden("chuafeixiajianto", "choice-value-wrapper");
  ChoiceValue.addEventListener("click", function (e) {
    let target = e.target || e.srcElement;
    let text = target.innerText.split("");
    let length = text.length;
    let choiceInput = document.getElementsByClassName("choice-input")[0];

    if (text[length - 1] != "元") {
      text[length] = "元";
      text.splice(0, 1);
    } else {
      text.splice(0, 2);
    }

    choiceInput.value = text.join("");
  });
}
