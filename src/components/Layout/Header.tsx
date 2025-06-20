import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Sword, Home, BookOpen, Trophy, Settings } from 'lucide-react';
import { useUser } from '../../hooks/useUser';

const Header: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/kingdoms', icon: BookOpen, label: 'Kingdoms' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/achievements', icon: Trophy, label: 'Achievements' },
  ];

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sword className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Java Quest
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Code & Conquer</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === path
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">Level {user.level}</p>
              </div>
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
                  style={{ width: `${user.xp}%` }}
                />
              </div>
              <div className="text-xs text-primary-400 font-medium min-w-[40px]">
                {user.xp}/100 XP
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.avatar}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-800 border-t border-gray-700">
        <nav className="flex items-center justify-around py-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === path
                  ? 'text-primary-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;