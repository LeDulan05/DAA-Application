import React, { useState, useEffect } from 'react';
import './distributeAid.css';

const DistributeAid = () => {
  // Mock data
  const mockFamilies = [
    {
      id: "FAM001",
      name: "Dimakulangan Family",
      priorityScore: 7,
      children: 4,
      elderly: 1,
      medicalCondition: true,
      income: "P2500/month",
      aidStatus: "Pending"
    },
    {
      id: "FAM002",
      name: "Dimagiba Family",
      priorityScore: 3,
      children: 2,
      elderly: 2,
      medicalCondition: false,
      income: "P10000/month",
      aidStatus: "Pending"
    },
    {
      id: "FAM003",
      name: "Batumbakal Family",
      priorityScore: 2,
      children: 1,
      elderly: 0,
      medicalCondition: false,
      income: "P20000/month",
      aidStatus: "Pending"
    },
    {
      id: "FAM004",
      name: "Garcia Family",
      priorityScore: 8,
      children: 3,
      elderly: 1,
      medicalCondition: true,
      income: "P3000/month",
      aidStatus: "Pending"
    },
    {
      id: "FAM008",
      name: "Bolante Family",
      priorityScore: 10,
      children: 6,
      elderly: 2,
      medicalCondition: true,
      income: "P10000/month",
      aidStatus: "Pending"
    },
    {
      id: "FAM008",
      name: "Liwag Family",
      priorityScore: 2,
      children: 2,
      elderly: 0,
      medicalCondition: false,
      income: "P10000/month",
      aidStatus: "Pending"
    }
  ];

  const [families, setFamilies] = useState(mockFamilies);
  const [totalFunds, setTotalFunds] = useState('10000');
  const [totalFoodPacks, setTotalFoodPacks] = useState('30');
  const [isSorted, setIsSorted] = useState(false);
  const [allocationResults, setAllocationResults] = useState([]);

  // Insertion sort 
  const insertionSortByPriority = (arr) => {
    const sortedArray = [...arr];
    for (let i = 1; i < sortedArray.length; i++) {
      const current = sortedArray[i];
      let j = i - 1;
      
      while (j >= 0 && sortedArray[j].priorityScore < current.priorityScore) {
        sortedArray[j + 1] = sortedArray[j];
        j--;
      }
      sortedArray[j + 1] = current;
    }
    return sortedArray;
  };

  // Get eligible families (not aided)
  const eligibleFamilies = families
    .filter(family => family.aidStatus.toLowerCase() !== 'aided');

  // Handle funds input change
  const handleFundsChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setTotalFunds(value);
    }
  };

  // Handle food packs input change
  const handleFoodChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) {
      setTotalFoodPacks(value);
    }
  };

  // Calculate allocation with whole food packs
  useEffect(() => {
    if (eligibleFamilies.length > 0) {
      const fundsValue = totalFunds === '' ? 0 : Number(totalFunds);
      const foodValue = totalFoodPacks === '' ? 0 : Number(totalFoodPacks);
      
      // Calculate base allocation (whole numbers for food)
      const baseFundsPerFamily = fundsValue / eligibleFamilies.length;
      const baseFoodPerFamily = Math.floor(foodValue / eligibleFamilies.length);
      const remainingFood = foodValue % eligibleFamilies.length;
      
      // Create initial results with base allocation
      let results = eligibleFamilies.map(family => ({
        ...family,
        allocatedFunds: baseFundsPerFamily,
        allocatedFood: baseFoodPerFamily
      }));
      
      // Distribute remaining food packs to highest priority families
      if (remainingFood > 0) {
        // Sort by priority to distribute remaining food
        const sortedByPriority = insertionSortByPriority([...results]);
        
        // Give extra food packs to highest priority families
        for (let i = 0; i < remainingFood; i++) {
          if (sortedByPriority[i]) {
            sortedByPriority[i].allocatedFood += 1;
          }
        }
        
        // Maintain original order if not sorted
        if (!isSorted) {
          results = sortedByPriority.sort((a, b) => 
            eligibleFamilies.findIndex(f => f.id === a.id) - 
            eligibleFamilies.findIndex(f => f.id === b.id)
          );
        } else {
          results = sortedByPriority;
        }
      }
      
      // Apply final sorting if requested
      setAllocationResults(isSorted ? insertionSortByPriority(results) : results);
    }
  }, [totalFunds, totalFoodPacks, families, isSorted]);

  const handleDistribute = () => {
    setIsSorted(true);
    
    setFamilies(prev => prev.map(family => 
      allocationResults.some(f => f.id === family.id)
        ? { ...family, aidStatus: "Aided" }
        : family
    ));
    
    alert(`Aid distributed to ${eligibleFamilies.length} families!`);
  };

  return (
    <div className="distribute-aid-container">
      <h1 className="page-title">Distribute Aid</h1>
      
      <div className="input-section">
        <div className="input-row">
          <div className="input-group">
            <label className="input-label">Total Funds (₱)</label>
            <input
              type="text"
              className="form-input"
              value={totalFunds}
              onChange={handleFundsChange}
              placeholder="Enter amount"
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Food Packs</label>
            <input
              type="text"
              className="form-input"
              value={totalFoodPacks}
              onChange={handleFoodChange}
              placeholder="Enter quantity"
            />
          </div>
        </div>
      </div>

      <div className="summary-section">
        <h3 className="summary-title">Distribution Summary</h3>
        <div className="summary-stats">
          <p><strong>Eligible Families:</strong> {eligibleFamilies.length}</p>
          <p><strong>Funds per Family:</strong> ₱{(totalFunds === '' ? 0 : Number(totalFunds)/eligibleFamilies.length || 0).toFixed(2)}</p>
          <p><strong>Food per Family:</strong> {Math.floor((totalFoodPacks === '' ? 0 : Number(totalFoodPacks))/eligibleFamilies.length || 0)} packs</p>
        </div>
      </div>

      {eligibleFamilies.length > 0 ? (
        <>
          <div className="results-section">
            <h3 className="results-title">
              Allocation Results {isSorted && <span className="sorted-badge">(Sorted by Priority)</span>}
            </h3>
            <table className="allocation-table">
              <thead>
                <tr>
                  <th>Family ID</th>
                  <th>Name</th>
                  <th>Priority</th>
                  <th>Children</th>
                  <th>Elderly</th>
                  <th>Funds</th>
                  <th>Food</th>
                </tr>
              </thead>
              <tbody>
                {allocationResults.map(family => (
                  <tr key={family.id}>
                    <td>{family.id}</td>
                    <td>{family.name}</td>
                    <td className={`priority-score priority-${getPriorityClass(family.priorityScore)}`}>
                      {family.priorityScore}
                    </td>
                    <td>{family.children}</td>
                    <td>{family.elderly}</td>
                    <td>₱{family.allocatedFunds.toFixed(2)}</td>
                    <td>{family.allocatedFood} packs</td> {/* Removed toFixed(1) */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button 
            className="distribute-btn"
            onClick={handleDistribute}
          >
            {isSorted ? 'Confirm Distribution' : 'Allocate'}
          </button>
        </>
      ) : (
        <div className="no-families-message">
          <p>No families currently eligible for aid distribution.</p>
          <p>All registered families may have already received aid.</p>
        </div>
      )}
    </div>
  );
};

// Helper function
const getPriorityClass = (score) => {
  if (score >= 7) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
};

export default DistributeAid;