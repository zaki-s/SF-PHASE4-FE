import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetSentForm from './ResetSentForm';
import ResetPasswordForm from './ResetPasswordForm';
import ResetSuccessForm from './ResetSuccessForm';
import { authStyles } from '../../styles';

 export type  AuthView  = 
  | 'login' 
  | 'register' 
  | 'forgot-password' 
  | 'reset-sent' 
  | 'reset-password' 
  | 'reset-success';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [currentView, setCurrentView] = useState<AuthView>(
    token ? 'reset-password' : 'login'
  );
  const [resetEmail, setResetEmail] = useState('');

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleResetSent = (email: string) => {
    setResetEmail(email);
    setCurrentView('reset-sent');
  };

  const handleResetSuccess = () => {
    setCurrentView('reset-success');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleResendEmail = () => {
    // In a real app, this would trigger another API call
    console.log('Resending email to:', resetEmail);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onForgotPassword={handleForgotPassword}
          />
        );
      case 'register':
        return (
          <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBack={handleBackToLogin}
            onResetSent={handleResetSent}
          />
        );
      case 'reset-sent':
        return (
          <ResetSentForm
            email={resetEmail}
            onBack={handleBackToLogin}
            onResend={handleResendEmail}
          />
        );
      case 'reset-password':
        return (
          <ResetPasswordForm
            token={token || ''}
            onSuccess={handleResetSuccess}
            onBack={handleBackToLogin}
          />
        );
      case 'reset-success':
        return (
          <ResetSuccessForm onBackToLogin={handleBackToLogin} />
        );
      default:
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onForgotPassword={handleForgotPassword}
          />
        );
    }
  };

  return (
    <div className={authStyles.container}>
      <div className={authStyles.background}></div>
      <div className={authStyles.pattern}></div>
      <div className="w-full max-w-md">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default AuthPage;