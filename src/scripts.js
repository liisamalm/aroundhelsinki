  /*** *********
 *  NAVIGATION */
const navigation = {
  state : false,
  navi: document.querySelector("nav.navbar"),
  btn : document.querySelectorAll("nav.navbar i"),
  closeMenu : function( ) {
      this.navi.setAttribute('data-active', false);
      this.state = false;
  },
  click : function(){
      let curretState = Boolean(this.navi.getAttribute('data-active'));
      this.state = ( curretState != this.state );
      this.navi.setAttribute('data-active', this.state);
  },
  init : function(){
      this.btn[0].addEventListener("click", ()=>{this.click()});
      this.btn[1].addEventListener("click", ()=>{this.click()});
      window.addEventListener('resize', function(){
          if( window.screen.width >= 425 ){ navigation.closeMenu(); }
      });
  },
}//Obj navigation END
/*
*  NAVIGATION END
*****************/
/** INITs */
navigation.init();
