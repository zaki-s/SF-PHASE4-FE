import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../../styles/forms.css';

interface JourneyFormProps {
  initialData?: { title: string; description: string };
  onSubmit: (data: { title: string; description: string }) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}

const JourneyForm: React.FC<JourneyFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  submitLabel 
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!description.trim()) {
      setError('Description is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSubmit({ title: title.trim(), description: description.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="journey-form-container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-header">
          <h2 className="form-title">
            {initialData ? 'Edit Journey' : 'Create New Journey'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="form-close-button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="form-input-group">
          <label className="form-label">
            Journey Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter journey title"
            maxLength={100}
          />
        </div>

        <div className="form-input-group">
          <label className="form-label">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="form-textarea"
            placeholder="Describe what you'll learn in this journey"
            maxLength={500}
          />
          <div className="form-char-count">
            {description.length}/500 characters
          </div>
        </div>

        {error && (
          <div className="form-error">
            <p className="form-error-text">{error}</p>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="form-cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="form-submit-button"
          >
            {loading ? 'Saving...' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JourneyForm;