player = {
  color: '#cc0ffb',
  x: Math.floor(canvas.width/2), y: 0,
  ox: Math.floor(canvas.width/2), oy: 0,
  v: 5,
  width: 32, height:20,
  update: function() {
    if (Key.isDown(37)) this.x += this.v * -1;
    if (Key.isDown(39)) this.x += this.v;
    if (Key.isDown(32)) this.poop();
    this.ox = this.x; this.oy = this.y;
  },
  render: function(offset) {
    var rx = this.ox + (this.x - this.ox) * offset;
    ctx.fillStyle = this.color;
    ctx.fillRect(rx, this.y, this.width, this.height);
  },
  poop: function() {
    var poop = {
      type: 'poop',
      width: 5, height: 5,
      x: this.x+(Math.floor(this.width/2)), y: this.y+this.height-1,
      oy: this.y,
      color: '#000',
      update: function() {
        this.y += 1;
        this.oy = this.y;
      },
      render: function(offset) {
        var ry = this.oy + (this.y - this.oy) * offset;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, ry, this.width, this.height);
      }
    };
    addEntity(poop);
  }
};

addEntity(player);
