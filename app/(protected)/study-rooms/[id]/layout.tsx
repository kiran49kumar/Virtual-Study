"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import ChannelSidebar from "../ChannelSidebar";
import React, {useState, useEffect} from "react";

interface StudyRoomsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function StudyRoomsLayout({ children, params }: StudyRoomsLayoutProps) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const matches = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    // Check if params is a promise, if so, resolve it.
    (async () => {
      const resolvedParams = await params;
      setRoomId(resolvedParams.id);
    })();
  }, [params]);

  if (!roomId) {
    return <div>Loading...</div>; // or a spinner while the id is being resolved
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row overflow-hidden">
        {matches && <ChannelSidebar studyRoomId={roomId} />}
        <div className="w-full flex flex-col shrink-0 flex-1 px-4 pb-2 md:p-8 h-[calc(100vh-112px)] md:h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
