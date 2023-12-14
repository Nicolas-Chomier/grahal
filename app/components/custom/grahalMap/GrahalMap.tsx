'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import { Map, Marker } from 'pigeon-maps';
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/darkMode';
import useWindowSize from '@/app/hooks/useWindowSize';
// Configuration
// Styles
import styles from './GrahalMap.module.css';

type TMapProps =
	| {
			id: number;
			name?: string | undefined;
			lat: number;
			lon: number;
	  }
	| undefined;

type TGrahalMapProps = {
	coordinates: TMapProps[];
	focus: [number, number] | undefined;
	title?: string | undefined;
	handleMapClick: (index: number) => void;
};

const Paris: [number, number] = [48.866669, 2.333333];
const coefWidth = 1;
const coefHeight = 0.8;

export const GrahalMap = ({
	coordinates,
	focus,
	title = 'Grahal',
	handleMapClick,
}: TGrahalMapProps) => {
	// Map size
	const { width, height } = useWindowSize();
	const [mapTitle, setMapTitle] = useState<string | undefined>(undefined);
	const { isDarkMode } = setDarkMode();

	const handleClick = (index: number) => {
		if (index) {
			handleMapClick(index);
		}
	};
	return (
		<div className={styles.container}>
			<Map
				defaultCenter={Paris}
				center={focus}
				defaultZoom={7}
				zoom={focus ? 16 : 7}
				dprs={[1, 2]}
				width={width * coefWidth}
				height={height * coefHeight}
			>
				{coordinates.map((item, index) => {
					const lat = item?.lat;
					const lon = item?.lon;
					let color = isDarkMode ? '#2c2e6d' : '#7b61ff';
					if (focus && lat === focus[0]) {
						color = '#29A383';
					}
					if (lat && lon) {
						const name = item?.name;
						const spot = (
							<Marker
								key={index}
								width={48}
								anchor={[lat, lon]}
								color={color}
								onClick={() => handleClick(index)}
								onMouseOver={() => {
									setMapTitle(name);
								}}
								onMouseOut={() => {
									setMapTitle(undefined);
								}}
							></Marker>
						);
						return spot;
					}
				})}
			</Map>
		</div>
	);
};
