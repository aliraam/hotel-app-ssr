import { QueryClient } from "@tanstack/react-query";
interface comments {

    id: number,
    hotelId: number,
    author: string,
    content: string,
    rating: number,
    date: string

}
// Function to fetch comments for a specific hotel
const getComments = async (hotelId: number): Promise<comments[]> => {
    const response = await fetch(`http://localhost:3001/comments?hotelId=${hotelId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }
    return response.json();
};

// Prefetch comments for a hotel using hotelId
export const prefetchGetComments = async (queryClient: QueryClient, hotelId: number) => {
    await queryClient.fetchQuery({
        queryKey: ["comments", hotelId],
        queryFn: () => getComments(hotelId),
    });
};
