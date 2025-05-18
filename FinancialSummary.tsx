import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line
} from 'recharts';
import Card from '../ui/Card';
import { useFinance } from '../../context/FinanceContext';
import { ArrowRight, TrendingUp } from 'lucide-react';

const FinancialSummary: React.FC = () => {
  const { incomes, expenses, currentReport } = useFinance();
  
  // Process data for the charts
  const currentMonth = new Date().toLocaleDateString('he-IL', { month: 'long' });
  
  // Create monthly data
  const monthlyData = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const month = date.toLocaleDateString('he-IL', { month: 'short' });
    
    // Mock data - in a real app, we would calculate this from actual data
    return {
      month,
      הכנסות: 500 + Math.floor(Math.random() * 800),
      הוצאות: 300 + Math.floor(Math.random() * 500),
    };
  }).reverse();

  // Calculate balances for trend chart
  const balanceData = monthlyData.map(item => ({
    month: item.month,
    יתרה: item.הכנסות - item.הוצאות
  }));

  // Category breakdown
  const categoryData = [
    { name: 'בידור', amount: 100 },
    { name: 'אוכל', amount: 75 },
    { name: 'חיסכון', amount: 200 },
    { name: 'תחבורה', amount: 50 },
    { name: 'אחר', amount: 20 },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} ₪
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">סיכום פיננסי - {currentMonth}</h2>
        <Link 
          to="/finance/reports" 
          className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
        >
          תצוגת דוח מלא
          <ArrowRight size={16} className="mr-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-primary-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">סה"כ הכנסות</div>
          <div className="text-xl font-semibold">{currentReport.summary.totalIncome} ₪</div>
          <div className="text-xs text-success-600 mt-1 flex items-center">
            <TrendingUp size={14} className="ml-1" />
            +5% מהחודש הקודם
          </div>
        </div>
        
        <div className="bg-primary-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">סה"כ הוצאות</div>
          <div className="text-xl font-semibold">{currentReport.summary.totalExpense} ₪</div>
          <div className="text-xs text-error-600 mt-1 flex items-center">
            <TrendingUp size={14} className="ml-1" />
            +2% מהחודש הקודם
          </div>
        </div>
        
        <div className="bg-accent-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">יתרה</div>
          <div className="text-xl font-semibold">{currentReport.summary.balance} ₪</div>
          <div className="text-xs text-gray-500 mt-1">
            {currentReport.summary.balance > 0 
              ? 'כל הכבוד! יש לך יתרה חיובית' 
              : 'שים לב להוצאות שלך החודש'}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">הכנסות והוצאות</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis unit=" ₪" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="הכנסות" fill="#3b82f6" />
              <Bar dataKey="הוצאות" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">מגמת היתרה</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={balanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis unit=" ₪" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="יתרה" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">פילוח הוצאות</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={categoryData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit=" ₪" />
                <YAxis dataKey="name" type="category" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#8b5cf6">
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinancialSummary;