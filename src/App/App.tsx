import { MainPage } from "pages/MainPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { TestsPage } from "pages/TestsPage";
import "styles/styles.css";
import { Layout } from "src/components";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

export default App;
