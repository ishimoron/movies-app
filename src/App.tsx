import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Router';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	);
};

export default App;
