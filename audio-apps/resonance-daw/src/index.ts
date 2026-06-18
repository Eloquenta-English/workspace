import { createRoot } from 'react-dom/client';
import { App } from './ui/App';
import './ui/styles/global.scss';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(App());
}
