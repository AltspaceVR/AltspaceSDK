AFRAME.registerComponent('navigate', {
  schema: {
    on: {type: 'string', default: 'click'},
    link: {type: 'selector'}
  },
  init: function () {
    this.el.addEventListener(this.data.on, function () {
      if (this.data.link.href.indexOf('altspace://') === 0) {
        this.data.link.click();
      }
      else {
        altspace.open(this.data.link.href, '_blank');
      }
    }.bind(this));
  }
});
