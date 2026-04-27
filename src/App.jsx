import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  Search, 
  MessageSquare, 
  Database,
  Droplets,
  ShieldCheck,
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';
import Navigation from './components/Navigation';
import ChatAssistant from './components/ChatAssistant';
import './App.css';

const translations = {
  en: {
    title: "Moffett M8 55.3 Belize Expedition Hub",
    subtitle: "Serial 0480688 | Kohler Tier 4 Final",
    nav_audit: "Technical Audit",
    nav_guide: "Getting Started",
    nav_parts: "Parts Strategy",
    nav_trouble: "Troubleshooting",
    nav_chat: "AI Assistant",
    lang_toggle: "Español",
    hero_title: "Ready for the Belize Frontier",
    hero_desc: "A proactive maintenance and operational framework for high-humidity, coastal deployment.",
    guide_title: "How-To: Getting Started",
    guide_step1: "Visual Inspection",
    guide_step1_desc: "Check tire pressure, fork condition, and look for hydraulic pools under the machine.",
    guide_step2: "Fuel Check",
    guide_step2_desc: "Drain water from the primary fuel filter separator. This is critical for Belize diesel.",
    guide_step3: "Mounting Check",
    guide_step3_desc: "Ensure EZ Hitch pins are locked and safety chains are tight on your transport truck.",
    trouble_title: "Field Troubleshooting",
    trouble_issue1: "Limp Mode (Power Loss)",
    trouble_solution1: "Likely clogged fuel filters or water in fuel. Replace primary and secondary filters immediately.",
    trouble_issue2: "No Movement (Mast Works)",
    trouble_solution2: "Check the hydrostatic pump splined coupling. Ensure pump pressure is > 2250 PSI.",
    parts_title: "The Big Three Failure Points",
    parts_hydraulics: "Hydraulics",
    parts_filtration: "Filtration",
    parts_electrical: "Electrical",
    chat_placeholder: "Ask about part numbers, error codes, or maintenance...",
    chat_header: "Expedition AI Assistant",
    chat_welcome: "Hello! I have the technical manual for Serial 0480688. How can I help you today?",
    error_api: "Connection failed. Please check your network.",
  },
  es: {
    title: "Centro de Expedición Moffett M8 55.3 Belice",
    subtitle: "Serie 0480688 | Kohler Tier 4 Final",
    nav_audit: "Auditoría Técnica",
    nav_guide: "Guía de Inicio",
    nav_parts: "Estrategia de Partes",
    nav_trouble: "Solución de Problemas",
    nav_chat: "Asistente IA",
    lang_toggle: "English",
    hero_title: "Listo para la Frontera de Belice",
    hero_desc: "Un marco operativo y de mantenimiento proactivo para despliegues costeros de alta humedad.",
    guide_title: "Cómo: Empezar",
    guide_step1: "Inspección Visual",
    guide_step1_desc: "Verifique la presión de las llantas, el estado de las horquillas y busque charcos hidráulicos.",
    guide_step2: "Control de Combustible",
    guide_step2_desc: "Drene el agua del separador del filtro de combustible primario. Vital para el diésel en Belice.",
    guide_step3: "Control de Montaje",
    guide_step3_desc: "Asegúrese de que los pasadores EZ Hitch estén bloqueados y las cadenas de seguridad tensas.",
    trouble_title: "Solución de Problemas de Campo",
    trouble_issue1: "Modo Lento (Pérdida de Potencia)",
    trouble_solution1: "Probablemente filtros obstruidos o agua. Reemplace filtros primarios y secundarios inmediatamente.",
    trouble_issue2: "Sin Movimiento (Mástil Funciona)",
    trouble_solution2: "Verifique el acoplamiento de la bomba hidrostática. Presión debe ser > 2250 PSI.",
    parts_title: "Los Tres Puntos de Falla Críticos",
    parts_hydraulics: "Hidráulica",
    parts_filtration: "Filtración",
    parts_electrical: "Eléctrico",
    chat_placeholder: "Pregunte sobre números de parte, códigos de error o mantenimiento...",
    chat_header: "Asistente de IA de Expedición",
    chat_welcome: "¡Hola! Tengo el manual técnico de la serie 0480688. ¿Cómo puedo ayudarte hoy?",
    error_api: "Error de conexión. Por favor revise su red.",
  }
};

