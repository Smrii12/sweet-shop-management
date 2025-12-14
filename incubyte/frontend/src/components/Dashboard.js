import React from 'react';
import SweetTable from './SweetTable';

function Dashboard({ token, role }) {
  return (
    <div>
      <h2>Dashboard ({role})</h2>
      <SweetTable token={token} role={role} />
    </div>
  );
}

export default Dashboard;
