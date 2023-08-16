export const isFileSizeValid = (
  file,
  dimentions = { minWidth: 0, maxWidth: 0, minHeight: 0, maxHeight: 0 },
  setError
) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();

    img.onload = (e) => {
      const width = e.target.width;
      const height = e.target.height;

      if (
        width > dimentions.maxWidth ||
        width < dimentions.minWidth ||
        height > dimentions.maxHeight ||
        height < dimentions.minHeight
      ) {
        setError = true;
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};
