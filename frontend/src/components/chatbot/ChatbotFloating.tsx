// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import React, { useState, useEffect, useRef } from 'react';
// import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
// import { UserData } from '@/App';

// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;
// }

// interface ChatbotFloatingProps {
//   user: UserData | null; // Accept user from App.tsx
// }

// const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// // NOTE: Use your actual backend URL here
// const CHAT_API_URL = `${API_BASE_URL}/chatbot/chat`;

// export const ChatbotFloating: React.FC<ChatbotFloatingProps> = ({ user }) =>{
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // NEW STATE: Store the unique conversation ID for multi-turn chat
//   const [sessionId, setSessionId] = useState<string | null>(null);

//   // Ref for auto-scrolling
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll to the latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Initial greeting logic (runs once when component mounts)
//   useEffect(() => {
//     if (messages.length === 0) {
//       const initialMessage: Message = {
//         id: '1',
//         text: 'Hello! I\'m your Constitutional AI Assistant. Ask me anything about the Indian Constitution!',
//         sender: 'bot',
//         timestamp: new Date()
//       };
//       setMessages([initialMessage]);
//     }
//   }, []); // Empty dependency array ensures this runs only once

//   const handleSend = async () => {
//     if (!inputValue.trim() || isLoading) return;

//     if (!user) {
//       const loginMessage: Message = {
//         id: Date.now().toString(),
//         text: "Please login first to chat with me.",
//         sender: 'bot',
//         timestamp: new Date(),
//       };
//       setMessages(prev => [...prev, loginMessage]);
//       return; // 
//     }

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputValue,
//       sender: 'user',
//       timestamp: new Date()
//     };

//     // 1. Update messages with user input and clear the input field
//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');
//     setIsLoading(true);

//     try {
//       // 2. Construct the request body
//       const requestBody = {
//         prompt: inputValue,
//         sessionId: sessionId, // Send the current session ID, or null for the first request
//       };

//       // 3. Make the API call to your backend
//       const response = await fetch(CHAT_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         const text = await response.text().catch(() => '');
//         throw new Error(`Chatbot error ${response.status}: ${text}`);
//       }

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Successful AI response
//         const botMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           text: data.response,
//           sender: 'bot',
//           timestamp: new Date()
//         };

//         // Save the new session ID returned by the backend
//         setSessionId(data.sessionId);
//         setMessages(prev => [...prev, botMessage]);

