// React core
import React from 'react';
// External modules / Third-party libraries
import { Flex, Separator } from '@radix-ui/themes';
import { capitalize } from '@/app/functions/capitalize';
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './GrahalInfoCard.module.css';
import { setDarkMode } from '@/app/store/darkMode';

type TGrahalInfoCardProps = {
	content: {
		date: string;
		type: string;
		file_number: number;
		name: string;
		address: string;
	};
};

export const GrahalInfoCard = ({ content }: TGrahalInfoCardProps) => {
	return (
		<div className={styles.container}>
			<TextTile label={'Date'} value={content?.date}></TextTile>

			<Separator orientation='vertical' size='3' />
			<TextTile label={'Type'} value={content?.type}></TextTile>

			<Separator orientation='vertical' size='3' />
			<TextTile label={'Numéro'} value={content?.file_number}></TextTile>

			<Separator orientation='vertical' size='3' />
			<TextTile label={'Nom'} value={content?.name}></TextTile>

			<Separator orientation='vertical' size='3' />
			<TextTile label={'Adresse'} value={content?.address}></TextTile>
		</div>
	);
};

type TTextTileProps = {
	label: string;
	value: string | number;
};

const TextTile = ({ label, value }: TTextTileProps) => {
	const defaultValue = '';
	const { isDarkMode } = setDarkMode();
	return (
		<div
			className={`${isDarkMode ? 'dark-theme' : ''} ${
				styles.text_wrapper
			} `}
		>
			<p className={styles.label}>{label}</p>

			<p className={styles.value}>
				{typeof value === 'string'
					? capitalize(value) || defaultValue
					: value}
			</p>
		</div>
	);
};
