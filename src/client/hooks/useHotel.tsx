import { QueryClient } from "@tanstack/react-query";
import { Hotel } from "../types/hotel";

const getHotels = async (): Promise<Hotel[]> => {
    const response = await fetch("http://localhost:3001/hotels");
    if (!response.ok) {
        throw new Error("Failed to fetch hotels");
    }
    return response.json();
};

export const prefetchGetHotels = async (queryClient: QueryClient) => {
    await queryClient.prefetchQuery({
        queryKey: ["hotels"],
        queryFn: getHotels,
    });
};
