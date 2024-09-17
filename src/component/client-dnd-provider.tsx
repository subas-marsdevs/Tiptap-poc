// components/ClientDndProvider.tsx
"use client"; // Ensure this is a client-side component

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface ClientDndProviderProps {
  children: React.ReactNode;
}

const ClientDndProvider: React.FC<ClientDndProviderProps> = ({ children }) => {
  return (
    <>
    </>
  )
  //  <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default ClientDndProvider;
