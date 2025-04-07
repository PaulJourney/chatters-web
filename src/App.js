import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import robotIcon from './images/robot-icon.svg';
import gearIcon from './images/gear-icon.svg';

function App() {
  const [language, setLanguage] = useState('Italiano');
  
  // Translations
  const translations = {
    Italiano: {
      welcome: "Benvenuto in Chatters",
      subtitle: "Gestisci i tuoi bot Telegram interattivi da un'unica interfaccia.",
      createBot: "Crea un nuovo bot",
      createBotDesc: "Configura un nuovo bot Telegram con personalità e comportamento personalizzati.",
      manageBot: "Gestisci bot esistenti",
      manageBotDesc: "Visualizza, modifica e controlla i tuoi bot Telegram esistenti.",
      footer: "© 2025 Chatters - Sistema di Bot Telegram"
    },
    English: {
      welcome: "Welcome to Chatters",
      subtitle: "Manage your interactive Telegram bots from a single interface.",
      createBot: "Create a new bot",
      createBotDesc: "Configure a new Telegram bot with custom personality and behavior.",
      manageBot: "Manage existing bots",
      manageBotDesc: "View, edit and control your existing Telegram bots.",
      footer: "© 2025 Chatters - Telegram Bot System"
    },
    Español: {
      welcome: "Bienvenido a Chatters",
      subtitle: "Gestiona tus bots de Telegram interactivos desde una única interfaz.",
      createBot: "Crear un nuevo bot",
      createBotDesc: "Configura un nuevo bot de Telegram con personalidad y comportamiento personalizados.",
      manageBot: "Gestionar bots existentes",
      manageBotDesc: "Visualiza, modifica y controla tus bots de Telegram existentes.",
      footer: "© 2025 Chatters - Sistema de Bots de Telegram"
    },
    Français: {
      welcome: "Bienvenue sur Chatters",
      subtitle: "Gérez vos bots Telegram interactifs depuis une interface unique.",
      createBot: "Créer un nouveau bot",
      createBotDesc: "Configurez un nouveau bot Telegram avec une personnalité et un comportement personnalisés.",
      manageBot: "Gérer les bots existants",
      manageBotDesc: "Visualisez, modifiez et contrôlez vos bots Telegram existants.",
      footer: "© 2025 Chatters - Système de Bot Telegram"
    },
    Deutsch: {
      welcome: "Willkommen bei Chatters",
      subtitle: "Verwalten Sie Ihre interaktiven Telegram-Bots über eine einzige Schnittstelle.",
      createBot: "Neuen Bot erstellen",
      createBotDesc: "Konfigurieren Sie einen neuen Telegram-Bot mit individueller Persönlichkeit und Verhalten.",
      manageBot: "Bestehende Bots verwalten",
      manageBotDesc: "Anzeigen, Bearbeiten und Steuern Ihrer bestehenden Telegram-Bots.",
      footer: "© 2025 Chatters - Telegram-Bot-System"
    },
    "中文": {
      welcome: "欢迎使用 Chatters",
      subtitle: "通过单一界面管理您的交互式 Telegram 机器人。",
      createBot: "创建新机器人",
      createBotDesc: "配置具有自定义个性和行为的新 Telegram 机器人。",
      manageBot: "管理现有机器人",
      manageBotDesc: "查看、编辑和控制您现有的 Telegram 机器人。",
      footer: "© 2025 Chatters - Telegram 机器人系统"
    }
  };
  
  const text = translations[language];
  
  const handleCreateBot = () => {
    // Placeholder for create bot functionality
    console.log("Create bot clicked");
  };
  
  const handleManageBot = () => {
    // Placeholder for manage bot functionality
    console.log("Manage bot clicked");
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
        
        <Row className="welcome-section">
          <Col className="text-center">
            <h2>{text.welcome}</h2>
            <p className="subtitle">{text.subtitle}</p>
          </Col>
        </Row>
        
        <Row className="main-options">
          <Col md={6} className="option-col">
            <Card className="option-card">
              <div className="icon-container">
                <img src={robotIcon} alt="Robot icon" className="option-icon" />
              </div>
              <h3>{text.createBot}</h3>
              <p>{text.createBotDesc}</p>
              <Button 
                variant="primary" 
                className="action-button"
                onClick={handleCreateBot}
              >
                {text.createBot}
              </Button>
            </Card>
          </Col>
          
          <Col md={6} className="option-col">
            <Card className="option-card">
              <div className="icon-container">
                <img src={gearIcon} alt="Gear icon" className="option-icon" />
              </div>
              <h3>{text.manageBot}</h3>
              <p>{text.manageBotDesc}</p>
              <Button 
                variant="primary" 
                className="action-button"
                onClick={handleManageBot}
              >
                {text.manageBot}
              </Button>
            </Card>
          </Col>
        </Row>
        
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
