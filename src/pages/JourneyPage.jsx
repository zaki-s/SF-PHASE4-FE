import React, { useEffect, useState } from 'react';
import '../styles/JourneyPage.css';  
import userIcon from '../assets/user.svg';
import profileIcon from '../assets/profile.svg';
import settingsIcon from '../assets/settings.svg';
import logoutIcon from '../assets/logout.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import { Link } from 'react-router-dom';

const JourneyPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [journeys, setJourneys] = useState([
    {
      id: 1,
      title: 'React Basics',
      description: 'Learn JSX, props, and state',
      category: 'Tech',
      hours: '10',
      steps: ['JSX & Components', 'Props & State', 'Event Handling'],
    },
    {
      id: 2,
      title: 'CSS Mastery',
      description: 'Master layout and animation',
      category: 'Tech',
      hours: '8',
      steps: ['Flexbox', 'Grid', 'Animations'],
    },
    {
      id: 3,
      title: 'JavaScript Essentials',
      description: 'Core JS concepts',
      category: 'Tech',
      hours: '12',
      steps: ['Variables & Types', 'Functions', 'DOM Manipulation'],
    },
  ]);

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('Tech');
  const [formHours, setFormHours] = useState('');
  const [formSteps, setFormSteps] = useState(['']);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal || showDeleteModal ? 'hidden' : 'auto';
  }, [showModal, showDeleteModal]);

  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const closeDropdown = () => setShowDropdown(false);

  const openModal = (journey = null) => {
    if (journey) {
      setFormTitle(journey.title);
      setFormDescription(journey.description);
      setFormCategory(journey.category || 'Tech');
      setFormHours(journey.hours || '');
      setFormSteps(journey.steps || ['']);
      setEditingId(journey.id);
    } else {
      setFormTitle('');
      setFormDescription('');
      setFormCategory('Tech');
      setFormHours('');
      setFormSteps(['']);
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormTitle('');
    setFormDescription('');
    setFormCategory('Tech');
    setFormHours('');
    setFormSteps(['']);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formTitle.trim()) return;

    const newJourney = {
      id: editingId || Date.now(),
      title: formTitle,
      description: formDescription,
      category: formCategory,
      hours: formHours,
      steps: formSteps.filter(step => step.trim() !== ''),
    };

    if (editingId) {
      setJourneys(prev =>
        prev.map(j => (j.id === editingId ? newJourney : j))
      );
    } else {
      setJourneys(prev => [...prev, newJourney]);
    }

    closeModal();
  };

  const confirmDelete = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setDeletingId(null);
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    setJourneys(prev => prev.filter(j => j.id !== deletingId));
    cancelDelete();
  };

  return (
    <div className="Journeypage">
      <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <h1 className="logo"><Link to="/" className="logo">SF</Link></h1>
        <div className="navlinks">
          <ul className="navlist">
            <li>Journey</li>
            <li><Link to="/progress">My Progress</Link></li>
            <li>Milestones</li>
          </ul>
        </div>
        <div className="profile" onClick={toggleDropdown} onBlur={closeDropdown} tabIndex="0">
          <img src={userIcon} alt="User Icon" width={32} className="profileicon" />
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header"><p className="username">Anonymous</p></div>
              <ul>
                <li><img src={profileIcon} alt="Profile Icon" width={10} /> My Profile</li>
                <li><img src={settingsIcon} alt="Settings Icon" width={10} /> Settings</li>
                <li className="logout"><img src={logoutIcon} alt="Logout Icon" width={10} /> Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="janipage">
        <div className="journey-content">
          <div className="header1">
            <div className="headertexts">
              <h1>Your Learning Journey</h1>
              <p>Track your progress and unlock your potential!</p>
            </div>
            <button className="addjanibtn" onClick={() => openModal()}>Add Journey</button>
          </div>

          <div className="journeycard">
            {journeys.map(journey => (
              <div className="card" key={journey.id}>
                <div className="cardtop">
                  <h2 className="card-title">{journey.title}</h2>
                  <div className="cardicons">
                    <ul>
                      <li onClick={() => openModal(journey)}>
                        <img src={editIcon} alt="Edit Icon" width={20} />
                      </li>
                      <li onClick={() => confirmDelete(journey.id)}>
                        <img src={deleteIcon} alt="Delete Icon" width={20} />
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="card-description">{journey.description}</p>
                <p className="card-meta">Category: {journey.category} | Est. {journey.hours} hrs</p>
                <ul className="step-list">
                  {journey.steps.map((step, index) => (
                    <li key={index}><input type="checkbox" /> {step}</li>
                  ))}
                </ul>
                <button className="card-button">Start Journey</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Journey' : 'Create New'}</h2>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <label>Journey Title</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter title"
                className="modal-input"
              />
              <label>Description</label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Describe your journey..."
                className="modal-textarea"
                rows={3}
              />
              <label>Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="modal-input"
              >
                <option value="Tech">Tech</option>
                <option value="Business">Business</option>
                <option value="Musical">Musical</option>
                <option value="Other">Other</option>
              </select>
              <label>Estimated Hours</label>
              <input
                type="number"
                value={formHours}
                onChange={(e) => setFormHours(e.target.value)}
                placeholder="e.g. 10"
                className="modal-input"
              />

              <label>Mini Skills</label>
              {formSteps.map((step, index) => (
                <div key={index} className="step-input-row">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => {
                      const updated = [...formSteps];
                      updated[index] = e.target.value;
                      setFormSteps(updated);
                    }}
                    placeholder={`Skill ${index + 1}`}
                    className="modal-input"
                  />
                </div>
              ))}
              <button
                type="button"
                className="add-step-button"
                onClick={() => setFormSteps([...formSteps, ''])}
              >
                + Add Skill
              </button>
            </div>

            <div className="modal-actions">
              <button className="cancel-button" onClick={closeModal}>Cancel</button>
              <button className="submit-button" onClick={handleSubmit}>
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Delete Journey</h2>
              <button className="close-button" onClick={cancelDelete}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this journey?</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={cancelDelete}>Cancel</button>
              <button className="submit-button" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyPage;

