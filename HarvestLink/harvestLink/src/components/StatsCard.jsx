import React from 'react';

const StatsCard = ({ title, value, icon, trend, trendValue }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-sm font-medium">
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-farmer-primary/10 rounded-full">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
