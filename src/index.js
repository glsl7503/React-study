import { StrictMode } from "react"; // 리엑트 패키지
import { createRoot } from "react-dom/client"; // 웹 브라우저 상호작용 하는 리엑트 라이브러리 (React DOM)
import './styles.css'; // 컴포넌트 스타일 시트

import App from './App'; // App.js 에서 만든 컴포넌트

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);