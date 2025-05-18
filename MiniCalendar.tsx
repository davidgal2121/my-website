import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
import { he } from 'date-fns/locale';
import Card from '../ui/Card';
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft } from 'lucide-react';

// Mock calendar events
const events = [
  { id: '1', date: '2025-05-15', title: 'תשלום משכורת', type: 'income' },
  { id: '2', date: '2025-05-20', title: 'תשלום לחוג נגינה', type: 'expense' },
  { id: '3', date: '2025-05-25', title: 'ראיון עבודה', type: 'job' },
];

const MiniCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  // Generate days for the current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get events for the selected date
  const getEventsForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return events.filter(event => event.date === dateString);
  };

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  // Get the events for a specific day
  const getEventIndicator = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const dayEvents = events.filter(event => event.date === dateString);
    
    if (dayEvents.length === 0) return null;

    // Determine the type of event (for color coding)
    const hasIncome = dayEvents.some(event => event.type === 'income');
    const hasExpense = dayEvents.some(event => event.type === 'expense');
    const hasJob = dayEvents.some(event => event.type === 'job');

    let bgColor = 'bg-gray-400'; // Default

    if (hasIncome) bgColor = 'bg-primary-400';
    if (hasExpense) bgColor = 'bg-error-400';
    if (hasJob) bgColor = 'bg-secondary-400';

    return <div className={`h-1.5 w-1.5 rounded-full ${bgColor} mx-auto mt-1`} />;
  };

  // Days of week in Hebrew
  const weekDays = ['יום א', 'יום ב', 'יום ג', 'יום ד', 'יום ה', 'יום ו', 'שבת'];

  // Starting day of the week adjustment (Israel's week starts on Sunday)
  // No adjustment needed when using Hebrew locale with getDay()
  // This creates a proper grid layout with days aligned to correct weekdays
  const calendarDays = Array.from({
    length: getDay(monthStart) % 7
  }, (_, i) => null).concat(days);

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <CalendarIcon size={20} className="ml-2" />
          לוח שנה
        </h2>
        <div className="flex items-center">
          <button
            onClick={prevMonth}
            className="p-1 rounded-full text-gray-400 hover:text-gray-500"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <span className="mx-2 font-medium">
            {format(currentMonth, 'MMMM yyyy', { locale: he })}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 rounded-full text-gray-400 hover:text-gray-500"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-gray-500 text-xs font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, dayIdx) => (
            <div
              key={dayIdx}
              className="h-10 flex flex-col items-center"
            >
              {day ? (
                <button
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  className={`
                    h-8 w-8 flex flex-col items-center justify-center rounded-full text-sm
                    ${isToday(day) ? 'bg-primary-100 text-primary-700 font-semibold' : ''}
                    ${
                      selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-gray-100'
                    }
                  `}
                >
                  <span>{format(day, 'd')}</span>
                  {getEventIndicator(day)}
                </button>
              ) : (
                <div className="h-8 w-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected day events */}
      {selectedDate && (
        <div className="mt-4 border-t pt-3">
          <h3 className="text-sm font-medium mb-2">
            אירועים ליום {format(selectedDate, 'dd/MM/yyyy')}:
          </h3>
          
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-gray-500">אין אירועים להצגה</p>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map(event => (
                <div 
                  key={event.id} 
                  className={`
                    p-2 rounded text-sm
                    ${event.type === 'income' ? 'bg-primary-50 text-primary-800' : ''}
                    ${event.type === 'expense' ? 'bg-error-50 text-error-800' : ''}
                    ${event.type === 'job' ? 'bg-secondary-50 text-secondary-800' : ''}
                  `}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default MiniCalendar;