// src/components/ui/ai-chatbot.tsx
import { useState, useRef, useEffect } from 'react';
import { X, Send, User, Bot } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface AIChatBotProps {
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AIChatBot({ onClose }: AIChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your financial assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('balance') || lowerMessage.includes('account')) {
      return "Your current total balance is $12,345.67. Would you like to see a breakdown by account?";
    }
    
    if (lowerMessage.includes('transaction') || lowerMessage.includes('transfer')) {
      return "I can help you with transactions. You can make deposits, withdrawals, or transfers. Which would you like to do?";
    }
    
    if (lowerMessage.includes('deposit')) {
      return "To make a deposit, go to the Transactions page and select 'Deposit'. You can use MTN, BNB, or TRX payment methods.";
    }
    
    if (lowerMessage.includes('withdraw')) {
      return "Withdrawals can be made from the Transactions page. Available methods include MTN, BNB, and TRX. Is there a specific amount you'd like to withdraw?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! I can assist with account balances, transactions, deposits, withdrawals, and general financial guidance. What do you need help with?";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you with your finances today?";
    }
    
    return "I'm not sure I understand. I can help you with account balances, transactions, deposits, and withdrawals. Could you please rephrase your question?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-end justify-end z-50 p-4 md:items-end md:justify-end">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col md:h-[28rem]">
        {/* Header */}
        <div className="bg-[var(--color-primary)] text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div>
              <h3 className="font-semibold">Financial Assistant</h3>
              <p className="text-xs text-white/80">AI-powered support</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X size={16} />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'user' ? (
                    <User size={12} />
                  ) : (
                    <Bot size={12} />
                  )}
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input - Increased height */}
        <div className="p-4 border-t">
          <div className="flex gap-2 items-end">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-h-[44px] py-3"
            />
            <Button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === ''}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 h-[44px]"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}