import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaStop, FaVolumeUp, FaPaperPlane } from "react-icons/fa";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import SelectedCase from "../Components/DropDownMenu/SelectedCase";
import SelectedLang from "../Components/DropDownMenu/SelectedLang";

const Chat = ({ user }) => {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: "us-east-1",
  });

  const Polly = new AWS.Polly();
  const [sidebarOpen, setSidebarOpen] = useState(window.matchMedia('(min-width: 1020px)').matches);
  const [userInput, setUserInput] = useState("");
  const [userOut, setUserOut] = useState("");
  const [queryPairs, setQueryPairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [querySent, setQuerySent] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [audioPlayer] = useState(new Audio());
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All types of Cases");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, text: "Can you explain legal liability?", type: "user" },
    { id: 2, text: "How does intellectual property work?", type: "user" },
    { id: 3, text: "What are the steps to file a patent?", type: "user" },
  ]);

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1020px)');
    const handleChange = (e) => setSidebarOpen(e.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Listening to Speech Input
  const startListening = () => {
    setIsListening(true);
    const languageCode = selectedLang === "Hindi" ? "hi-IN" : "en-IN";
    SpeechRecognition.startListening({
      continuous: true,
      language: languageCode,
    });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  // Speaking with Polly
  const startSpeaking = async (voiceText) => {
    const voiceId = selectedLang === "English" ? "Joanna" : "Kajal";
    setIsLoadingResponse(true);
    try {
      const params = {
        OutputFormat: "mp3",
        Text: voiceText,
        VoiceId: voiceId,
        Engine: "neural",
      };
      const data = await Polly.synthesizeSpeech(params).promise();
      if (data && data.AudioStream) {
        const audioBlob = new Blob([data.AudioStream], { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayer.src = audioUrl;
        audioPlayer.play();
        setIsSpeaking(true);
        audioPlayer.onended = () => {
          setIsSpeaking(false);
          setIsLoadingResponse(false);
        };
      }
    } catch (error) {
      console.error("Error in startSpeaking:", error);
    }
  };
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleStopSpeaking = () => {
    setIsSpeaking(false);
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    setIsLoadingResponse(false);
  };

  const handleSend = async () => {
    const content = userInput.trim();
    if (!content) return;
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { id: prevHistory.length + 1, text: content, type: "user" },
    ]);
    try {
      setLoading(true);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMNI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a specialized chatbot with an in-depth understanding of Indian legal documents. Respond in ${selectedLang} and base your answers on ${selectedOption}. Avoid saying 'As an AI, I cannot provide legal advice' in any language. User input: ${content}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setQueryPairs((prevPairs) => [
          ...prevPairs,
          {
            query: userInput,
            generatedText: result.candidates[0].content.parts[0].text,
          },
        ]);
        setUserOut(result.candidates[0].content.parts[0].text);
        resetTranscript();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
      setUserInput("");
      setQuerySent(true);
    }
  };

  useEffect(() => {
    if (transcript) {
      setUserInput(transcript);
    }
  }, [transcript]);

  const handleNewChat = () => {
    setQuerySent(false);
    setQueryPairs([]);
    resetTranscript(); 
    setUserOut('');
  };

  const handleDivClick = (query) => {
    setUserInput(query); 
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto bg-indigo-900 text-white text-base lg:text-lg">
      {/* Sidebar for small screens and fixed for larger screens */}
      <div
        className={`lg:w-1/4 w-full lg:relative absolute inset-y-0 left-0 lg:p-4 p-2 bg-white lg:shadow-none shadow-2xl z-50 lg:z-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        id="sidebar"
      >
        <div className="text-lg font-bold mb-6 text-black">NyaySetu Chat</div>
        {chatHistory.map((message) => (
          <div
            key={message.id}
            className="bg-white text-black px-2 py-2 rounded-lg my-2 text-xs lg:text-sm"
          >
            {message.text}
          </div>
        ))}
        <div
          className="flex items-center justify-center bg-indigo-900 rounded-lg shadow-xl cursor-pointer mt-4"
          onClick={handleNewChat}
        >
          <div className="mx-auto my-2 text-white text-lg">+</div>
        </div>
      </div>

      {/* Button to toggle sidebar for small screens */}
      <button
        className={`lg:hidden absolute ${
          sidebarOpen
            ? "right-2 text-black top-2"
            : "left-2 text-white bg-indigo-700 top-30 text-base "
        } p-2 rounded z-50`}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <IoCloseOutline /> : <IoMenuOutline />}
      </button>

      {/* Main content area */}
      <div className="lg:w-3/4 w-full flex flex-col flex-grow justify-between p-4">
        {/* Case selection moved below Welcome message for small screens */}
        <div className="text-center mb-4 lg:hidden">
          <SelectedCase onSelect={setSelectedOption} className="mt-2" />
        </div>

        {/* Dropdown for case selection in larger screens */}
        <div className="hidden lg:flex justify-end mb-4">
          <SelectedCase onSelect={setSelectedOption} />
        </div>

        {/* Chat content */}
        <div className="flex flex-col gap-2 overflow-y-auto flex-grow">
          {querySent === false ? (
            <div className="flex flex-col items-center justify-center">
              <div className="text-lg font-bold mb-4">
                Welcome to NyaySetu Chat
              </div>
              <div className="grid grid-cols-2 gap-2">
                {chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className="px-4 py-4 rounded-lg my-2 text-xs bg-indigo-500 text-white cursor-pointer"
                    onClick={() => handleDivClick(message.text)}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            queryPairs.map((pair, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex gap-3 p-2">
                  <div className="rounded-full bg-slate-900 text-white py-1 px-2.5">
                    {user?.displayName?.charAt(0) || "C"}
                  </div>
                  <div className="flex-1 text-white mx-2">{pair.query}</div>
                </div>
                <div className="flex gap-3 bg-blue-300 text-black rounded-xl px-4 py-3 shadow-xl relative mb-4">
                  <div className="rounded-full bg-green-600 text-white m-auto px-2 py-1 absolute top-4 left-2">
                    AI
                  </div>
                  <div className="flex-1 text-black px-4">
                    {pair.generatedText}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2 lg:gap-4 mt-4">
          <div className="">
            <SelectedLang onSelect={setSelectedLang} />
          </div>
          <div className="flex-grow">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-2 bg-indigo-50 text-gray-800 rounded-lg"
              placeholder="Type your query..."
            />
          </div>
          {isListening ? (
            <button
              className="text-sm bg-red-500 rounded-full p-2"
              onClick={stopListening}
            >
              <FaStop />
            </button>
          ) : (
            <button
              className="text-sm bg-red-500 rounded-full p-2"
              onClick={startListening}
            >
              <FaMicrophone />
            </button>
          )}
          {userOut.length > 0 && (
            <>
              {isSpeaking ? (
                <button
                  className="text-sm bg-blue-300 rounded-full p-2.5"
                  onClick={handleStopSpeaking}
                >
                  <FaStop />
                </button>
              ) : isLoadingResponse ? (
                <button className="text-sm bg-gray-300 rounded-full p-2.5">
                  <AiOutlineLoading className="animate-spin bg-slate-600" />{" "}
                  {/* Loading spinner */}
                </button>
              ) : (
                <button
                  className="text-sm bg-cyan-600 rounded-full p-2.5"
                  onClick={() => startSpeaking(userOut)}
                >
                  <FaVolumeUp />
                </button>
              )}
            </>
          )}
          <button
            onClick={handleSend}
            className="py-2 px-4 bg-blue-600 rounded-lg text-sm"
          >
            {loading ? "Generating..." : <FaPaperPlane />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
