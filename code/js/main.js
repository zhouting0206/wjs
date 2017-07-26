/**
 * Created by ZHTING on 2017/6/6.
 */
$(function(){
    function resize(){
        var screenWidth=$(window).width();
        var isSmallScreen=screenWidth<768;
        //   遍历所有的item
        $("#main_ad>.carousel-inner>.item").each(function(i,ele){
            var $ele=$(ele);
            //   得到的是DOM对象，所以需要转换
            var imgSrc=$ele.data(isSmallScreen?"image-xs":"image-lg")
            $ele.css("backgroundImage","url("+imgSrc+")")
            //console.log(1111)
            if(isSmallScreen){
                $ele.html("<img src='"+imgSrc+"' />")
            }else{
                $ele.empty();//   当为大图的时候清空img
            }
        })


        //   tab栏横向滚动条
        var $ulContainer=$(".nav-tabs");

        //console.log($ulContainer.children())
        var width=30;//   因为tab有个padding值，以及每个li还有单独的宽度，所以将初始值调大一点
        $ulContainer.children().each(function(index,ele){
            //console.log( ele.clientWidth)
            // console.log($(ele).width())
            width+=ele.clientWidth;
            //   当在pc端的时候就不应该出现滚动条，所以要进行判断
            if(width>$(window).width()){
                $ulContainer.css("width",width).parent().css("overflow-x","scroll")
            }

        })
    }
$(window).on("resize",resize).trigger("resize");
    $('[data-toggle="tooltip"]').tooltip();

//   改变新闻面板的标题
    //  获取当前点击的元素
    $("#news .nav-pills a").on("click",function(){
        //  将this本地化
        $this=$(this);
        //   得到相对应的title值
        var title=$this.data("title")
        $(".news-title").text(title)

    })

    //  将相应的title值设置相应的位置

    //   手指触碰
    var $carousel=$(".carousel");
    var startX,endX;
    var offset=50;
    $carousel.on("touchstart",function(e){
        startX=e.originalEvent.touches[0].clientX;
        //console.log(e.originalEvent.touches[0].clientX)
    })
    $carousel.on("touchmove",function(e){
        endX=e.originalEvent.touches[0].clientX;
        //console.log(e.originalEvent.touches[0].clientX)
    })
    $carousel.on("touchend",function(e){
       console.log(startX>endX?"←":"→")
        var distance=Math.abs(endX-startX);
        if(distance>offset){
            $(this).carousel(startX>endX?"next":"prev")
        }

    })
    //.carousel('next')


})