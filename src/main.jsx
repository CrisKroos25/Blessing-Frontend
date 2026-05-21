import ReactDOM from 'react-dom/client';
import App from './App';
import ScrollToTop from '@shared/utils/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>
);
