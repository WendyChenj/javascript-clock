import React from 'react';
import './App.css';

const initialBreakValue = 5;
const initialSessionValue = 25;
const initialTimer = 1500;

function App() {
  const [ breakValue, setBreakValue ] = React.useState(initialBreakValue);
  const [ sessionValue, setSessionValue ] = React.useState(initialSessionValue);
  const [ timer, setTimer ] = React.useState(initialTimer);
  const [ isStart, setIsStart ] = React.useState(false);
  const [ isSession, setIsSession ] = React.useState(true);
  const [ timeOutId, setTimeOutId ] = React.useState(null);

  React.useEffect(() => {
    if (isStart === true) {
      const id = setTimeout(startCountDown, 1000, timer);
      setTimeOutId(id);
    } else {
      if(timeOutId) {
        clearTimeout(timeOutId);
        setTimeOutId(null);
      }
    }
    if (timer === 0) {
      document.getElementById("beep").play();
    }
  }, [timer, isStart]);

  const handleIncrement = (event,type) => {
    event.preventDefault();
    if (!isStart) {
      switch (type) {
        case "break":
          if (breakValue < 60) {
            setBreakValue(breakValue + 1);
            if (isSession === false) {
              setTimer((breakValue + 1) * 60);
            }
          }         
          break;
        case "session":
          if (sessionValue < 60) {
            setSessionValue(sessionValue + 1);
            if (isSession === true) {
              setTimer((sessionValue + 1) * 60);
            }
          }
          break;
        default:
          return
      } 
    } 
  }

  const handleDecrement = (event,type) => {
    event.preventDefault();
    if (!isStart) {
      switch (type) {
        case "break":
          if (breakValue > 1) {
            setBreakValue(breakValue - 1);
            if (isSession === false) {
              setTimer((breakValue - 1) * 60);
            } 
          }       
          break;
        case "session":
          if (sessionValue > 1) {
            setSessionValue(sessionValue - 1);
            if (isSession === true) {
              setTimer((sessionValue - 1) * 60);
            }
          }
          break;
        default:
          return
      }
    }
  }

  const handleStartOrStop = event => {
    event.preventDefault();
    setIsStart(!isStart);
  }

  const handleReset = (event) => {
    event.preventDefault();
    setBreakValue(initialBreakValue);
    setSessionValue(initialSessionValue);
    setTimer(initialTimer);
    setIsStart(false);
    setIsSession(true);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }

  const startCountDown = (timer) => {
    if (timer === 0) {
      let newIsSession = !isSession;
      let newTimer = null;
      if (newIsSession) {
        newTimer = sessionValue * 60;
      } else {
        newTimer = breakValue * 60;
      }
      setTimer(newTimer);
      setIsSession(newIsSession);
    } else {
      setTimer(timer - 1);
    }
  }

  const timerFormat = (timer) => {
    const minutes = parseInt(timer / 60);
    const seconds = parseInt(timer % 60);
    let correctTimer = null;
    if (minutes < 10 & seconds < 10) {
      correctTimer = `0${minutes}:0${seconds}`;
    } else if (minutes < 10 & seconds >= 10) {
      correctTimer = `0${minutes}:${seconds}`;
    } else if (minutes >= 10 & seconds < 10) {
      correctTimer = `${minutes}:0${seconds}`;
    } else {
      correctTimer = `${minutes}:${seconds}`;
    }
    return correctTimer;
  }

  return (
    <div className="App">
      <div className="main-container">
        <div className="setting-wrapper">
          <div className="break-setting">
            <p id="break-label">Break Length</p>
            <button 
              id="break-decrement"
              onClick={e => handleDecrement(e, "break")}
            >
              -
            </button>
            <p id="break-length">{breakValue}</p>
            <button 
              id="break-increment" 
              onClick={e => handleIncrement(e, "break")}
            >
              +
            </button>
          </div>

          <div className="session-setting">
            <p id="session-label">Session Length</p>

            <button 
              id="session-decrement"
              onClick={e => handleDecrement(e, "session")}
            >
              -
            </button>
            <p id="session-length">{sessionValue}</p>
            <button 
              id="session-increment" 
              onClick={e => handleIncrement(e, "session")}
            >
              +
            </button>
          </div>
        </div>

        <div className="timer-wrapper">
          <div id="timer-label">
            {isSession ? "Session": "Break"}
          </div>

          <div id="time-left">
            {timerFormat(timer)}
          </div>
        </div>

        <div className="button-groups">
          <button 
            id="start_stop" 
            onClick = {handleStartOrStop}
          >
            {isStart ? "STOP" : "START"}
          </button>

          <button
            id="reset"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>

        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>      
    </div>
  );
}

export default App;
