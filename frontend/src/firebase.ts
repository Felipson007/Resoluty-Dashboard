import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgFH74k2pOBWnYew00OMVBjnQYXcYzZdY",
  authDomain: "resolutydashboard.firebaseapp.com",
  projectId: "resolutydashboard",
  storageBucket: "resolutydashboard.firebasestorage.app",
  messagingSenderId: "948695454342",
  appId: "1:948695454342:web:f0f28af286ef883353f707"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Função para criar/atualizar perfil do usuário no Firestore
async function upsertUserProfile(userAuth: any) {
  const userRef = doc(db, 'users', userAuth.uid);
  const userProfile = {
    uid: userAuth.uid,
    email: userAuth.email,
    displayName: userAuth.displayName || userAuth.email.split('@')[0],
    role: 'member', // Definir um papel padrão
    department: 'general',
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    isActive: true,
  };
  await setDoc(userRef, userProfile, { merge: true });
}

// Função para registrar usuário
export async function registerUser(email: string, password: string, displayName?: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Agora que o usuário foi criado no Authentication, crie o perfil no Firestore
    await upsertUserProfile({ 
      uid: user.uid, 
      email: user.email, 
      displayName: displayName || user.displayName // Usar o displayName passado ou do Auth
    });
    
    console.log("Usuário registrado e perfil Firestore criado:", user.uid);
    return user;
  } catch (error: any) {
    console.error("Erro no registro:", error.message);
    throw error;
  }
}

// Função para fazer login do usuário
export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Opcional: Atualizar apenas o lastLogin aqui, ou garantir que o perfil exista
    await upsertUserProfile({ 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName
    });
    
    console.log("Usuário logado:", user.uid);
    return user;
  } catch (error: any) {
    console.error("Erro no login:", error.message);
    throw error;
  }
}

export default app;
