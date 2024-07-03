import React, { useRef } from "react";
import { Box, IconButton, Button, Grid } from "@mui/material";
import CloseIcon from "@/app/icons/CloseIcon";
import { useFieldArray, Controller } from "react-hook-form";
import "./style.scss";
import InputErrorText from "../InputErrorText/InputErrorText";

const Documents = ({ control, error }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "gallery_images",
    keyName: "gallery_images_id",
  });

  const hiddenFileInput = useRef(null);

  const handleAddDocuments = (event) => {
    const uploadedFiles = Array.from(event.target.files);

    const files = uploadedFiles.map((file) => ({
      file,
      local: true,
    }));

    append(files);

    event.target.value = null;
    // hiddenFileInput.current.value = "";
  };

  return (
    <div className="add-images-wrapper">
      <input
        ref={hiddenFileInput}
        type="file"
        multiple
        onChange={handleAddDocuments}
        id="file-upload"
        style={{
          display: "none",
        }}
      />

      <label htmlFor="file-upload" className="label-button">
        Add Documents
      </label>

      <p className="additional-info">
        Примечание: Можно загрузить максимум 5 изображений
      </p>

      <div className="img-container">
        {fields.map(({ gallery_images_id, file, path }: any, index) => (
          <div key={gallery_images_id}>
            <Controller
              control={control}
              name={`gallery_images.${index}`}
              render={() => (
                <div className="img-wrapper">
                  <img
                    width={100}
                    height={100}
                    src={file ? URL.createObjectURL(file) : path}
                    alt="document"
                  />

                  <div
                    className="close-icon-wrapper"
                    onClick={() => remove(index)}
                  >
                    <CloseIcon width={22} height={22} />
                  </div>
                </div>
              )}
            />
          </div>
        ))}
      </div>

      {error && <InputErrorText error={error} />}
    </div>
  );
};

export default Documents;
