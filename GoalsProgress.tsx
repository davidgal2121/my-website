import React from 'react';
import { Link } from 'react-router-dom';
import { useFinance } from '../../context/FinanceContext';
import Card from '../ui/Card';
import { ArrowRight, Target, Award, Calendar, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import Button from '../ui/Button';

const GoalsProgress: React.FC = () => {
  const { goals } = useFinance();

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Target size={20} className="ml-2" />
          יעדים וחיסכון
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Plus size={16} />}
            onClick={() => {/* Open modal to add goal */}}
          >
            יעד חדש
          </Button>
          <Link 
            to="/finance/goals" 
            className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
          >
            כל היעדים
            <ArrowRight size={16} className="mr-1" />
          </Link>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
            <Target className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">אין יעדים עדיין</h3>
          <p className="mt-2 text-sm text-gray-500">
            הגדר יעד חיסכון חדש כדי להתחיל לחסוך באופן מסודר
          </p>
          <div className="mt-5">
            <Button 
              variant="primary" 
              icon={<Plus size={16} />}
              onClick={() => {/* Open modal to add goal */}}
            >
              הוסף יעד חדש
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = Math.floor((goal.currentAmount / goal.targetAmount) * 100);
            
            return (
              <div key={goal.id} className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{goal.name}</h3>
                  <div className="text-sm text-primary-600 font-medium">
                    {goal.currentAmount} / {goal.targetAmount} ₪
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mb-2">
                  <div 
                    className="h-2 bg-primary-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={14} className="ml-1" />
                    <span>
                      {formatDistanceToNow(new Date(goal.targetDate), { 
                        addSuffix: true,
                        locale: he
                      })}
                    </span>
                  </div>
                  <div>
                    {percentage >= 100 ? (
                      <span className="flex items-center text-success-500">
                        <Award size={14} className="ml-1" />
                        היעד הושלם!
                      </span>
                    ) : (
                      <span>{percentage}% הושלם</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default GoalsProgress;