import { createRoot } from 'react-dom/client';

import '../public/styles/index.css';
import '@autoinvent/conveyor/dist/styles/index.css';

import App from './App';

const initSPA = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container as HTMLElement);

  root.render(<App />);
};

initSPA();
