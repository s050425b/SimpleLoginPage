const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	const username = usernameInput.value;
	const password = passwordInput.value;
	// Here, you would typically make an AJAX request to your server-side endpoint to authenticate the user
	// If authentication is successful, you can redirect the user to the home page
	console.log(`Username: ${username}, Password: ${password}`);
	let jwt = await fetchLogin(username, password);
	if (jwt) {
		window.location.href = `http://localhost:8080/home`;
	}
});

function fetchLogin(username, password) {
	return new Promise(resolve => {
		fetch(`http://localhost:8080/api/login?username=${username}&password=${password}`)
		.then(response => {
			resolve(response.text());
		});
	});
}

function fetchGoogleLogin(jwt) {
	return new Promise(resolve => {
		fetch(`http://localhost:8080/api/google/login?jwt=${jwt}`)
			.then(response => {
				resolve(response.text());
			});
	});
}


async function handleCredentialResponse(response) {
	console.log("Encoded JWT ID token: " + response.credential);
	let jwt = await fetchGoogleLogin(response.credential);
	if (jwt) {
		window.location.href = `http://localhost:8080/home`;
	}
}
window.onload = function() {
	google.accounts.id.initialize({
		client_id: "480002319883-a89bli2rjcj3d949ol9s05prl2v0i3db.apps.googleusercontent.com",
		callback: handleCredentialResponse
	});
	google.accounts.id.renderButton(
		document.getElementById("buttonDiv"),
		{ theme: "outline", size: "large" }  // customization attributes
	);
}