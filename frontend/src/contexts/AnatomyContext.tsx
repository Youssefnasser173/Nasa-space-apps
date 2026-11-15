import React, { createContext, useContext, useState } from 'react';
import { OrganKey } from '../types';

interface AnatomyContextType {
  selectedOrgan: OrganKey | null;
  setSelectedOrgan: (organ: OrganKey | null) => void;
  hoveredOrgan: OrganKey | null;
  setHoveredOrgan: (organ: OrganKey | null) => void;
  isScanActive: boolean;
  setIsScanActive: (active: boolean) => void;
  scanProgress: number;
  setScanProgress: (progress: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetToFullBody: () => void;
}

const AnatomyContext = createContext<AnatomyContextType | undefined>(undefined);

export const AnatomyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedOrgan, setSelectedOrgan] = useState<OrganKey | null>(null);
  const [hoveredOrgan, setHoveredOrgan] = useState<OrganKey | null>(null);
  const [isScanActive, setIsScanActive] = useState<boolean>(true);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const resetToFullBody = () => {
    setSelectedOrgan(null);
    setHoveredOrgan(null);
    setSearchQuery('');
  };

  return (
    <AnatomyContext.Provider
      value={{
        selectedOrgan,
        setSelectedOrgan,
        hoveredOrgan,
        setHoveredOrgan,
        isScanActive,
        setIsScanActive,
        scanProgress,
        setScanProgress,
        searchQuery,
        setSearchQuery,
        resetToFullBody
      }}
    >
      {children}
    </AnatomyContext.Provider>
  );
};

export const useAnatomy = () => {
  const context = useContext(AnatomyContext);
  if (!context) {
    throw new Error('useAnatomy must be used within an AnatomyProvider');
  }
  return context;
};
