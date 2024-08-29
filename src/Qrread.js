import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import "./Scanner.css";

function Qrread() {
  const [scanResult, setScanResult] = useState(null);


  // Declare currentDate variable
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 275,
        height: 275
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result){
      scanner.clear();
      setScanResult(result);

      
    }

    function error(err) {
      console.warn(err);
    }

    
  }, [currentDate]);

  return (
    <div className="scanner-container">
      {scanResult ? (
        <div className="success">
         <a href={`http://${scanResult}`}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Qrread;