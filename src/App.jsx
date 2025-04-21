import Canvas from './canvas/canvas'
import './app.scss'

function App() {

  return (
    <div className='game_container'>
      <Canvas
        width='1537px'
        height='501px'
      />
    {/* <button onClick={() => {
      console.log(positions())
    }}>RandomPos</button> */}
    </div>


    // <>
    //   <div className='game_container'>
    //     <div className="standar_card" />
    //     <div className="standar_card" />
    //     <div className="standar_card" />

    //   </div>
    //   {/* <div className="cupon_container" >
    //     <div className="modal_content">
    //       <h1>Information</h1>
    //     </div>
    //   </div> */}

    // </>
  )
}

export default App