const App = () => {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('guide');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const t = translations[lang];

  const toggleLang = () => setLang(l => l === 'en' ? 'es' : 'en');

  const navItems = [
    { id: 'guide', label: t.nav_guide, icon: BookOpen },
    { id: 'parts', label: t.nav_parts, icon: Database },
    { id: 'trouble', label: t.nav_trouble, icon: AlertTriangle },
    { id: 'audit', label: t.nav_audit, icon: Search },
    { id: 'chat', label: t.nav_chat, icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        toggleLang={toggleLang} 
        navItems={navItems}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        t={t}
      />

      <main className="container py-8 animate-fade">
        
        {/* Tab: Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-12">
            <header className="text-center space-y-4">
              <h2 className="text-4xl font-extrabold lg:text-5xl">{t.hero_title}</h2>
              <p className="text-xl text-muted max-w-2xl mx-auto">{t.hero_desc}</p>
            </header>

            <div className="grid-3">
              <div className="card">
                <div className="icon-box blue">
                  <Search size={24} />
                </div>
                <h3>{t.guide_step1}</h3>
                <p className="text-muted">{t.guide_step1_desc}</p>
              </div>
              <div className="card">
                <div className="icon-box green">
                  <Droplets size={24} />
                </div>
                <h3>{t.guide_step2}</h3>
                <p className="text-muted">{t.guide_step2_desc}</p>
              </div>
              <div className="card">
                <div className="icon-box purple">
                  <ShieldCheck size={24} />
                </div>
                <h3>{t.guide_step3}</h3>
                <p className="text-muted">{t.guide_step3_desc}</p>
              </div>
            </div>

            <div className="alert-box crimson">
              <AlertTriangle className="alert-icon" />
              <div>
                <h4 className="font-bold">Critical Weight Notice</h4>
                <p>
                  Unladen weight is <strong>6,410 lbs</strong>. Ensure your transport flatbed is reinforced for the M8 "heavy" variant. Standard 5k lb beds may fail under Belize road stress.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Parts */}
        {activeTab === 'parts' && (
          <div className="space-y-8">
            <div className="section-header">
              <Database className="section-icon red" />
              <h2>{t.parts_title}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h4 className="card-subtitle">{t.parts_filtration}</h4>
                <div className="parts-list">
                  <div className="parts-item">
                    <span>Primary Fuel Filter</span>
                    <code>0000773075</code>
                  </div>
                  <div className="parts-item">
                    <span>Air Filter (Main)</span>
                    <code>ZMRD40142270</code>
                  </div>
                  <div className="parts-item">
                    <span>Hydraulic Suction</span>
                    <code>500.100.0027</code>
                  </div>
                </div>
              </div>

              <div className="card">
                <h4 className="card-subtitle">Mechanical & Wear</h4>
                <div className="parts-list">
                  <div className="parts-item">
                    <span>Mast Guide Rollers</span>
                    <code>529.120.0001</code>
                  </div>
                  <div className="parts-item">
                    <span>Drive Leaf Chain</span>
                    <code>911.025</code>
                  </div>
                  <div className="parts-item">
                    <span>Glow Plug Relay</span>
                    <code>MM43128201</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="dark-card">
              <h3 className="flex items-center gap-2">
                <Zap className="text-amber" />
                Southwest Hub Sourcing
              </h3>
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div className="hub-info">
                  <p className="hub-title">Texas Hub (Intella / Hiab)</p>
                  <p className="text-muted">Best for aftermarket filters and bulk rollers. Low cost shipping to logistics hubs.</p>
                </div>
                <div className="hub-info">
                  <p className="hub-title">Arizona Hub (Papé)</p>
                  <p className="text-muted">Ask for "Moffett Field Kits." Pre-packaged O-rings, fuses, and sensors.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Troubleshooting */}
        {activeTab === 'trouble' && (
          <div className="space-y-8">
            <div className="section-header">
              <AlertTriangle className="section-icon orange" />
              <h2>{t.trouble_title}</h2>
            </div>

            <div className="space-y-4">
              <div className="trouble-card orange">
                <h3>{t.trouble_issue1}</h3>
                <p>{t.trouble_solution1}</p>
                <div className="tag-box orange">
                  <Info size={14} />
                  Tier 4 Fuel Sensitivity
                </div>
              </div>

              <div className="trouble-card red">
                <h3>{t.trouble_issue2}</h3>
                <p>{t.trouble_solution2}</p>
                <div className="tag-box red">
                  <SettingsIcon size={14} />
                  Hydrostatic System
                </div>
              </div>

              <div className="trouble-card blue">
                <h3>Electrical: No Start / Clicking</h3>
                <p>Check main ground cables. Salt air corrodes the frame-to-battery strap. Sand to bare metal and apply dielectric grease.</p>
                <div className="tag-box blue">
                  <Zap size={14} />
                  Galvanic Corrosion
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Audit */}
        {activeTab === 'audit' && (
          <div className="card audit-card">
            <h2>Technical Audit: M8 55.3</h2>
            <div className="table-wrapper mt-8">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Lift Capacity</td><td>5,500 lbs</td></tr>
                  <tr><td>Engine Model</td><td>Kohler KDI 1903 TCR</td></tr>
                  <tr><td>Drive System</td><td>Closed-loop Hydrostatic</td></tr>
                  <tr><td>Operating Pressure</td><td>2,500 PSI</td></tr>
                  <tr><td>Width</td><td>101 inches</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Chat */}
        {activeTab === 'chat' && (
          <ChatAssistant t={t} lang={lang} />
        )}

      </main>

      <footer className="container py-12 text-center text-muted text-xs">
        <p>© 2026 Belize Expedition Logistics - Prepared for Palfinger Moffett Serial 0480688</p>
        <p className="mt-2 italic">Knowledge based on documented Palfinger / Kohler Tier 4 Technical Specifications.</p>
      </footer>
    </div>
  );
};


const SettingsIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

export default App;
