const validateImage = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!validTypes.includes(file.type)) {
    return "Only JPG, JPEG, and PNG files are allowed";
  }

  if (file.size > maxSize) {
    return "Image size should be less than 2MB";
  }

  return true;
};

export default validateImage;
