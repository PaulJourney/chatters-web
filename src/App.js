import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [learningUrls, setLearningUrls] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [learningStatus, setLearningStatus] = useState('idle');

  // Fetch bots on component mount
  useEffect(() => {
    fetchBots();
  }, []);

  // Fetch bots from API
  const fetchBots = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll use mock data
      const mockBots = [
        { id: 1, name: 'Oliver Sato', personality: 'friendly', language: 'it' },
        { id: 2, name: 'VerAI Assistant', personality: 'professional', language: 'en' }
      ];
      setBots(mockBots);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bots');
      setLoading(false);
    }
  };

  // Select a bot and fetch its learning URLs
  const selectBot = (bot) => {
    setSelectedBot(bot);
    fetchLearningUrls(bot.id);
    setChatMessages([]);
  };

  // Fetch learning URLs for a bot
  const fetchLearningUrls = async (botId) => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // For now, we'll use mock data based on the screenshot
      const mockUrls = [
        'https://verai.app/',
        'https://verais-organization.gitbook.io/verai',
        'https://verais-organization.gitbook.io/verai/contributor-role',
        'https://verais-organization.gitbook.io/verai/developer-role'
      ];
      setLearningUrls(mockUrls);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch learning URLs');
      setLoading(false);
    }
  };

  // Add a new learning URL
  const addLearningUrl = () => {
    if (!newUrl) {
      setError('Please enter a URL');
      return;
    }

    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      setError('URL must start with http:// or https://');
      return;
    }

    if (learningUrls.includes(newUrl)) {
      setError('URL already exists');
      return;
    }

    setLearningUrls([...learningUrls, newUrl]);
    setNewUrl('');
    setMessage('URL added successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  // Remove a learning URL
  const removeLearningUrl = (url) => {
    setLearningUrls(learningUrls.filter(u => u !== url));
    setMessage('URL removed successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  // Start learning from URLs
  const startLearning = async () => {
    if (!selectedBot) {
      setError('Please select a bot');
      return;
    }

    if (learningUrls.length === 0) {
      setError('Please add at least one URL');
      return;
    }

    setLearningStatus('learning');
    setMessage('Learning started...');

    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the learning process
      await new Promise(resolve => setTimeout(resolve, 3000));
      setLearningStatus('completed');
      setMessage('Learning completed successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Learning failed');
      setLearningStatus('failed');
    }
  };

  // Send a message in the chat simulation
  const sendMessage = async () => {
    if (!userMessage) {
      return;
    }

    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: userMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages([...chatMessages, newUserMessage]);
    setUserMessage('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse;
      
      if (learningStatus === 'completed' && userMessage.toLowerCase().includes('verai')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'VerAI is a decentralized AI platform that allows contributors and developers to collaborate on AI projects. It provides roles for contributors who can help with data and testing, and developers who can build AI models and applications.',
          timestamp: new Date().toISOString()
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'That\'s an interesting question. Let me think...',
          timestamp: new Date().toISOString()
        };
      }

      setChatMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <Container fluid className="app-container">
      <Row className="header">
        <Col>
          <h1>Chatters Web Dashboard</h1>
          <p>Manage your Telegram bots and URL learning</p>
        </Col>
      </Row>

      <Row className="main-content">
        <Col md={3} className="sidebar">
          <Card>
            <Card.Header>Your Bots</Card.Header>
            <ListGroup variant="flush">
              {loading && <Spinner animation="border" />}
              {bots.map(bot => (
                <ListGroup.Item 
                  key={bot.id} 
                  action 
                  active={selectedBot && selectedBot.id === bot.id}
                  onClick={() => selectBot(bot)}
                >
                  {bot.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col md={9} className="main-panel">
          {selectedBot ? (
            <>
              <Card className="mb-4">
                <Card.Header>Bot Details</Card.Header>
                <Card.Body>
                  <h3>{selectedBot.name}</h3>
                  <p><strong>Personality:</strong> {selectedBot.personality}</p>
                  <p><strong>Language:</strong> {selectedBot.language}</p>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header>Materiali di apprendimento</Card.Header>
                <Card.Body>
                  <ListGroup className="mb-3">
                    {learningUrls.map((url, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="badge bg-primary me-2">URL</span>
                          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                        </div>
                        <Button variant="danger" size="sm" onClick={() => removeLearningUrl(url)}>
                          Remove
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <Form.Group className="mb-3">
                    <Form.Label>Aggiungi materiale di apprendimento</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="url"
                        placeholder="https://example.com"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                      />
                      <Button variant="success" onClick={addLearningUrl} className="ms-2">
                        Aggiungi
                      </Button>
                    </div>
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    onClick={startLearning}
                    disabled={learningStatus === 'learning' || learningUrls.length === 0}
                  >
                    {learningStatus === 'learning' ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Learning in progress...</span>
                      </>
                    ) : 'Avvia Apprendimento URL'}
                  </Button>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>Chat Simulation</Card.Header>
                <Card.Body>
                  <div className="chat-container">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`chat-message ${msg.sender}`}>
                        <div className="message-content">
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="mt-3">
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Type your message..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                      />
                      <Button type="submit" variant="primary" className="ms-2">
                        Send
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </>
          ) : (
            <Alert variant="info">
              Select a bot from the sidebar to manage its learning materials and chat simulation.
            </Alert>
          )}
        </Col>
      </Row>

      {message && (
        <Alert variant="success" className="message-alert">
          {message}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="message-alert" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
    </Container>
  );
}

export default App;
