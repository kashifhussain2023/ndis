import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const { theme, deviceType } = useTheme();
  const [activeTab, setActiveTab] = useState('NDIS Plan');
  const [expandedCategory, setExpandedCategory] = useState('Core Flexible (Plan-managed)');

  const tabs = ['NDIS Plan', 'COC', 'End of Plan'];

  const participantData = {
    name: 'Zara Lamaro',
    period: '10 Jan 2025 - 10 Dec 2025',
    plan: '2025 NDIS Support Plan',
    amount: '$50,000'
  };

  const supportCategories = [
    {
      title: 'Core Flexible (Plan-managed)',
      amount: '$10,000',
      fundingSchedule: [
        { period: '25/06/2025 to 24/09/2025', duration: '3 months', amount: '$5,000' },
        { period: '25/09/2025 to 24/12/2025', duration: '3 months', amount: '$3,000' },
        { period: '25/12/2025 to 26/03/2026', duration: '3 months', amount: '$2,000' },
        { period: '25/12/2025 to 26/03/2026', duration: '3 months', amount: '$2,000' },
        { period: '25/12/2025 to 26/03/2026', duration: '3 months', amount: '$2,000' }
      ],
      supportItems: [
        { name: 'Personal Care Support', frequency: 'Daily', hours: 4, costPerHr: '$35', total: '$140' },
        { name: 'Transport Support', frequency: 'Weekly', hours: 2, costPerHr: '$35', total: '$140' },
        { name: 'Social Inclusion', frequency: 'Weekly', hours: 3, costPerHr: '$30', total: '$90' }
      ]
    },
    { title: 'Home and Living', amount: '$5,000' },
    { title: 'Choice and Control', amount: '$5,000' },
    { title: 'Improved Daily Living Skills', amount: '$10,000' },
    { title: 'Support Coordination and Psychosocial Recovery Coaches', amount: '$10,000' },
    { title: 'Recurring Transport', amount: '$5,000' }
  ];

  const toggleCategory = (categoryTitle) => {
    setExpandedCategory(expandedCategory === categoryTitle ? null : categoryTitle);
  };

  return (
    <div className={`dashboard ${deviceType}`}>
      <div className="dashboard-container">
        {/* Breadcrumb and Title */}
        <div className="dashboard-header">
          <button className="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="dashboard-title">Participant Details</h1>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          {tabs.map((tab) => (
            <button 
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Participant Plan Card */}
        <div className="participant-card">
          <div className="participant-info">
            <h2 className="participant-name">Name: {participantData.name}</h2>
            <p className="participant-period">{participantData.period}</p>
            <p className="participant-plan">{participantData.plan}</p>
            <p className="participant-amount">{participantData.amount}</p>
          </div>
        </div>

        {/* Support Categories */}
        <div className="support-categories">
          <h3 className="section-title">Support Categories</h3>
          
          {supportCategories.map((category, index) => (
            <div key={index} className="category-card">
              <div 
                className="category-header"
                onClick={() => toggleCategory(category.title)}
              >
                <div className="category-info">
                  <h4 className="category-title">{category.title}</h4>
                  <p className="category-subtitle">Funding amount: {category.amount}</p>
                </div>
                <button className="expand-button">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    style={{ 
                      transform: expandedCategory === category.title ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {expandedCategory === category.title && category.fundingSchedule && (
                <div className="category-content">
                  {/* Funding Schedule */}
                  <div className="funding-schedule">
                    <h5 className="subsection-title">Funding period schedule</h5>
                    <div className="schedule-table">
                      <div className="schedule-header">
                        <span>Period</span>
                        <span>Duration</span>
                        <span>Amount</span>
                      </div>
                      {category.fundingSchedule.map((item, idx) => (
                        <div key={idx} className="schedule-row">
                          <span className="period-text">{item.period}</span>
                          <span className="duration-text">{item.duration}</span>
                          <span className="amount-text">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                    <button className="view-more">view more</button>
                  </div>

                  {/* Support Items */}
                  <div className="support-items">
                    <h5 className="subsection-title">Included Support Items</h5>
                    {category.supportItems.map((item, idx) => (
                      <div key={idx} className="support-item">
                        <div className="item-header">
                          <h6 className="item-name">{item.name}</h6>
                        </div>
                        <div className="item-details">
                          <div className="item-row">
                            <span className="label">Frequency</span>
                            <span className="label">Hours</span>
                            <span className="label">Cost/Hr</span>
                            <span className="label">Total</span>
                          </div>
                          <div className="item-values">
                            <select className="frequency-select">
                              <option value={item.frequency}>{item.frequency}</option>
                            </select>
                            <span className="hours-value">{item.hours}</span>
                            <span className="cost-value">{item.costPerHr}</span>
                            <span className="total-value">{item.total}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="dashboard-actions">
          <button className="action-button secondary">Save</button>
          <button className="action-button primary">Save & Download</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
