import Render from './classes/Render.js';
import { useCanvas } from './helpers.js';
import { images } from './data.js';

const { canvas, ctx } = useCanvas();

canvas.width = 450;
canvas.height = 200;

let render;

function animate() {
  const animateId = requestAnimationFrame(animate);

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  render.update(animateId);
}

function init() {
  render = new Render({ images });
  const random = Math.floor(Math.random() * images.length + 1);
  console.log('Win Id:', random);
  render.winId = random;
  animate();
}

init();

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', init);
