import axios from "axios";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  try {
    const res = await axios.post(
      import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = res.data;

    if (data.secure_url) {
      return {
        url: data.secure_url,
        public_id: data.public_id,
      };
    } else {
      throw new Error("Cloudinary did not return a URL");
    }
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return null;
  }
};

export default uploadToCloudinary;
