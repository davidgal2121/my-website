import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { 
  CheckCircle, 
  Calendar, 
  ArrowRight, 
  AlertTriangle, 
  Clock, 
  BellRing
} from 'lucide-react';
import Button from '../ui/Button';

// Mock tasks data
const tasks = [
  {
    id: '1',
    title: 'תשלום למשפחת כהן',
    dueDate: '2025-05-20',
    completed: false,
    category: 'financial',
    priority: 'high',
  },
  {
    id: '2',
    title: 'השלם טופס מס הכנסה',
    dueDate: '2025-05-25',
    completed: false,
    category: 'financial',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'ראיון עבודה - קפה בונה',
    dueDate: '2025-05-18',
    completed: false,
    category: 'job',
    priority: 'high',
  },
];

const UpcomingTasks: React.FC = () => {
  const markAsCompleted = (id: string) => {
    // This would update the task status in a real implementation
    console.log(`Marking task ${id} as completed`);
  };

  // Sort tasks by due date and priority
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.priority !== b.priority) {
      return a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0;
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const getPriorityClasses = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-error-600 bg-error-50';
      case 'medium':
        return 'text-warning-600 bg-warning-50';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <BellRing size={20} className="ml-2" />
          מעקב משימות קרובות
        </h2>
        <Link 
          to="/tasks" 
          className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
        >
          צפה בכל המשימות
          <ArrowRight size={16} className="mr-1" />
        </Link>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
            <CheckCircle className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">אין משימות פעילות</h3>
          <p className="mt-2 text-sm text-gray-500">
            כשיהיו לך משימות לביצוע, הן יופיעו כאן
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTasks.map((task) => {
            const dueDate = new Date(task.dueDate);
            const isOverdue = dueDate < new Date() && !task.completed;
            const daysLeft = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            
            return (
              <div 
                key={task.id} 
                className={`border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow ${
                  task.completed ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </h3>
                      {isOverdue && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-error-50 text-error-800">
                          <AlertTriangle size={12} className="ml-1" />
                          פג תוקף
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-1 text-sm">
                      <div className="flex items-center text-gray-500 ml-3">
                        <Calendar size={14} className="ml-1" />
                        {new Date(task.dueDate).toLocaleDateString('he-IL')}
                      </div>
                      
                      <div className="flex items-center">
                        <Clock size={14} className="ml-1" />
                        <span 
                          className={`text-xs px-2 py-0.5 rounded ${
                            isOverdue 
                              ? 'text-error-800 bg-error-50' 
                              : daysLeft <= 3 
                                ? 'text-warning-800 bg-warning-50' 
                                : 'text-gray-600 bg-gray-100'
                          }`}
                        >
                          {isOverdue 
                            ? `באיחור של ${Math.abs(daysLeft)} ימים` 
                            : daysLeft === 0 
                              ? 'היום' 
                              : `${daysLeft} ימים`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Button
                      variant={task.completed ? 'ghost' : 'outline'}
                      size="sm"
                      className={task.completed ? 'text-success-500' : ''}
                      onClick={() => markAsCompleted(task.id)}
                    >
                      <CheckCircle size={16} className="ml-1" />
                      {task.completed ? 'הושלם' : 'סמן כהושלם'}
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center">
                  <span className={`text-xs px-2 py-0.5 rounded ${getPriorityClasses(task.priority)}`}>
                    {task.priority === 'high' ? 'דחוף' : task.priority === 'medium' ? 'בינוני' : 'רגיל'}
                  </span>
                  
                  <span className="mx-2 text-gray-300">•</span>
                  
                  <span className="text-xs text-gray-500">
                    {task.category === 'financial' ? 'פיננסי' : task.category === 'job' ? 'עבודה' : 'אישי'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default UpcomingTasks;