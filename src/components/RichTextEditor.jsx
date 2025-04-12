import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RichTextEditor({ name, control, defaultValue = "" }) {
  return (
    <Controller
      name={name || "content"}
      control={control}
      render={({ field: { onChange } }) => (
        <Editor
          apiKey={import.meta.env.VITE_APP_RICH_TEXT_EDITOR}
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
          initialValue="Welcome to TinyMCE!"
          onEditorChange={onChange}
        />
      )}
    />
  );
}
