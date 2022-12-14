import './App.css';
import Cards from './components/Cards';
import React, { useState, useRef, useEffect } from 'react'

function App() {

  const [mydata, setMydata] = useState([])
  const [choice, setChoice] = useState("")
  const [myDisplay, setMyDisplay] = useState("none")
  const myChoice = useRef("")

  const [inputError, setInputError] = useState("")
  const [inputData, setInputData] = useState("")
  const [myplaceholder, setMyPlaceholder] = useState("")

  useEffect(() => {
    if (choice === "people") {
      setMyPlaceholder(" e.g. Akon")
    }
    else if (choice === 'shows') {
      setMyPlaceholder(" e.g. Friends")
    }

    const query = inputData
    if (query === "") {
      setMydata([])
      setMyDisplay("none")
      setInputError("Please Enter Some Text")
    }
    else if (choice === "") {
      setMyDisplay("none")
      setInputError("Please select some tags")
    }
    else {
      setMydata(["Loading"]) // very important
      setInputError("")
      myChoice.current = choice
      fetch(`https://api.tvmaze.com/search/${myChoice.current}?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setMydata([])
            setMyDisplay("none")
            setInputError("No Matches Found !")
          }
          else {
            setMyDisplay("flex")
            // console.log(data)
            setMydata(data)
          }
        })
    }
  }, [inputData, choice])

  return (
    <>
      <div className='mainDiv'>
        <div className='mainContainer'>
          <div className='inputContainer'>
            <div className='title'>
              <h1>Binge Manual</h1>
            </div>
            <div className='userSelect'>
              <input type={"radio"} id="actors" htmlFor='Actor' name="selection" value={'people'} onChange={(e) => {
                setChoice(e.target.value)
              }
              } /><span className='selectSpan' title='Actor'>Actor</span>
              <input type={"radio"} name="selection" value={'shows'} onChange={(e) => {
                setChoice(e.target.value)
              }
              } /><span className='selectSpan' title='Shows'>Shows</span>
              <br />
              <input size={'35'} type={'text'} id="inputData" value={inputData} placeholder={myplaceholder} onChange={(e) => {
                setInputData(e.target.value)
              }} />
              <br />
              <span className='errorSpan' title='Error'>{(inputError === null) ? "" : inputError}</span>
            </div>
            <div className='displayCards' style={{ display: myDisplay }}>
              <Cards choice={myChoice.current} data={mydata} />
            </div>
          </div>
        </div>
        <div className='footer'>Copyright &copy; Yash Kumar Chandrakar</div>
      </div>
    </>
  );
}

export default App;
