import React from 'react';
import { BarChart3, PieChart, TrendingUp, Activity, Target } from 'lucide-react';

interface ChartData {
  hour: string;
  amount: number;
}

interface TransactionChartProps {
  data: ChartData[];
}

export const TransactionChart: React.FC<TransactionChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Transaction Analytics</h3>
          <p className="text-sm text-gray-500">Hourly transaction volume for today</p>
        </div>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 days</option>
          </select>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <BarChart3 className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <PieChart className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Enhanced Chart with Grid and Animations */}
      <div className="relative">
        {/* Chart Grid Background */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-gray-200"></div>
          ))}
        </div>
        
        {/* Y-axis Labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-12">
          <span>₹4K</span>
          <span>₹3K</span>
          <span>₹2K</span>
          <span>₹1K</span>
          <span>₹0</span>
        </div>

        {/* Chart Bars */}
        <div className="flex items-end justify-between h-64 px-4 pt-4">
          {data.map((item, index) => {
            const height = (item.amount / maxAmount) * 100;
            const isHighest = item.amount === maxAmount;
            
            return (
              <div key={index} className="flex flex-col items-center group cursor-pointer">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                  <div className="font-semibold">₹{item.amount.toLocaleString()}</div>
                  <div className="text-gray-300">{item.hour}</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
                
                {/* Bar */}
                <div className="relative w-8 bg-gray-100 rounded-t-lg overflow-hidden group-hover:shadow-lg transition-all duration-300">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${
                      isHighest 
                        ? 'bg-gradient-to-t from-purple-600 via-purple-500 to-pink-400' 
                        : 'bg-gradient-to-t from-purple-500 to-purple-400'
                    } group-hover:from-purple-600 group-hover:to-pink-500`}
                    style={{ 
                      height: `${height}%`,
                      minHeight: '8px',
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-500"></div>
                  </div>
                  
                  {/* Peak Indicator */}
                  {isHighest && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                
                {/* Hour Label */}
                <div className="mt-3 text-xs text-gray-600 font-medium group-hover:text-purple-600 transition-colors">
                  {item.hour}
                </div>
                
                {/* Amount Label */}
                <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{item.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-900">Peak Hour</span>
            </div>
            <div className="text-lg font-bold text-purple-600">2:00 PM</div>
            <div className="text-xs text-gray-500">₹4,100 revenue</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-900">Avg/Hour</span>
            </div>
            <div className="text-lg font-bold text-blue-600">₹2,650</div>
            <div className="text-xs text-gray-500">+12% vs yesterday</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Target className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-900">Growth</span>
            </div>
            <div className="text-lg font-bold text-green-600">+15.2%</div>
            <div className="text-xs text-gray-500">vs last week</div>
          </div>
        </div>
      </div>

      {/* Interactive Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded"></div>
          <span className="text-gray-600">Regular Hours</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-400 rounded"></div>
          <span className="text-gray-600">Peak Hours</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-gray-600">Highest Volume</span>
        </div>
      </div>
    </div>
  );
};