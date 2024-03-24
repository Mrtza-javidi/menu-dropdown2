$(document).ready(function() {

  // wide screen nav settings

  const wideNavDropdownItem = $('nav#wide-screen > .left-column .item');
  const wideSubMenuSubLink = $("nav#wide-screen > .left-column .sub-link");

  let wideCurrentDropdownItem = null;
  let wideResetDropdownItemTimer1;
  let wideCurrentSubLink = null;
  let wideResetSubLinkTimer2;
        
  

  function attachHandler() {
    $(wideNavDropdownItem).mouseenter(wideNavDropdownMouseEnter).mouseleave(wideNavDropdownMouseLeave);
    $(wideSubMenuSubLink).mouseenter(wideSubMenuSubLinkMouseEnter).mouseleave(wideSubMenuSubLinkMouseLeave);
  }

  function detachHandler() {
    $(wideNavDropdownItem).off('mouseenter', wideNavDropdownMouseEnter).off('mouseleave', wideNavDropdownMouseLeave);
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
  function wideNavDropdownMouseEnter() {
    var navSubMenu = $(this).find('.sub-menu');
    if (wideCurrentDropdownItem) {
      clearTimeout(wideResetDropdownItemTimer1);
      wideCurrentDropdownItem.find('.sub-menu').removeClass('show-opacity-visible').addClass('hide-opacity-visible');
    }
    navSubMenu.removeClass('hide-opacity-visible').addClass('show-opacity-visible');
    wideCurrentDropdownItem = $(this);
  }

  function wideNavDropdownMouseLeave() {
    wideResetDropdownItemTimer1 = setTimeout(() => {
      if (wideCurrentDropdownItem && !wideCurrentDropdownItem.is(':hover')) {
        wideCurrentDropdownItem.find('.sub-menu').removeClass('show-opacity-visible').addClass('hide-opacity-visible');
        wideCurrentDropdownItem = null;
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

const mobileNavDropdownLink = $('nav#mobile-screen > .left-column .item > .link');
const mobileSubMenu = $("nav#mobile-screen > .left-column .sub-menu");
const mobileChildMenu = $("nav#mobile-screen > .left-column .sub-link > .child-menu");
const mobileSubLinkText = $('nav#mobile-screen > .left-column .sub-link > .text');

let mobileCurrentSubMenu = null;
let mobileCurrentchildMenu = null;
let mobileCurrentLinkTextDownChevron = null;

// Check dropdownItemLink click 

mobileNavDropdownLink.click(function () {
  const subMenu = $(this).parent().find(mobileSubMenu);
  // Toggle active class for color change
  $(this).toggleClass('active-link', subMenu.is(':hidden'));

  // Remove active class from all links and then add to the clicked one if it's being opened
  mobileNavDropdownLink.removeClass('active-link');
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




  
});
