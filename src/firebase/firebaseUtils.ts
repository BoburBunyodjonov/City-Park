import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseConfig';
import { DataType } from '../constants/data'; // Import DataType for proper type annotation

export const getApartments = async (): Promise<DataType[]> => {
  const apartmentsCollection = collection(firestore, 'apartments');
  const snapshot = await getDocs(apartmentsCollection);

  const apartmentsList = snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  })) as DataType[];

  return apartmentsList;
};
