import React from 'react';

export const FloatingMenu = ({ position, onSelect, options }: any) => {
  return (
    <div style={{ position: 'absolute', top: position.top + 20, left: position.left, zIndex: 100 }}>
      <div style={{ background: 'white', padding: '10px', boxShadow: '0px 2px 5px rgba(0,0,0,0.2)' }}>
        {options.map((option: any) => (
          <div key={option} onClick={() => onSelect(option)} style={{ padding: '5px', cursor: 'pointer' }}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
