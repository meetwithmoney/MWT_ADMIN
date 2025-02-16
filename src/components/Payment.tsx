import React, { useEffect, useState } from "react";
import "../App.css";
import { currentPaymentPhoto } from "features/payment/currentPaymentPhotoSlice";
import { AppDispatch } from "app/store";
import { useAppDispatch } from "app/hook";
import { OK } from "config/httpStatusCodes";
import { changePaymentPhoto } from "features/payment/changePaymentPhotoSlice";
import { useForm } from "react-hook-form";

type FormData = {
  paymentImage: FileList; // Define the type for paymentImage
};

const Payment: React.FC = () => {
  const [image, setImage] = useState("/default-image.jpg"); // Replace with your default image path
  const [newImage, setNewImage] = useState<string | null>(null); // State for the new image
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key to reset file input
  const [newPhoto, setNewPhoto] = useState<any | null>(null);

  const [paymentImage, setPaymentImage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormData>({});

  const dispatch = useAppDispatch();

  const handleRemoveImage = () => {
    setNewImage(null); // Remove the new image
    setFileInputKey(Date.now()); // Reset the file input
    setNewPhoto(null);
  };

  const onSubmit = async (data: FormData) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("image", data.paymentImage[0]);
    console.log("formData", formData);
    const userAction = changePaymentPhoto(formData);
    const { payload } = await (dispatch as AppDispatch)(userAction);
    if (payload && payload.status === OK && payload.data.responseData) {
      setImage(payload.data.responseData.qr_code_image);
    }
    setImage(newImage);
    setNewImage(null);
    setFileInputKey(Date.now()); // Reset the file input after submission
  };

  const fetchCurrentPaymentPhoto = async () => {
    const userAction = currentPaymentPhoto();
    const { payload } = await (dispatch as AppDispatch)(userAction);

    if (payload && payload.status === OK && payload.data.responseData) {
      setImage(payload.data.responseData.qr_code_image);
    }
  };

  useEffect(() => {
    fetchCurrentPaymentPhoto();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="payment-container">
        <h2>Update Payment Photo</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
          src={image}
          alt="Current Payment"
          style={{ marginRight: "10px" }}
        />
        {newImage && (
          <div style={{ position: "relative" }}>
            <img src={newImage} alt="New Payment" />
            <button
              onClick={handleRemoveImage}
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              ✖
            </button>{" "}
            {/* Close icon */}
          </div>
        )}
      </div>
      <button onClick={handleSubmit(onSubmit)}>
        Update
      </button>{" "}
      {/* Submit button */}
      <input
        type="file"
        id="paymentImage"
        accept="image/*"
        className="mt-2 md:mt-3"
        onChange={(e) => {
          if (e.target.files) {
            console.log("e.target.files", e.target.files);
            setNewImage(URL.createObjectURL(e.target.files[0]));
            setValue("paymentImage", e.target.files); // Use FileList directly
          } else {
            setValue("paymentImage", new DataTransfer().files); // Use FileList directly
          }
          clearErrors("paymentImage");
        }}
        />{" "}
      </div>
    </form>
  );
};

export default Payment;
