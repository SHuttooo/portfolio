// Catégories & sources — repris de l'ancien main.js / projects.js.
import SOURCES_JSON from '../data/sources.json';

export interface Cat { fr: string; en: string; color: string; bg: string; icon: string; }

export const CATS: Record<string, Cat> = {
  robotics: { fr: 'Robotique', en: 'Robotics', color: '#1a2fff', bg: '#f0f2ff', icon: '🤖' },
  software: { fr: 'Logiciel', en: 'Software', color: '#475569', bg: '#f1f5f9', icon: '💻' },
  hardware: { fr: 'Hardware', en: 'Hardware', color: '#475569', bg: '#f1f5f9', icon: '⚙️' },
  web:      { fr: 'Web', en: 'Web', color: '#475569', bg: '#f1f5f9', icon: '🌐' },
  other:    { fr: 'Autre', en: 'Other', color: '#6b7280', bg: '#f9fafb', icon: '📦' },
};

export const SOURCES: Record<string, { fr: string; en: string; color: string; bg: string; icon: string }> = SOURCES_JSON;

// Filtres de la grille projets (repris de main.js).
export const FILTERS = [
  { id: 'all',        labelFr: 'Tous',              labelEn: 'All',               match: null as string[] | null },
  { id: 'ros2',       labelFr: 'ROS2 · Nav2',       labelEn: 'ROS2 · Nav2',       match: ['ROS2', 'Nav2', 'Gazebo'] },
  { id: 'python',     labelFr: 'Python',            labelEn: 'Python',            match: ['Python'] },
  { id: 'c-cpp',      labelFr: 'C / C++',           labelEn: 'C / C++',           match: ['C', 'C++'] },
  { id: 'js',         labelFr: 'JavaScript',        labelEn: 'JavaScript',        match: ['JavaScript', 'HTML/CSS/JS'] },
  { id: 'arduino',    labelFr: 'Arduino · ESP32',   labelEn: 'Arduino · ESP32',   match: ['Arduino', 'ESP32'] },
  { id: 'solidworks', labelFr: 'CAO · Fabrication', labelEn: 'CAD · Fabrication', match: ['SolidWorks', '3D printing', 'Laser cutting', 'Découpe laser'] },
  { id: 'opencv',     labelFr: 'OpenCV · Vision',   labelEn: 'OpenCV · Vision',   match: ['OpenCV', 'Vision', 'Image processing'] },
  { id: 'ai',         labelFr: 'IA · ML',           labelEn: 'AI · ML',           match: ['IA', 'Reinforcement Learning', 'LeRobot', 'Monte-Carlo', 'Monte Carlo', 'Minimax'] },
];

export const SORTS = [
  { id: 'featured', labelFr: 'À la une', labelEn: 'Featured' },
  { id: 'recent', labelFr: 'Plus récents', labelEn: 'Most recent' },
];
