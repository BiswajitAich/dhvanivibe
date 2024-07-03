import React from 'react';

const LoadingComponent: React.FC = () => {
  return (
    <div style={{ minHeight: 300, padding: 20, borderRadius: 8 }}>
      <h2 style={{ marginBottom: 20 }}>Loading...</h2>
      <div style={{ display: 'flex', gap: 20, flexDirection: 'row' }}>
        <div style={{ width: '100%', marginBottom: 20 }}>
          <PlaceholderCard />
        </div>
        <div style={{ width: '100%', marginBottom: 20 }}>
          <PlaceholderCard />
        </div>
        <div style={{ width: '100%', marginBottom: 20 }}>
          <PlaceholderCard />
        </div>
        {/* Add more PlaceholderCard components as needed */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="loading"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;



const PlaceholderCard: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      minHeight: 150, // Adjust height as needed
      backgroundColor: '#ccccccd6',
      borderRadius: 8,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      padding: 16,
      boxSizing: 'border-box',
    }}
      className='blink'
    >
      {/* Placeholder content */}
    </div>
  );
};

