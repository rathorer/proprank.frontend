import { AbstractAuthProvider, } from 'tinacms';

class CustomAuthProvider extends AbstractAuthProvider {

	constructor() {
		super()
		this.loggedIn = false;
		this.apiUrl = process.env.TINA_PUBLIC_API_URL;
	}

	async authenticate(props) {
		const { username, password } = props;
		const formData = { email: username, password };
		let response = await fetch(process.env.TINA_PUBLIC_API_URL + 'api/user/login', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData)
		});
		let status = response.status;
		const result = await response.json();
		if (status === 200) {
			window.sessionStorage.setItem('user-details', JSON.stringify(result));
			this.loggedIn = true;
		} else {
			window.alert(`${result.resultMessage}`);
		}
	}

	async getToken() {
		return {
			id_token: "token"
		}
	}

	getLoginStrategy() {
		return "UsernamePassword"
	}

	async getUser() {
		console.log("getUser called");
		let user = JSON.parse(window.sessionStorage.getItem('user-details'));
		this.loggedIn = user ? true : false;
		return this.loggedIn;
	}
	async logout() {
		this.loggedIn = false;
		window.sessionStorage.removeItem("user-details");
		return;
	}

	authorize(props) {
		console.log("authorize", props);
		window.location.href = "/";
	}

	async isAuthorized(req, res) {
		console.log("isAuthorized called");
		let userData = JSON.parse(window.sessionStorage.getItem('user-details'));
		return userData.user.type == "admin";
	}
}

export default CustomAuthProvider;