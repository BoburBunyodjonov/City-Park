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

interface QuestionsData {
  id: string;
  firstName: string;
  phone: string;
  apartmentId: string;
  timestamp: any;
}

const QuestionsTable = () => {
  // const { i18n } = useTranslation();
  // const language = i18n.language as "uz" | "ru" | "tr" | "ae";

  const [questions, setQuestions] = useState<QuestionsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "questions"));
      const fetchedQuestions: QuestionsData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedQuestions.push({ id: doc.id, ...doc.data() } as QuestionsData);
      });
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "questions", id));
      setQuestions(questions.filter(questions => questions.id !== id));
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
                  <TableCell>Phone</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Delete</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question, index) => (
                  <TableRow key={question.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{question.firstName}</TableCell>
                    <TableCell>{question.phone}</TableCell>
                    <TableCell>
                      {new Date(
                        question.timestamp.seconds * 1000
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell>
                        <Delete className="text-red-500 cursor-pointer" onClick={() => handleDelete(question.id)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default QuestionsTable;
