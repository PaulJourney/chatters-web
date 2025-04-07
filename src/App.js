import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [learningUrls, setLearningUrls] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLearning, setIsLearning] = useState(false);
  const [notification, setNotification] = useState(null);

  // Simulated data for demonstration
  useEffect(() => {
    // Simulate loading bots
    setBots([
      { id: 1, name: 'Oliver Sato', description: 'AI assistant for VerAI project' },
      { id: 2, name: 'Emma Bot', description: 'Customer support assistant' }
    ]);
  }, []);

  const handleBotSelect = (bot) => {
    setSelectedBot(bot);
    // Simulate loading learning URLs for the selected bot
    setLearningUrls([
      'https://verai.app/',
      'https://verais-organization.gitbook.io/verai',
      'https://verais-organization.gitbook.io/verai/contributor-role',
      'https://verais-organization.gitbook.io/verai/developer-role'
    ]);
    // Reset chat messages
    setMessages([]);
  };

  const handleAddUrl = () => {
    if (newUrl && !learningUrls.includes(newUrl)) {
      setLearningUrls([...learningUrls, newUrl]);
      setNewUrl('');
      showNotification('URL added successfully', 'success');
    } else if (learningUrls.includes(newUrl)) {
      showNotification('URL already exists', 'warning');
    }
  };

  const handleStartLearning = () => {
    if (learningUrls.length === 0) {
      showNotification('Please add at least one URL for learning', 'warning');
      return;
    }
    
    setIsLearning(true);
    showNotification('Learning process started...', 'info');
    
    // Simulate learning process
    setTimeout(() => {
      setIsLearning(false);
      showNotification('Learning completed successfully!', 'success');
    }, 3000);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage = { sender: 'user', text: newMessage };
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse;
      
      if (newMessage.toLowerCase().includes('verai')) {
        botResponse = { 
          sender: 'bot', 
          text: 'VerAI is a decentralized AI platform that allows contributors and developers to collaborate on AI projects. It provides tools for data sharing, model training, and deployment.' 
        };
      } else {
        botResponse = { 
          sender: 'bot', 
          text: 'That\'s an interesting question. Let me think about it based on what I\'ve learned...' 
        };
      }
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <Container fluid className="app-container">
      <Row className="header">
        <Col>
          <h1>Chatters Web Dashboard</h1>
          <p>Manage your Telegram bots and their learning materials</p>
        </Col>
      </Row>

      {notification && (
        <Alert variant={notification.type} className="notification">
          {notification.message}
        </Alert>
      )}

      <Row className="main-content">
        <Col md={3} className="sidebar">
          <Card>
            <Card.Header>Your Bots</Card.Header>
            <ListGroup variant="flush">
              {bots.map(bot => (
                <ListGroup.Item 
                  key={bot.id} 
                  action 
                  active={selectedBot && selectedBot.id === bot.id}
                  onClick={() => handleBotSelect(bot)}
                >
                  {bot.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col md={9} className="content-area">
          {selectedBot ? (
            <>
              <Card className="bot-details mb-4">
                <Card.Header>Bot Details</Card.Header>
                <Card.Body>
                  <Card.Title>{selectedBot.name}</Card.Title>
                  <Card.Text>{selectedBot.description}</Card.Text>
                </Card.Body>
              </Card>

              <Card className="learning-materials mb-4">
                <Card.Header>Materiali di apprendimento</Card.Header>
                <Card.Body>
                  {learningUrls.map((url, index) => (
                    <div key={index} className="url-item">
                      <Button variant="primary" size="sm" className="url-button">URL</Button>
                      <span className="url-text">{url}</span>
                    </div>
                  ))}
                </Card.Body>
              </Card>

              <Card className="add-learning-material mb-4">
                <Card.Header>Aggiungi materiale di apprendimento</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>{'{t:type}'}</Form.Label>
                    <Form.Select>
                      <option>URL</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>URL</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="https://example.com" 
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                    />
                  </Form.Group>
                  <Button 
                    variant="success" 
                    onClick={handleAddUrl}
                  >
                    Aggiungi
                  </Button>
                </Card.Body>
              </Card>

              <Card className="learning-control mb-4">
                <Card.Body>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    block 
                    onClick={handleStartLearning}
                    disabled={isLearning}
                  >
                    {isLearning ? 'Apprendimento in corso...' : 'Avvia Apprendimento URL'}
                  </Button>
                </Card.Body>
              </Card>

              <Card className="chat-simulation">
                <Card.Header>Chat Simulation</Card.Header>
                <Card.Body>
                  <div className="chat-messages">
                    {messages.length === 0 ? (
                      <div className="no-messages">Send a message to start the conversation</div>
                    ) : (
                      messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                          <div className="message-bubble">
                            {msg.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <Form className="message-form" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                    <Form.Control
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" variant="primary">Send</Button>
                  </Form>
                </Card.Body>
              </Card>
            </>
          ) : (
            <div className="select-bot-prompt">
              <h3>Select a bot from the sidebar to get started</h3>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
