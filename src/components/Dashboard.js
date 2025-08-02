import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const { theme, deviceType } = useTheme();
  const [activeTab, setActiveTab] = useState('NDIS Plan');

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
      amount: '$8,000',
      expanded: true,
      subcategories: [
        {
          title: 'Home and Living',
          amount: '$3,000'
        },
        {
          title: 'Choice and Control',
          amount: '$1,000'
        },
        {
          title: 'Home and Living',
          amount: '$1,000'
        },
        {
          title: 'Improved Daily Living Skills',
          amount: '$1,000'
        },
        {
          title: 'Support Coordination and Psychosocial Recovery Coaches',
          amount: '$1,000'
        },
        {
          title: 'Recurring Transport',
          amount: '$1,000'
        }
      ]
    }
  ];

  const scheduleData = [
    {
      period: '24/09/2025 to 26/09/2025',
      frequency: '3 months',
      amount: '$3,000'
    },
    {
      period: '26/09/2025 to 26/12/2025',
      frequency: '3 months',
      amount: '$3,000'
    },
    {
      period: '22/12/2025 to 26/03/2026',
      frequency: '3 months',
      amount: '$2,000'
    },
    {
      period: '24/12/2025 to 24/03/2026',
      frequency: '3 months',
      amount: '$2,000'
    },
    {
      period: '22/12/2025 to 26/03/2026',
      frequency: '6 months',
      amount: '$2,000'
    }
  ];

  const supportItems = [
    {
      category: 'Personal Care Support',
      frequency: 'Daily',
      hours: 4,
      quantity: '$50',
      total: '$200'
    },
    {
      category: 'Transport Support',
      frequency: 'Weekly',
      hours: 2,
      quantity: '$30',
      total: '$60'
    },
    {
      category: 'Social Inclusion',
      frequency: 'Weekly',
      hours: 3,
      quantity: '$30',
      total: '$90'
    }
  ];

  return (
    <div className={`dashboard ${deviceType}`}>
      <div className="dashboard-container">
        {/* Back Button and Title */}
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

        {/* Participant Info */}
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
              <div className="category-header">
                <div className="category-info">
                  <h4 className="category-title">{category.title}</h4>
                  <p className="category-subtitle">Funding amount: {category.amount}</p>
                </div>
                <button className="expand-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {category.expanded && (
                <div className="category-content">
                  {/* Funding Schedule */}
                  <div className="funding-schedule">
                    <h5 className="subsection-title">Funding period schedule</h5>
                    <div className="schedule-table">
                      <div className="schedule-header">
                        <span>Period</span>
                        <span>Frequency</span>
                        <span>Amount</span>
                      </div>
                      {scheduleData.map((item, idx) => (
                        <div key={idx} className="schedule-row">
                          <span>{item.period}</span>
                          <span>{item.frequency}</span>
                          <span>{item.amount}</span>
                        </div>
                      ))}
                    </div>
                    <button className="view-more">view more</button>
                  </div>

                  {/* Support Items */}
                  <div className="support-items">
                    <h5 className="subsection-title">Included Support Items</h5>
                    <div className="items-table">
                      <div className="items-header">
                        <span>Item</span>
                        <span>Frequency</span>
                        <span>Hours</span>
                        <span>Quantity</span>
                        <span>Total</span>
                      </div>
                      {supportItems.map((item, idx) => (
                        <div key={idx} className="items-row">
                          <span>{item.category}</span>
                          <span>{item.frequency}</span>
                          <span>{item.hours}</span>
                          <span>{item.quantity}</span>
                          <span>{item.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="subcategories">
                    {category.subcategories.map((sub, idx) => (
                      <div key={idx} className="subcategory-item">
                        <div className="subcategory-info">
                          <h6 className="subcategory-title">{sub.title}</h6>
                          <p className="subcategory-amount">Funding amount: {sub.amount}</p>
                        </div>
                        <button className="expand-button">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
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
