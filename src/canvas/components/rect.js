import card_img from '../../assets/default_card.png'

export default class Card {
  constructor(x, y, context, canvas) {

    const isMobile = window.innerWidth <= 768;
    console.log(isMobile)

    this.width = isMobile ? 280 : 227;
    this.height = isMobile ? 150 : 326;

    this.card = new Image();
    this.card.src = card_img;
    this.speed = 20;

    this.x = x;
    this.y = y;
    this.context = context;
    this.canvas = canvas;

    this.closing = false;
    this.currentWidth = this.width;
  }

  paint() {
    if (this.width <= 0) return; // Ya colapsó

    if (this.card.complete) {
      this.context.drawImage(this.card, this.x, this.y, this.width, this.height);
    } else {
      this.card.onload = () => {
        this.context.drawImage(this.card, this.x, this.y, this.width, this.height);
      }
    }
  }

  move() {
    this.x += this.speed;
    if (this.x + this.width > this.canvas.width - 408) {
      this.speed = -this.speed
    } else if (this.x < 408) {
      this.speed = -this.speed
    }
  }

  shuffleCards(newPos) {
    const distance = newPos - this.x;

    if (Math.abs(distance) <= this.speed) {
      this.x = newPos;
    } else {
      this.x += this.speed * Math.sign(distance);
    }
  }

  animateSpecial() {
   this.x -= this.speed;
  }

  updated(newPos) {
    this.paint();
    this.shuffleCards(newPos);
  }
}