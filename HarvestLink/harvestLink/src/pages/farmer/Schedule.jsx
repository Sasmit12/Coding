import { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Package, 
  Truck, 
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Filter
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function FarmerSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const { user } = useAuth();

  // Mock schedule data
  const mockSchedule = [
    {
      id: "1",
      title: "Harvest Tomatoes",
      type: "harvest",
      date: "2024-01-16",
      time: "08:00",
      duration: 120,
      location: "Greenhouse A",
      description: "Harvest ripe tomatoes for market delivery",
      status: "pending",
      priority: "high",
      notes: "Check for any damaged fruits"
    },
    {
      id: "2",
      title: "Deliver Order #ORD-045",
      type: "delivery",
      date: "2024-01-16",
      time: "14:00",
      duration: 60,
      location: "123 Main St, City",
      description: "Deliver fresh produce to John Smith",
      status: "pending",
      priority: "high",
      notes: "Customer requested morning delivery"
    },
    {
      id: "3",
      title: "Plant New Lettuce Seeds",
      type: "planting",
      date: "2024-01-17",
      time: "09:00",
      duration: 90,
      location: "Field B",
      description: "Plant new batch of lettuce seeds",
      status: "pending",
      priority: "medium",
      notes: "Use organic seeds from supplier"
    },
    {
      id: "4",
      title: "Irrigation System Check",
      type: "maintenance",
      date: "2024-01-17",
      time: "16:00",
      duration: 45,
      location: "Entire Farm",
      description: "Check and maintain irrigation systems",
      status: "pending",
      priority: "medium",
      notes: "Focus on greenhouse systems"
    },
    {
      id: "5",
      title: "Market Preparation",
      type: "preparation",
      date: "2024-01-18",
      time: "07:00",
      duration: 120,
      location: "Packing Area",
      description: "Prepare products for weekend market",
      status: "pending",
      priority: "high",
      notes: "Include organic certification labels"
    }
  ];

  const eventTypes = [
    { value: "all", label: "All Events", color: "gray" },
    { value: "harvest", label: "Harvest", color: "green" },
    { value: "planting", label: "Planting", color: "blue" },
    { value: "delivery", label: "Delivery", color: "purple" },
    { value: "maintenance", label: "Maintenance", color: "orange" },
    { value: "preparation", label: "Preparation", color: "yellow" }
  ];

  useEffect(() => {
    // Simulate loading schedule
    setTimeout(() => {
      setSchedule(mockSchedule);
      setLoading(false);
    }, 1000);
  }, []);

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.value === type);
    switch (eventType?.color) {
      case "green":
        return "bg-green-100 text-green-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "purple":
        return "bg-purple-100 text-purple-800";
      case "orange":
        return "bg-orange-100 text-orange-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredSchedule = schedule.filter(event =>
    (filterType === "all" || event.type === filterType) &&
    event.date === selectedDate.toISOString().split('T')[0]
  );

  const updateEventStatus = (eventId, newStatus) => {
    setSchedule(schedule.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  const deleteEvent = (eventId) => {
    setSchedule(schedule.filter(event => event.id !== eventId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
                <p className="text-gray-600">Manage your farming activities and deliveries</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddEvent(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Date Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedule.filter(e => e.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedule.filter(e => e.status === "completed" && e.date === selectedDate.toISOString().split('T')[0]).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Deliveries Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedule.filter(e => e.type === "delivery" && e.date === selectedDate.toISOString().split('T')[0]).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Schedule for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
          </div>
          
          {filteredSchedule.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
              <p className="text-gray-600 mb-6">Add events to your schedule to get started.</p>
              <button
                onClick={() => setShowAddEvent(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredSchedule.map((event) => (
                <div key={event.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(event.status)}
                        <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {eventTypes.find(t => t.value === event.type)?.label}
                        </span>
                        <span className={`text-sm font-medium ${getPriorityColor(event.priority)}`}>
                          {event.priority} priority
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.time} ({event.duration} min)</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{event.description}</p>
                      
                      {event.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm text-yellow-800">
                            <strong>Notes:</strong> {event.notes}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {event.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateEventStatus(event.id, "in-progress")}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                          >
                            Start
                          </button>
                          <button
                            onClick={() => updateEventStatus(event.id, "completed")}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          >
                            Complete
                          </button>
                        </>
                      )}
                      {event.status === "in-progress" && (
                        <button
                          onClick={() => updateEventStatus(event.id, "completed")}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => {/* TODO: Edit event */}}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 