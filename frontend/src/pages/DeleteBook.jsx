import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import { API_URL } from "../config/api.js";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false); // Set default value to `false`
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${API_URL}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Succesfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <div className="text-2xl">
          Are You Sure You Want To Delete This Book?
        </div>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete It
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
