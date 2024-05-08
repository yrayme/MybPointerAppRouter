import React from 'react'
import GoalClients from './GoalsClients';

export default async function page({ params: { id } }: {
    params: { id: string }
  }) {
      return (
          <div>
              <GoalClients id={id}/>
          </div>
      );
  }
  
