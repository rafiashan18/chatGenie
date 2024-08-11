"use client";
import { Button, Textarea } from "@nextui-org/react";
import { Send, Mic, StopCircle } from "lucide-react";
import { useState, useEffect } from "react";

const ChatInput = ({ input, handleInputChange, handleSubmit, setInput, isLoading }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setInput(prevInput => prevInput + finalTranscript + ' ');
        }
        setInterimTranscript(interimTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
        setInterimTranscript('');
      };

      setRecognition(recognitionInstance);
    }
  }, [setInput]);

  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        setInput("");
      }} className="flex items-center space-x-2">
        <Textarea
          value={isRecording ? input + interimTranscript : input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
              setInput("");
            }
          }}
          className="flex-1 resize-none bg-zinc-800 hover:bg-zinc-900 rounded-xl text-base border border-white min-h-[50px]"
          disabled={isLoading || isRecording}
        />
    
        <Button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className={`${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-full p-2`}
          disabled={isLoading}
        >
          {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
        </Button>

        <Button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
          disabled={isLoading || isRecording}
        >
          <Send size={20} />
        </Button>
      </form>

      {isRecording && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-4 bg-red-500 text-white rounded-lg">
          <span>Recording... Speak now</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;