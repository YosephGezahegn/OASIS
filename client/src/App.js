import { Route, Routes } from "react-router-dom";
import { Login, Main } from "./Container";

export default function App() {
  return (
    <h1 className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </h1>
  );
}
