var start = Date.now(),
    lag = 0,
    fps = 59,
    duration = 1000/fps,
    canvas = window.game,
    ctx = canvas.getContext("2d");

function update(offset) {
  for (var i=0; i < Entities.length; i++)
    Entities[i].update(offset);
}

function render(offset) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  window._entities.innerHTML = Math.floor(Entities.length);
  render(offset);
}

game_loop();
