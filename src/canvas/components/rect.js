import card_img from '../../assets/default_card.png'
import card_img_win from '../../assets/succsess_card.png'

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

    this.backCard = new Image();
    this.backCard.src = card_img_win;
    this.showBack = false;
  }

  paint() {
    const imgToDraw = this.showBack ? this.backCard : this.card;
  
    if (imgToDraw.complete && imgToDraw.naturalWidth !== 0) {
      this.context.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
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
    // Si se está cerrando (colapsando)
    if (this.closing) {
      if (this.currentWidth > 0) {
        this.currentWidth -= 20; // velocidad de colapso
      } else {
        this.closing = false;
        this.showBack = !this.showBack;
        this.currentWidth = 0; // reinicia para comenzar a expandirse
      }
    } else {
      // Si ya se volteó, empieza a expandirse
      if (this.currentWidth < this.width) {
        this.currentWidth += 20; // velocidad de apertura
      }
    }

    // Calcular posición centrada durante el cambio de ancho
    const centerX = this.x + this.width / 2;
    const drawX = centerX - this.currentWidth / 2;

    const imgToDraw = this.showBack ? this.backCard : this.card;

    // Asegurarse de que la imagen está completamente cargada antes de dibujar
    if (imgToDraw.complete && imgToDraw.naturalWidth !== 0) {
      this.context.drawImage(imgToDraw, drawX, this.y, this.currentWidth, this.height);
    }
  }

  updated(newPos) {
    this.paint();
    this.shuffleCards(newPos);
  }
}