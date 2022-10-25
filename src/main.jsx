import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChannelContextProvider } from './context/ChannelContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<ChannelContextProvider>
					<App />
				</ChannelContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
