import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetComments } from "../hooks/useGetComments";
import HotelDetail from "./HotelDetail";

export default function HotelWithPrefetch() {
    const { id } = useParams();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (id) {
            prefetchGetComments(queryClient, Number(id));
        }
    }, [id, queryClient]);

    return <HotelDetail />;
}
