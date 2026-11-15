import React, { createContext, useContext, useState, useEffect } from 'react';
import { Astronaut, AnatomicalModelType } from '../types';
import { MOCK_ASTRONAUTS } from '../mocks/astronauts';

interface AuthContextType {
  currentUser: Astronaut | null;
  isAdmin: boolean;
  selectedAnatomicalProfile: AnatomicalModelType;
  setAnatomicalProfile: (profile: AnatomicalModelType) => void;
  loginUser: (astronautId: string) => boolean;
  loginAdmin: (email: string) => boolean;
  selectAstronaut: (astronautId: string) => void;
  signupUser: (userData: Partial<Astronaut> & { anatomicalProfile: AnatomicalModelType }) => Astronaut;
  logout: () => void;
  allAstronauts: Astronaut[];
  backendConnected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allAstronauts, setAllAstronauts] = useState<Astronaut[]>(() => {
    try {
      const stored = sessionStorage.getItem('norelis_astronauts');
      return stored ? JSON.parse(stored) : MOCK_ASTRONAUTS;
    } catch {
      return MOCK_ASTRONAUTS;
    }
  });

  const [currentUser, setCurrentUser] = useState<Astronaut | null>(() => {
    try {
      const stored = sessionStorage.getItem('norelis_current_user');
      if (stored) return JSON.parse(stored);
      return MOCK_ASTRONAUTS[0];
    } catch {
      return MOCK_ASTRONAUTS[0];
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('norelis_is_admin') === 'true';
    } catch {
      return false;
    }
  });

  const [selectedAnatomicalProfile, setSelectedAnatomicalProfile] = useState<AnatomicalModelType>(() => {
    try {
      const stored = sessionStorage.getItem('norelis_anatomical_profile');
      if (stored === 'male' || stored === 'female') return stored;
      return currentUser?.anatomicalProfile || 'female';
    } catch {
      return 'female';
    }
  });

  const [backendConnected, setBackendConnected] = useState<boolean>(false);

  // Sync with FastAPI Backend on mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const res = await fetch('/api/v1/astronauts');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setBackendConnected(true);
            const mapped: Astronaut[] = data.map((item: any, idx: number) => {
              const profile: AnatomicalModelType =
                item.sex?.toUpperCase() === 'M' || item.sex?.toLowerCase() === 'male'
                  ? 'male'
                  : 'female';

              return {
                id: item.astronaut_id || `AG-00${idx + 1}`,
                name: item.name || `Astronaut ${item.astronaut_id}`,
                age: item.age || 38,
                sex: profile,
                heightCm: item.height_cm || (profile === 'female' ? 168 : 180),
                massKg: item.mass_kg || (profile === 'female' ? 62 : 78),
                anatomicalProfile: profile,
                missionStatus: 'in_flight',
                missionDays: item.mission_days || 45,
                missionName: 'Artemis IV Deep Space Habitat',
                baselineStatus: 'validated',
                activeAlertsCount: idx === 1 ? 1 : 0,
                lastUpdated: new Date().toISOString(),
                medicalHistorySummary:
                  item.medical_history ||
                  'Earth physiological reference verified across 14-day pre-flight protocol.'
              };
            });

            setAllAstronauts(mapped);
            sessionStorage.setItem('norelis_astronauts', JSON.stringify(mapped));

            // If current user is one of the backend astronauts, keep it in sync
            setCurrentUser(prev => {
              if (!prev) return mapped[0];
              const match = mapped.find(m => m.id === prev.id);
              return match || prev;
            });
          }
        }
      } catch (err) {
        // Fallback to local demonstration dataset
        setBackendConnected(false);
      }
    };

    fetchBackendData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('norelis_current_user', JSON.stringify(currentUser));
      sessionStorage.setItem('norelis_anatomical_profile', currentUser.anatomicalProfile);
      setSelectedAnatomicalProfile(currentUser.anatomicalProfile);
    } else {
      sessionStorage.removeItem('norelis_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    sessionStorage.setItem('norelis_is_admin', String(isAdmin));
  }, [isAdmin]);

  const setAnatomicalProfile = (profile: AnatomicalModelType) => {
    setSelectedAnatomicalProfile(profile);
    sessionStorage.setItem('norelis_anatomical_profile', profile);
    if (currentUser) {
      const updated = { ...currentUser, anatomicalProfile: profile };
      setCurrentUser(updated);
      setAllAstronauts(prev => prev.map(a => (a.id === updated.id ? updated : a)));
    }
  };

  const selectAstronaut = (astronautId: string) => {
    const found = allAstronauts.find(
      a =>
        a.id.toLowerCase() === astronautId.toLowerCase() ||
        a.name.toLowerCase().includes(astronautId.toLowerCase())
    );
    if (found) {
      setCurrentUser(found);
      setSelectedAnatomicalProfile(found.anatomicalProfile);
    }
  };

  const loginUser = (astronautId: string): boolean => {
    const found = allAstronauts.find(
      a =>
        a.id.toLowerCase() === astronautId.toLowerCase() ||
        a.name.toLowerCase().includes(astronautId.toLowerCase())
    );
    if (found) {
      setCurrentUser(found);
      setIsAdmin(false);
      setSelectedAnatomicalProfile(found.anatomicalProfile);

      // Async backend notification
      fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: found.id })
      }).catch(() => {});

      return true;
    }
    return false;
  };

  const loginAdmin = (email: string): boolean => {
    if (email) {
      setIsAdmin(true);
      if (!currentUser) {
        setCurrentUser(allAstronauts[0]);
      }
      return true;
    }
    return false;
  };

  const signupUser = (
    userData: Partial<Astronaut> & { anatomicalProfile: AnatomicalModelType }
  ): Astronaut => {
    const newId = `AG-${String(allAstronauts.length + 1).padStart(3, '0')}`;
    const newAstronaut: Astronaut = {
      id: newId,
      name: userData.name || 'New Astronaut',
      age: userData.age || 35,
      sex: userData.sex || (userData.anatomicalProfile === 'female' ? 'female' : 'male'),
      heightCm: userData.heightCm || 172,
      massKg: userData.massKg || 68,
      anatomicalProfile: userData.anatomicalProfile,
      missionStatus: 'pre_mission',
      missionDays: 0,
      missionName: 'NORELIS Baseline Calibration Mission',
      baselineStatus: 'provisional',
      activeAlertsCount: 0,
      lastUpdated: new Date().toISOString(),
      medicalHistorySummary:
        userData.medicalHistorySummary ||
        'Newly registered profile; objective baseline collection underway.'
    };

    const updated = [newAstronaut, ...allAstronauts];
    setAllAstronauts(updated);
    setCurrentUser(newAstronaut);
    setIsAdmin(false);
    setSelectedAnatomicalProfile(newAstronaut.anatomicalProfile);
    sessionStorage.setItem('norelis_astronauts', JSON.stringify(updated));
    return newAstronaut;
  };

  const logout = () => {
    sessionStorage.removeItem('norelis_current_user');
    sessionStorage.removeItem('norelis_is_admin');
    setCurrentUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        selectedAnatomicalProfile,
        setAnatomicalProfile,
        loginUser,
        loginAdmin,
        selectAstronaut,
        signupUser,
        logout,
        allAstronauts,
        backendConnected
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
