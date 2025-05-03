import Layout from "./components/layout/Layout";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-100">
        <Layout />
      </div>
    </ChatProvider>
  );
}

export default App;