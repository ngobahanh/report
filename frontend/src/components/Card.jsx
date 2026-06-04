import React from 'react';

export default function Card({ title, value, icon, color = 'bg-primary' }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className={`${color} text-white p-4 rounded-lg text-3xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
