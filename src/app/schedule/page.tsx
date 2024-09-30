"use client";

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaChalkboardTeacher, FaDoorOpen, FaClock, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaBook } from 'react-icons/fa';
import '@/styles/calendar.css';

const localizer = momentLocalizer(moment);

interface Class {
  id: number;
  title: string;
  start: Date;
  end: Date;
  teacher: string;
  room: string;
  color?: string;
  description?: string;
}

const classes: Class[] = [
  {
    id: 1,
    title: 'Mathematics',
    start: new Date(2023, 5, 1, 9, 0),
    end: new Date(2023, 5, 1, 10, 30),
    teacher: 'John Doe',
    room: '101',
    color: '#3498db',
    description: 'Advanced Calculus'
  },
  {
    id: 2,
    title: 'Physics',
    start: new Date(2023, 5, 1, 11, 0),
    end: new Date(2023, 5, 1, 12, 30),
    teacher: 'Jane Smith',
    room: '102',
    color: '#e74c3c',
    description: 'Quantum Mechanics'
  },
  // Add more classes as needed
];

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Class | null>(null);

  const handleSelectEvent = (event: Class) => {
    setSelectedEvent(event);
  };

  const eventStyleGetter = (event: Class) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '5px',
        opacity: 0.8,
        color: '#ffffff',
        border: '0px',
        display: 'block'
      }
    };
  };

  const CustomToolbar = ({ date, onNavigate }: { date: Date; onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void }) => (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={() => onNavigate('PREV')}><FaChevronLeft /></button>
        <button onClick={() => onNavigate('TODAY')}>Today</button>
        <button onClick={() => onNavigate('NEXT')}><FaChevronRight /></button>
      </span>
      <span className="rbc-toolbar-label">{moment(date).format('MMMM D, YYYY')}</span>
    </div>
  );

  const EventComponent = ({ event }: { event: Class }) => (
    <div>
      <strong>{event.title}</strong>
      <div>{event.teacher}</div>
      <div>Room: {event.room}</div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white text-center">Class Schedule</h1>
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <Calendar
            localizer={localizer}
            events={classes}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            view="day"
            views={['day']}
            date={currentDate}
            onNavigate={(date: Date) => setCurrentDate(date)}
            components={{
              toolbar: CustomToolbar,
              event: EventComponent,
            }}
          />
        </div>
        {selectedEvent && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{selectedEvent.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaChalkboardTeacher className="text-blue-500 mr-2 text-xl" />
                <p className="text-gray-600 dark:text-gray-300">Teacher: {selectedEvent.teacher}</p>
              </div>
              <div className="flex items-center">
                <FaDoorOpen className="text-green-500 mr-2 text-xl" />
                <p className="text-gray-600 dark:text-gray-300">Room: {selectedEvent.room}</p>
              </div>
              <div className="flex items-center">
                <FaClock className="text-yellow-500 mr-2 text-xl" />
                <p className="text-gray-600 dark:text-gray-300">
                  Time: {moment(selectedEvent.start).format('h:mm A')} - {moment(selectedEvent.end).format('h:mm A')}
                </p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-purple-500 mr-2 text-xl" />
                <p className="text-gray-600 dark:text-gray-300">
                  Date: {moment(selectedEvent.start).format('MMMM D, YYYY')}
                </p>
              </div>
              <div className="flex items-center col-span-2">
                <FaBook className="text-red-500 mr-2 text-xl" />
                <p className="text-gray-600 dark:text-gray-300">
                  Description: {selectedEvent.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}