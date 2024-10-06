import { Delete, Edit } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import { DataType } from "../../constants/data";
import { deleteApartment, getApartments } from "../../firebase/firebaseUtils";

const DashboardTable: React.FC<{
  render: boolean;
  setAddModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setApartmentData: React.Dispatch<SetStateAction<DataType>>;
}> = ({ setApartmentData, setAddModalOpen, render }) => {
  const [apartments, setApartments] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apartmentsData = await getApartments();
        setApartments(apartmentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [render]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this apartment?")) {
      try {
        await deleteApartment(id);
        const apartmentsData = await getApartments();
        setApartments(apartmentsData);
      } catch (error) {
        console.error("Error deleting apartment:", error);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer sx={{ borderRadius: 2, border: "1px solid #ddd" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  №
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Title (uz)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Title (ru)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Title (tr)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Title (ae)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Description (uz)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Description (ru)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Description (tr)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Description (ae)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Rooms
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Location (uz)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Location (ru)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Location (tr)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Location (ae)
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Mortgage
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Area
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Furniture
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Repair
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Parking
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Floor
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Main image
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Image 2
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Image 3
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                >
                  Catalog file
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apartments.map((apartment, index) => (
                <TableRow
                  key={apartment.id}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#eaeaea" },
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.title_uz}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.title_ru}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.title_tr}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.title_ae}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.price}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 100,
                    }}
                  >
                    {apartment.description_uz}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 100,
                    }}
                  >
                    {apartment.description_ru}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 100,
                    }}
                  >
                    {apartment.description_tr}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 100,
                    }}
                  >
                    {apartment.description_ae}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.rooms}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.location_uz}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.location_ru}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.location_tr}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.location_ae}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.type}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.mortgage ? "Available" : "Not Available"}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.area}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.furniture ? "Yes" : "No"}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.repair ? "Yes" : "No"}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.parking ? "Yes" : "No"}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.floor}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.img1 && (
                      <img
                        src={
                          typeof apartment.img1 === "string"
                            ? apartment.img1
                            : URL.createObjectURL(apartment.img1)
                        }
                        alt="Image 1"
                        style={{ width: 50, height: 50, borderRadius: 4 }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.img2 && (
                      <img
                        src={
                          typeof apartment.img2 === "string"
                            ? apartment.img2
                            : URL.createObjectURL(apartment.img2)
                        }
                        alt="Image 2"
                        style={{ width: 50, height: 50, borderRadius: 4 }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.img3 && (
                      <img
                        src={
                          typeof apartment.img3 === "string"
                            ? apartment.img3
                            : URL.createObjectURL(apartment.img3)
                        }
                        alt="Image 3"
                        style={{ width: 50, height: 50, borderRadius: 4 }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {apartment.catalog_file && (
                      <>
                        <a
                          href={
                            typeof apartment.catalog_file === "string"
                              ? apartment.catalog_file
                              : URL.createObjectURL(apartment.catalog_file)
                          }
                          download={
                            typeof apartment.catalog_file === "object"
                              ? apartment.catalog_file.name
                              : "file"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            borderRadius: "4px",
                            display: "inline-block",
                          }}
                        >
                          Download File
                        </a>
                      </>
                    )}
                  </TableCell>

                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setAddModalOpen(true);
                        setApartmentData(apartment);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(String(apartment.id))}
                      sx={{ ml: 1 }}
                    >
                      <Delete className="text-red-600" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DashboardTable;
