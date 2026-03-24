import React from 'react';
import './MemberManagement.css';

const MemberManagement = () => {
  return (
    <div className="member-management-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <div>
            <div className="brand">The Academic Editorial</div>
            <div className="sub-brand">CLUB ADMINISTRATION</div>
          </div>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-item">
            <span className="icon">📊</span> Dashboard
          </a>
          <a href="#" className="nav-item active">
            <span className="icon">👥</span> Members
          </a>
          <a href="#" className="nav-item">
            <span className="icon">👔</span> Staff
          </a>
          <a href="#" className="nav-item">
            <span className="icon">📅</span> Meetings
          </a>
          <a href="#" className="nav-item">
            <span className="icon">🛍️</span> Merchandise
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-portal">
            <div className="admin-icon">🛡️</div>
            <div>
              <div className="admin-title">Admin Portal</div>
              <div className="admin-version">v2.4.0-Final</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Global search..."
              className="global-search"
            />
          </div>
          
        </header>

        {/* Page Header */}
        <div className="page-header">
          <h1>Member Management</h1>
          <p>Curate and oversee your academic community roster.</p>
        </div>

        {/* Join Requests Section */}
        <div className="join-requests-section">
          <div className="section-title">
            <span>📬</span> Join Requests
            <span className="pending-badge">4 PENDING</span>
          </div>

          <div className="join-requests-grid">
            {/* Request 1 */}
            <div className="request-card">
              <div className="request-avatar">AJ</div>
              <div className="request-info">
                <div className="name">Alex Johnson</div>
                <div className="faculty">COMPUTER SCIENCE</div>
              </div>
              <div className="request-actions">
                <button className="accept-btn">Accept</button>
                <button className="deny-btn">Deny</button>
              </div>
            </div>

            {/* Request 2 */}
            <div className="request-card">
              <div className="request-avatar">MW</div>
              <div className="request-info">
                <div className="name">Marcus Wright</div>
                <div className="faculty">THEORETICAL PHYSICS</div>
              </div>
              <div className="request-actions">
                <button className="accept-btn">Accept</button>
                <button className="deny-btn">Deny</button>
              </div>
            </div>

            {/* Request 3 */}
            <div className="request-card">
              <div className="request-avatar">EL</div>
              <div className="request-info">
                <div className="name">Elena Luz</div>
                <div className="faculty">FINE ARTS</div>
              </div>
              <div className="request-actions">
                <button className="accept-btn">Accept</button>
                <button className="deny-btn">Deny</button>
              </div>
            </div>
          </div>
        </div>

        {/* Member Directory */}
        <div className="member-directory-section">
          <div className="directory-header">
            <div className="section-title">
              <span>👥</span> Member Directory
            </div>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name, ID, or faculty"
                className="directory-search"
              />
            </div>
          </div>

          <div className="members-grid">
            {/* Member Cards */}
            <div className="member-card">
              <img src="https://i.pravatar.cc/80?u=sarah" alt="Sarah Lee" className="member-photo" />
              <div className="member-info">
                <div className="name">Sarah Lee <span className="delete-icon">🗑️</span></div>
                <div className="faculty">ARTS & SCIENCES</div>
                <div className="email">s.lee@university.edu</div>
                <div className="id">2024-0012</div>
                <div className="gender">Female</div>
              </div>
            </div>

            <div className="member-card">
              <img src="https://i.pravatar.cc/80?u=david" alt="David Chen" className="member-photo" />
              <div className="member-info">
                <div className="name">David Chen <span className="delete-icon">🗑️</span></div>
                <div className="faculty">ENGINEERING</div>
                <div className="email">d.chen@university.edu</div>
                <div className="id">2024-0542</div>
                <div className="gender">Male</div>
              </div>
            </div>

            <div className="member-card">
              <img src="https://i.pravatar.cc/80?u=maya" alt="Maya Patel" className="member-photo" />
              <div className="member-info">
                <div className="name">Maya Patel <span className="delete-icon">🗑️</span></div>
                <div className="faculty">BUSINESS SCHOOL</div>
                <div className="email">m.patel@university.edu</div>
                <div className="id">2023-0912</div>
                <div className="gender">Female</div>
              </div>
            </div>

            <div className="member-card">
              <img src="https://i.pravatar.cc/80?u=jordan" alt="Jordan Smith" className="member-photo" />
              <div className="member-info">
                <div className="name">Jordan Smith <span className="delete-icon">🗑️</span></div>
                <div className="faculty">SOCIAL SCIENCES</div>
                <div className="email">j.smith@university.edu</div>
                <div className="id">2024-1108</div>
                <div className="gender">Non-binary</div>
              </div>
            </div>

            <div className="member-card">
              <img src="https://i.pravatar.cc/80?u=liam" alt="Liam O'Brian" className="member-photo" />
              <div className="member-info">
                <div className="name">Liam O'Brian <span className="delete-icon">🗑️</span></div>
                <div className="faculty">HISTORY</div>
                <div className="email">l.obrian@university.edu</div>
                <div className="id">2023-0045</div>
                <div className="gender">Male</div>
              </div>
            </div>

            <div className="member-card">
              <img src="https://i.pravatar.cc/80?u=sofia" alt="Sofia Rossi" className="member-photo" />
              <div className="member-info">
                <div className="name">Sofia Rossi <span className="delete-icon">🗑️</span></div>
                <div className="faculty">LITERATURE</div>
                <div className="email">s.rossi@university.edu</div>
                <div className="id">2024-0881</div>
                <div className="gender">Female</div>
              </div>
            </div>
          </div>

          <button className="load-more-btn">LOAD MORE ENTRIES</button>
        </div>
      </main>
    </div>
  );
};

export default MemberManagement;