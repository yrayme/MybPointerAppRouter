import React from 'react'
import GoalSellers from './GoalsSellers';

export default async function page({ params: { id } }: {
    params: { id: string }
}) {
    return (
        <div>
            <GoalSellers id={id} />
        </div>
    );
}

