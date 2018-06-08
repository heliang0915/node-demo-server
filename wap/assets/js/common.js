/**Vue公共指令部分**/

//vue滚动指令
Vue.directive("rolling",function(el,binding){
    setTimeout(function () {
        var timer=null;
        var list=binding.value;
        var interval=2000;
        var translateY=0;
        var transition=".5s";
        var index=0;
        var scroll =el;
        var children = scroll.children;
        var defaultHeight = parseFloat(window.getComputedStyle(children[0]).height);
        window.onresize=function () {
            defaultHeight=parseFloat(scroll.scrollHeight);
        }
        timer = setInterval(function () {
            move();
        }, interval)
        scroll.addEventListener('mouseover',function(){
            clearInterval(timer);
        })
        scroll.addEventListener('mouseleave',function(){
            timer=setInterval(function(){
                move();
            },interval);
        })
        scroll.addEventListener('transitionend',function(){
            if(index==list.length){
                clearTimeout(timer);
                index=0;
                transition="0s";
                translateY=-(index*defaultHeight);
                setTimeout(function(){ //这块时间差是用来做切换使用的
                    move();//先执行一下 防止等待时间过长问题
                    //从第二条开始重新执行定时器
                    timer = setInterval(function () {
                        //重新开启过度
                        transition=".5s";
                        move();
                    }, interval)
                },50)
            }
        })
        function move(){
            scroll.style.transform='translateY(-'+index*defaultHeight+'px)';
            scroll.style.transition='all '+transition;
            index++;
        }
    },10)

})
