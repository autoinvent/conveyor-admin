import { createRoot } from 'react-dom/client';

import '@autoinvent/conveyor/dist/styles/index.css';

import App from './App';

import '@/styles/index.css';

const initSPA = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container as HTMLElement);

  root.render(<App />);
};

initSPA();
