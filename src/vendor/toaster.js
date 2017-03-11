let $ = window.$;
let win = window;
let app = require('ampersand-app');

export default class Toaster {
  constructor(config){
    if(!config)throw "Toaster must be configured with a valid configuration!";
    this.mainPanel = config.mainPanel;
    this.message = config.message;
  }
  getInstance(config){
    let message = this.message;
    let blinkInterval = config ? config.blinkInterval : 1500;
    let toaster = $(`<div id="vr-toaster"><h3><span id="toast-message" class="blink_me">${this.message}</span></h3></div>`);
    toaster.css(config ? config : {
      border: 'solid',
      display: 'block',
      background: 'cyan',
      opacity: 0.70,
      position: 'fixed',
      padding: '7px',
      'text-align': 'center',
      height: '80px',
      width: '200px',
      left: ($(window).width() - 184) / 2,
      top: $(window).height() / 2 - 20
    });
    toaster.addClass('blink_me');
    let blinkerFn = function() {
      $('.blink_me').fadeOut(700);
      $('.blink_me').fadeIn(700);
    }
    toaster.appendTo(this.mainPanel);
    setInterval(blinkerFn, blinkInterval);
    return toaster;
  }
}