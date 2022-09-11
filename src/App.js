import './App.css';
import Cards from './components/Cards';
import React, { useState, useRef, useEffect } from 'react'

function App() {

  const [mydata, setMydata] = useState([])
  const [choice, setChoice] = useState("")
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
      setInputError("Please Enter Some Text")
    }
    else if (choice === "") {
      setInputError("Please select some tags")
    }
    else {
      setMydata([]) // very important
      setInputError("")
      myChoice.current = choice
      fetch(`https://api.tvmaze.com/search/${myChoice.current}?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setInputError("No Matches Found !")
          }
          else {
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
              <p>Binge Manual is a very amazing app through which you can find shows you love more easily. Want to know about that actor you like? Want to know more about movie you like ? Binge Manual is one place where you will find everything. Select the tag and start browsing NOW </p>
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
              <input size={'25'} type={'text'} id="inputData" value={inputData} placeholder={myplaceholder} onChange={(e) => {
                setInputData(e.target.value)
              }} />

              <br />
              <span className='errorSpan' title='Error'>{(inputError === null) ? "" : inputError}</span>
            </div>
            <div className='displayCards'>
              <Cards choice={myChoice.current} data={mydata} />
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>Copyright &copy; Yash Kumar Chandrakar</div>
    </>
  );
}

export default App;
