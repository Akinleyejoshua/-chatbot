import './App.css';
import { useState, useEffect, useRef } from "react";
import { request } from "./config/axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import MapSection from './components/Map'
import { contextType } from 'google-map-react';

function App() {
  const [msg, setMsg] = useState({
    value: [],
    notify: "",
    inputValue: "",
    lastRecieved: ""
  });

  const botMsg = useRef(null);

  useEffect(() => {
    const botMsgNode = botMsg?.current;
    if (botMsgNode) {
      console.log(botMsgNode.innerText)
      setMsg(prev => ({
        ...prev,
        lastRecieved: botMsgNode.innerText
      }));
    }
  }, [msg.lastRecieved])

  const [autoSent, setAutoSend] = useState(null);

  const arrMsg = msg.value.map((items, i) => {
    return items.type === "sent" ? <div key={i} className="your-msg msg" dangerouslySetInnerHTML={{ __html: items.msg }}>
      {/* {items.msg} */}
    </div> :
      <div className="bot-msg msg" key={i} dangerouslySetInnerHTML={{ __html: items.msg }} ref={botMsg}>
        {/* {items.msg} */}
      </div>
  }
  );

  const commands = [
    {
      command: 'reset',
      callback: () => resetTranscript()
    },
  ]

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(null);

  const microphoneRef = useRef(null);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("Browser has no Support for Speech Recognition.");
  }

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  const handleListing = async () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    setMsg(prev => ({
      ...prev,
      notify: "Listening ...",
    }));
    // alert()

    return SpeechRecognition.startListening({
      continuous: true,
    });

  }

  const messageArea = useRef(null);

  const [talking, setTalking] = useState(false);

  const [speech, setSpeech] = useState(false);

  const [interview, setInterview] = useState({
    started: false,
    ready: null,
    questions: [
      "what's your name?", "What's your highest level of qualification?", 
      "Send a link to your projects, either <br> GitHub <br> Personal Website <br> Online Resume?", "how old are you?", 
      "what's your salary expectations?", 
      "why are you applying?",
      "why arn't you interested in moving with your current organization if you are working?",
      "why do you want to work with us?",
      "tell me about yourself?", 
      "what aspect of tech are you into, web, mobile, data and blockchain?", 
      "how far is your home from our office?", 
      "would you require sponsorship for relocation when necessary?", 
      "where do you see your self in the next 5 years working with us or in your personal life?",
      "where do you stay?",
      "how long do you intend to stay with us if you get hired?",
      "are you single, married?",
      "what's your nationality?",
    ],
    answers: [],
    index: 0,
  });

  const startInterview = async () => {
    isSpeaking === true && speak(interview.questions[interview.index]).then(speech => {
      setSpeech(speech);
    });
    setMsg(prev => ({
      ...prev,
      value: [...prev.value, {
        msg: interview.questions[interview.index],
        type: "recieved"
      }],
      inputValue: "",
      notify: "Interviewing ...",
      lastRecieved: interview.questions[interview.index]
    }));
    if (interview.index + 1 < interview.questions.length){
      setInterview({
        ...interview,
        started: true,
        answers: [...interview.answers, msg.inputValue],
        index: interview.index + 1,
      });
      
      // console.log(interview.answers)
    } else {
      setMsg(prev => ({
        ...prev,
        value: [...prev.value, {
          msg: `Okay, it was a bery brief awesome interview with you ${interview.answers[0]}, i will forward your details and answers to our HR for review <br> or would you like to take a test after this interview`,
          type: "recieved"
        }],
        inputValue: "",
        notify: "Interview Ended!",
        lastRecieved: `Okay, it was a bery brief awesome interview with you ${interview.answers[0]}, i will forward your details and answers to our HR for review or or would you like to take a test after this interview`
      }));
      setInterview({
        ...interview,
        started: false,
        ready: false,
        answers: [],
        index: 0,
      });
    }
    
  };

  const speak = async (msg) => {
    if ("speechSynthesis" in window) {

      var synthesis = window.speechSynthesis;
      var utterance = new SpeechSynthesisUtterance(msg);
      utterance.text = msg;
      synthesis.speak(utterance)
      // console.log(synthesis)
      await synthesis.speaking === false && handleListing();
      // handleListing();
      setTalking(true);
      return synthesis;
    } else {
      alert("Text-To-Speech unsupported by your browser, use Google Chrome!");
    }
  }

  const getReply = async (text) => {
    request.post("recruiter/", {
      input: text
    }).then(res => {
      // console.log(msg.value)
      // handleReset();
      // resetTranscript();
      setMsg(prev => ({
        ...prev,
        value: [...prev.value, {
          msg: res.data.answer,
          type: "recieved"
        }],
        inputValue: "",
        notify: "Recieved",
        lastRecieved: res.data.answer
      }));
      isSpeaking === true && speak(botMsg?.current.innerText).then(speech => {
        // alert(speech.speaking)
        setSpeech(speech)
      });

      if (res.data.answer === "opening directions...") {
        openModal("directions")
      } else if (res.data.answer === "input your email into the form field, so we can get back to you when necessary") {
        openModal("form");
      } else if (res.data.answer === "starting interview ...") {
        openModal("choose")
      } else if (res.data.answer === "searching...") {
        // openModal("search");
        speak("this is my search result").then(speech => {
          // alert(speech.speaking)
        setSpeech(speech)
        });
        // window.location.href = `https://www.google.com/search?q=${msg.inputValue}`;
        window.open(
          `https://www.google.com/search?q=${msg.inputValue}`,
          '_blank' // <- This is what makes it open in a new window.
        );
      }

    });
  }

  useEffect(() => {
    if (finalTranscript !== '') {
      speech?.speaking === false && setTalking(false);

      console.log('Got final result:', finalTranscript);
      talking === false && setMsg({
        ...msg,
        inputValue: `${finalTranscript}`,
        notify: "Replying ..."
      });

      resetTranscript();
    }

  }, [interimTranscript, finalTranscript]);

  useEffect(() => {
    const domNode = messageArea.current;
    if (domNode) {
      // console.log(domNode)

      domNode.scrollTop = domNode.scollHeight;
      domNode.addEventListener("DOMNodeInserted", event => {
        // event.target.scroll({
        //   top: event.target.scrollHeight, 
        //   behavior: "smooth"
        // });

        event.target.scrollIntoView({ behavior: "smooth", block: "start" });

      })
    }
    // messageArea.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    // openModal("choose")

  }, []);

  const [modal, setModal] = useState({
    modal: false,
    type: "",
  })

  const location = {
    address: 'Lagos, Nigeria',
    lat: 6.52484153777444,
    lng: 3.3718377624173757,
  }


  const openModal = (type) => {
    type === "form" && setModal({
      ...modal,
      modal: true,
      type: "form",
    });
    type === "directions" && setModal({
      ...modal,
      modal: true,
      type: "directions"
    });
    type === "choose" && setModal({
      ...modal,
      modal: true,
      type: "choose"
    });
    type === "search" && setModal({
      ...modal,
      modal: true,
      type: "search"
    });

    (isSpeaking === true && type === "choose") && speak(`Our location is at: ${location.address}`);
  }

  const [form, setForm] = useState({
    customerEmail: "",
  })

  return (
    <div className="App">

      {(modal.type === "form" && modal.modal === true) &&
        <div className="modal">
          <div className="modal-content" id="form">
            <button className="fa fa-times close-modal" onClick={() => {
              setModal({
                modal: false,
                type: ""
              })
            }}></button>
            <input placeholder="Your email" onChange={event => {
              setForm({
                ...form,
                customerEmail: event.target.value
              })
            }} />
            <button className="fa fa-paper-plane send" onClick={() => {
              if (form.customerEmail === "") {
                speak("Please, kindly insert an email into the field")
              } else {
                setModal({
                  modal: false,
                  type: ""
                });
                setMsg(prev => ({
                  ...prev,
                  value: [...prev.value, {
                    msg: "Your email has been recieved, we will get back to you shortly",
                    type: "recieved"
                  }],
                  inputValue: "",
                  notify: "Email Sent",
                  lastRecieved: "Your email has been recieved, we will get back to you shortly"
                }));
              }
            }}></button>
          </div>
        </div>}
      {(modal.type === "directions" && modal.modal === true) && <div className="modal">
        <div className="modal-content" id="directions">
          <button className="fa fa-times close-modal" onClick={() => {
            setModal({
              modal: false,
              type: ""
            })
          }}></button>
          <MapSection location={location} zoomLevel={12} />
          <div className="bar">Location: <b>{location.address}</b></div>
          {/* <iframe src="localhost:3000"></iframe> */}
          {/* <iframe src="https://www.google.com.ng/maps/dir/Ojodu+Berger/@6.6431854,3.3483946,15z/data=!4m16!1m7!3m6!1s0x103b9381601e96b5:0x8d79a42c1c6bb9d4!2sOjodu+Berger!3b1!8m2!3d6.6470456!4d3.374176!4m7!1m0!1m5!1m1!1s0x103b9381601e96b5:0x8d79a42c1c6bb9d4!2m2!1d3.3741647!2d6.6470273?hl=en"></iframe> */}
        </div>
      </div>
      }
{(modal.type === "search" && modal.modal === true) && <div className="modal">
        <div className="modal-content" id="directions">
          <button className="fa fa-times close-modal" onClick={() => {
            setModal({
              modal: false,
              type: ""
            })
          }}></button>
          <iframe src={`https://www.google.com/search?q=${msg.inputValue}`}></iframe>
        </div>
      </div>
      }
      {
        (modal.type === "choose" && modal.modal === true) && <div className="modal">
          <div className="modal-content" id="choose">
            <button className="fa fa-times close-modal" onClick={() => {
              setModal({
                modal: false,
                type: ""
              })
            }}></button>
            <p>Are you ready for the interview?</p>
            <div className="row">
              <button className="send" onClick={() => {
                setInterview({
                  ...interview,
                  ready: true,
                  started: true,
                });
                setModal({
                  modal: false,
                  type: ""
                });

                startInterview();
              }}>Yes</button>
              <button className="send" onClick={() => {
                setInterview({
                  ...interview,
                  ready: false,
                  started: false,
                });
                setModal({
                  modal: false,
                  type: ""
                });

                setMsg(prev => ({
                  ...prev,
                  value: [...prev.value, {
                    msg: "Alright, next time you can still take the interview",
                    type: "recieved"
                  }],
                  inputValue: "",
                  notify: "Recieved",
                  lastRecieved: "Alright, next time you can still take the interview"
                }));

              }}>No</button>
            </div>

          </div>
        </div>
      }

      <header>
        <nav className="row space-between">
          <div className="navbrand">
            <a href="/" className="row space-between">
              <i className="fa fa-robot"></i>
              <h3>Chat Bot</h3>
            </a>
          </div>
          <div className="navlinks row">
            <a target="_blank" href="https://twiiter.com/AkinleyeJoshua9" className="fab fa-twitter"></a>
            <a target="_blank" href="https://www.linkedin.com/in/joshua-akinleye-9895b61ab/" className="fab fa-linkedin"></a>
          </div>
        </nav>
      </header>
      <main className="col">
        <div className="message-area col" ref={messageArea}>
          {arrMsg}
        </div>
        <form method="dialog">
          <div className="row section-form">
            <div className="row input-bar">
              <input placeholder="Message" value={msg.inputValue} onChange={event => {
                setMsg({
                  ...msg,
                  inputValue: event.target.value
                })
              }} />
              {autoSent !== true && <button className="fa fa-paper-plane send" onClick={() => {
                setMsg({
                  ...msg,
                  value: [...msg.value, {
                    msg: msg.inputValue,
                    type: "sent"
                  }
                  ],
                  inputValue: "",
                  notify: "Typing ..."
                })
                if (msg.inputValue === "") {
                  setMsg({
                    ...msg,
                    notify: "No Message?!"
                  });
                } else {
                  setMsg(prev => ({
                    ...prev,
                    lastRecieved: ""
                  }))
                  interview.started === true ? startInterview() : getReply(msg.inputValue);
                }
              }}></button>}
            </div>
            <div className="row actions">
              {/* {autoSent === true ? <button className="fa fa-repeat listening" onClick={
                () => {
                  setAutoSend(false)
                }
              }></button> : <button className="fa fa-repeat" onClick={
                () => {
                  setAutoSend(true);
                  autoSent !== false && setInterval(() => {
                    setMsg({
                      ...msg,
                      value: [...msg.value, {
                        msg: msg.inputValue,
                        type: "sent"
                      }
                      ],
                      inputValue: "",
                      notify: "Typing ..."
                    })
                    if (msg.inputValue === "") {
                      setMsg({
                        ...msg,
                        notify: "No Message?!"
                      });
                    } else {
                      setMsg(prev => ({
                        ...prev,
                        lastRecieved: ""
                      }))
                      interview.started === true ? startInterview() : getReply(msg.inputValue);
                    }
                  }, );
                  // autoSend();

                }
              }></button>} */}

              {isListening === true ? <button onClick={stopHandle} className="fa fa-microphone listening" ref={microphoneRef}></button> :
                <button onClick={handleListing} className="fa fa-microphone" ref={microphoneRef}></button>
              }
              {isSpeaking === true ? <button className="fa fa-volume-up listening" onClick={() => {
                setIsSpeaking(false);
                // speak("");
              }}></button> : <button className="fa fa-volume-up" onClick={() => {
                setIsSpeaking(true);
                // speak(msg.lastRecieved);
              }}></button>
              }

            </div>
            <div className="notify row">
              {msg.notify === "" ? <i className="fa fa-smile"></i> : msg.notify}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
