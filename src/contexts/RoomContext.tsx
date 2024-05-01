import React, { createContext, useContext, useState } from "react";

// Define the shape of the RoomContext
type RoomContextType = {
  selectedRoom: string | null;
  selectRoom: (room: string) => void;
};

// Create RoomContext
const RoomContext = createContext<RoomContextType | undefined>(undefined);

// RoomContext provider component
export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const selectRoom = (room: string) => {
    setSelectedRoom(room);
  };

  return (
    <RoomContext.Provider value={{ selectedRoom, selectRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

// Custom hook to use RoomContext
export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext must be used within a RoomProvider");
  }
  return context;
};
