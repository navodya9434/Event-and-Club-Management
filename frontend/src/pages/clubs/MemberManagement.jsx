import React from 'react';
import './MemberManagement.css';

const MemberManagement = () => {
  return (
    <div className="member-management-page">
      {/* Sidebar */}
      <aside className="mm-sidebar">
        <div className="mm-logo">
          <span className="mm-logo-icon">🎓</span>
          <div>
            <div className="mm-brand">The Academic Editorial</div>
            <div className="mm-sub-brand">CLUB ADMINISTRATION</div>
          </div>
        </div>

        <nav className="mm-nav-menu">
          <a href="#" className="mm-nav-item">
            <span className="mm-icon">📊</span> Dashboard
          </a>
          <a href="#" className="mm-nav-item active">
            <span className="mm-icon">👥</span> Members
          </a>
          <a href="#" className="mm-nav-item">
            <span className="mm-icon">👔</span> Staff
          </a>
          <a href="#" className="mm-nav-item">
            <span className="mm-icon">📅</span> Meetings
          </a>
          <a href="#" className="mm-nav-item">
            <span className="mm-icon">🛍️</span> Merchandise
          </a>
        </nav>

        <div className="mm-sidebar-footer">
          <div className="mm-admin-portal">
            <div className="mm-admin-icon">🛡️</div>
            <div>
              <div className="mm-admin-title">Admin Portal</div>
              <div className="mm-admin-version">v2.4.0-Final</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="mm-main-content">
        {/* Top Bar */}
        <header className="mm-top-bar">
          <div className="mm-search-container">
            <input
              type="text"
              placeholder="Global search..."
              className="mm-global-search"
            />
          </div>
          
        </header>

        {/* Page Header */}
        <div className="mm-page-header">
          <h1>Member Management</h1>
          <p>Curate and oversee your academic community roster.</p>
        </div>

        {/* Join Requests Section */}
        <div className="mm-join-requests-section">
          <div className="mm-section-title">
            <span>📬</span> Join Requests
            <span className="mm-pending-badge">4 PENDING</span>
          </div>

          <div className="mm-join-requests-grid">
            {/* Request 1 */}
            <div className="mm-request-card">
              <div className="mm-request-avatar">AJ</div>
              <div className="mm-request-info">
                <div className="mm-name">Alex Johnson</div>
                <div className="mm-faculty">COMPUTER SCIENCE</div>
              </div>
              <div className="mm-request-actions">
                <button className="mm-accept-btn">Accept</button>
                <button className="mm-deny-btn">Deny</button>
              </div>
            </div>

            {/* Request 2 */}
            <div className="mm-request-card">
              <div className="mm-request-avatar">MW</div>
              <div className="mm-request-info">
                <div className="mm-name">Marcus Wright</div>
                <div className="mm-faculty">THEORETICAL PHYSICS</div>
              </div>
              <div className="mm-request-actions">
                <button className="mm-accept-btn">Accept</button>
                <button className="mm-deny-btn">Deny</button>
              </div>
            </div>

            {/* Request 3 */}
            <div className="mm-request-card">
              <div className="mm-request-avatar">EL</div>
              <div className="mm-request-info">
                <div className="mm-name">Elena Luz</div>
                <div className="mm-faculty">FINE ARTS</div>
              </div>
              <div className="mm-request-actions">
                <button className="mm-accept-btn">Accept</button>
                <button className="mm-deny-btn">Deny</button>
              </div>
            </div>
          </div>
        </div>

        {/* Member Directory */}
        <div className="mm-member-directory-section">
          <div className="mm-directory-header">
            <div className="mm-section-title">
              <span>👥</span> Member Directory
            </div>
            <div className="mm-search-box">
              <input
                type="text"
                placeholder="Search by name, ID, or faculty"
                className="mm-directory-search"
              />
            </div>
          </div>

          <div className="mm-members-grid">
            {/* Member Cards */}
            <div className="mm-member-card">
              <img src="https://i.pravatar.cc/80?u=sarah" alt="Sarah Lee" className="mm-member-photo" />
              <div className="mm-member-info">
                <div className="mm-name">Sarah Lee <span className="mm-delete-icon">🗑️</span></div>
                <div className="mm-faculty">ARTS & SCIENCES</div>
                <div className="mm-email">s.lee@university.edu</div>
                <div className="mm-id">2024-0012</div>
                <div className="mm-gender">Female</div>
              </div>
            </div>

            <div className="mm-member-card">
              <img src="https://i.pravatar.cc/80?u=david" alt="David Chen" className="mm-member-photo" />
              <div className="mm-member-info">
                <div className="mm-name">David Chen <span className="mm-delete-icon">🗑️</span></div>
                <div className="mm-faculty">ENGINEERING</div>
                <div className="mm-email">d.chen@university.edu</div>
                <div className="mm-id">2024-0542</div>
                <div className="mm-gender">Male</div>
              </div>
            </div>

            <div className="mm-member-card">
              <img src="https://i.pravatar.cc/80?u=maya" alt="Maya Patel" className="mm-member-photo" />
              <div className="mm-member-info">
                <div className="mm-name">Maya Patel <span className="mm-delete-icon">🗑️</span></div>
                <div className="mm-faculty">BUSINESS SCHOOL</div>
                <div className="mm-email">m.patel@university.edu</div>
                <div className="mm-id">2023-0912</div>
                <div className="mm-gender">Female</div>
              </div>
            </div>

            <div className="mm-member-card">
              <img src="https://i.pravatar.cc/80?u=jordan" alt="Jordan Smith" className="mm-member-photo" />
              <div className="mm-member-info">
                <div className="mm-name">Jordan Smith <span className="mm-delete-icon">🗑️</span></div>
                <div className="mm-faculty">SOCIAL SCIENCES</div>
                <div className="mm-email">j.smith@university.edu</div>
                <div className="mm-id">2024-1108</div>
                <div className="mm-gender">Non-binary</div>
              </div>
            </div>

            <div className="mm-member-card">
              <img src="https://i.pravatar.cc/80?u=liam" alt="Liam O'Brian" className="mm-member-photo" />
              <div className="mm-member-info">
                <div className="mm-name">Liam O'Brian <span className="mm-delete-icon">🗑️</span></div>
                <div className="mm-faculty">HISTORY</div>
                <div className="mm-email">l.obrian@university.edu</div>
                <div className="mm-id">2023-0045</div>
                <div className="mm-gender">Male</div>
              </div>
            </div>

            <div className="mm-member-card">
              <img src="https://i.pravatar.cc/80?u=sofia" alt="Sofia Rossi" className="mm-member-photo" />
              <div className="mm-member-info">
                <div className="mm-name">Sofia Rossi <span className="mm-delete-icon">🗑️</span></div>
                <div className="mm-faculty">LITERATURE</div>
                <div className="mm-email">s.rossi@university.edu</div>
                <div className="mm-id">2024-0881</div>
                <div className="mm-gender">Female</div>
              </div>
            </div>
          </div>

          <button className="mm-load-more-btn">LOAD MORE ENTRIES</button>
        </div>
      </main>
    </div>
  );
};

export default MemberManagement;