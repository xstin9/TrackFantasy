import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { CompetitionSelect } from './pages/CompetitionSelect';
import { Draft } from './pages/Draft';
import { MyTeam } from './pages/MyTeam';
import { Leaderboard } from './pages/Leaderboard';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compete" element={<CompetitionSelect />} />
          <Route path="/draft" element={<Draft />} />
          <Route path="/team" element={<MyTeam />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
