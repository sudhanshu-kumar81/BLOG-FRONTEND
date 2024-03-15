import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'rgb(66, 74, 68)',
      color: '#fff',
      textAlign: 'center',
      padding: '0.5rem', // Adjust the padding here to decrease the height
      // position: 'fixed',
      bottom: 0,
      width: '97vw',
      margin:'auto'
    }}>
      <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;



