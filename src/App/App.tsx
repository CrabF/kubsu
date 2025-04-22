import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "pages/MainPage";
import { TestsPage } from "pages/TestsPage";
import { ResultsPage } from "pages/ResultsPage";
import "styles/styles.css";
import { Layout } from "src/components";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default App;
