import React from 'react';
import { Wrench, Globe, Menu, X } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ activeTab, setActiveTab, lang, toggleLang, navItems, isMenuOpen, setIsMenuOpen, t }) => {
  return (
    <nav className="glass sticky-nav">
      <div className="container nav-content">
        <div className="logo-section">
          <div className="logo-icon">
            <Wrench size={24} />
          </div>
          <div className="logo-text">
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-menu">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <button onClick={toggleLang} className="btn-lang">
            <Globe size={14} />
            {t.lang_toggle}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu animate-fade">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
              className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
          <button onClick={toggleLang} className="mobile-nav-link lang-link">
            <Globe size={20} />
            {t.lang_toggle}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

