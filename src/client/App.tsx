import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ContextWrapper } from "./Context";
import Main from "./pages/Main";
import HotelList from "./components/HotelList";
import HotelDetail from "./components/HotelDetail";
import { prefetchGetHotels } from "./hooks/useHotel";

const queryClient = new QueryClient();

// Prefetch data
await prefetchGetHotels(queryClient);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextWrapper>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<HotelList />} />
            <Route path="hotel/:id" element={<HotelDetail />} />
          </Route>
        </Routes>
      </ContextWrapper>
    </QueryClientProvider>
  );
};