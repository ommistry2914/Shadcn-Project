// components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatHeader from './ChatHeader';
import ModeSelector from './ModeSelector';
import ClassStudentSelector from './ClassStudentSelector';
import ResponseCard from "./ResponseCard";
import Statistics from './Statistics';
import { fetchBotResponse } from '../utils/api';
import { saveResponse } from '../utils/storage';


const Chatbot = () => {

  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Welcome! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState(null);
  const [selection, setSelection] = useState(null);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [botResponses, setBotResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [showStatistics, setShowStatistics] = useState(false);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Check if this is the initial greeting
    if (!mode && !showModeSelector && ['hi', 'hello', 'hey'].includes(input.toLowerCase())) {
      setShowModeSelector(true);
      setMessages(prev => [...prev, { role: 'bot', content: 'Please select a mode to continue:' }]);
      return;
    }

    // If intervention is being entered
    if (mode && selection) {
      setLoading(true);
      try {
        // Call API with the intervention and selection data
        const responses = await fetchBotResponse(input, mode, selection);
        setBotResponses(responses);

        // Add a message to show responses are available
        setMessages(prev => [...prev, {
          role: 'bot',
          content: 'Here are some suggested responses based on your input:'
        }]);

        // Reset for new conversation
        setMode(null);
        setSelection(null);
        setSelectedResponse(null);
      } catch (error) {
        console.error('Error fetching responses:', error);
        setMessages(prev => [...prev, {
          role: 'bot',
          content: 'There was an error processing your request. Please try again.'
        }]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setShowModeSelector(false);

    if (selectedMode === 'Self' || selectedMode === 'Open') {
      setSelection({ mode: selectedMode });
      setMessages(prev => [...prev, {
        role: 'bot',
        content: `You've selected ${selectedMode} mode. Please enter your intervention:`
      }]);
    } else {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: `You've selected ${selectedMode} mode. Please make your selection:`
      }]);
    }
  };

  const handleSelectionComplete = (selectionData) => {
    setSelection(selectionData);

    let selectionMessage = `Mode: ${selectionData.mode}`;
    if (selectionData.classes) {
      selectionMessage += `\nClasses: ${selectionData.classes.map(c => c.name).join(', ')}`;
    }
    if (selectionData.students) {
      selectionMessage += `\nStudents: ${selectionData.students.map(s => s.name).join(', ')}`;
    }

    setMessages(prev => [
      ...prev,
      { role: 'user', content: selectionMessage },
      { role: 'bot', content: 'Please enter your intervention:' }
    ]);
  };

  const handleResponseSelect = (response) => {
    setSelectedResponse(response);
    saveResponse({
      ...response,
      mode,
      selection,
      timestamp: new Date().toISOString()
    });
  };

  const handleRefresh = () => {
    setBotResponses([]);
    setSelectedResponse(null);
    setMode(null);
    setSelection(null);
    setShowModeSelector(true);
    setMessages([
      { role: 'bot', content: 'Chat has been refreshed. How can I help you today?' },
      { role: 'bot', content: 'Please select a mode to continue:' }
    ]);
  };




  return (
    <div>
      <div className="flex flex-col h-screen">
        <ChatHeader
          onStatisticsClick={() => setShowStatistics(true)}
          onRefreshClick={handleRefresh}
        />

        {showStatistics ? (
          <div className="flex-1 overflow-hidden">
            <ChatHeader
              showBackButton={true}
              onBackClick={() => setShowStatistics(false)}
            />
            <Statistics />
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    <div
                      className={`max-w-3/4 p-3 rounded-lg ${message.role === 'user'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-100 text-gray-900'
                        }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {showModeSelector && <ModeSelector onModeSelect={handleModeSelect} />}

                {mode && !selection && mode !== 'Self' && mode !== 'Open' && (
                  <div className="my-4">
                    <ClassStudentSelector
                      mode={mode}
                      onSelectionComplete={handleSelectionComplete}
                    />
                  </div>
                )}

                {botResponses.length > 0 && (
                  <div className="my-4">
                    <h3 className="font-medium mb-2">Suggested Responses:</h3>
                    {botResponses.map((response, index) => (
                      <ResponseCard
                        key={index}
                        response={response}
                        index={index}
                        onSelect={handleResponseSelect}
                        isSelected={selectedResponse?.id === response.id}
                      />
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={loading}
                />
                <Button onClick={handleSendMessage} disabled={loading}>
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Chatbot;
