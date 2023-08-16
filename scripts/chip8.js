import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import CPU from './cpu.js'; // NEW

const renderer = new Renderer(10);
const keyboard = new Keyboard();
const speaker = new Speaker();
const cpu = new CPU(renderer, keyboard, speaker);

let loop;

let fps = 60, fpsInterval, startTime, now, then, elapsed;

function init() {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;

  cpu.loadSpritesIntoMemory();
  cpu.loadRom('pong.ch8');
  // cpu.loadRom('pong.ch8');
  loop = requestAnimationFrame(step);

  // TESTING CODE. REMOVE WHEN DONE TESTING.
  // renderer.testRender();
  // renderer.render();
  // END TESTING CODE

}

function step() {
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    cpu.cycle();
  }

  loop = requestAnimationFrame(step);
}

init();