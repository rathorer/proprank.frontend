import { AbstractAuthProvider, } from 'tinacms'
import { loginUser } from '../src/services/api';

class CustomAuthProvider extends AbstractAuthProvider {

	constructor(API_URL) {
		super()
		this.loggedIn = false;
		this.env_variable = API_URL;
	}

	async authenticate(props) {
		const { username, password } = props;
		const formData = { email: username, password };
		let response = await fetch(`http://localhost:8000/api/user/login`, {
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
		let user = JSON.parse(window.sessionStorage.getItem('user-details'));
		this.loggedIn = user ? true : false;
		return this.loggedIn;
	}
	async logout() {
		console.log("logout");
		this.loggedIn = false;
	}

	authorize(props) {
		console.log("authorize");
		return true;
	}

	async isAuthorized(req, res) {
		console.log("isAuthorized called")
		// console.log(req, res);
		return true;
	}
}

export default CustomAuthProvider;