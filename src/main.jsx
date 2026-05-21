import ReactDOM from 'react-dom/client';
import App from './App';
import ScrollToTop from '@shared/utils/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <ScrollToTop />
            <App />
        </BrowserRouter>
    </QueryClientProvider>,
);
