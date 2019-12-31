$(document).ready(function(){    //script exicute after loading of the page
    
    $("body").css("paddingTop",$(".navbar").innerHeight()+15);  //setting up the body with the navbar
    
    $("a").click(function(e){     //setting up the elements of the nav bar
        e.preventDefault();
        $("html,body").animate({
            scrollTop: ($("#" + $(this).data("scroll")).offset().top + 1)
        },500);
        $(this).addClass("active").parent().siblings().find("a").removeClass("active");
    });
    
    $(window).scroll(function(){     //setting up the color of current section on navbar
        $(".block").each(function(){
            if($(window).scrollTop() > $(this).offset().top){
                var divId = $(this).attr("id");
                $("a").each(function(){
                    if($(this).data("scroll") === divId){
                        $(this).addClass("active").parent().siblings().find("a").removeClass("active");
                    }
                });
            }
        });
        if($(window).scrollTop() > 350){
            $(".up").fadeIn(500);
        }else{
            $(".up").fadeOut(500);
        }
        $(".up").click(function(){
            $(window).scrollTop(0);
            $("a").removeClass("active");
        });
    });
    
    $(".show").click(function(){   //setting up the popup message
        $("." + $(this).data("popup")).fadeIn(400);
    });
    $(".popup").click(function(){
        $(this).fadeOut(400);
    });
    $(".popup .inner").click(function(e){
        e.stopPropagation();
    });
    $(".close").click(function(e){
        e.preventDefault();
        $(this).parentsUntil(".popup").parent().fadeOut(400);
    });
    $(document).keydown(function(e){
        if(e.keyCode === 27){
          $(".popup").fadeOut(400);  
        }
    });
    
    $(".from-left").hover(function(){          //setting up some effects on the buttons
        $(this).find("span").eq(0).animate({
            width: "100%"
        },400);
    },function(){
        $(this).find("span").eq(0).animate({
            width: "0"
        },400);
    });
    $(".progress span").each(function(){
        $(this).animate({
            width: $(this).data("progress") + "%"
        },2000);
        $(this).text($(this).data("progress") + "%");
    });
    
    $(".menu-btn").on("click",function(){     //setting up the side menu
        $(this).parent().toggleClass("isVisible");
        if($(this).parent().hasClass("isVisible")){
            $(this).parent().animate({
                left: $(this).parent().innerWidth() - $(this).parent().innerWidth()
            },1000);
        }else{
            $(this).parent().animate({
                left: "-" + $(this).parent().innerWidth()
            },1000);
        }
    });
    $(".changecolor li").on("click",function(){
        $(".block").css("backgroundColor",$(this).data("color"));
    });
    
    $(".gallary .small img").each(function(){        //setting up the slider
        $(this).on("click", function(){
            $(".big img").hide().attr("src",$(this).attr("src")).fadeIn(500);
            $(this).addClass("selected").siblings().removeClass("selected");
        });
    });
    $(".gallary .next-slide").on("click", function(){
        if($(".selected").is(":last-child")){
            $(".small img").eq(0).click();
        }else{
            $(".selected").next().click();
        }
    });
    $(".gallary .prev-slide").on("click", function(){
        if($(".selected").is(":first-child")){
            $(".small img:last").click();
        }else{
            $(".selected").prev().click();
        }
    });
    
    $(".grid-btn").on("click", function(){     //setting up list style
        $(".items").hide().removeClass("list-view").addClass("grid-view").fadeIn(400);
    });
    $(".list-btn").on("click", function(){
        $(".items").hide().removeClass("grid-view").addClass("list-view").fadeIn(400);
    });
    
    var placeholder;
    $("[placeholder]").focus(function(){              //setting up the form
        placeholder = $(this).attr("placeholder");
        $(this).removeAttr("placeholder");
    }).blur(function(){
        $(this).attr("placeholder",placeholder);
    });
    $("[required]").blur(function(){
        if($(this).val() == ""){
            $(this).next("span").fadeIn().delay(1000).fadeOut();
            $(this).css({
                "direction": "ltr",
                "text-indent": "0px"
            });
        }else{
            $(this).next("span").fadeOut();
        }
    });
    
    $("<span class='asterk'>*</span>").insertBefore(":input[required]");
    $(".asterk").css({
        "top": "9px",
        "right": "25px",
        "position": "absolute",
        "color": "red",
        "font-size": "26px"
    });
    $("input[type='file']").wrap("<span class='myfile'></span>");
    $(".myfile").prepend("<span>Upload Your File</span>");
    $("input[type='file']").change(function(){
        $(this).prev("span").text($(this).val());
    });
    $("[required]").on("keyup",function(){
        if($(this).val().charCodeAt(0) < 200){
            $(this).css({
                "direction": "ltr",
                "text-indent": "0px"
            });
        }else{
            $(this).css({
                "direction": "rtl",
                "text-indent": "15px"
            });
        }
    });
    
    var i=0;                                   
    $(".add-tags").on("keyup",function(e){              //add tags
        var key = e.keyCode || e.which;
        if(key === 188){
            $(".myform .tags").css({
                "width": "90%",
                "margin": "10px auto",
                "padding": "10px"
            });
            var tag = $(this).val().slice(0, -1);
            $(".tags").append("<span class='the-tag'>"+ "<i class='deltag'>x</i>"+ " " + tag +"</span>");
            $(this).val("");
           i++; 
        }
    });
    $(".tags").on("click",".the-tag .deltag",function(){
        $(this).parent(".the-tag").fadeOut(200);
        i--;
        if( i===0 ){
            $(".myform .tags").css({
                "width": "90%",
                "margin": "0",
                "padding": "0"
            });
        }
    });
    
    var zIndexVal = 0;                  
    $(".card").on("click",function(){       //setting up the cards
        zIndexVal--;
        $(this).animate({
            left: "10%",
            top: "200px"
        },400,function(){
            $(this).css("z-index",zIndexVal);
        }).animate({
            left: $(this).css("left"),
            top: $(this).css("top")
        },400);
    });
    
    var theTxt = $(".typer").data("text"),        //setting up the pragraph view
            n = 0,
            typer = setInterval(function(){
                $(".typer").each(function(){
                    $(".typer").html($(".typer").html() + theTxt[n]);
                });
                n++;
                if(n >= theTxt.length){
                    clearInterval(typer);
                }
            },75);
});