// React core
import React from 'react';
// External modules / Third-party libraries
import { Tooltip, Text } from '@radix-ui/themes';
import { HomeIcon, LogOut, Moon, Settings, Sun } from 'lucide-react';
// Local components
// Hooks and utilities
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { setDarkMode } from '@/app/store/darkMode';
// Configuration
import { ICON_SIZE_S, ICON_STROKE_M } from '@/config/constantes';
import { ACCOUNT_MANAGEMENT_PAGE, LANDING_PAGE } from '@/config/core/settings';
// Styles
import styles from './GrahalFooter.module.css';

export const GrahalFooter = () => {
	const router = useRouter();
	const { isDarkMode, toggleDarkMode } = setDarkMode();
	const darkModeIcon = () => {
		return isDarkMode ? (
			<Sun size={ICON_SIZE_S} strokeWidth={ICON_STROKE_M} />
		) : (
			<Moon size={ICON_SIZE_S} strokeWidth={ICON_STROKE_M} />
		);
	};

	const tooltipMessage = isDarkMode ? 'Light Mode' : 'Dark Mode';
	return (
		<div className={styles.container}>
			<Text size={'1'} className={styles.text}>
				{'Made by <Nch>'}
			</Text>
			<SettingSubSwitch
				handleClick={() => {
					toggleDarkMode();
				}}
				toolTip={tooltipMessage}
			>
				{darkModeIcon()}
			</SettingSubSwitch>
			<SettingSubSwitch
				handleClick={() => signOut({ callbackUrl: '/' })}
				toolTip={'Paramètres'}
			>
				<LogOut size={ICON_SIZE_S} strokeWidth={ICON_STROKE_M} />
			</SettingSubSwitch>
			<SettingSubSwitch
				handleClick={() => {
					router.push(ACCOUNT_MANAGEMENT_PAGE);
				}}
				toolTip={'Paramètres'}
			>
				<Settings size={ICON_SIZE_S} strokeWidth={ICON_STROKE_M} />
			</SettingSubSwitch>
			<SettingSubSwitch
				handleClick={() => {
					router.push(LANDING_PAGE);
				}}
				toolTip={'Paramètres'}
			>
				<HomeIcon size={ICON_SIZE_S} strokeWidth={ICON_STROKE_M} />
			</SettingSubSwitch>
		</div>
	);
};

type TSettingSubSwitchProps = {
	handleClick: () => void;
	toolTip?: string | undefined;
	children: React.ReactNode;
};
const SettingSubSwitch = ({
	handleClick,
	toolTip,
	children,
}: TSettingSubSwitchProps) => {
	const { isDarkMode } = setDarkMode();

	return (
		<Tooltip content={toolTip || '...'}>
			<button
				onClick={handleClick}
				className={`${isDarkMode ? 'dark-theme' : ''} ${
					styles.switch
				} `}
			>
				{children}
			</button>
		</Tooltip>
	);
};
