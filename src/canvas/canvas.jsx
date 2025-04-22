import { useRef, useEffect, useState } from 'react'
import Card from './components/rect'
import bkg_game from '../assets/background_desktop.png'

const Canvas = (props) => {
  const canvasRef = useRef();
  const selCardRef = useRef(null);
  const initialPos = [408, 655, 902]
  const cardWidth = 227;
  const cardHeight = 326;
  const gap = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const background = new Image();
    background.src = bkg_game;

    const totalWidth = cardWidth * 3 + gap * 2;
    const startX = (canvas.width - totalWidth) / 2;
    const y = (canvas.height - cardHeight) / 2;

    const newCards = []

    for (let i = 0; i < 3; i++) {
      const x = startX + i * (cardWidth + gap)
      const card = new Card(x, y, context, canvas)
      newCards.push(card)
    }

    const shufflePositions = () => {
      return [...initialPos].sort(() => 0.5 - Math.random())
    }

    const getUniquePermutation = () => {
      const arr = [...initialPos];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    let animationId;
    let step = 0;
    let animationStoped = false;
    let cardHasBeenClicked = false;
    const interval = 500;
    let assignedPositions = shufflePositions();

    const animate = () => {
      if (animationStoped) return;

      animationId = requestAnimationFrame(animate);

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(background, 0, 0, canvas.width, canvas.height)

      newCards.forEach((card, index) => {
        if (card === selCardRef.current) {
          card.animateSpecial();
        } else {
          card.updated(assignedPositions[index]);
        }
      })
    }

    const updateCardsToNewPositions = () => {
      assignedPositions = getUniquePermutation();
    };

    const positionInterval = setInterval(() => {
      updateCardsToNewPositions();
      step++

      if (step >= 5) {
        clearInterval(positionInterval)
        animationStoped = true
        cancelAnimationFrame(animationId)
        console.log("Animación detenida")
      }
    }, interval)

    background.onload = animate;

    const handleClick = (e) => {
      if (!animationStoped || cardHasBeenClicked) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clicked = newCards.find(card =>
        x >= card.x &&
        x <= card.x + card.width &&
        y >= card.y &&
        y <= card.y + card.height
      )

      if (clicked) {
        cardHasBeenClicked = true;
        selCardRef.current = clicked;
        clicked.closing = true;
        clicked.currentWidth = clicked.width;
        const index = newCards.findIndex(card => card === clicked)
        newAnimation(index)
      }
    }

    const newAnimation = (index) => {
      const selected = newCards[index];
      let frameId;

      const animateMove = () => {
        // context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        selected.animateSpecial();

        newCards.forEach((card, index) => {
          if (card === selCardRef.current && card.closing) {
            card.animateSpecial();
          } else {
            card.paint(assignedPositions[index]);
          }
        });

        frameId = requestAnimationFrame(animateMove);
      };

      animateMove();
    }

    canvas.addEventListener('click', handleClick)
    return () => canvas.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className='game_container'
        {...props}
      />
    </>

  )
}

export default Canvas