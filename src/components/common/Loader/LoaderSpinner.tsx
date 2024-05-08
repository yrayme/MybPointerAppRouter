'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LoaderSpinner() {
	const { t } = useTranslation();
	return (
		<div className="absolute z-50 inset-0 bg-black-800/10 w-full h-screen rounded-lg">
			<div className="flex items-center justify-center h-full flex-col gap-2 cursor-progress">
				<div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary" />
				<p className="text-gray-600 animate-pulse select-none">{t('common:loading')}</p>
			</div>
		</div>
	);
}
