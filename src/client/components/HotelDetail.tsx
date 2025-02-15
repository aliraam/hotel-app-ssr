import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin, Star } from "lucide-react";

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

const getHotelMapIframeUrl = (lat: number, lng: number, name: string) => {
  const zoom = 17;
  const encodedName = encodeURIComponent(name);
  return `https://map.ir/lat/${lat}/lng/${lng}/z/${zoom}/p/${encodedName}`;
};

export default function HotelDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const hotels = queryClient.getQueryData(["hotels"]) as Hotel[] || [];
  const hotel = hotels.find((h: any) => h.id === id);

  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div className="space-y-6 p-4">
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        &larr; Back to Hotels
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-96 object-cover rounded-lg"
        />

        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
            <span className="text-lg font-semibold">{hotel.stars} Star Rating</span>
          </div>

          <p className="text-gray-600 text-lg">{hotel.description}</p>

          <div className="flex items-center text-gray-500">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg">
              {hotel.location.lat.toFixed(4)}, {hotel.location.long.toFixed(4)}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <iframe
            width="100%"
            height="400"
            src={getHotelMapIframeUrl(hotel.location.lat, hotel.location.long, hotel.name)}
            className="rounded-lg border-none"
            title={`Detailed Map of ${hotel.name}`}
          />
        </div>
      </div>
    </div>
  );
}