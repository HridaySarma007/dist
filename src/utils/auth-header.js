export default function authHeader() {
	const token = JSON.parse(localStorage.getItem("token"));
	if(token){
		return {
			 "X-Auth-Token": token,
			 "Content-Type": "application/json"
		}
	}else {
		return {}
	}
}