var start = Date.now(),
    lag = 0,
    fps = 59,
    duration = 1000/fps,
    canvas = window.game,
    ctx = canvas.getContext("2d");

player = {
  color: '#cc0ffb',
  x: Math.floor(canvas.width/2), y: 0,
  ox: Math.floor(canvas.width/2), oy: 0,
  v: 5,
  width: 32, height:20,
  update: function() {
    if (Key.isDown(37)) this.x += this.v * -1;
    if (Key.isDown(39)) this.x += this.v;
    if (Key.isDown(32)) console.log("Poop");
    this.ox = this.x; this.oy = this.y;
  },
  render: function(offset) {
    var rx = this.ox + (this.x - this.ox) * offset;
    ctx.fillStyle = this.color;
    ctx.fillRect(rx, this.y, this.width, this.height);
  }
}
addEntity(player);

function update(offset) {
  for (var i=0; i < Entities.length; i++)
    Entities[i].update(offset);
}

function render(offset) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (var i=0; i < Entities.length; i++)
    Entities[i].render(offset);
}

function game_loop() {
  requestAnimationFrame(game_loop, canvas);
  var current = Date.now(),
      elapsed = current - start;
  start = current;
  lag += elapsed;

  while (lag >= duration) {
    update();
    lag -= duration;
  }

  var offset = lag / duration;
  window._offset.innerHTML = offset;
  window._fps.innerHTML = Math.floor(1000/elapsed);
  window._duration.innerHTML = Math.floor(duration);
  render(offset);
}

game_loop();
