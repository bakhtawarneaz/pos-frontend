export const isTokenExpired = (token) => {
	try {
		const decodedToken = JSON.parse(atob(token.split('.')[1]));
		const currentTime = Date.now() / 1000; 
		return decodedToken.exp < currentTime;
	} catch (error) {
		return true;
	}
};