import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Image,
  Box,
} from "@chakra-ui/react";
import Mic from "../../../assets/icons/microphone-2.svg";
import useStopwatch from '../components/stopwatch';
import record from '../../../assets/icons/Misc icon.svg'

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

interface SubmitePageProps {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}

const SubmitePage: React.FC<SubmitePageProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
}) => {
  const [voiceState, setVoiceState] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const { time, isRunning, start, stop, reset, formattedTime } = useStopwatch();



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
      setInputMessage(note)
      setNote("");
    }
  };
  return (
    <Box w="100%" mt="5">
      <Flex float="right" border="1px solid #E1E3EA"  direction="row" w="100%" mt="2">
        <InputGroup>
          {voiceState ? (
            <Flex direction="row" width="100%" height="2.75rem">
              <Box float="right">
              <Input
                value={note ?? ''}
/>
                
              </Box>
              <Box width="20rem" height="2.75rem">
                {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
                <button onClick={handleSaveNote} disabled={!note}>
                  Save Note
                </button>
                <button
                  onClick={() => setIsListening((prevState) => !prevState)}
                >
                  Start/Stop
                </button>
              </Box>
              
            </Flex>
          ) : (
            <Input
              placeholder="Type your message"
              resize="none"
              border="none"
              borderRadius="none"
              _focus={{
                border: "1px solid black",
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
          )}

          <InputRightElement>

          { voiceState ? (<Flex alignItems="center" border="1px solid #E1E3EA" mr="5rem" width="20rem" height="2.75rem">
            <Image src={record}/>

            <Box width="10rem">

            </Box>

            <Box>
            {formattedTime}
            </Box>


          </Flex>) : <Image
              onClick={() => {
                setVoiceState(true)
                setIsListening((prevState) => !prevState)
               start()

              }}
              src={Mic}
            />}
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Button
        borderRadius="0.5rem"
        float="right"
        mt="10px"
        colorScheme="red"
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Get Advice
      </Button>
    </Box>
  );
};

export default SubmitePage;
