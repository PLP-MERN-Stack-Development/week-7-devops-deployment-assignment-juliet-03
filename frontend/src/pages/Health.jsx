import React from 'react';

// Monitoring placeholder (e.g., Sentry)
// Example: Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

const Health = () => (
  <div className="dashboard-container">
    <h2>Frontend is healthy</h2>
    <p>This route can be used for uptime monitoring or health checks.</p>
  </div>
);

export default Health; 