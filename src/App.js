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

  React.useEffect(() => {
    if (isStart) {
      setTimeout(startCountDown, 1000);
    }
  });

  const handleIncrement = (event,type) => {
    event.preventDefault();
    if (!isStart) {
      switch (type) {
        case "break":
          let newBreakValue = breakValue + 1;
          setBreakValue(newBreakValue);
          if (isSession === false) {
            setTimer(newBreakValue * 60);
          }
          break;
        case "session":
          let newSessionValue = sessionValue + 1;
          setSessionValue(newSessionValue);
          if (isSession === true) {
            setTimer(newSessionValue * 60);
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
  }

  const startCountDown = () => {
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
      console.log("executing");
      setTimer(timer - 1);
    }
  }

  const timerFormat = (minutes, seconds) => {
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
      {/* When a session reaches 00:00, a new break countdown begins, display a string indicating a session has begun */}
      <div className="break-setting">
        <div id="break-label">
          Break Length
        </div>
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
        <div id="session-label">
          Session Length
        </div>
      
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

      {/* indicate the session is initialized  */}
      <div id="timer-label">
        {isSession ? "Session": "Break"}
      </div>

      {/* Paused or running: should always be displayed in mm:ss format */}
      {/* if the timer is running, display the remaining time (decrementing by a value of 1 and updating the display every 1000ms) */}
      <div id="time-left">
        {timerFormat(parseInt(timer/60), timer%60)}
      </div>

      <button 
        id="start-stop" 
        onClick = {handleStartOrStop}
      >
        {isStart ? "STOP" : "START"}
      </button>

      <button
        id="reset"
        onClick={handleReset}
      >
        reset
      </button>

    </div>
  );
}

export default App;
