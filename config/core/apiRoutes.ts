//! SHARED CONSTANTE DO NOT DELETE

//* SETTINGS BASE URL
const DEV = process.env.NODE_ENV !== 'production';
let API_BASE_URL;

if (DEV) {
	console.log('Mode développement');
	API_BASE_URL = 'http://localhost:3000';
} else {
	API_BASE_URL = process.env.NEXT_PUBLIC_URI;
	console.log('Mode production url = ', API_BASE_URL);
}

//* APPLICATION MAIN URL
export const URL = API_BASE_URL;

//* ADMIN PANEL END POINTS
export const API_ROUTES = {
	GET_ALL_USER: `/api/admin/getAllUser`,
	DELETE_USER_ID: `/api/admin/deleteUser`,
	ADD_USER: `/api/admin/addUser`,
	CHANGE_PASSWORD: `/api/admin/changePassword`,
};