//       } else {
//         // Handle backend error (e.g., missing API key, 500 server error)
//         const errorMessage = data.error || 'Sorry, I ran into an error. Please try again or check the server status.';
//         const errorBotMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           text: `❌ Error: ${errorMessage}`,
//           sender: 'bot',
//           timestamp: new Date()
//         };
//         setMessages(prev => [...prev, errorBotMessage]);
//       }
//     } catch (error) {
//       console.error('Frontend Fetch Error:', error);
//       const networkError: Message = {
//         id: (Date.now() + 1).toString(),
//         text: '⚠️ Network error: Could not connect to the AI Assistant server.',
//         sender: 'bot',
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, networkError]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClearChat = () => {
//     // Clear chat history and reset session ID
//     setMessages([
//       {
//         id: '1',
//         text: 'Hello! I\'m your Constitutional AI Assistant. Ask me anything about the Indian Constitution!',
//         sender: 'bot',
//         timestamp: new Date()
//       }
//     ]);
//     setSessionId(null);
//     // Optionally call the backend to invalidate the session ID if you implement a /clear-chat endpoint
//   }

//   return (
//     <>
//       {/* Floating Button */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
//         >
//           <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
//           <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
//         </button>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 flex flex-col animate-bounce-in">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-2xl">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
//                 <Bot className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="font-bold text-white">Constitutional AI</h3>
//                 <p className="text-xs text-white/80">Always here to help</p>
//               </div>
//             </div>
//             <button
//               // Added Clear Chat Button
//               onClick={handleClearChat}
//               title="Start New Chat"
//               className="p-2 rounded-full hover:bg-white/20 transition-colors mr-2"
//             >
//               <Bot className="w-5 h-5 text-white transform rotate-180" />
//             </button>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="p-2 rounded-full hover:bg-white/20 transition-colors"
//             >
//               <X className="w-5 h-5 text-white" />
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 {message.sender === 'bot' && (
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
//                     <Bot className="w-5 h-5 text-white" />
//                   </div>
//                 )}
//                 <div
//                   className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === 'user'
//                       ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
//                       : 'bg-slate-700 text-slate-100'
//                     }`}
//                 >
//                   {/* 👇 CONDITIONAL RENDERING FOR MARKDOWN PARSING 👇 */}
//                   {message.sender === 'user' ? (
//                     // User input (mostly plain text)
//                     <p className="text-sm whitespace-pre-wrap">{message.text}</p>
//                   ) : (
//                     // Bot response (parsed as Markdown)
//                     <div className="prose prose-sm text-slate-100 max-w-none">
//                       <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                         {message.text}
//                       </ReactMarkdown>
//                     </div>
//                   )}
//                   {/* 👆 END CONDITIONAL RENDERING 👆 */}
//                 </div>
//                 {message.sender === 'user' && (
//                   <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
//                     <User className="w-5 h-5 text-white" />
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* NEW: Typing Indicator */}
//             {isLoading && (
//               <div className="flex justify-start gap-2">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="max-w-[75%] bg-slate-700 text-slate-100 rounded-2xl px-4 py-2">
//                   <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div className="p-4 border-t border-slate-700">
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                 placeholder="Ask about Constitution..."
//                 className="flex-1 bg-slate-700 border border-slate-600 rounded-full px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
//                 disabled={isLoading} // Disable input while loading
//               />
//               <button
//                 onClick={handleSend}
//                 className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
//                 disabled={isLoading} // Disable button while loading
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//             <p className="text-xs text-slate-500 mt-2 text-center">
//               Powered by SmartSanstha AI
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// frontend/src/components/chatbot/ChatbotFloating.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Loader2, ArrowUpLeft, Mic } from 'lucide-react';
import { UserData } from '@/App';
import logo from '../../assets/bot_LOGO.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotFloatingProps {
  user: UserData | null;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const CHAT_API_URL = `${API_BASE_URL}/chatbot/chat`;

export const ChatbotFloating: React.FC<ChatbotFloatingProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  // for voice input
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // State for Resizable Window
  const [windowSize, setWindowSize] = useState({ width: 384, height: 500 });
  const isResizingRef = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: '1',
        text: "Hello! I'm your Constitutional AI Assistant. Ask me anything about the Indian Constitution!",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }
  }, []);


  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;

      setInputValue((prev) =>
        prev.trim() ? prev.trim() + " " + transcript : transcript
      );

      recognition.stop();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
    };
  }, []);

  // Resize Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;

      const newWidth = window.innerWidth - e.clientX - 24;
      const newHeight = window.innerHeight - e.clientY - 24;

      setWindowSize({
        width: Math.max(300, Math.min(newWidth, 800)),
        height: Math.max(400, Math.min(newHeight, 900)),
      });
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      document.body.style.cursor = 'default';
    };

    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen]);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.body.style.cursor = 'nwse-resize';
  };

  const handleVoiceInput = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (err) {
        console.log("Recognition already started");
      }
    }
  };

  const handleSend = async () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch { }
    }

    setIsListening(false);

    inputRef.current?.blur();

    if (!inputValue.trim() || isLoading) return;

    if (!user) {
      const loginMessage: Message = {
        id: Date.now().toString(),
        text: 'Please login first to chat with me.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, loginMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const requestBody = {
        prompt: currentInput,
        sessionId: sessionId,
      };

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Chatbot error ${response.status}: ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
        };

        if (data.sessionId) {
          setSessionId(data.sessionId);
        }

        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage =
          data.error ||
          'Sorry, I ran into an error. Please try again or check the server status.';
        const errorBotMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `❌ Error: ${errorMessage}`,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorBotMessage]);
      }
    } catch (error) {
      console.error('Frontend Fetch Error:', error);
      const networkError: Message = {
        id: (Date.now() + 1).toString(),
        text: '⚠️ Network error: Could not connect to the AI Assistant server.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, networkError]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your Constitutional AI Assistant. Ask me anything about the Indian Constitution!",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setSessionId(null);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group overflow-hidden"
        >
          <img
            src={logo}
            alt="Chat"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform p-2"
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden"
          style={{
            width: `${windowSize.width}px`,
            height: `${windowSize.height}px`,
            transition: isResizingRef.current ? 'none' : 'width 0.2s, height 0.2s'
          }}
        >
          {/* Resizing Handle (Inside Top Left Corner) */}
          <div
            onMouseDown={startResizing}
            className="absolute top-0 left-0 w-6 h-6 bg-black/20 hover:bg-black/40 cursor-nwse-resize flex items-center justify-center z-[60] rounded-br-lg transition-colors"
            title="Drag to resize"
          >
            <ArrowUpLeft className="w-3 h-3 text-white/70" />
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-red-500">
            <div className="flex items-center gap-3 pl-4"> {/* Added pl-4 to give space from resize handle */}
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Bot" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-white">Constitutional AI</h3>
                <p className="text-xs text-white/80">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleClearChat}
                title="Start New Chat"
                className="p-2 rounded-full hover:bg-white/20 transition-colors mr-2"
              >
                <MessageSquare className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src={logo} alt="Bot" className="w-full h-full object-cover p-1" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'bg-slate-700 text-slate-100'
                    }`}
                >
                  {message.sender === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>
                  ) : (
                    <div className="prose prose-sm text-slate-100 max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src={logo} alt="Bot" className="w-full h-full object-cover p-1" />
                </div>
                <div className="max-w-[75%] bg-slate-700 text-slate-100 rounded-2xl px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
                placeholder="Ask about Constitution..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-full px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleVoiceInput}
                type="button"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${isListening
                  ? "bg-red-500 animate-pulse"
                  : "bg-slate-600 hover:scale-110"
                  }`}
                disabled={isLoading}
              >
                <Mic className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleSend}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Powered by SmartSanstha AI
            </p>
          </div>
        </div>
      )}
    </>
  );
};
