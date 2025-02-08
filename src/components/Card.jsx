import { useState } from "react";
const EventCard = ({ event }) => {
    const [showModal, setShowModal] = useState(false);
    const isUpcoming = new Date(event.date).getTime() > Date.now();
  
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex w-full h-1/2 justify-between items-center">
        <div>
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-gray-600 text-sm">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {event.category}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              isUpcoming ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {isUpcoming ? "Upcoming" : "Past"}
          </span>
        </div>
        </div>
        
      
       
        <div className="flex justify-between gap-1 items-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Participate
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-600 items-center flex hover:underline"
          >
            Details
          </button>
        </div>
        </div>
        
  
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">{event.title}</h2>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default EventCard