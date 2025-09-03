import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../firebase';
import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  department: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

/**
 * Cria um novo perfil de usuário no Firestore
 */
export async function createUserProfile(user: User, additionalData?: Partial<UserProfile>) {
  try {
    const userRef = doc(db, 'users', user.uid);
    
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || additionalData?.displayName || '',
      role: additionalData?.role || 'user',
      department: additionalData?.department || '',
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true,
      ...additionalData
    };

    await setDoc(userRef, userProfile);
    return userProfile;
  } catch (error) {
    console.error('Erro ao criar perfil do usuário:', error);
    throw error;
  }
}

/**
 * Busca o perfil de um usuário no Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    throw error;
  }
}

/**
 * Atualiza o perfil de um usuário no Firestore
 */
export async function updateUserProfile(uid: string, updates: Partial<UserProfile>) {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      lastLogin: new Date()
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    throw error;
  }
}

/**
 * Busca todos os usuários de um departamento específico
 */
export async function getUsersByDepartment(department: string): Promise<UserProfile[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('department', '==', department), where('isActive', '==', true));
    const querySnapshot = await getDocs(q);
    
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile);
    });
    
    return users;
  } catch (error) {
    console.error('Erro ao buscar usuários por departamento:', error);
    throw error;
  }
}

/**
 * Busca todos os usuários ativos
 */
export async function getAllActiveUsers(): Promise<UserProfile[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('isActive', '==', true));
    const querySnapshot = await getDocs(q);
    
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile);
    });
    
    return users;
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    throw error;
  }
}
