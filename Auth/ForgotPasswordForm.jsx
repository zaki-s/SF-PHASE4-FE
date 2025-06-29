import React, { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { forgotPasswordStyles, loadingStyles } from '../../styles';

interface ForgotPasswordFormProps {
  onBack: () => void;
  onResetSent: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack, onResetSent }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      onResetSent(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={forgotPasswordStyles.container}>
      <div className={forgotPasswordStyles.card}>
        <div className={forgotPasswordStyles.header}>
          <button
            onClick={onBack}
            className={forgotPasswordStyles.backButton}
          >
            <ArrowLeft className={forgotPasswordStyles.backIcon} />
            Back to Sign In
          </button>
          <h2 className={forgotPasswordStyles.title}>Reset Password</h2>
          <p className={forgotPasswordStyles.subtitle}>
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className={forgotPasswordStyles.form}>
          <div>
            <label className={forgotPasswordStyles.label}>
              Email Address
            </label>
            <div className={forgotPasswordStyles.inputGroup}>
              <Mail className={forgotPasswordStyles.icon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={forgotPasswordStyles.input}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {error && (
            <div className={forgotPasswordStyles.error}>
              <p className={forgotPasswordStyles.errorText}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={forgotPasswordStyles.submitButton}
          >
            {loading ? (
              <div className={loadingStyles.smallSpinner}></div>
            ) : (
              <>
                <Send className={forgotPasswordStyles.submitIcon} />
                Send Reset Link
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className={forgotPasswordStyles.switchText}>
            Remember your password?{' '}
            <button
              onClick={onBack}
              className={forgotPasswordStyles.switchButton}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;