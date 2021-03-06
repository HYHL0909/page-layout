# page-layout

### 盒子模型

宽

高

边框  大小， 线型  颜色

margin：逆时针 上

padding ：盒子与盒子元素之间的距离

height width指的是内容的。增加border

margin padding不会改变内容的尺寸，但是会增加元素框的总尺寸

 

### 首页制作

#### 首页制作分析

##### 商场类的导航。（css）

京东

![image-20220415200204184](https://raw.githubusercontent.com/HYHL0909/images/main/202204152002467.png)



![image-20220415200238070](https://raw.githubusercontent.com/HYHL0909/images/main/202204152002147.png)



###### 细节实现：
选中li 

- 上下有边框，而且有发光（box-shadow）的效果
- 右边的箭头会消失。（右边箭头用背景图片显示，将背景图片改成none）
- 会显示动态展示层
  - 外边框是灰色的，有发光效果
  - 外边框用div实现，就是margin-left是li的宽度。
  - z-index设置悬浮层展现顺序。
  - 悬浮层与li之间的线要消失
    - 实现的方式是写一个span，让它大一点去，z-index高一点去盖住那条线。
  - 使用dl dt dd 去实现，效果比较好。对搜索引擎比较好。
  - dd里a的线是将a变成block 然后设置边界线，至于间隔，padding解决 。

##### 轮播图

知识点：

dom操作：

document.querySelector('');

document.querySelectorAll('');

定时器 

事件运用

js动画 

函数递归

无限滚动。



布局：就是一个

大的div container，宽度为一张图片的宽度。然后设置这个div的overflow为hidden。让那些溢出的消失。这样看起来就好像是只有一张图显示。

div list里放着很多img，通过改变list的left值实现切换。list设置宽度是所有图片宽度的总和。img是inline，因此能够展现在一行上，但是由于img里有换行，因此图片间会有间隔，解决这个问题，就是让  img 浮动。空格属于文字，就会环绕在图片后面。

在有一个div放置很多button，通过定位和z-index就可以将他们放在图片上面。

~~~html
 <div class="container">
        <div class="list" style="
        left:-600px">
            <img src="../img/5.jpg" alt="">
            <img src="../img/1.jpg" alt="">
            <img src="../img/2.jpg" alt="">
            <img src="../img/3.jpg" alt="">
            <img src="../img/4.jpg" alt="">
            <img src="../img/5.jpg" alt="">
            <img src="../img/1.jpg" alt="">
        </div>
        <div class="button">
            <span index="0" class="on"></span>
            <span index="1"></span>
            <span index="2"></span>
            <span index="3"></span>
            <span index="4"></span>
        </div>
        <a href="javascript:;" class="arrow" id="prev">&lt;</a>
        <a href="javascript:;" class="arrow" id="next">&gt;</a>
    </div>
~~~



样式的书写：

箭头放置在上下的中间，一左一右

上下居中的办法：

~~~css
top: 50%;
transform: translateY(-50%);
~~~

~~~css
#next {
   right: 20px;
}

#prev {
   left: 20px;
}
~~~

将鼠标移入图片显示箭头（css），将鼠标移入箭头箭头改变透明度。

~~~css
.container:hover .arrow {
     display: block;
}
.arrow:hover {
     background-color: RGBA(0, 0, 0, .7);
}
~~~



显示小圆点，可以通过点击小圆点跳到指定的图片，而且能够无限滚动。

小圆点的实现：

使用border-radius:50%;

小圆点也要放在下面居中。默认第一个选中，选中设置另外的颜色。



JavaScript实现事件：

window.onload() = function() {

}

页面加载完成执行事件

修改小圆点的选中状态

- 先将选中的清理
- 再将现在的加上样式

点击小圆点切换图片：

- 小圆点上有index属性，自定义属性的获取需要通过getAttribute。
- 修改list的left。
- 修改小圆点的选中状态

点击左右箭头进行切换图片，并且修改小圆点的选中状态。

- 修改left值
- 无限滚动：index>图片数量，让它回到0。index<0,加上图片数量
- 修改小圆点的选中状态。

轮播图的切换有动画效果：

- 多添加两张图片。为什么？因为加了动画会有一个白色的切换，这很不好。

