import { useCanvas } from '../helpers.js';

export default class Render {
  constructor({ images }) {
    const { canvas } = useCanvas();

    this.images = images;
    this.images.forEach((item, index) => {
      const image = new Image();
      image.src = item.src;
      this.images[index].element = image;
    });
    this.imageWidth = canvas.width - 200;
    this.imageHeight = canvas.height;
    this.frame = 1;
    this.velocity = 100;
    this.winId;
  }

  changePosition() {
    this.images.splice(this.images.length, 0, this.images.splice(0, 1)[0]);
  }

  draw() {
    const { ctx } = useCanvas();

    this.images.forEach((image, index) => {
      ctx.drawImage(
        image.element,
        this.imageWidth * index - this.frame,
        0,
        this.imageWidth,
        this.imageHeight
      );
    });
  }

  update(animateId) {
    if (this.velocity > 8) this.velocity -= 0.5;
    else {
      if (this.images[1].id === this.winId) {
        if (this.frame + this.velocity > this.imageWidth / 2 + 18)
          window.cancelAnimationFrame(animateId);
      }
    }

    if (this.frame + this.velocity < this.imageWidth)
      this.frame += this.velocity;
    else {
      this.changePosition();
      this.frame = 1;
    }

    this.draw();
  }
}
