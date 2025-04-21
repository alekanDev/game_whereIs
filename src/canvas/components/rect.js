import card_img from '../../assets/default_card.png'

export default class Card {
  constructor(x, y, context, canvas) {
    this.width = 227;
    this.heigth = 326;

    this.card = new Image();
    this.card.src = card_img;
    this.speed = 10;

    this.x = x;
    this.y = y;
    this.context = context;
    this.canvas = canvas;
  }

  paint() {
    if (this.card.complete) {
      this.context.drawImage(this.card, this.x, this.y, this.width, this.heigth);
    } else {
      this.card.onload = () => {
        this.context.drawImage(this.card, this.x, this.y, this.width, this.heigth);
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

    // if (this.x < setPos) {
    //   this.x += this.speed;
    // } else {
    //   this.speed = 0
    // }

  }



  shuffleCards(newPos) {
    if (this.x < newPos) {
      this.x += this.speed;
      if (this.x === newPos) {
        this.speed = 0;
      }
    }
    if (this.x > newPos) {
      this.x -= this.speed;
      if (this.x === newPos) {
        this.speed = 0;
      }
    }
    // console.log(this.x)

    // if (this.x === currentPos && this.x > newPos) {
    //   this.x -= this.speed
    // } else if (this.x === currentPos && this.x < newPos) {
    //   this.x += this.speed
    // } else {
    //   this.x = 0
    // }
  }

  rotate() {
    this.x -= this.speed
  }

  animateSpecial() {
    this.context.save();
    this.context.globalAlpha = 0.5;
    this.paint();
    this.context.restore();

  }

  updated(currentPos, newPos) {
    // this.move();
    this.shuffleCards(currentPos, newPos);
    this.paint();
  }
}