- 将位移分次数完成，这样会有一个慢慢拉过去的动画效果。

- 如果要向左移，则left要减小，而此时left还大于目标left，说明还没有移到位。此时要移动，而且递归调用自身。

  ~~~JavaScript
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
                              list.style.left = "-600px";
                          }
                          if (newLeft > -IMG_WIDTH) {
                              list.style.left = "-3000px";
                          }
                      }
                  }
  
  
  
              }
  ~~~

  

鼠标不在轮播图里自动轮播

加载完成后就执行play（），要不然待会stop执行时没有timer会报错。

~~~JavaScript
   container.onmouseout = function () {
                play();
            }
function play(){
    timer = setInterval(() => next.onclick(), 2000);
}
~~~



鼠标移入轮播图里停止自动轮播

~~~JavaScript
 container.onmouseover = function () {
                stop();
            }
 function stop() {
                clearInterval(timer);
            }
~~~





js onclick事件闪一下又变回去问题解决
原因：点击事件在a标签中，而点击后a标签会重新刷新页面

解决办法：①将a标签改掉②在href中添加 javascript:; （如下图所示）

~~~html
<a href="javascript:;" class="arrow" id="prev">&lt;</a>
~~~



### 原生js实现JD首页

![image-20220417205445992](https://raw.githubusercontent.com/HYHL0909/images/main/202204172054122.png)

网页基本骨架搭建

![image-20220417225021956](https://raw.githubusercontent.com/HYHL0909/images/main/202204172250296.png)



布局：

container

- nav
  - ul
    - li

- header
  - logo-box
    - a
      - img
  - search-box
    - search-bar
      - input
      - button
      - button
    - ul
      - li

- content

  - wrapper

    - menu-box
    - slider-box
    - ad-box
    - info-box

  - wrapper

    

    

实现导航栏

![image-20220418002401091](https://raw.githubusercontent.com/HYHL0909/images/main/202204180024454.png)

想要让文字的固定在一块里，因此我们添加一个nav-box容器。

想要nav-box容器居中，我们可以使用 margin：0 auto，实现左右居中。

li是块标签，想要让它排一列，我们设置它为inline-block，设置成inline 我们就没有办法设置高度。设置成inline-block，然后给它设置border-right，让它右边出现小竖线。小竖线的高度就是height的高度，如果觉得太长就把height调低，此时通过上下添加margin，让li居中。

~~~css
.nav ul li {
    display: inline-block;
    border-right:1.5px solid #999999;
    padding: 0px 10px;
    font-size:12px;
    height: 16px;
    line-height: 16px;
    margin:7px auto;
}
.nav ul li:last-child{
    border-right:none;
}
~~~

设置小竖线方法二：使用伪元素，这样就可以让li的高度与容器高度一致，伪元素单独设置高度。

~~~css
.nav ul li {
    display: inline-block;
    padding: 0px 5px;
    font-size:12px;
    height: 30px;
    line-height: 30px;
}

.nav ul li:not(:last-child)::after{
    content:"|";
    height:14px;
    color:#999999;
    margin-left:10px;

}
~~~



头部：

<img src="https://raw.githubusercontent.com/HYHL0909/images/main/202204181111906.png" alt="image-20220418111101073" style="zoom:150%;" />

- header-box

  - header

    - logo-box

      - a
        - img

    - search-box

      - search-bar
        - input
        - button
        - button
      - recommend
      - hot-words

      

header：

- 用flex布局：让logo-box和search-box在一行。

- 要居中。margin：0 auto

logo-box：

让图片撑满的办法：

- 首先设置logo-box overflow:hidden,将溢出盒子的藏起来。

- 然后设置图片宽度为100%

  

search-box：relative

hot-word:absolute，使用bottom ，right进行定位。



search-bar：

display：flex；然后子组件之间的距离用padding或者margin显示。

input：

- outline：none，就是不要选中的时候外边有个发光



![image-20220423121531990](C:/Users/Elvira/AppData/Roaming/Typora/typora-user-images/image-20220423121531990.png)



ul  topmenu

- li

  - a 

  - div  submenu

    - div  left

      - dl
        - dt
        - dd

    - right（ad box）

      

      

    
