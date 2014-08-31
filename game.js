var start = Date.now(),
    lag = 0,
    fps = 60,
    duration = 1000/fps,
    canvas = window.game,
    ctx = canvas.getContext("2d");

player = {
  color: '#cc0ffb',
  x: Math.floor(canvas.width/2), y: 0,
  v: 0,
  width: 32, height:20,
  update: function() {
    if (Key.isDown(37)) this.v = -5;
    if (Key.isDown(39)) this.v = 5;
    if (Key.isDown(32)) console.log("Poop");
    if (!Key.isDown(37) && !Key.isDown(39)) this.v = 0;
  },
  render: function(offset) {
    this.x = this.x + (this.v*offset)
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
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
    console.log("U");
    lag -= duration;
  }

  var offset = lag / duration;
  window._offset.innerHTML = Math.ceil(offset);
  window._fps.innerHTML = Math.floor(1000/elapsed);
  window._duration.innerHTML = Math.floor(duration);
  render(offset);
  console.log("R");
}

game_loop();
