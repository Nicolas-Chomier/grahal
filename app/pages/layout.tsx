'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { GrahalFooter } from '../components/custom/grahalFooter/GrahalFooter';
// Hooks and utilities
import { setDarkMode } from '@/app/store/darkMode';
// Configuration
// Styles
import '@/app/styles/background.css';
// Fonts

/* import { Quicksand } from 'next/font/google';
const customFont = Quicksand({
	subsets: ['latin'],
	weight: '500',
	style: ['normal'],
}); */

import { Signika_Negative } from 'next/font/google';
const customFont = Signika_Negative({
	subsets: ['latin'],
	weight: '300',
	style: ['normal'],
});

/* import { Plus_Jakarta_Sans } from 'next/font/google';
const customFont = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: '400',
	style: ['normal'],
}); */

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	const { isDarkMode } = setDarkMode();
	return (
		<main
			className={`${isDarkMode ? 'dark-theme' : ''} ${'background'} ${
				customFont.className
			}`}
		>
			<div>{children}</div>
			<GrahalFooter />
		</main>
	);
};
export default LandingLayout;
