import React, { useState } from "react";
import './registerFamily.css';

const RegisterFamily = () => {
  const [formData, setFormData] = useState({
    familyName: "",
    primaryContactPhone: "",
    email: "",
    address: "",
    children: 0,
    elderly: 0,
    adults: 0,
    medicalConditions: "no",
    specialNeeds: "",
    monthlyIncome: "",
    employmentStatus: "",
    previousAidNotes: ""
  });

  const employmentOptions = [
    "Employed",
    "Unemployed",
    "Self-employed",
    "Student"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Family registration submitted (console logged for now)");
  };

  const handleReset = () => {
    setFormData({
      familyName: "",
      primaryContactPhone: "",
      email: "",
      address: "",
      children: 0,
      elderly: 0,
      adults: 0,
      medicalConditions: "no",
      specialNeeds: "",
      monthlyIncome: "",
      employmentStatus: "",
      previousAidNotes: ""
    });
  };

  return (
    <div className="register-family-container">
      <h1>Register New Family</h1>
      <p className="form-description">
        Complete the form below to register a new family and assess their needs.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Family Demographics</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Family Representative's Name</label>
              <input
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
                placeholder="e.g., Juan Dela Cruz"
                required
              />
            </div>
            <div className="form-group">
              <label>Primary Contact Phone</label>
              <input
                type="tel"
                name="primaryContactPhone"
                value={formData.primaryContactPhone}
                onChange={handleChange}
                placeholder="+63 123-456-7890"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Avenue"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Household Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Number of children</label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Number of elderly (65+)</label>
              <input
                type="number"
                name="elderly"
                value={formData.elderly}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Number of adults (18 - 64)</label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Any medical conditions?</label>
              <select
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Special Needs / Disabilities (if any)</h2>
          <div className="form-group">
            <textarea
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleChange}
              placeholder="Detail any special needs or disabilities within the family..."
              rows="3"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Financial Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Employment Status</label>
              <select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                required
              >
                <option value="">Select status</option>
                {employmentOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Monthly Household Income</label>
              <input
                type="text"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Previous Aid History / Notes</h2>
          <div className="form-group">
            <textarea
              name="previousAidNotes"
              value={formData.previousAidNotes}
              onChange={handleChange}
              placeholder="Provide details of any past aid received or relevant financial notes..."
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset Form
          </button>
          <button type="submit" className="submit-button">
            Submit Family Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterFamily;