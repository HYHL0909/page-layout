window.onload = function () {
    let container = document.querySelector('.slider-box');
    let list = document.querySelector('.list');
    let prev = document.querySelector('#prev');
    let next = document.querySelector('#next');
    let buttons = document.querySelector('.button').querySelectorAll('span');
    let index = 0;
    let animated = false;
    const IMG_WIDTH = 590;
    const IMG_NUM = 5;


    for (let button of buttons) {
        button.onclick = function () {
            let imgIndex = +button.getAttribute('index');
            list.style.left = -(imgIndex + 1) * IMG_WIDTH + "px";
            index = imgIndex;
            showButton();
        }
    }

    function showButton() {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].className == "on") {
                buttons[i].className = "";
                break;
            }
        }
        buttons[index].className = "on";
    }

    play();
    function play() {
        timer = setInterval(() => next.onclick(), 2000);
    }

    function stop() {
        clearInterval(timer);
    }
    
    container.onmouseout = function () {
        play();
    }
    container.onmouseover = function () {
        stop();
    }



    next.onclick = function () {
        index++;
        index = index % IMG_NUM;
        showButton();
        if (!animated) {
            animate(-IMG_WIDTH);
        }

    }

    prev.onclick = function () {
        index--;
        if (index < 0) {
            index = index + IMG_NUM;
        }
        showButton();
        if (!animated) {
            animate(IMG_WIDTH);
        }

    }


 

    function animate(offset) {
        animated = true;
        let newLeft = parseInt(list.style.left) + offset;
        let time = 300; //位移总时间
        let interval = 10; //位移间隔时间
        let speed = offset / (time / interval); //每次移动的距离，一共移动的次数。

        go();

        function go() {
            if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left
            ) < newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            }
            else {
                animated = false;
                list.style.left = newLeft + "px";
                if (newLeft < -IMG_NUM * IMG_WIDTH) {
                    list.style.left = "-"+IMG_WIDTH+"px";
                }
                if (newLeft > -IMG_WIDTH) {
                    list.style.left = "-"+IMG_WIDTH*IMG_NUM+"px";
                }
            }
        }



    }
}
