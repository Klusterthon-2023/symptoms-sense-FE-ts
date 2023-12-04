import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Image,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import toast from "react-hot-toast";

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

  useEffect(() => {
    handleListen();
    return () => {
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
      };
    }
    mic.onstart = () => {
    };

    mic.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join("");
      setNote(transcript);
      mic.onerror = (event: any) => {
        toast.error(event.error);
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
    <Box mb={{base:"6rem", md:"8rem", "xl":"10rem", "2xl":"12rem"}}>
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
                  <Tooltip hasArrow color={"#fff"} bg={"brand.active"} label="Stop Recording" isOpen placement="auto">
                    <Image width="100%" height="100%" src={"https://baticali.sirv.com/Klusterthon2023/mic.svg"} />
                  </Tooltip>
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
