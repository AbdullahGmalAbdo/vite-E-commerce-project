import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, X, ShieldCheck, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-gray-200 dark:border-slate-700 shadow-2xl animate-scaleIn relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-red-500/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h3>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Lock className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-blue-700 dark:text-blue-300 font-medium">Secure Access</span>
            </div>
            <p className="text-gray-600 dark:text-slate-400 text-lg leading-relaxed">
              {message}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/auth"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
              onClick={onClose}
            >
              Sign In Now
            </Link>
            
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
            >
              Maybe Later
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-4">
            Join thousands of satisfied customers
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default AuthModal;