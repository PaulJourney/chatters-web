import React, { useState } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ManagePage() {
  const [language, setLanguage] = useState('Italiano');
  const navigate = useNavigate();
  
  // Translations
  const translations = {
    Italiano: {
      title: "Gestisci bot esistenti",
      subtitle: "Visualizza, modifica e controlla i tuoi bot Telegram esistenti.",
      yourBots: "I tuoi Bot",
      selectBot: "Seleziona un bot dalla sidebar per iniziare",
      backToHome: "Torna alla Home",
      footer: "© 2025 Chatters - Sistema di Bot Telegram"
    },
    English: {
      title: "Manage existing bots",
      subtitle: "View, edit and control your existing Telegram bots.",
      yourBots: "Your Bots",
      selectBot: "Select a bot from the sidebar to get started",
      backToHome: "Back to Home",
      footer: "© 2025 Chatters - Telegram Bot System"
    },
    Español: {
      title: "Gestionar bots existentes",
      subtitle: "Visualiza, modifica y controla tus bots de Telegram existentes.",
      yourBots: "Tus Bots",
      selectBot: "Selecciona un bot de la barra lateral para comenzar",
      backToHome: "Volver al Inicio",
      footer: "© 2025 Chatters - Sistema de Bots de Telegram"
    },
    Français: {
      title: "Gérer les bots existants",
      subtitle: "Visualisez, modifiez et contrôlez vos bots Telegram existants.",
      yourBots: "Vos Bots",
      selectBot: "Sélectionnez un bot dans la barre latérale pour commencer",
      backToHome: "Retour à l'Accueil",
      footer: "© 2025 Chatters - Système de Bot Telegram"
    },
    Deutsch: {
      title: "Bestehende Bots verwalten",
      subtitle: "Anzeigen, Bearbeiten und Steuern Ihrer bestehenden Telegram-Bots.",
      yourBots: "Ihre Bots",
      selectBot: "Wählen Sie einen Bot aus der Seitenleiste, um zu beginnen",
      backToHome: "Zurück zur Startseite",
      footer: "© 2025 Chatters - Telegram-Bot-System"
    },
    "中文": {
      title: "管理现有机器人",
      subtitle: "查看、编辑和控制您现有的 Telegram 机器人。",
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
  
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <Container fluid>
        <Row className="header">
          <Col xs={6} className="logo">
            <h1>Chatters Web Dashboard</h1>
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
            <h2>{text.title}</h2>
            <p className="subtitle">{text.subtitle}</p>
          </Col>
        </Row>
        
        <Row>
          <Col md={3}>
            <div className="sidebar-section">
              <h3>{text.yourBots}</h3>
              <ListGroup>
                {bots.map(bot => (
                  <ListGroup.Item key={bot.id} action>
                    {bot.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
          
          <Col md={9}>
            <div className="content-section text-center">
              <h3>{text.selectBot}</h3>
              <Button 
                variant="primary" 
                className="mt-4"
                onClick={handleBackToHome}
              >
                {text.backToHome}
              </Button>
            </div>
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

export default ManagePage;
