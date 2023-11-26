import React, { useState, useEffect } from "react";
// import "./styles.css";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const ChatVoice: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event: any) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    if (note) {
      setSavedNotes([...savedNotes, note]);
      setNote("");
    }
  };

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map((n, index) => (
            <p key={index}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatVoice;
