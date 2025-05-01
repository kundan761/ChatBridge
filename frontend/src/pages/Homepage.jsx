import LoginPage from './LoginPage';

const HomePage = () => {

  return (
    <div className="home-page">
      <h1>Welcome to ChatBridge</h1>
      <p>Your one-stop solution for seamless communication.</p>
      <p>Connect with your friends and family effortlessly.</p>
      <LoginPage/>
    </div>
  );
};

export default HomePage;
