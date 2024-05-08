import React, { Suspense } from 'react';
import Sales from './Sales';
import { getAllSales } from '@/lib/Apis';

async function allSales(page: string, name: string) {
	try {
		const data = await getAllSales(name ? 0 : parseInt(page) || 0, 6, '', name);
		return data
	} catch (error: any) {
		console.log('error', error);
	}
}

export default async function page({ params: { id }, searchParams: { page, name } }: {
  params: { id: string }
  searchParams: { page: string; name: string }
}) {
	const data = await allSales(page, name);
	console.log('datadd', data);
	return (
		<div>
			<Sales data={data}/>
		</div>
	);
}
