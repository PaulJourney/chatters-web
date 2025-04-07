import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import robotIcon from './images/robot-icon.svg';
import gearIcon from './images/gear-icon.svg';
import { Container, Row, Col, Button } from 'react-bootstrap';

function App() {
  const [language, setLanguage] = useState('Italiano');
  const [currentPage, setCurrentPage] = useState('home');
  
  // Translations
  const translations = {
    Italiano: {
      welcome: "Benvenuto in Chatters",
      subtitle: "Gestisci i tuoi bot Telegram interattivi da un'unica interfaccia.",
      createBot: "Crea un nuovo bot",
      createBotDesc: "Configura un nuovo bot Telegram con personalità e comportamento personalizzati.",
      manageBot: "Gestisci bot esistenti",
      manageBotDesc: "Visualizza, modifica e controlla i tuoi bot Telegram esistenti.",
      yourBots: "I tuoi Bot",
      selectBot: "Seleziona un bot dalla sidebar per iniziare",
      backToHome: "Torna alla Home",
      footer: "© 2025 Chatters - Sistema di Bot Telegram"
    },
    English: {
      welcome: "Welcome to Chatters",
      subtitle: "Manage your interactive Telegram bots from a single interface.",
      createBot: "Create a new bot",
      createBotDesc: "Configure a new Telegram bot with custom personality and behavior.",
      manageBot: "Manage existing bots",
      manageBotDesc: "View, edit and control your existing Telegram bots.",
      yourBots: "Your Bots",
      selectBot: "Select a bot from the sidebar to get started",
      backToHome: "Back to Home",
      footer: "© 2025 Chatters - Telegram Bot System"
    },
    Español: {
      welcome: "Bienvenido a Chatters",
      subtitle: "Gestiona tus bots de Telegram interactivos desde una única interfaz.",
      createBot: "Crear un nuevo bot",
      createBotDesc: "Configura un nuevo bot de Telegram con personalidad y comportamiento personalizados.",
      manageBot: "Gestionar bots existentes",
      manageBotDesc: "Visualiza, modifica y controla tus bots de Telegram existentes.",
      yourBots: "Tus Bots",
      selectBot: "Selecciona un bot de la barra lateral para comenzar",
      backToHome: "Volver al Inicio",
      footer: "© 2025 Chatters - Sistema de Bots de Telegram"
    },
    Français: {
      welcome: "Bienvenue sur Chatters",
      subtitle: "Gérez vos bots Telegram interactifs depuis une seule interface.",
      createBot: "Créer un nouveau bot",
      createBotDesc: "Configurez un nouveau bot Telegram avec une personnalité et un comportement personnalisés.",
      manageBot: "Gérer les bots existants",
      manageBotDesc: "Visualisez, modifiez et contrôlez vos bots Telegram existants.",
      yourBots: "Vos Bots",
      selectBot: "Sélectionnez un bot dans la barre latérale pour commencer",
      backToHome: "Retour à l'Accueil",
      footer: "© 2025 Chatters - Système de Bot Telegram"
    },
    Deutsch: {
      welcome: "Willkommen bei Chatters",
      subtitle: "Verwalten Sie Ihre interaktiven Telegram-Bots über eine einzige Schnittstelle.",
      createBot: "Neuen Bot erstellen",
      createBotDesc: "Konfigurieren Sie einen neuen Telegram-Bot mit individueller Persönlichkeit und Verhalten.",
      manageBot: "Bestehende Bots verwalten",
      manageBotDesc: "Anzeigen, Bearbeiten und Steuern Ihrer bestehenden Telegram-Bots.",
      yourBots: "Ihre Bots",
      selectBot: "Wählen Sie einen Bot aus der Seitenleiste, um zu beginnen",
      backToHome: "Zurück zur Startseite",
      footer: "© 2025 Chatters - Telegram-Bot-System"
    },
    "中文": {
      welcome: "欢迎使用 Chatters",
      subtitle: "通过单一界面管理您的交互式 Telegram 机器人。",
      createBot: "创建新机器人",
      createBotDesc: "配置具有自定义个性和行为的新 Telegram 机器人。",
      manageBot: "管理现有机器人",
      manageBotDesc: "查看、编辑和控制您现有的 Telegram 机器人。",
      yourBots: "您的机器人",
      selectBot: "从侧边栏选择一个机器人开始",
      backToHome: "返回首页",
      footer: "© 2025 Chatters - Telegram 机器人系统"
    }
  };
  
  const text = translations[language];
  
  // Sample bot data
  const bots = [
    { id: 1, name: "Oliver Sato" },
    { id: 2, name: "Emma Bot" }
  ];
  
  const renderHomePage = () => {
    return (
      <>
        <Row className="welcome-section">
          <Col className="text-center">
            <h2>{text.welcome}</h2>
            <p className="subtitle">{text.subtitle}</p>
          </Col>
        </Row>
        
        <Row className="main-options">
          <Col md={6} className="option-col">
            <div className="option-card">
              <div className="icon-container">
                <img src={robotIcon} alt="Robot Icon" className="option-icon" />
              </div>
              <h3>{text.createBot}</h3>
              <p>{text.createBotDesc}</p>
              <Button 
                variant="primary" 
                className="action-button"
                onClick={() => setCurrentPage('create')}
              >
                {text.createBot}
              </Button>
            </div>
          </Col>
          
          <Col md={6} className="option-col">
            <div className="option-card">
              <div className="icon-container">
                <img src={gearIcon} alt="Gear Icon" className="option-icon" />
              </div>
              <h3>{text.manageBot}</h3>
              <p>{text.manageBotDesc}</p>
              <Button 
                variant="primary" 
                className="action-button"
                onClick={() => setCurrentPage('manage')}
              >
                {text.manageBot}
              </Button>
            </div>
          </Col>
        </Row>
      </>
    );
  };
  
  const renderManagePage = () => {
    return (
      <>
        <Row className="welcome-section">
          <Col className="text-center">
            <h2>{text.manageBot}</h2>
            <p className="subtitle">{text.manageBotDesc}</p>
          </Col>
        </Row>
        
        <Row>
          <Col md={3}>
            <div className="sidebar-section">
              <h3 className="section-title">{text.yourBots}</h3>
              <div className="list-group">
                {bots.map(bot => (
                  <Button 
                    key={bot.id} 
                    variant="outline-primary"
                    className="list-group-item"
                  >
                    {bot.name}
                  </Button>
                ))}
              </div>
            </div>
          </Col>
          
          <Col md={9}>
            <div className="content-section text-center">
              <h3 className="dark-section">{text.selectBot}</h3>
              <Button 
                variant="primary" 
                className="mt-4"
                onClick={() => setCurrentPage('home')}
              >
                {text.backToHome}
              </Button>
            </div>
          </Col>
        </Row>
      </>
    );
  };
  
  const renderCreatePage = () => {
    return (
      <>
        <Row className="welcome-section">
          <Col className="text-center">
            <h2>{text.createBot}</h2>
            <p className="subtitle">{text.createBotDesc}</p>
          </Col>
        </Row>
        
        <Row>
          <Col md={12}>
            <div className="content-section text-center">
              <h3 className="dark-section">Form to create a new bot will be here</h3>
              <Button 
                variant="primary" 
                className="mt-4"
                onClick={() => setCurrentPage('home')}
              >
                {text.backToHome}
              </Button>
            </div>
          </Col>
        </Row>
      </>
    );
  };
  
  const renderContent = () => {
    switch(currentPage) {
      case 'manage':
        return renderManagePage();
      case 'create':
        return renderCreatePage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="app-container">
      <Container fluid>
        <Row className="header">
          <Col xs={6} className="logo">
            <h1>Chatters</h1>
          </Col>
          <Col xs={6} className="language-selector">
            {Object.keys(translations).map((lang) => (
              <Button 
                key={lang} 
                variant={language === lang ? "primary" : "secondary"}
                className="lang-button"
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </Button>
            ))}
          </Col>
        </Row>
        
        {renderContent()}
        
        <Row className="footer">
          <Col className="text-center">
            <p>{text.footer}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
