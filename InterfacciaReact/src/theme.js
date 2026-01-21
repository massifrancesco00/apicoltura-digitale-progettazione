// src/theme.js
import { FaTint, FaThermometerHalf, FaBalanceScale } from 'react-icons/fa';

// --- COLORI E TEMA ---
export const theme = {
  warmOrange: '#FF9F1C',
  deepHoney: '#C05600',
  goldenYellow: '#FFD700',
  creamBg: 'rgba(255, 250, 240, 0.90)',
  textDark: '#3E2723',
  textLight: '#FFF8E1',
  accentBlue: '#29B6F6',
  accentRed: '#EF5350',
  accentGreen: '#66BB6A',
  honeyShadow: '0 8px 20px rgba(192, 86, 0, 0.2)',
  goldenBorder: '2px solid #FFD700',
};

// --- STILI CONDIVISI (CSS-in-JS object) ---
export const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: `radial-gradient(circle at 50% 30%, ${theme.goldenYellow}, ${theme.warmOrange}, ${theme.deepHoney})`,
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    color: theme.textDark,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'hidden',
  },
  amberCard: {
    background: theme.creamBg,
    boxShadow: theme.honeyShadow,
    backdropFilter: 'blur(10px)',
    borderRadius: '25px',
    border: `1px solid rgba(255, 215, 0, 0.3)`,
    padding: '30px',
  },
  warmInput: {
    width: '100%',
    padding: '15px',
    background: '#FFF8E1',
    border: '2px solid #FFC107',
    borderRadius: '15px',
    color: theme.textDark,
    outline: 'none',
    marginBottom: '15px',
    fontSize: '1rem',
    fontWeight: '500',
  },
  honeyButton: {
    width: '100%',
    padding: '15px 20px',
    background: `linear-gradient(135deg, ${theme.goldenYellow}, ${theme.warmOrange})`,
    border: theme.goldenBorder,
    borderRadius: '30px',
    color: theme.textDark,
    fontWeight: '800',
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(192, 86, 0, 0.3), inset 0 3px 5px rgba(255,255,255,0.4)',
    textShadow: '0 1px 1px rgba(255,255,255,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
  },
  menuButton: {
    position: 'fixed',
    top: '20px', left: '20px', zIndex: 1000,
    background: theme.creamBg,
    border: theme.goldenBorder,
    borderRadius: '50%',
    width: '50px', height: '50px',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: theme.deepHoney,
    boxShadow: theme.honeyShadow,
  },
  dropdown: {
    position: 'fixed', top: '80px', left: '20px',
    background: theme.creamBg,
    backdropFilter: 'blur(10px)',
    border: theme.goldenBorder,
    borderRadius: '20px',
    width: '240px',
    boxShadow: theme.honeyShadow,
    zIndex: 999,
    padding: '10px',
  },
  menuItem: {
    padding: '12px 15px',
    cursor: 'pointer',
    borderRadius: '10px',
    color: theme.textDark,
    display: 'flex', alignItems: 'center', gap: '15px',
    fontWeight: '600',
  },
  hexIconBtn: {
    width: '80px', height: '80px',
    background: `linear-gradient(135deg, #FFF, #FFE0B2)`,
    border: '2px solid #FFB74D',
    clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(192, 86, 0, 0.15)',
  }
};

// --- DATI FINTI CONDIVISI ---
export const chartData = [
  { time: '08:00', temp: 22, hum: 60, weight: 22.0 },
  { time: '10:00', temp: 26, hum: 55, weight: 22.5 },
  { time: '12:00', temp: 31, hum: 45, weight: 23.0 },
  { time: '14:00', temp: 33, hum: 40, weight: 23.2 },
  { time: '16:00', temp: 29, hum: 50, weight: 23.1 },
];