# Cyber Chat
The Cyber Chat Web App is a secure messaging application that allows users to register, authenticate, send encrypted messages, and retrieve and decrypt their chat history. It incorporates various security measures to ensure the confidentiality and integrity of messages.

## Features
1. User Registration: Users can create an account with validated input and check username availability. Details are securely stored in the SQLite database.

2. User Authentication: Users can log in with their credentials, which are verified against stored user data for access to their account.

3. Message Encryption and Sending: Senders can encrypt messages or images using AES symmetric encryption. Encryption keys are securely shared using RSA asymmetric encryption. Encrypted content, metadata, and sender-receiver details are stored in the SQLite database.

4. Message Retrieval and Decryption: Receivers can request chat history. Encrypted logs are retrieved based on user ID and decrypted using the corresponding keys. Decrypted messages are displayed for reading.

5. Enhanced Security: Special messages require recipients to scan emailed QR codes for added privacy protection.

6. User Interface and Interaction: User-friendly interface for signup, login, and seamless message interaction.

7. Error Handling and Security Measures: Robust error handling and security measures implemented for improved application security and reliability.

## Software Requirements
To develop and run the Cyber Chat Web App, the following software requirements must be met:

1. Node.js: Node.js is a JavaScript runtime environment required to provide a platform for executing JavaScript code outside of a web browser, making it ideal for server-side development.

2. SQLite3: SQLite3 is a lightweight and self-contained relational database management system, chosen for its simplicity, compatibility with Node.js, and suitability for small to medium-scale applications.

3. Microsoft Azure Function Apps: Azure Function Apps provide serverless compute resources for running server-side logic in a scalable and reliable manner and can handle critical operations such as user authentication, encryption, decryption, and database management.

4. HTML, CSS, JavaScript: HTML, CSS, and JavaScript are fundamental web technologies used to build the client-side interface of the chat application. HTML provides the structure, CSS is used for styling, and JavaScript handles the interactivity and functionality of the user interface.

5. Development Tools (Visual Studio Code, Postman): Visual Studio Code and Postman can provide helpful features to developers such as syntax highlighting, debugging capabilities, API testing, and source control integration.

## Installation
To run the Cyber Chat Web App locally, follow these steps:

1. Clone the repository:

       git clone https://github.com/yourusername/cyber-chat-web-app.git

2. Install dependencies:

       npm install

3. Start the application:

       npm start

4. Access the application in your web browser at http://localhost:3000.
