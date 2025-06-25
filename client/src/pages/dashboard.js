import React, { useState } from "react";
import './dashboard.css';

const DashboardOverview = () => {
  // Mock data
  const [families, setFamilies] = useState([
    { id: "FAM001", name: "Dimakulangan", priorityScore: 7, children: 4, elderly: 1, medicalCondition: true, income: "P2500/month", aidStatus: "Pending" },
    { id: "FAM002", name: "Dimagiba", priorityScore: 3, children: 2, elderly: 2, medicalCondition: false, income: "P10000/month", aidStatus: "Aided" },
    { id: "FAM003", name: "Batumbakai", priorityScore: 2, children: 1, elderly: 0, medicalCondition: false, income: "P20000/month", aidStatus: "Approved" },
    // Add more mock data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [medicalFilter, setMedicalFilter] = useState("all");
  const [aidStatusFilter, setAidStatusFilter] = useState("all");

  // Calculate dashboard metrics
  const totalFamilies = families.length;
  const totalAidDistributed = 11000;
  const averagePriorityScore = families.reduce((sum, family) => sum + family.priorityScore, 0) / families.length;

  // Linear search implementation
  const linearSearch = (array, searchTerm) => {
    const results = [];
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    for (let i = 0; i < array.length; i++) {
      const family = array[i];
      if (
        family.name.toLowerCase().includes(lowerSearchTerm) ||
        family.id.toLowerCase().includes(lowerSearchTerm)
      ) {
        results.push(family);
      }
    }
    return results;
  };

  // Filter families based on search and filters
  const filteredFamilies = () => {
    // Start with all families or search results
    let result = searchTerm ? linearSearch(families, searchTerm) : [...families];
    
    //medical condition filter
    if (medicalFilter !== "all") {
      result = result.filter(family => 
        medicalFilter === "yes" ? family.medicalCondition : !family.medicalCondition
      );
    }
    
    // aid status filter
    if (aidStatusFilter !== "all") {
      result = result.filter(family => 
        family.aidStatus.toLowerCase() === aidStatusFilter.toLowerCase()
      );
    }
    
    // Sort by priority score (high to low)
    return result.sort((a, b) => b.priorityScore - a.priorityScore);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>

      <div className="dashboard-metrics">
        <div className="metric-card">
          <h2>Total Families Registered</h2>
          <p className="metric-value">{totalFamilies}</p>
          <p className="metric-subtext">Since May 2024</p>
        </div>

        <div className="metric-card">
          <h2>Aid Distributed This Month</h2>
          <p className="metric-value">₱{totalAidDistributed.toLocaleString()}</p>
          <p className="metric-subtext">Compared to last month (--%)</p>
        </div>

        <div className="metric-card">
          <h2>Average Priority Score</h2>
          <p className="metric-value">{averagePriorityScore.toFixed(1)}</p>
          <p className="metric-subtext">Higher score indicates greater need</p>
        </div>
      </div>

      <div className="priority-distribution">
        <h2>Family Priority Distribution</h2>
        <p>Sorted list of families by priority score</p>
        <div className="priority-list">
          {filteredFamilies().map(family => (
            <div key={family.id} className="priority-item">
              <span className="family-name">{family.name}</span>
              <span className={`priority-score ${getPriorityClass(family.priorityScore)}`}>
                {family.priorityScore}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="families-overview">
        <h2>Registered Families Overview</h2>
        <p>Detailed list of all registered families, their assessed needs, and aid status.</p>
        
        <div className="filters">
          <input
            type="text"
            placeholder="Search by family name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={medicalFilter}
            onChange={(e) => setMedicalFilter(e.target.value)}
          >
            <option value="all">All Medical Conditions</option>
            <option value="yes">With Conditions</option>
            <option value="no">Without Conditions</option>
          </select>
          <select
            value={aidStatusFilter}
            onChange={(e) => setAidStatusFilter(e.target.value)}
          >
            <option value="all">All Aid Statuses</option>
            <option value="pending">Pending</option>
            <option value="aided">Aided</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        <table className="families-table">
          <thead>
            <tr>
              <th>Family ID</th>
              <th>Name</th>
              <th>Priority Score</th>
              <th>Children</th>
              <th>Elderly</th>
              <th>Medical Condition</th>
              <th>Income (Est.)</th>
              <th>Aid Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredFamilies().map(family => (
              <tr key={family.id}>
                <td><strong>{family.id}</strong></td>
                <td><strong>{family.name}</strong></td>
                <td>
                  <span className={`priority-score ${getPriorityClass(family.priorityScore)}`}>
                    {family.priorityScore}
                  </span>
                </td>
                <td>{family.children}</td>
                <td>{family.elderly}</td>
                <td>{family.medicalCondition ? "Yes" : "No"}</td>
                <td>{family.income}</td>
                <td>
                  <span className={`aid-status ${family.aidStatus.toLowerCase()}`}>
                    {family.aidStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function to determine priority class
const getPriorityClass = (score) => {
  if (score >= 7) return "high";
  if (score >= 4) return "medium";
  return "low";
};

export default DashboardOverview;