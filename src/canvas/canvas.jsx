import { useRef, useEffect, useState } from 'react'
import Card from './components/rect'
import bkg_game from '../assets/background_desktop.png'

const Canvas = (props) => {
  const canvasRef = useRef();
  const selCardRef = useRef(null);
  const initialPos = [408, 655, 902]
  const newPos = [902, 408, 655]
  const cardWidth = 227;
  const cardHeight = 326;
  const gap = 20;


  // const [currentPos, setCurrentPos] = useState([initialPos])
  // const positions = () => {
  //   const randomPos = initialPos.sort(() => 0.5 - Math.random())
  //   setCurrentPos(randomPos)
  //   return currentPos
  // }


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

    const animate = () => {
      requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(background, 0, 0, canvas.width, canvas.height)

      const testCard = newCards[1]

      testCard.paint();

      
      testCard.shuffleCards(newPos[2]);

      // newCards.forEach((card, index) => {
      //   if (card === selCardRef.current) {
      //     card.animateSpecial();
      //   } else {
      //     card.updated(initialPos[index], newPos[index]);
      //   }
      // })
    }
    background.onload = animate;

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clicked = newCards.find(card =>
        x >= card.x &&
        x <= card.x + card.width &&
        y >= card.y &&
        y <= card.y + card.heigth
      )

      if (clicked) {
        selCardRef.current = clicked
        console.log(clicked)
      }
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