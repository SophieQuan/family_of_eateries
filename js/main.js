/* jslint browser: true */
/* global $, TweenMax */

// hide all screens and section divs
$("main, section").hide();

// SPLASH SCREEN //////////////////////////////////////////////

$("#splash").show();

TweenMax.from("#splash", 0.5, {
    delay: 0.25,
    opacity: 0 
});

TweenMax.from("#splash img", 1,{
    delay: 0.5,
    scale: 0,
    rotationY:360,
    ease: Back.easeOut
});

TweenMax.to("#splash", 0.5, {
    delay: 4,
    opacity: 0, 
    onComplete: loadLanding
});

// LANDING SCREEN ///////////////////////////////////////////

function loadLanding()
{
    $("main, section").hide().css({opacity:1});
    
    $("#landing").show();
    
    TweenMax.from("#landing", 0.5, {
        delay: 0.25,
        opacity: 0 
    });

    TweenMax.from("#landing header", 0.5, {
        delay: 0.5,
        y: -$("#landing header").outerHeight(),
        ease: Power1.easeOut
    });

    TweenMax.from("#landing footer", 0.5, {
        delay: 0.5,
        y: $("#landing footer").outerHeight(),
        ease: Power1.easeOut
    });
    /*animate 3 logos balls*/
    TweenMax.from("#logo1, #logo2, #logo3", 1, {
        delay: 1.25,
        x:100,
        ease: Power1.easeOut
    });
    TweenMax.from("#logo1", 0.5, {
        opacity:0,
        delay: 0.5,
        x:100,
        ease: Power1.easeOut
    });
    TweenMax.from("#logo2", 0.5, {
        opacity:0,
        delay: 0.75,
        x:100,
        ease: Power1.easeOut
    });
    TweenMax.from("#logo3", 0.5, {
        opacity:0,
        delay: 1,
        x:100,
        ease: Power1.easeOut
    });
    /*logos text*/
    TweenMax.from("#landing1 p", 0.5, {
        opacity:0,
        delay: 1.5,
        ease: Power1.easeOut
    });
    TweenMax.from("#landing2 p", 0.5, {
        opacity:0,
        delay: 1.75,
        ease: Power1.easeOut
    });
    TweenMax.from("#landing3 p", 0.5, {
        opacity:0,
        delay: 2,
        ease: Power1.easeOut
    });
    
    
    // logo clicks
    $("#landing1").click(function() {
        
        TweenMax.to("#landing", 0.5, {
            opacity: 0,
            onComplete: loadRest,
            onCompleteParams: ["#rest1", "#c24038"]
        });
        
    });
    
    $("#landing2").click(function() {
        
        TweenMax.to("#landing", 0.5, {
            opacity: 0,
            onComplete: loadRest,
            onCompleteParams: ["#rest2", "#ff6600"]
        });
        
    });
    
    $("#landing3").click(function() {
        
        TweenMax.to("#landing", 0.5, {
            opacity: 0,
            onComplete: loadRest,
            onCompleteParams: ["#rest3", "#7ad84c"]
        });
        
    });
}

// RESTAURANT SCREENS ///////////////////////////////////////////

