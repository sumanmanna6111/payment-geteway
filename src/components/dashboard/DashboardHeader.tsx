import React from 'react';
import Link from 'next/link';
import { RefreshCw, Bell, Settings, User, CreditCard } from 'lucide-react';

interface DashboardHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  userName?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onRefresh,
  isRefreshing,
  userName = "John Doe"
}) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">UPI Gateway</span>
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-purple-600 font-medium">Dashboard</Link>
              <Link href="/profile" className="text-gray-600 hover:text-purple-600 transition-colors">Profile</Link>
              <Link href="/docs" className="text-gray-600 hover:text-purple-600 transition-colors">API Docs</Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onRefresh}
              className={`p-2 text-gray-400 hover:text-gray-500 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <Link href="/profile" className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="w-5 h-5" />
            </Link>
            <Link href="/profile" className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{userName}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};