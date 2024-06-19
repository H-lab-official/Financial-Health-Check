import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PlanData {
    id: string;
    // Include other fields relevant to the plan
    user?: any; // Replace 'any' with a more specific type if known
  }
  
  interface PlanFetcherProps {
    planType: string[];
    id: string;
  }
  
  const endpointMap: {
    [key: string]: string;
  } = {
    '1': '/protection',
    '2': '/healthplan',
    '3': '/retirementplan',
    '4': '/educationplan',
    // '5': '/special-plan', 
  };
  const PlanFetcher: React.FC<PlanFetcherProps> = ({ planType, id }) => {
    const [planData, setPlanData] = useState<PlanData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchPlanData = async () => {
        try {
          setLoading(true);
          const promises = planType.map(type => 
            axios.get(`${import.meta.env.VITE_API_URL}${endpointMap[type]}/${id}`).then(response => response.data)
          );
          const results = await Promise.all(promises);
          setPlanData(results);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPlanData();
    }, [planType, id]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div>
        <h1>Plan Details</h1>
        {planData.length > 0 ? (
          planData.map((plan, index) => (
            <div key={index}>
              <p>ID: {plan.id}</p>
              {/* Render other plan details here */}
              {plan.user && <p>User: {plan.user.name}</p>}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    );
  };
  
  export default PlanFetcher;