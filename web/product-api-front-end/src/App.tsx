import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const fetchApiAddress = async () => {
      const apiURL = import.meta.env.VITE_API_URL;

      try {
        const response = await fetch(`${apiURL}?format=json`);

        if (!response.ok) {
          throw new Error(`API error ${response.status}`);
        }

        const data = await response.json();

        setIpAddress(data.ip);
      } catch (err) {
        setIpAddress('NOT AVAILABLE');
        console.log(err);
      }
    };

    fetchApiAddress();
  }, []);

  return (
    <>
      <Header />
      <div>
        <p> {ipAddress}</p>
      </div>

      <Footer />
    </>
  );
}

export default App;
