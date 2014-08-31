function makeEnemy(type, velocity, x, y, direction) {
  var colors = ['#eaefcf', '#c4dfce', '#f9e270', '#ca985b', '#a98261'];
  var enemy = {
    color: colors[type],
    x: x, y: y,
    ox: 0, oy: 0,
    v: velocity, direction: direction,
    width: 20, height:32,
    update: function() {
      if (this.direction === 0) {
        // left
        this.x -= this.v;
      } else {
        // right
        this.x += this.v;
      }
      this.ox = this.x; this.oy = this.y;
    },
    render: function(offset) {
      var rx = this.ox + (this.x - this.ox) * offset;
      ctx.fillStyle = this.color;
      ctx.fillRect(rx, this.y, this.width, this.height);
    }
  };
  return enemy;
}

function enemyFactory() {
  var direction = Math.round(Math.random());
  var x_start = direction ? -20 : 320;
  var velocity = Math.floor((Math.random() * 3) + 1);
  var type = Math.floor((Math.random() * 5));
  enemy = makeEnemy(type, velocity, x_start, canvas.height-32, direction);
  addEntity(enemy);
}
setInterval(enemyFactory, 1500);
