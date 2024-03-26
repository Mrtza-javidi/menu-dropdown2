$(document).ready(function() {

  // wide screen nav settings

  const wideNavItem = $('nav#wide-screen > .left-column .item');
  const wideSubMenuSubLink = $("nav#wide-screen > .left-column .sub-link");

  let wideCurrentItem = null;
  let wideResetItemTimer1;
  let wideCurrentSubLink = null;
  let wideResetSubLinkTimer2;
        
  

  function attachHandler() {
    $(wideNavItem).mouseenter(wideNavMouseEnter).mouseleave(wideNavMouseLeave);
    $(wideSubMenuSubLink).mouseenter(wideSubMenuSubLinkMouseEnter).mouseleave(wideSubMenuSubLinkMouseLeave);
  }

  function detachHandler() {
    $(wideNavItem).off('mouseenter', wideNavMouseEnter).off('mouseleave', wideNavMouseLeave);
    $(wideSubMenuSubLink).off('mouseenter', wideSubMenuSubLinkMouseEnter).off('mouseleave', wideSubMenuSubLinkMouseLeave);
  }

  function checkWindowSize() {
    var windowWidth = $(window).width();

    if (windowWidth >= 1330) {
      attachHandler();
    } else {
      detachHandler();
    }
  }

  $(window).resize(checkWindowSize);
  checkWindowSize();

  // Define mouse event functions
  function wideNavMouseEnter() {
    var navSubMenu = $(this).find('.sub-menu');
    if (wideCurrentItem) {
      clearTimeout(wideResetItemTimer1);
      wideCurrentItem.find('.sub-menu').removeClass('show-opacity-visible').addClass('hide-opacity-visible');
    }
    navSubMenu.removeClass('hide-opacity-visible').addClass('show-opacity-visible');
    wideCurrentItem = $(this);
  }

  function wideNavMouseLeave() {
    wideResetItemTimer1 = setTimeout(() => {
      if (wideCurrentItem && !wideCurrentItem.is(':hover')) {
        wideCurrentItem.find('.sub-menu').removeClass('show-opacity-visible').addClass('hide-opacity-visible');
        wideCurrentItem = null;
      }
    }, 400);
  }

  function wideSubMenuSubLinkMouseEnter() {
    var childMenu = $(this).find('.child-menu');
    if (wideCurrentSubLink) {
      clearTimeout(wideResetSubLinkTimer2);
      wideCurrentSubLink.find('.child-menu').removeClass('show-opacity-visible').removeClass('sub-menu-slide-left-to-right').addClass('hide-opacity-visible');
    }
    childMenu.removeClass('hide-opacity-visible').addClass('show-opacity-visible').addClass('sub-menu-slide-left-to-right');
    wideCurrentSubLink = $(this);
  }

  function wideSubMenuSubLinkMouseLeave() {
    wideResetSubLinkTimer2 = setTimeout(() => {
      if (wideCurrentSubLink && !wideCurrentSubLink.is(':hover')) {
        wideCurrentSubLink.find('.child-menu').removeClass('show-opacity-visible').addClass('hide-opacity-visible');
        $('.child-menu').removeClass('sub-menu-slide-left-to-right');
        wideCurrentSubLink = null;
      }
    }, 300);
  }



 
  // mobile screen nav settings

  const mobileNavLink = $('nav#mobile-screen > .left-column .item > .link');
  const mobileSubMenu = $("nav#mobile-screen > .left-column .sub-menu");
  const mobileChildMenu = $("nav#mobile-screen > .left-column .sub-link > .child-menu");
  const mobileSubLinkText = $('nav#mobile-screen > .left-column .sub-link > .text');

  let mobileCurrentSubMenu = null;
  let mobileCurrentchildMenu = null;
  let mobileCurrentLinkTextDownChevron = null;

  // Check dropdownItemLink click 

  mobileNavLink.click(function () {
    const subMenu = $(this).parent().find(mobileSubMenu);
    // Toggle active class for color change
    $(this).toggleClass('active-link', subMenu.is(':hidden'));

    // Remove active class from all links and then add to the clicked one if it's being opened
    mobileNavLink.removeClass('active-link');
    mobileSubLinkText.removeClass('active-link'); // Reset sublink text color
    if (subMenu.is(':hidden')) {
      $(this).addClass('active-link');
    }  

    if (mobileCurrentSubMenu && mobileCurrentSubMenu[0] !== subMenu[0]) {
      mobileCurrentSubMenu.slideUp();
    }

    // Close all child menus and reset their chevrons when any item link is clicked
    if (mobileCurrentchildMenu) {
      mobileCurrentchildMenu.slideUp();
      $('nav#mobile-screen > .left-column .sub-link .text > svg').css("transform", "");
      mobileCurrentchildMenu = null;
      mobileCurrentLinkTextDownChevron = null;
    }

    subMenu.slideToggle();
    mobileCurrentSubMenu = subMenu.is(':visible') ? subMenu : null;
  });

  // Check mobileSubLinkText click 

  mobileSubLinkText.click(function () {
    const childMenu = $(this).parent().find(mobileChildMenu);
    const downChevron = $(this).find("svg");

  // Remove active class from all sublinks and then add to the clicked one if it's being opened
    mobileSubLinkText.removeClass('active-link');
    if (childMenu.is(':hidden')) {
      $(this).addClass('active-link');
    }

    // Close the previously opened childMenu and reset its chevron
    if (mobileCurrentchildMenu && mobileCurrentchildMenu[0] !== childMenu[0]) {

      mobileCurrentchildMenu.slideUp();

      if (mobileCurrentLinkTextDownChevron) {
        mobileCurrentLinkTextDownChevron.css("transform", "");
      }

    }

    // Toggle the clicked childMenu and rotate its chevron
    childMenu.slideToggle(function() {
      // After the toggle action completes, check visibility to set the chevron
      const isChildMenuVisible = $(this).is(':visible');
      downChevron.css("transform", isChildMenuVisible ? "rotate(180deg)" : "rotate(0deg)");
    });

    // Update the current childMenu and chevron references
    mobileCurrentchildMenu = childMenu;
    mobileCurrentLinkTextDownChevron = downChevron;
  });


  // Global hamburger and close variables

  const mobileNav = $('nav#mobile-screen');
  const mobileItemContainer = $('nav#mobile-screen > .left-column > .container');
  const mobileSocialMedia = $('nav#mobile-screen > .left-column > .social-media');
  const mobileContactUs = $('nav#mobile-screen > .right-column > .contact-us');
  const hamburgerIcon = $("nav#wide-screen > .left-column > .hamburger-menu svg");
  const logoClose = $('.logo-close');
  const closeIcon = $(".close");
  const closeSvg = $(".logo-close .close svg");

  // Hamburger open settings

  hamburgerIcon.click(function () {

    $(mobileNav).find("*").removeClass("animate__fadeInDown animate__rotateIn animate__fadeInLeft animate__fadeInUp animate__fadeInRight animate__fadeOutUp animate__rotateOut animate__fadeOutLeft animate__fadeOutDown animate__fadeOutRight");
    
    openClose(mobileNav, "0", logoClose, "animate__fadeInDown", closeSvg, "animate__rotateIn", ".2s", mobileItemContainer, "animate__fadeInLeft", mobileSocialMedia, "animate__fadeInUp", mobileContactUs, "animate__fadeInRight")();
  
  });


  // openClose icon settings 

  function openClose(element, topValue, logoClose, animataionName1, closeSvg, animataionName2, animationDelayAll, mobileItemContainer, animataionName3, mobileSocialMedia, animataionName4, mobileContactUs, animataionName5) {
    return function() {
      $(element).css("top", topValue);
      $(element).find("*").css("animation-delay", animationDelayAll);
      $(element).find(logoClose).addClass(animataionName1);
      $(element).find(logoClose).find(closeSvg).addClass(animataionName2);
      $(element).find(".left-column").find(mobileItemContainer).addClass(animataionName3);
      $(element).find(".left-column").find(mobileSocialMedia).addClass(animataionName4);
      $(element).find(".right-column").find(mobileContactUs).addClass(animataionName5);
    };
  }

  closeIcon.click(function () {

    openClose(mobileNav, undefined, logoClose, "animate__fadeOutUp", closeSvg, "animate__rotateOut", undefined, mobileItemContainer, "animate__fadeOutLeft", mobileSocialMedia, "animate__fadeOutDown", mobileContactUs, "animate__fadeOutRight")(); 
    
    setTimeout(() => {
      $(mobileNav).css("top", "-100vh");
    }, 500);
  
  });

  
});
