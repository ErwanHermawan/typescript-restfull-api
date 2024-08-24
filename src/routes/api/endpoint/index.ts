const BASE_URL = "/api/";

export const ENDPOINT = {
	// endopoint public
	PUBLIC: {
		USER: `${BASE_URL}users`,
		LOGIN: `${BASE_URL}users/login`,
	},

	// endpoint private
	USER: `${BASE_URL}users/current`,
	CONTACTS: `${BASE_URL}contacts`,
};
