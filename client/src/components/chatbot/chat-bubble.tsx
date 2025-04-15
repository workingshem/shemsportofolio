import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

/**
 * ChatBubble component displayed in the bottom right corner
 * Provides an interactive chatbot experience for portfolio visitors
 */
export default function ChatBubble() {
  // State to track if the chat window is open
  const [isOpen, setIsOpen] = useState(false);
  // State to track if the initial form is filled and chat has started
  const [chatStarted, setChatStarted] = useState(false);
  // Form data for the initial interaction
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    qualification: '',
    question: ''
  });
  // Array of chat messages
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', text: string}>>([]);
  // Current input message
  const [currentMessage, setCurrentMessage] = useState('');
  // Reference to the messages container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Toast notifications
  const { toast } = useToast();
  
  // Function to toggle the chat window open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to start the chat after form submission
  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name to start the chat.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.question.trim()) {
      toast({
        title: "Question is required",
        description: "Please enter what you'd like to know.",
        variant: "destructive"
      });
      return;
    }
    
    // Add initial messages
    const initialMessages = [
      {
        type: 'bot' as const,
        text: `Hi ${formData.name}! Thanks for reaching out. I'm Shem, a data scientist specializing in geospatial AI and machine learning.`
      },
      {
        type: 'bot' as const,
        text: `You asked: "${formData.question}". Let me address that for you.`
      },
      {
        type: 'bot' as const,
        text: `I have 4+ years of experience developing AI-driven solutions for urban planning, hydrology automation, and large-scale geospatial analysis. I'd be happy to discuss how my skills might align with your needs${formData.company ? ` at ${formData.company}` : ''}.`
      }
    ];
    
    setMessages(initialMessages);
    setChatStarted(true);
  };

  // Function to send a new message in the chat
  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: currentMessage }]);
    setCurrentMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! I specialize in geospatial AI and machine learning with expertise in urban planning, hydrology automation, and large-scale data analysis.",
        "I've worked with tools like Google Looker, BigQuery GIS, and custom Python visualization libraries for geospatial intelligence.",
        "My award-winning hydrology platform reduced workflow time by 50%, and I've integrated GPT-4 for multi-layered geospatial analysis.",
        "I'd be happy to discuss how my technical skills could help address your specific needs. Feel free to reach out via email at working.shem26@gmail.com.",
        "Would you like to know more about my work with transportation analytics or urban health predictions?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { type: 'bot', text: randomResponse }]);
    }, 1000);
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat bubble icon */}
      <Button
        onClick={toggleChat}
        className={`rounded-full w-14 h-14 shadow-lg ${isOpen ? 'bg-gray-600' : 'bg-primary'}`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Chat header */}
          <div className="bg-primary text-white p-3">
            <h3 className="font-semibold">Chat with Shem (Beta)</h3>
            <p className="text-xs opacity-75">Data Scientist & Geospatial AI Expert</p>
          </div>

          {/* Initial form or chat messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {!chatStarted ? (
              // Initial form
              <form onSubmit={handleStartChat} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name*</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <Input 
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    placeholder="Company/Personal"
                  />
                </div>
                {formData.company && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Qualification/Job Title</label>
                    <Input 
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleFormChange}
                      placeholder="Your qualification or job title"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">What would you like to know?*</label>
                  <Textarea 
                    name="question"
                    value={formData.question}
                    onChange={handleFormChange}
                    placeholder="Your question or inquiry"
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled>Start Chat</Button>
              </form>
            ) : (
              // Chat messages
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-white rounded-br-none' 
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.type === 'bot' 
                          ? <Bot className="h-4 w-4" /> 
                          : <User className="h-4 w-4" />
                        }
                        <span className="text-xs font-semibold">
                          {message.type === 'bot' ? 'Shem' : formData.name}
                        </span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat input */}
          {chatStarted && (
            <div className="p-3 border-t">
              <div className="flex">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 mr-2"
                />
                <Button onClick={sendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}