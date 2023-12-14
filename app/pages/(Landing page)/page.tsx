'use client';
// React core
import React, { useState, useEffect } from 'react';
// External modules / Third-party libraries
// Local components
import { GrahalSearchBar } from '@/app/components/custom/grahalSearchBar/GrahalSearchBar';
import { GrahalMap } from '@/app/components/custom/grahalMap/GrahalMap';
import { GrahalInfoCard } from '@/app/components/custom/grahalInfoCard/GrahalInfoCard';
// Hooks and utilities
import { useQuery } from '@tanstack/react-query';
// Configuration
import { PROJECT_API_ROUTES } from '@/config/projectApiRoutes';
import { NAVIGATION_BAR_TITLE } from '@/config/core/settings';
// Styles
import styles from './LandingPage.module.css';

type TObjectInfos = {
	date: string;
	type: string;
	file_number: number;
	name: string;
	address: string;
	lat: number;
	lon: number;
};

const defaultInfos = {
	date: '',
	type: '',
	file_number: 0,
	name: '',
	address: '',
};

const LandingPage = () => {
	console.log('render');
	// Query hook
	const { status, data } = useQuery({
		queryKey: ['fetchAllCoordinates'],
		queryFn: fetchAllCoordinates,
		refetchOnWindowFocus: false,
	});

	//
	const [coordinates, setCoordinates] = useState([]);
	const [focus, setFocus] = useState<[number, number] | undefined>(undefined);
	const [address, setAddress] = useState([]);
	const [infos, setInfos] = useState(defaultInfos);

	useEffect(() => {
		if (data) {
			setCoordinates(data.mapData);
			setAddress(data.searchBarData);
			setInfos(data.cardInfoDatas);
		}
	}, [data]);

	const handleMarker = (value: string) => {
		if (data.cardInfoDatas) {
			data.cardInfoDatas.map((obj: TObjectInfos) => {
				if (obj.address === value) {
					setInfos(obj);
					setFocus([obj.lat, obj.lon]);
					return;
				}
			});
		}
	};

	const handleClick = (id: number) => {
		if (data.cardInfoDatas) {
			const result = data.cardInfoDatas.at(id);
			setInfos(result);
		}
	};

	//
	if (status === 'error') return null;

	return (
		<div className={styles.container}>
			<div className={styles.panel_top}>
				<div className={styles.title}>{NAVIGATION_BAR_TITLE}</div>
				<GrahalSearchBar
					data={address}
					onChange={handleMarker}
				></GrahalSearchBar>
			</div>

			<div className={styles.middle_component}>
				<GrahalInfoCard content={infos}></GrahalInfoCard>
			</div>

			<div className={styles.panel_bot}>
				<GrahalMap
					coordinates={coordinates}
					focus={focus}
					handleMapClick={handleClick}
				></GrahalMap>
			</div>
		</div>
	);
};
export default LandingPage;

//
const fetchAllCoordinates = async () => {
	const response = await fetch(PROJECT_API_ROUTES.GET_ALL_COORDINATES, {});
	console.log('response', response);
	console.log(
		'PROJECT_API_ROUTES.GET_ALL_COORDINATES',
		PROJECT_API_ROUTES.GET_ALL_COORDINATES,
	);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
};
