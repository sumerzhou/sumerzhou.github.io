window.onload=function(){
    var hdtopbut=document.getElementsByClassName('hdtopbut');
    var as=hdtopbut[0].getElementsByTagName('a');
    var lag=document.getElementById('lag');
    var hdmenu=document.getElementById('hdmenu');
    var imgbtn=document.getElementById('imgbtn');
    var searcharea=document.getElementById('searcharea');
    var bannerimg=document.getElementById('bannerimg');
    var newsbox=document.getElementById('newsbox');
    var introbox=document.getElementById('introbox');
    var casebox=document.getElementById('casebox');
    var boxs=document.getElementsByClassName('box');
    /*console.log(boxs.length);*/
    var rightBtn=document.getElementById('rightBtn');
    var lis=rightBtn.getElementsByTagName('li');



//导航栏悬浮
    var hdstr=["imgs/sns_blog_on.png","imgs/sns_facebook_on.png","imgs/sns_gBlog_on.png","imgs/sns_in_on.png","imgs/sns_youTube_on.png","imgs/sns_instagram_on.png","imgs/sns_kakao_on.png"];
    var hdstr1=["imgs/sns_blog_off.png","imgs/sns_facebook_off.png","imgs/sns_gBlog_off.png","imgs/sns_in_off.png","imgs/sns_youTube_off.png","imgs/sns_instagram_off.png","imgs/sns_kakao_off.png"];
    for(var i=0;i<7;i++){
        as[i].n=i;
        as[i].onmouseenter= function () {
             as[this.n].getElementsByTagName('img')[0].src=hdstr[this.n];
            as[this.n].onmouseleave=function(){
                as[this.n].getElementsByTagName('img')[0].src=hdstr1[this.n];
            }
        }
    }

//背景图片大小
    var innerH=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
    bannerimg.style.height=innerH-101+'px';
    newsbox.style.height=innerH+'px';
    introbox.style.height=innerH+'px';
    casebox.style.height=innerH+'px';

    window.onresize=function () {
       innerH=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
       bannerimg.style.height=innerH-101+'px';
       newsbox.style.height=innerH+'px';
       introbox.style.height=innerH+'px';
       casebox.style.height=innerH+'px';
    }

//滚动条事件
   var scroll;
   if(BrowserDetect.browser=="Firefox"||BrowserDetect.browser=="Internet Explorer"||BrowserDetect.version=='11'){
        scroll=document.documentElement;
   }else{
        scroll=document.body;
   }
   var index=0;
   var indexTop;
   scroll.scrollTop=0;
   var ifmove=true;
   var ifup=false;
   window.onscroll=boxmove;
   function boxmove(){
     var scrotop=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
     if(scrotop>boxs[index].offsetTop){
         if(ifup||index>2){
             return;
         }
         lis[index].getElementsByTagName('img')[0].src='imgs/menu_off.png';
         indexTop=boxs[++index].offsetTop;
         lis[index].getElementsByTagName('img')[0].src='imgs/menu_on.png';
         /*console.log(index);*/
         starmove(indexTop,scroll);
         ifmove=false;
     }
     if(ifmove){
        if(index>0&&scrotop<boxs[index].offsetTop){
              ifup=true;
              lis[index].getElementsByTagName('img')[0].src='imgs/menu_off.png';
              indexTop=boxs[--index].offsetTop;
              lis[index].getElementsByTagName('img')[0].src='imgs/menu_on.png';
              /*console.log('returnback:'+index);*/
              starmove(indexTop,scroll);
        }
     }
   }

//滚动条定位缓冲运动
    function starmove(target,obj){
        clearInterval(obj.times);
        obj.times=setInterval(function(){
            var speed=(target-obj.scrollTop)/10;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(obj.scrollTop==target){
                clearInterval(obj.times);
                window.onscroll=boxmove;
                ifmove=true;
                ifup=false;
            }else{
                obj.scrollTop=obj.scrollTop+speed;
            }
        },30);
    }

//侧边栏点击事件及侧边栏动画
    for(var j=0;j<4;j++){
        lis[j].n=j;
        lis[j].onclick=function () {
            window.onscroll=null;
            lis[index].getElementsByTagName('img')[0].src='imgs/menu_off.png';
            this.getElementsByTagName('img')[0].src='imgs/menu_on.png';
            starmove(boxs[this.n].offsetTop,scroll);
            index=this.n;
        }
    }
   var mouse=document.getElementsByClassName('mouse');
   var speed;
    setInterval(function () {
        if(mouse[0].offsetTop>=180){
           speed=-5;
        }
        if(mouse[0].offsetTop<=160){
            speed=5;
        }
        mouse[0].style.top=mouse[0].offsetTop+speed+'px';
    },80);









}










// header切换效果
var lagFlag=true;
var menuFlag=true;
function ifshow(x){
    if(x==0){
       if(lagFlag){
           lag.style.display='block';
           lagFlag=false;
       }else {
           lag.style.display='none';
           lagFlag=true;
       }
    }
    if(x==1){
        if(menuFlag){
            hdmenu.style.display='block';
            menuFlag=false;
            imgbtn.src='imgs/btn_close2.png';
        }else {
            hdmenu.style.display='none';
            menuFlag=true;
            imgbtn.src='imgs/btn_gnb.png';
        }
    }
    if(x==2){
        searcharea.style.display='block';
    }
    if(x==3){
        searcharea.style.display='none';
    }
}


//取样式
function getStyle(obj,attr){
    if(obj.currentStyle){//IE取样式
        return parseInt(obj.currentStyle[attr]);
    }else{
        return parseInt(getComputedStyle(obj,false)[attr]);
    }
}