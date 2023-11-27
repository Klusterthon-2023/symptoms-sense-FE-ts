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
import useStopwatch from "../components/stopwatch";
import record from "../../../assets/icons/Misc icon.svg";

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
  loading: boolean;
}

const SubmitePage: React.FC<SubmitePageProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  loading
}) => {
  const [voiceState, setVoiceState] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  // const { time, isRunning, start, stop, reset, formattedTime } = useStopwatch();

  useEffect(() => {
    handleListen();

    // Cleanup function to reset the stopwatch when the component unmounts
    return () => {
      // reset();
    };
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      // start();
      mic.onend = () => {
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
      setInputMessage(note);
      setNote("");
      // stop(); // Stop the stopwatch
      setIsListening(false); // Stop listening
      // reset(); // Reset the stopwatch
    }
  };
  return (
    <Box mb={{base:"4rem", md:"6rem", "xl":"8rem"}}>
      <Box height="3.5rem" fontFamily={`'GT-Eesti-Light', sans-serif`}>
        <InputGroup>
          {voiceState ? (
            <Flex direction="row" height="3.5rem">
              <Box float="right">
                <Input
                  width={{base: "21rem", md:"23rem", lg:"42rem", "2xl":"90rem"}}
                  value={note ?? ""}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
              </Box>
              {/* <Box width="20rem" height="3.5rem">
              </Box> */}
            </Flex>
          ) : (
            <Input
              placeholder="Type your message"
              resize="none"
              height="3.5rem"
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              value={inputMessage}
              onChange={(e: any) => setInputMessage(e.target.value)}
            />
          )}

          <InputRightElement>
            {voiceState ? (
              <Flex
                alignItems="center"
              >
                <Box
                  onClick={() => {
                    handleSaveNote();
                    setVoiceState(false);
                  }}
                  width="100%"
                  height={"100%"}
                >
                  <Image width="100%" height="100%" src={"https://baticali.sirv.com/Klusterthon2023/mic.svg"} />
                </Box>

                <Box width="1rem"></Box>
              </Flex>
            ) : (
              <Image
              cursor={"pointer"}
                onClick={() => {
                 
                  setVoiceState(true);
                  setIsListening((prevState) => !prevState);
                  
                }}
                src={"https://baticali.sirv.com/Klusterthon2023/microphone-2.svg"}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Box>
      <Button
        borderRadius="0.5rem"
        float="right"
        mt="10px"
        bg="#3E97FF"
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
        isLoading={loading}
      >
        Get Advice
      </Button>
    </Box>
  )
};

export default SubmitePage;
