import React, { Suspense } from 'react';
import Sales from './Sales';
import { getAllSales } from '@/lib/Apis';

export default async function page({ params: { id } }: {
  params: { id: string }
}) {
	return (
		<div>
			<Sales/>
		</div>
	);
}
