import '@abraham/reflection';

import { App } from './app';
import './index.css';

import { createRoot } from 'react-dom/client';

const appContainer = document.getElementById('root');
appContainer && createRoot(appContainer).render(<App />);
