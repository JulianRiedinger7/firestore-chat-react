// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDWAfbjsR-CIVfyyVAh3VblC-nEPbKf_G0',
	authDomain: 'firestore-realtime-chat-react.firebaseapp.com',
	projectId: 'firestore-realtime-chat-react',
	storageBucket: 'firestore-realtime-chat-react.appspot.com',
	messagingSenderId: '696118136133',
	appId: '1:696118136133:web:5b8a7b0dcd4a721f72022c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
