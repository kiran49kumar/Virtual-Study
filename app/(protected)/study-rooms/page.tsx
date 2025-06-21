"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { getAllStudyRooms } from "@/lib/studyrooms.service";
import { useMemo } from "react";
import useSWR from "swr";
import Header from "../Header";
import StudyRooms from "./StudyRooms";
import { useSearchParams } from 'next/navigation';

const StudyRoomPage = () => {
  const { currentUser } = useAuth();
  const searchParams = useSearchParams(); 
  const query = searchParams?.get('q') || "";

  const { data, error, isLoading } = useSWR(
    currentUser?.$id ? `all-study-rooms?q=${query}` : null,
    async () => await getAllStudyRooms(currentUser?.$id, query),
    {
      revalidateOnFocus: false,
    }
  );

  const publicRooms = useMemo(() => data?.filter((room) => room.status === "public"), [data]);

  const privateRooms = useMemo(() => data?.filter((room) => room.status === "private"), [data]);

  return (
    <div className="w-full sm:h-screen flex flex-col p-4 sm:p-8 overflow-hidden">
      <Header
        currentUser={currentUser}
        className="hidden md:flex justify-between w-full max-w-full"
      />
      {isLoading ? null : <StudyRooms publicRooms={publicRooms} privateRooms={privateRooms} />}
    </div>
  );
};

export default StudyRoomPage;
