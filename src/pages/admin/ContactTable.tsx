import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  getFirestore,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
// import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { Delete } from "@mui/icons-material";

interface ContactData {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
  apartmentId: string;
  timestamp: any;
}

const ContactTable = () => {
  // const { i18n } = useTranslation();
  // const language = i18n.language as "uz" | "ru" | "tr" | "ae";

  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const fetchedContacts: ContactData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedContacts.push({ id: doc.id, ...doc.data() } as ContactData);
      });
      setContacts(fetchedContacts);
    } catch (error) {
      console.error("Error fetching contacts: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "contacts", id));
      setContacts(contacts.filter(contact => contact.id !== id));
      toast.success("Contact deleted successfully!"); 
    } catch (error) {
      console.error("Error deleting contact: ", error);
      toast.error("Failed to delete contact."); 
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto my-10">
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Apartment ID</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Delete</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow key={contact.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.message}</TableCell>
                    <TableCell>{contact.apartmentId}</TableCell>
                    <TableCell>
                      {new Date(
                        contact.timestamp.seconds * 1000
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell>
                        <Delete className="text-red-500 cursor-pointer" onClick={() => handleDelete(contact.id)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ToastContainer /> {/* Include the ToastContainer for notifications */}
        </>
      )}
    </div>
  );
};

export default ContactTable;
