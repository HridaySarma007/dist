export default function ApiErrorHandler(error, navigate) {
	if (error.response) {
		const status = error.response.status;
		if (status >= 400 && status < 500) {
			navigate("/404");
		} else {
			navigate("/500");
		}
	} else if (error.request) {
		navigate("/500");
	} else {
		navigate("/500");
	}
}
