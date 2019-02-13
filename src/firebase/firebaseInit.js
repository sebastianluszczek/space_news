import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '@/firebase/firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();