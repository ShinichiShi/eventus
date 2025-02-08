import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, List, Filter } from 'lucide-react';
import EventCard from '../components/Card';
import axios from 'axios';
const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    startDate: '',
    endDate: '',
    status: 'all'
  });

  const categories = ['Conference', 'Workshop', 'Seminar', 'Social'];

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.startDate) {
        params.append('startDate', new Date(filters.startDate).toISOString());
      }
      if (filters.endDate) {
        params.append('endDate', new Date(filters.endDate).toISOString());
      }
      if (filters.status !== 'all') {
        params.append('status', filters.status);
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };      
      const response = await axios.get(`/api/events?${params.toString()}`, config);
      setEvents(response.data.events || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };
  const submit = ()=>{
    fetchEvents();
  }
  
// DELETE: delete self hosted events

  return (
    <div className="flex min-h-screen w-screen text-black bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 text-black shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Events</h2>
          <div
            // onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded"
          >
            <Filter size={20} />
            Filters
          </div>
          
          {(
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                  value={filters.startDate}
                  onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                  value={filters.endDate}
                  onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                />
              </div>
            </div>
            
          )}
        </div>
        
        <nav className="mt-4">
        <div onClick={()=>setFilters({...filters, status:'all'})} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
            <Calendar size={20} />
            All
          </div>
          <div onClick={()=>setFilters({...filters, status:'upcoming'})} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
            <Calendar size={20} />
            Upcoming Events
          </div>
          <div onClick={()=>setFilters({...filters, status:'past'})} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
            <List size={20} />
            Past Events
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center">Loading events...</div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Event Dashboard</h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;