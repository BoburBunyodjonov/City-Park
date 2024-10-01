import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore, storage } from "./firebaseConfig";
import { DataType } from "../constants/data";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface IGetApartments {
  price: number[];
  room: number;
  type: string;
}

export const getApartments = async (
  payload: IGetApartments
): Promise<DataType[]> => {
  const apartmentsCollection = collection(firestore, "apartments");
  const snapshot = await getDocs(apartmentsCollection);

  const apartmentsList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as DataType[];

  return apartmentsList;
};

export const addApartment = async (apartmentData: DataType): Promise<void> => {
  try {
    const apartmentsCollection = collection(firestore, "apartments");
    await addDoc(apartmentsCollection, apartmentData);
    console.log("Apartment added successfully:", apartmentData);
  } catch (error) {
    console.error("Error adding apartment:", error);
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const fileRef = ref(storage, `images/${file.name}`);
    const uploadResult = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(uploadResult.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};