function loadRest(restID, highlightColour)
{
    $("#landing").hide();
    
    $(restID).show();
    
    TweenMax.from(restID + " header", 0.5, {
        delay: 0.25,
        y: -$(restID + " header").outerHeight(),
        ease: Power1.easeOut
    });
    TweenMax.from(restID + " footer", 0.5, {
        delay: 0.25,
        y: $(restID + " footer").outerHeight(),
        ease: Power2.easeOut
    });
    
    //highlight about icon in footer
    $(".aboutIcon").css({background:highlightColour});
    
    //load the about section
    $(restID + " .about").show();
    
     // animate on about section
    TweenMax.from(restID + " .about", 0.5, {
        delay: 0.25,
        opacity:0,
        y:-5,
        ease: Power2.easeOut
    });
    
    
    //loop through and review elements on home screen with .reveal class applied
    $(restID + " .about .reveal").each(function(i) {
        TweenMax.from(this, 0.5, {
            delay: 0.5 + i * 0.25,
            opacity:0,
            y:-5,
            ease: Power2.easeOut
        });
    });
    
// create var to target icons from selected restaurant
    var iconsTarget = restID + " .aboutIcon," + restID + " .specialsIcon, " + restID + " .reservationsIcon";
    
    // remove highlight and active class from all icons
    $(iconsTarget).css({background: 'none'}).removeClass("active");
    
    // highlight home icon and add active class on restaurant load
    $(restID + " .aboutIcon").css({background: highlightColour}).addClass("active");
    
    // set up section nav - highlight and load section
    $(iconsTarget).click(function() {
        
        // check if selected button has active class... If it doesn't allow
        if(!$(this).hasClass("active"))
        {
            // remove highlight and active class from all icons
            $(iconsTarget).css({background: 'none'}).removeClass("active");

            // add highlight and active class to selected icon based on highlight colour
            $(this).css({background: highlightColour}).addClass("active");

            // load selected section - send current section and section to load
            loadSection(restID + " section", restID + " " + $(this).attr("data-section"));
        }

    });

}
// REUSABLE FUNCTIONS/CLICKS /////////////////////////////////////

// function for loading internal restaurant sections
function loadSection(prevSection, nextSection)
{
    TweenMax.to(prevSection, 0.5, {
        opacity:0,
        ease: Power0.easeOut,
    
        onComplete: function() {
            $(prevSection).hide().css({opacity:1});
            $(nextSection).show().scrollTop(0);
        }
    });
    
    // animate on next section
    TweenMax.from(nextSection, 0.5, {
        delay: 0.5,
        opacity: 0
    });

    // loop through and reveal all elements on next screen with .reveal class applied
    $(nextSection + " .reveal").each(function(i) {

        TweenMax.from(this, 1, {
            delay: 0.5 + i * 0.25,
            opacity:0,
            y:-5,
            ease: Power2.easeOut
        });
        
        
    });
}

// set up reservations submit button
$(".reserve").click(function (e){
    e.preventDefault();
    swal({
    title: 'Thank you!',
    text: 'Your reservation has been confirmed!',
    type: 'success',
    confirmButtonText: 'Done',
    confirmButtonColor: '#ff00ff'
    });
});


// set up hamburger menu to reveal main menu
$(".hamburger").click(function(){
    
    if ($(this).attr("data-click-state")=="1")
    {
        $(this).attr("data-click-state", 0);
        
        $(this).attr("src","images/hamburger2close.gif");
        
        $("#menu").show();
        
        TweenMax.to(".rest", 1, {           
            x: -310,
            ease: Power2.easeOut
        });
    }
    else
    {
        $(this).attr("data-click-state", 1);
        
        $(this).attr("src","images/close2hamburger.gif");
        
        TweenMax.to(".rest", 1, {
            x: 0,
            ease: Power2.easeOut,
            onComplete: function() {
                $("#menu").hide();
            }
        });
    }
    
});

// set up main menu links
// go back to landing screen
$("#backToLanding").click(function() {
    
    $(".hamburger").attr("data-click-state", 1);
        
    $(".hamburger").attr("src","images/close2hamburger.gif");

    TweenMax.to(".rest", 1, {
        x: 0,
        ease: Power2.easeOut,
        onComplete: function() {
            $("#menu").hide();
            
            TweenMax.to(".rest", 1, {
                opacity:0,
                onComplete: loadLanding
            });
        }
    });
    
});
// reveal FoE contact info      
$("#contact").click(function (){
    swal("Family of Eateries Contact Info", "For more info please visit our website at www.familyofeateries.ca","info");
});

// reveal FoE about info      
$("#aboutApp").click(function (){
    swal("About Family of Eateries", "Founded in 2015, over 15,000 Restaurants use Family of Eateries App to showcase their menu, offers and let customers place orders or make reservations.", "info");
    
});


