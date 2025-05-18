import React from 'react';
import Card from '../ui/Card';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PersonalizedTips: React.FC = () => {
  // These would normally be generated based on user data and behavior
  const tips = [
    {
      id: '1',
      title: 'שמירה על 20% מההכנסות',
      description: 'ההמלצה הפיננסית הבסיסית ביותר היא לשמור 20% מכל הכנסה. זה יעזור לך לבנות חיסכון משמעותי לאורך זמן.',
      link: '/guides/saving-basics',
    },
    {
      id: '2',
      title: 'שיפור קורות החיים שלך',
      description: 'הוספת הניסיון האחרון שלך בבייביסיטר יכול לשפר את סיכויי הקבלה לעבודות דומות.',
      link: '/guides/resume-building',
    },
    {
      id: '3',
      title: 'פתיחת חשבון בנק נפרד',
      description: 'פתיחת חשבון נפרד לחסכונות עוזרת לשמור על כסף בצד ולהימנע מהוצאות מיותרות.',
      link: '/guides/bank-accounts',
    },
  ];

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Sparkles size={20} className="ml-2" />
          המלצות אישיות
        </h2>
        <Link 
          to="/guides" 
          className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
        >
          כל המדריכים
          <ArrowRight size={16} className="mr-1" />
        </Link>
      </div>

      <div className="space-y-3">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-gradient-to-r from-secondary-50 to-primary-50 p-4 rounded-lg border border-primary-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5 hidden sm:block">
                <div className="bg-white rounded-full p-2 shadow-sm">
                  <Sparkles className="h-5 w-5 text-secondary-500" />
                </div>
              </div>
              
              <div className="sm:ml-4 flex-1">
                <h3 className="text-md font-medium text-gray-900">
                  {tip.title}
                </h3>
                
                <p className="mt-1 text-sm text-gray-600">
                  {tip.description}
                </p>
                
                <div className="mt-2">
                  <Link 
                    to={tip.link} 
                    className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center"
                  >
                    למידע נוסף
                    <ArrowRight size={14} className="mr-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PersonalizedTips;