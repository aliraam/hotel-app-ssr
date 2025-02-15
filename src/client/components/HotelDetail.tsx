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

interface comments {

  id: number,
  hotelId: number,
  author: string,
  content: string,
  rating: number,
  date: string

}

const getHotelMapIframeUrl = (lat: number, lng: number, name: string) => {
  const zoom = 17;
  const encodedName = encodeURIComponent(name);
  return `https://map.ir/lat/${lat}/lng/${lng}/z/${zoom}/p/${encodedName}`;
};

export default function HotelDetail() {
  const { id } = useParams();
  const hotelId = Number(id);
  const queryClient = useQueryClient();
  const hotels = queryClient.getQueryData(["hotels"]) as Hotel[] || [];
  const comments = queryClient.getQueryData(["comments", hotelId]) as comments[] || [];

  const hotel = hotels.find((h: any) => h.id === id);
  const hotelComments = comments.filter((c: comments) => c.hotelId === hotelId);

  console.log(hotelComments, 'comments')
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

        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
          {hotelComments.length > 0 ? (
            hotelComments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-300 pb-4 mb-4">
                <p className="text-lg font-semibold">{comment.author}</p>
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-sm text-gray-500">{comment.date}</p>
                <p className="text-yellow-500">⭐ {comment.rating}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}