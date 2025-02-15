import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, MapPin, Star } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Hotel {
  id: number;
  name: string;
  description: string;
  stars: number;
  image: string;
  location: {
    lat: number;
    long: number;
  };
}

const getHotelMapIframeUrl = (lat: number, lng: number, name: string): string => {
  const zoom = 17;
  const encodedName = encodeURIComponent(name);
  return `https://map.ir/lat/${lat}/lng/${lng}/z/${zoom}/p/${encodedName}`;
};

export default function HotelList() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const hotels = (queryClient.getQueryData(["hotels"]) as Hotel[]) || [];

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
    hotel.description.toLowerCase().includes(search.toLowerCase())
  );

  const isLoading = !hotels.length;

  return (
    <div className="space-y-6 mt-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search hotels..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ?
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="block bg-white rounded-lg shadow-sm p-4">
                <Skeleton height={192} className="rounded-t-lg" />
                <div className="p-4">
                  <Skeleton width="70%" height={24} />
                  <Skeleton width="40%" height={16} />
                  <Skeleton width="90%" height={48} className="mt-2" />
                  <Skeleton width="60%" height={16} className="mt-4" />
                </div>
                <Skeleton height={300} className="mt-4 rounded-lg" />
              </div>
            ))
          :
          filteredHotels.map((hotel) => (
            <Link to={`/hotel/${hotel.id}`} key={hotel.id}>
              <div className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="object-cover w-full h-48 rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-900">{hotel.name}</h2>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{hotel.stars}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 line-clamp-2">{hotel.description}</p>
                  <div className="mt-4 flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {hotel.location.lat.toFixed(4)}, {hotel.location.long.toFixed(4)}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <iframe
                    width="100%"
                    height="300"
                    src={getHotelMapIframeUrl(hotel.location.lat, hotel.location.long, hotel.name)}
                    title={`Map of ${hotel.name}`}
                    className="w-full rounded-lg border-none"
                  />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
