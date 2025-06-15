import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { communityService } from "../services/communityService";
import Button from "../components/common/Button";

export default function Events() {
  const [filter, setFilter] = useState("all"); // all, upcoming, past

  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => communityService.getEvents(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farmer-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">
          Error loading events. Please try again later.
        </div>
      </div>
    );
  }

  const filteredEvents = events?.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();

    switch (filter) {
      case "upcoming":
        return eventDate >= today;
      case "past":
        return eventDate < today;
      default:
        return true;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Events</h1>
        <div className="flex gap-4">
          <Button
            variant={filter === "all" ? "primary" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Events
          </Button>
          <Button
            variant={filter === "upcoming" ? "primary" : "outline"}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === "past" ? "primary" : "outline"}
            onClick={() => setFilter("past")}
          >
            Past Events
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents?.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
          >
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-farmer-primary/10 text-farmer-primary">
                  {event.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-gray-500">
                    {event.location}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = `/events/${event.id}`)}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Button (for farmers only) */}
      <div className="mt-12 text-center">
        <Button
          onClick={() => (window.location.href = "/events/create")}
          size="lg"
        >
          Create New Event
        </Button>
        <p className="mt-2 text-sm text-gray-500">
          Share your farming knowledge and connect with the community
        </p>
      </div>
    </div>
  );
}
