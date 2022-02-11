import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [alertPop, setAlertPop] = useState({
    isOpen: false,
    message: '',
  });

  const getMessages = async () => await axios.get(process.env.REACT_APP_BACKEND_URL)
  .then(res => {
    if(res.data.status==='success'){
      setMessages(res.data.data)
    }
  }).catch(err => console.log(err))

  useEffect(() => {
    getMessages()
  }, [])

  const submitForApproval = async (e) => {
    e.preventDefault();
    if(message!==''){
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}submit`, { message: message }, { 'Content-Type': 'application/json' })
        .then(res => {
          if(res.data.status==='success'){
            setAlertPop({
              isOpen: true,
              message: "Submited for approval. Happy valentine's day",
            })
            setMessage('')
            setTimeout(() => setAlertPop({
              isOpen: false,
              message: '',
            }), 4000)
          }
        }).catch(err => console.log(err))
    }
  }

  return (
    <div className="App">
      <svg className="heart" viewBox="0 0 32 29.6"
        style={{ 
          top: `${Math.random()*100}%`,
          left: `${Math.random()*100}%`,
          transform: `rotate(${Math.random()*180}deg)`,
        }}
      >
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg> 
      <svg className="heart" viewBox="0 0 32 29.6"
        style={{ 
          top: `${Math.random()*100}%`,
          left: `${Math.random()*100}%`,
          transform: `rotate(${Math.random()*180}deg)`,
        }}
      >
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg>
      <svg className="heart" viewBox="0 0 32 29.6"
        style={{ 
          top: `${Math.random()*100}%`,
          left: `${Math.random()*100}%`,
          transform: `rotate(${Math.random()*180}deg)`,
        }}
      >
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg>
      {alertPop.isOpen&&<div className="pop-up">{alertPop.message}</div>}
      <h1>Happy Valentine's Day</h1>
      <p>Drop a message for your loved ones.</p>
      <form onSubmit={submitForApproval}>
        <input type="text" required placeholder='Your message' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
      <br />
      <div className="imp-mssg">
        <i>
          Please be kind to each other and try to be as anonymous as possible. <br /> 
          We are all here to express our loves towards each other and not hate.
        </i>
      </div>

      <div className='posted-submissions'>
        {
          messages.map(message => (
            <div className='single-submission' key={message._id}>
              {message.message}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
