import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup, Alert, Spinner, Dropdown, Modal } from 'react-bootstrap';
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
  const [language, setLanguage] = useState('it'); // Default language: Italian
  const [showNewBotModal, setShowNewBotModal] = useState(false);
  const [newBot, setNewBot] = useState({
    name: '',
    personality: '',
    language: 'it'
  });

  // Language options
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'it', name: 'Italiano' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
    { code: 'th', name: 'ไทย' },
    { code: 'ko', name: '한국어' }
  ];

  // Translations
  const translations = {
    en: {
      title: 'Chatters Web Dashboard',
      subtitle: 'Manage your Telegram bots and URL learning',
      yourBots: 'Your Bots',
      addNewBot: 'Add New Bot',
      botDetails: 'Bot Details',
      personality: 'Personality',
      language: 'Language',
      learningMaterials: 'Learning Materials',
      addLearningMaterial: 'Add Learning Material',
      add: 'Add',
      remove: 'Remove',
      startLearning: 'Start URL Learning',
      learningInProgress: 'Learning in progress...',
      chatSimulation: 'Chat Simulation',
      typeMessage: 'Type your message...',
      send: 'Send',
      selectBot: 'Select a bot from the sidebar to manage its learning materials and chat simulation.',
      createNewBot: 'Create New Bot',
      botName: 'Bot Name',
      botPersonality: 'Bot Personality',
      botLanguage: 'Bot Language',
      friendly: 'Friendly',
      professional: 'Professional',
      humorous: 'Humorous',
      creative: 'Creative',
      cancel: 'Cancel',
      create: 'Create',
      enterBotName: 'Enter bot name',
      selectPersonality: 'Select personality',
      selectLanguage: 'Select language'
    },
    it: {
      title: 'Dashboard di Chatters Web',
      subtitle: 'Gestisci i tuoi bot Telegram e l\'apprendimento URL',
      yourBots: 'I tuoi Bot',
      addNewBot: 'Aggiungi Nuovo Bot',
      botDetails: 'Dettagli Bot',
      personality: 'Personalità',
      language: 'Lingua',
      learningMaterials: 'Materiali di apprendimento',
      addLearningMaterial: 'Aggiungi materiale di apprendimento',
      add: 'Aggiungi',
      remove: 'Rimuovi',
      startLearning: 'Avvia Apprendimento URL',
      learningInProgress: 'Apprendimento in corso...',
      chatSimulation: 'Simulazione Chat',
      typeMessage: 'Scrivi il tuo messaggio...',
      send: 'Invia',
      selectBot: 'Seleziona un bot dalla barra laterale per gestire i suoi materiali di apprendimento e la simulazione della chat.',
      createNewBot: 'Crea Nuovo Bot',
      botName: 'Nome Bot',
      botPersonality: 'Personalità Bot',
      botLanguage: 'Lingua Bot',
      friendly: 'Amichevole',
      professional: 'Professionale',
      humorous: 'Umoristico',
      creative: 'Creativo',
      cancel: 'Annulla',
      create: 'Crea',
      enterBotName: 'Inserisci nome del bot',
      selectPersonality: 'Seleziona personalità',
      selectLanguage: 'Seleziona lingua'
    },
    es: {
      title: 'Panel de Control de Chatters Web',
      subtitle: 'Gestiona tus bots de Telegram y el aprendizaje de URL',
      yourBots: 'Tus Bots',
      addNewBot: 'Añadir Nuevo Bot',
      botDetails: 'Detalles del Bot',
      personality: 'Personalidad',
      language: 'Idioma',
      learningMaterials: 'Materiales de aprendizaje',
      addLearningMaterial: 'Añadir material de aprendizaje',
      add: 'Añadir',
      remove: 'Eliminar',
      startLearning: 'Iniciar Aprendizaje de URL',
      learningInProgress: 'Aprendizaje en progreso...',
      chatSimulation: 'Simulación de Chat',
      typeMessage: 'Escribe tu mensaje...',
      send: 'Enviar',
      selectBot: 'Selecciona un bot de la barra lateral para gestionar sus materiales de aprendizaje y la simulación de chat.',
      createNewBot: 'Crear Nuevo Bot',
      botName: 'Nombre del Bot',
      botPersonality: 'Personalidad del Bot',
      botLanguage: 'Idioma del Bot',
      friendly: 'Amigable',
      professional: 'Profesional',
      humorous: 'Humorístico',
      creative: 'Creativo',
      cancel: 'Cancelar',
      create: 'Crear',
      enterBotName: 'Introduce nombre del bot',
      selectPersonality: 'Selecciona personalidad',
      selectLanguage: 'Selecciona idioma'
    },
    pt: {
      title: 'Painel de Controle Chatters Web',
      subtitle: 'Gerencie seus bots do Telegram e aprendizado de URL',
      yourBots: 'Seus Bots',
      addNewBot: 'Adicionar Novo Bot',
      botDetails: 'Detalhes do Bot',
      personality: 'Personalidade',
      language: 'Idioma',
      learningMaterials: 'Materiais de aprendizado',
      addLearningMaterial: 'Adicionar material de aprendizado',
      add: 'Adicionar',
      remove: 'Remover',
      startLearning: 'Iniciar Aprendizado de URL',
      learningInProgress: 'Aprendizado em andamento...',
      chatSimulation: 'Simulação de Chat',
      typeMessage: 'Digite sua mensagem...',
      send: 'Enviar',
      selectBot: 'Selecione um bot da barra lateral para gerenciar seus materiais de aprendizado e simulação de chat.',
      createNewBot: 'Criar Novo Bot',
      botName: 'Nome do Bot',
      botPersonality: 'Personalidade do Bot',
      botLanguage: 'Idioma do Bot',
      friendly: 'Amigável',
      professional: 'Profissional',
      humorous: 'Humorístico',
      creative: 'Criativo',
      cancel: 'Cancelar',
      create: 'Criar',
      enterBotName: 'Digite o nome do bot',
      selectPersonality: 'Selecione a personalidade',
      selectLanguage: 'Selecione o idioma'
    },
    de: {
      title: 'Chatters Web Dashboard',
      subtitle: 'Verwalten Sie Ihre Telegram-Bots und URL-Lernen',
      yourBots: 'Ihre Bots',
      addNewBot: 'Neuen Bot hinzufügen',
      botDetails: 'Bot-Details',
      personality: 'Persönlichkeit',
      language: 'Sprache',
      learningMaterials: 'Lernmaterialien',
      addLearningMaterial: 'Lernmaterial hinzufügen',
      add: 'Hinzufügen',
      remove: 'Entfernen',
      startLearning: 'URL-Lernen starten',
      learningInProgress: 'Lernen im Gange...',
      chatSimulation: 'Chat-Simulation',
      typeMessage: 'Nachricht eingeben...',
      send: 'Senden',
      selectBot: 'Wählen Sie einen Bot aus der Seitenleiste, um seine Lernmaterialien und Chat-Simulation zu verwalten.',
      createNewBot: 'Neuen Bot erstellen',
      botName: 'Bot-Name',
      botPersonality: 'Bot-Persönlichkeit',
      botLanguage: 'Bot-Sprache',
      friendly: 'Freundlich',
      professional: 'Professionell',
      humorous: 'Humorvoll',
      creative: 'Kreativ',
      cancel: 'Abbrechen',
      create: 'Erstellen',
      enterBotName: 'Bot-Namen eingeben',
      selectPersonality: 'Persönlichkeit auswählen',
      selectLanguage: 'Sprache auswählen'
    },
    fr: {
      title: 'Tableau de Bord Chatters Web',
      subtitle: 'Gérez vos bots Telegram et l\'apprentissage d\'URL',
      yourBots: 'Vos Bots',
      addNewBot: 'Ajouter un Nouveau Bot',
      botDetails: 'Détails du Bot',
      personality: 'Personnalité',
      language: 'Langue',
      learningMaterials: 'Matériels d\'apprentissage',
      addLearningMaterial: 'Ajouter du matériel d\'apprentissage',
      add: 'Ajouter',
      remove: 'Supprimer',
      startLearning: 'Démarrer l\'Apprentissage d\'URL',
      learningInProgress: 'Apprentissage en cours...',
      chatSimulation: 'Simulation de Chat',
      typeMessage: 'Tapez votre message...',
      send: 'Envoyer',
      selectBot: 'Sélectionnez un bot dans la barre latérale pour gérer ses matériels d\'apprentissage et sa simulation de chat.',
      createNewBot: 'Créer un Nouveau Bot',
      botName: 'Nom du Bot',
      botPersonality: 'Personnalité du Bot',
      botLanguage: 'Langue du Bot',
      friendly: 'Amical',
      professional: 'Professionnel',
      humorous: 'Humoristique',
      creative: 'Créatif',
      cancel: 'Annuler',
      create: 'Créer',
      enterBotName: 'Entrez le nom du bot',
      selectPersonality: 'Sélectionnez la personnalité',
      selectLanguage: 'Sélectionnez la langue'
    },
    zh: {
      title: 'Chatters Web 控制面板',
      subtitle: '管理您的 Telegram 机器人和 URL 学习',
      yourBots: '您的机器人',
      addNewBot: '添加新机器人',
      botDetails: '机器人详情',
      personality: '个性',
      language: '语言',
      learningMaterials: '学习材料',
      addLearningMaterial: '添加学习材料',
      add: '添加',
      remove: '删除',
      startLearning: '开始 URL 学习',
      learningInProgress: '学习进行中...',
      chatSimulation: '聊天模拟',
      typeMessage: '输入您的消息...',
      send: '发送',
      selectBot: '从侧边栏选择一个机器人来管理其学习材料和聊天模拟。',
      createNewBot: '创建新机器人',
      botName: '机器人名称',
      botPersonality: '机器人个性',
      botLanguage: '机器人语言',
      friendly: '友好的',
      professional: '专业的',
      humorous: '幽默的',
      creative: '创意的',
      cancel: '取消',
      create: '创建',
      enterBotName: '输入机器人名称',
      selectPersonality: '选择个性',
      selectLanguage: '选择语言'
    },
    th: {
      title: 'แดชบอร์ด Chatters Web',
      subtitle: 'จัดการบอท Telegram และการเรียนรู้ URL ของคุณ',
      yourBots: 'บอทของคุณ',
      addNewBot: 'เพิ่มบอทใหม่',
      botDetails: 'รายละเอียดบอท',
      personality: 'บุคลิกภาพ',
      language: 'ภาษา',
      learningMaterials: 'เอกสารการเรียนรู้',
      addLearningMaterial: 'เพิ่มเอกสารการเรียนรู้',
      add: 'เพิ่ม',
      remove: 'ลบ',
      startLearning: 'เริ่มการเรียนรู้ URL',
      learningInProgress: 'กำลังเรียนรู้...',
      chatSimulation: 'จำลองการแชท',
      typeMessage: 'พิมพ์ข้อความของคุณ...',
      send: 'ส่ง',
      selectBot: 'เลือกบอทจากแถบด้านข้างเพื่อจัดการเอกสารการเรียนรู้และการจำลองการแชท',
      createNewBot: 'สร้างบอทใหม่',
      botName: 'ชื่อบอท',
      botPersonality: 'บุคลิกภาพบอท',
      botLanguage: 'ภาษาบอท',
      friendly: 'เป็นมิตร',
      professional: 'มืออาชีพ',
      humorous: 'ขี้เล่น',
      creative: 'สร้างสรรค์',
      cancel: 'ยกเลิก',
      create: 'สร้าง',
      enterBotName: 'ใส่ชื่อบอท',
      selectPersonality: 'เลือกบุคลิกภาพ',
      selectLanguage: 'เลือกภาษา'
    },
    ko: {
      title: 'Chatters Web 대시보드',
      subtitle: 'Telegram 봇 및 URL 학습 관리',
      yourBots: '내 봇',
      addNewBot: '새 봇 추가',
      botDetails: '봇 세부정보',
      personality: '성격',
      language: '언어',
      learningMaterials: '학습 자료',
      addLearningMaterial: '학습 자료 추가',
      add: '추가',
      remove: '제거',
      startLearning: 'URL 학습 시작',
      learningInProgress: '학습 진행 중...',
      chatSimulation: '채팅 시뮬레이션',
      typeMessage: '메시지를 입력하세요...',
      send: '보내기',
      selectBot: '사이드바에서 봇을 선택하여 학습 자료와 채팅 시뮬레이션을 관리하세요.',
      createNewBot: '새 봇 만들기',
      botName: '봇 이름',
      botPersonality: '봇 성격',
      botLanguage: '봇 언어',
      friendly: '친근한',
      professional: '전문적인',
      humorous: '유머러스한',
      creative: '창의적인',
      cancel: '취소',
      create: '만들기',
      enterBotName: '봇 이름 입력',
      selectPersonality: '성격 선택',
      selectLanguage: '언어 선택'
    }
  };

  // Get current translations based on selected language
  const t = translations[language] || translations.en;

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

  // Handle language change
  const changeLanguage = (langCode) => {
    setLanguage(langCode);
  };

  // Handle new bot form submission
  const handleNewBotSubmit = () => {
    if (!newBot.name) {
      setError('Please enter a bot name');
      return;
    }

    if (!newBot.personality) {
      setError('Please select a personality');
      return;
    }

    // In a real implementation, this would be an API call to create a new bot
    const newBotWithId = {
      ...newBot,
      id: bots.length + 1
    };

    setBots([...bots, newBotWithId]);
    setShowNewBotModal(false);
    setNewBot({
      name: '',
      personality: '',
      language: 'it'
    });
    setMessage('Bot created successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <Container fluid className="app-container">
      {/* Language Selector */}
      <div className="language-selector">
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-language">
            {languages.find(lang => lang.code === language)?.name || 'Language'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {languages.map(lang => (
              <Dropdown.Item 
                key={lang.code} 
                onClick={() => changeLanguage(lang.code)}
                active={language === lang.code}
              >
                {lang.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row className="header">
        <Col>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </Col>
      </Row>

      <Row className="main-content">
        <Col md={3} className="sidebar">
          <Card>
            <Card.Header>{t.yourBots}</Card.Header>
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
            <Card.Footer>
              <Button 
                variant="primary" 
                className="w-100"
                onClick={() => setShowNewBotModal(true)}
              >
                {t.addNewBot}
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={9} className="main-panel">
          {selectedBot ? (
            <>
              <Card className="mb-4">
                <Card.Header>{t.botDetails}</Card.Header>
                <Card.Body>
                  <h3>{selectedBot.name}</h3>
                  <p><strong>{t.personality}:</strong> {selectedBot.personality}</p>
                  <p><strong>{t.language}:</strong> {selectedBot.language}</p>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header>{t.learningMaterials}</Card.Header>
                <Card.Body>
                  <ListGroup className="mb-3">
                    {learningUrls.map((url, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="badge bg-primary me-2">URL</span>
                          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                        </div>
                        <Button variant="danger" size="sm" onClick={() => removeLearningUrl(url)}>
                          {t.remove}
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <Form.Group className="mb-3">
                    <Form.Label>{t.addLearningMaterial}</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="url"
                        placeholder="https://example.com"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                      />
                      <Button variant="success" onClick={addLearningUrl} className="ms-2">
                        {t.add}
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
                        <span className="ms-2">{t.learningInProgress}</span>
                      </>
                    ) : t.startLearning}
                  </Button>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>{t.chatSimulation}</Card.Header>
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
                        placeholder={t.typeMessage}
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                      />
                      <Button type="submit" variant="primary" className="ms-2">
                        {t.send}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </>
          ) : (
            <Alert variant="info">
              {t.selectBot}
            </Alert>
          )}
        </Col>
      </Row>

      {/* New Bot Modal */}
      <Modal show={showNewBotModal} onHide={() => setShowNewBotModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t.createNewBot}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t.botName}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterBotName}
                value={newBot.name}
                onChange={(e) => setNewBot({...newBot, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t.botPersonality}</Form.Label>
              <Form.Select
                value={newBot.personality}
                onChange={(e) => setNewBot({...newBot, personality: e.target.value})}
              >
                <option value="">{t.selectPersonality}</option>
                <option value="friendly">{t.friendly}</option>
                <option value="professional">{t.professional}</option>
                <option value="humorous">{t.humorous}</option>
                <option value="creative">{t.creative}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t.botLanguage}</Form.Label>
              <Form.Select
                value={newBot.language}
                onChange={(e) => setNewBot({...newBot, language: e.target.value})}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewBotModal(false)}>
            {t.cancel}
          </Button>
          <Button variant="primary" onClick={handleNewBotSubmit}>
            {t.create}
          </Button>
        </Modal.Footer>
      </Modal>

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
