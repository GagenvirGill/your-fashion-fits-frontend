import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Closet from "./pages/Closet";

import Navbar from './components/nav/Navbar';
import { ItemProvider } from './context/ItemContext';

const App = () => {
  return (
    <Router>
		<ItemProvider>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/closet" element={<Closet />} />
			</Routes>
		</ItemProvider>
    </Router>
  );
};

export default App;
