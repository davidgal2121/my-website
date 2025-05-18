import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Briefcase as BriefcaseBusiness, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { useFinance } from '../../context/FinanceContext';
import { Income, Expense } from '../../types';

const QuickActions: React.FC = () => {
  const [isAddingIncome, setIsAddingIncome] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const { addIncome, addExpense } = useFinance();

  // Income form state
  const [incomeData, setIncomeData] = useState({
    source: '',
    amount: '',
    type: 'temporary' as const,
  });

  // Expense form state
  const [expenseData, setExpenseData] = useState({
    category: '',
    amount: '',
  });

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incomeData.source || !incomeData.amount) return;

    const newIncome: Omit<Income, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      source: incomeData.source,
      amount: Number(incomeData.amount),
      type: incomeData.type,
      status: 'paid',
    };

    addIncome(newIncome);
    setIncomeData({ source: '', amount: '', type: 'temporary' });
    setIsAddingIncome(false);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseData.category || !expenseData.amount) return;

    const newExpense: Omit<Expense, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      category: expenseData.category,
      amount: Number(expenseData.amount),
      status: 'paid',
    };

    addExpense(newExpense);
    setExpenseData({ category: '', amount: '' });
    setIsAddingExpense(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Add Income Button/Form */}
      <div className="bg-white p-4 rounded-lg shadow-card">
        {!isAddingIncome ? (
          <button
            onClick={() => setIsAddingIncome(true)}
            className="w-full h-full flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
          >
            <div className="rounded-full bg-primary-100 p-3 mb-2">
              <Plus className="h-6 w-6 text-primary-600" />
            </div>
            <span className="text-lg font-medium text-gray-900">הוסף הכנסה</span>
            <p className="text-sm text-gray-500 mt-1">תיעוד הכנסות מעבודות וממקורות אחרים</p>
          </button>
        ) : (
          <form onSubmit={handleAddIncome} className="animate-fade-in">
            <h3 className="text-lg font-medium mb-3">הכנסה חדשה</h3>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="income-source" className="block text-sm font-medium text-gray-700">
                  מקור
                </label>
                <input 
                  type="text"
                  id="income-source"
                  value={incomeData.source}
                  onChange={(e) => setIncomeData({ ...incomeData, source: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="לדוגמה: בייביסיטר, מלצרות"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="income-amount" className="block text-sm font-medium text-gray-700">
                  סכום (₪)
                </label>
                <input 
                  type="number"
                  id="income-amount"
                  value={incomeData.amount}
                  onChange={(e) => setIncomeData({ ...incomeData, amount: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="הזן סכום"
                  min="1"
                  required
                />
              </div>

              <div>
                <label htmlFor="income-type" className="block text-sm font-medium text-gray-700">
                  סוג עבודה
                </label>
                <select
                  id="income-type"
                  value={incomeData.type}
                  onChange={(e) => setIncomeData({ 
                    ...incomeData, 
                    type: e.target.value as 'permanent' | 'temporary' | 'project'
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="temporary">זמני</option>
                  <option value="permanent">קבוע</option>
                  <option value="project">פרויקט</option>
                </select>
              </div>

              <div className="flex space-x-3 space-x-reverse pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingIncome(false)}
                  className="flex-1"
                >
                  ביטול
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  שמור
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Add Expense Button/Form */}
      <div className="bg-white p-4 rounded-lg shadow-card">
        {!isAddingExpense ? (
          <button
            onClick={() => setIsAddingExpense(true)}
            className="w-full h-full flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-error-300 hover:bg-error-50 transition-colors duration-200"
          >
            <div className="rounded-full bg-error-100 p-3 mb-2">
              <Minus className="h-6 w-6 text-error-600" />
            </div>
            <span className="text-lg font-medium text-gray-900">הוסף הוצאה</span>
            <p className="text-sm text-gray-500 mt-1">תיעוד הוצאות והתנהלות כספית</p>
          </button>
        ) : (
          <form onSubmit={handleAddExpense} className="animate-fade-in">
            <h3 className="text-lg font-medium mb-3">הוצאה חדשה</h3>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="expense-category" className="block text-sm font-medium text-gray-700">
                  קטגוריה
                </label>
                <input 
                  type="text"
                  id="expense-category"
                  value={expenseData.category}
                  onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="לדוגמה: אוכל, בידור, ביגוד"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="expense-amount" className="block text-sm font-medium text-gray-700">
                  סכום (₪)
                </label>
                <input 
                  type="number"
                  id="expense-amount"
                  value={expenseData.amount}
                  onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="הזן סכום"
                  min="1"
                  required
                />
              </div>

              <div className="flex space-x-3 space-x-reverse pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingExpense(false)}
                  className="flex-1"
                >
                  ביטול
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  שמור
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Quick Jobs Link */}
      <div className="bg-white p-4 rounded-lg shadow-card">
        <Link 
          to="/jobs"
          className="w-full h-full flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition-colors duration-200"
        >
          <div className="rounded-full bg-secondary-100 p-3 mb-2">
            <BriefcaseBusiness className="h-6 w-6 text-secondary-600" />
          </div>
          <span className="text-lg font-medium text-gray-900">חיפוש עבודות</span>
          <p className="text-sm text-gray-500 mt-1">משרות מותאמות לבני נוער</p>
        </Link>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white p-4 rounded-lg shadow-card">
        <Link 
          to="/guides"
          className="w-full h-full flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-accent-300 hover:bg-accent-50 transition-colors duration-200"
        >
          <div className="rounded-full bg-accent-100 p-3 mb-2">
            <Sparkles className="h-6 w-6 text-accent-600" />
          </div>
          <span className="text-lg font-medium text-gray-900">טיפים והמלצות</span>
          <p className="text-sm text-gray-500 mt-1">המלצות AI לניהול פיננסי טוב יותר</p>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;