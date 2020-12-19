import React, {useState, useEffect} from 'react'

function App() {

  const [boxItems, setBoxItems] = useState(['','','','','','','','',''])
  const [playerX, setPlayerX] = useState([0,0,0,0,0,0,0,0,0])
  const [playerO, setPlayerO] = useState([0,0,0,0,0,0,0,0,0])
  const [serve, setServe] = useState('X')
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState('')
  const [score, setScore] = useState([0,0])
  
  function boxClick(e){
    if(!gameOver){   
      // Set in box 
      function updateBox(i){
        let box = [...boxItems]
        box[e.target.id] = i
        setBoxItems([...box])
      }   
      if(boxItems[e.target.id] === 'X' || boxItems[e.target.id] === 'O'){
        return;
      }
      if(serve === 'X'){
        // Set in player X
        let arr = [...playerX]
        arr[e.target.id] = 1;
        setPlayerX([...arr])
        updateBox('X')
        setServe('O')
      }
      if(serve === 'O'){
        // Set in player O
        let arr = [...playerO]
        arr[e.target.id] = 1;
        setPlayerO([...arr])
        updateBox('O')
        setServe('X')
      }
    }else{
      return;
    }
  }

  // Winning combinations 
  function winCombinations (a){
    if(
      a[0]+a[1]+a[2] === 3 || 
      a[3]+a[4]+a[5] === 3 || 
      a[6]+a[7]+a[8] === 3 || 
      a[0]+a[3]+a[6] === 3 || 
      a[1]+a[4]+a[7] === 3 || 
      a[2]+a[5]+a[8] === 3 || 
      a[0]+a[4]+a[8] === 3 || 
      a[2]+a[4]+a[6] === 3
    ){
      setGameOver(true);
      return 1;
    }
    return 0;
  }

  // Check if all boxes are filled without any winner

  useEffect(()=>{
    let count = 0;
    for(let i=0; i<=8; i++){
      if(boxItems[i].length>0) count++
    }
    if(count === 9){
      setGameOver(true)
      setWinner("DRAW !!!")
    }
  },[boxItems])

  // Check winning combinations every time player clicks on a box
  useEffect(()=>{
    let x = [...playerX] 
    let o = [...playerO] 
    const xWins = winCombinations(x)
    const oWins = winCombinations(o)
    if(xWins){
      setWinner('Player X is the Winner !!!')
      setServe('X')
      let tot = [...score]
      tot[0] += 1;
      setScore([...tot])
    }
    if(oWins){
      setWinner('Player O is the Winner !!!')
      setServe('O')
      let tot = [...score]
      tot[1] += 1;
      setScore([...tot])
    }
  },[playerX, playerO])

  const anotherGame = () => {
    setBoxItems(['','','','','','','','',''])
    setPlayerX([0,0,0,0,0,0,0,0,0])
    setPlayerO([0,0,0,0,0,0,0,0,0])
    setWinner('')
    setGameOver(false)
  } 

  return (
    <div className="app">
      <div className="container">
          {winner.length > 0 ? (<div className="message">{winner}</div>) : ''}
        <div className="boxes">
          {boxItems.map((item,i) => {
            return (<div onClick={boxClick} id={i} key={i} className="box">{item}</div>)
          })}
        </div>
        <br />
        {winner.length > 0 ? (<button onClick={anotherGame}>Another Game</button>) : ''}
        <br />
        <div className="score">
          Player X - [<b>{score[0]}</b>] &nbsp; &nbsp; Player O - [<b>{score[1]}</b>]
        </div>
        <footer>Created by Ashok</footer>
      </div>
    </div>
  );
}

export default App;
