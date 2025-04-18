import { MainPage } from "pages/MainPage";
import { Route, Routes } from "react-router-dom";
import { TestsPage } from "pages/TestsPage";
import "styles/styles.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/tests" element={<TestsPage />} />
      <Route path="*"></Route>
    </Routes>
  );
}

export default App;
