import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Field, FieldInputProps, FieldMetaProps } from "formik";

const BoxEditor = ({ name }: { name: string }) => {
  const editor = useRef(null);

  const config = {
    readonly: false,
  };
  return (
    <Field
      name={name}
      render={({
        field,
        meta,
      }: {
        field: FieldInputProps<any>;
        meta: FieldMetaProps<any>;
      }) => {
        return <JoditEditor ref={editor} config={config} {...field} />;
      }}
    />
  );
};
export default BoxEditor;
