import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Journey } from '../../types';
import { apiService } from '../../services/api';
import StepList from './StepList';
import JourneyForm from '../Forms/JourneyForm';
import StepForm from '../Forms/StepForm';
import { ArrowLeft, Edit2, Trash2, Plus, BookOpen, Calendar, MoreVertical } from 'lucide-react';
import '../../styles/journey.css';

const JourneyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [showStepForm, setShowStepForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (id) {
      loadJourney();
    }
  }, [id]);

  const loadJourney = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await apiService.getJourney(id);
      setJourney(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load journey');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateJourney = async (data: { title: string; description: string }) => {
    if (!id) return;
    
    try {
      const updated = await apiService.updateJourney(id, data);
      setJourney(updated);
      setShowEditForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update journey');
    }
  };

  const handleDeleteJourney = async () => {
    if (!id || !confirm('Are you sure you want to delete this journey?')) return;
    
    try {
      await apiService.deleteJourney(id);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete journey');
    }
  };

  const handleAddStep = async (data: { title: string; description: string }) => {
    if (!id) return;
    
    try {
      await apiService.createStep({ ...data, journeyId: id });
      await loadJourney();
      setShowStepForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add step');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="journey-detail-container">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Journey not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const completedSteps = journey.steps.filter(step => step.completed).length;
  const totalSteps = journey.steps.length;
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const getProgressColor = (percent: number) => {
    if (percent === 100) return 'bg-green-500';
    if (percent >= 50) return 'bg-yellow-500';
    return 'bg-indigo-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="journey-detail-container">
      {/* Header */}
      <div className="journey-detail-header">
        <button
          onClick={() => navigate('/')}
          className="journey-detail-back-button"
        >
          <ArrowLeft className="journey-detail-back-icon" />
          Back to Dashboard
        </button>

        <div className="journey-detail-header-card">
          <div className="journey-detail-header-content">
            <div className="journey-detail-header-info">
              <div className="journey-detail-header-icon">
                <BookOpen className="journey-detail-header-icon-svg" />
              </div>
              <div className="journey-detail-header-details">
                <h1 className="journey-detail-header-title">{journey.title}</h1>
                <p className="journey-detail-header-description">{journey.description}</p>
                <div className="journey-detail-header-meta">
                  <Calendar className="journey-detail-header-meta-icon" />
                  Created {formatDate(journey.createdAt)}
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="journey-detail-menu-button"
              >
                <MoreVertical className="journey-detail-menu-icon" />
              </button>

              {showMenu && (
                <div className="journey-detail-dropdown">
                  <button
                    onClick={() => {
                      setShowEditForm(true);
                      setShowMenu(false);
                    }}
                    className="journey-detail-dropdown-item"
                  >
                    <Edit2 className="journey-detail-dropdown-icon" />
                    Edit Journey
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteJourney();
                      setShowMenu(false);
                    }}
                    className="journey-detail-dropdown-item-danger"
                  >
                    <Trash2 className="journey-detail-dropdown-icon" />
                    Delete Journey
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="journey-detail-progress">
            <div className="journey-detail-progress-header">
              <span className="journey-detail-progress-label">Overall Progress</span>
              <span className="journey-detail-progress-value">
                {completedSteps}/{totalSteps} steps ({Math.round(progressPercent)}%)
              </span>
            </div>
            <div className="journey-detail-progress-bar">
              <div
                className={`journey-detail-progress-fill ${getProgressColor(progressPercent)}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Steps Section */}
      <div className="journey-detail-steps-section">
        <div className="journey-detail-steps-header">
          <h2 className="journey-detail-steps-title">Learning Steps</h2>
          <button
            onClick={() => setShowStepForm(true)}
            className="journey-detail-add-step-button"
          >
            <Plus className="journey-detail-add-step-icon" />
            Add Step
          </button>
        </div>

        <StepList steps={journey.steps} onStepUpdate={loadJourney} />
      </div>

      {/* Edit Journey Modal */}
      {showEditForm && (
        <div className="journey-detail-modal">
          <div className="journey-detail-modal-content">
            <h3 className="journey-detail-modal-title">Edit Journey</h3>
            <JourneyForm
              initialData={{ title: journey.title, description: journey.description }}
              onSubmit={handleUpdateJourney}
              onCancel={() => setShowEditForm(false)}
              submitLabel="Update Journey"
            />
          </div>
        </div>
      )}

      {/* Add Step Modal */}
      {showStepForm && (
        <div className="journey-detail-modal">
          <div className="journey-detail-modal-content">
            <h3 className="journey-detail-modal-title">Add New Step</h3>
            <StepForm
              onSubmit={handleAddStep}
              onCancel={() => setShowStepForm(false)}
              submitLabel="Add Step"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyDetail;