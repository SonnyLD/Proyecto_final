const socket = io();

const submitBtn = document.getElementById("submitBtn");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messagesContainer");
const welcomeText = document.getElementById("welcomeText");
const userName = document.getElementById("userName");

let newMessages = [];
let user = userName.innerText.substring(0, userName.innerText.indexOf(','));

socket.on("welcome", async (data) => {
	try {
		const messages = await getMessages(data);
		loadMessages(messages);
	} catch (error) {
		console.log(error);
	}
});

socket.on("message", async (data) => {
	const message = await getMessages(data);
	printMessage({...message});
});

socket.on("newUser", (newUser) => {
	Swal.fire({
		text: `${newUser} has joined the chat!`,
		toast: true,
		position: "top-right",
	});
});

if (!user.length > 0) {
	Swal.fire({
		title: "Please set your name",
		text: "User name:",
		input: "text",
		allowOutsideClick: false,
		inputValidator: (value) => {
			return !value && "You need to set your user name";
		}
	}).then((newUser) => {
		user = newUser.value;
		welcomeText.innerText = `Welcome ${user}!`;
		userName.remove();
		socket.emit("newUser", user);
		document.addEventListener('keypress', (e) => {
			if (e.key === "Enter") {
				sendMessage();
			}
			});
	})
} else {
	document.addEventListener('keypress', (e) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	});
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendMessage();
});

function loadMessages(messages) {
	messagesContainer.innerHTML = '';
	messages.forEach(msg => {
		const messageBox = document.createElement('div');
		messageBox.className = 'messageBox';
		messageBox.innerHTML = `
								<p class="messageUser" id="messageUser">${msg.user}</p>
								<p class="messageText" id="messageText">${msg.message}</p>
								<small class="messageDate" id="messageText">${msg.createdAt}</small>
								`
		messagesContainer.appendChild(messageBox);
  });
};

function printMessage(message) {
	messagesContainer.innerHTML += `
								<div class="messageBox">
								<p class="messageUser" id="messageUser">${message.user}</p>
								<p class="messageText" id="messageText">${message.message}</p>
								<small class="messageDate" id="messageText">${message.createdAt}</small>
	`;
};

function sendMessage() {
	const messageText = messageInput.value.trim();
	messageInput.value = "";
	socket.emit("newMessage", { user, message: messageText});
};

function getMessages(data) {
	return new Promise((res, rej) => {
		if (data.messages) {
			res([...data.messages]);
		} else if (data){
			res(data);
		} else {
			rej(new Error("Failed to get new messages"));
		}
	});
};