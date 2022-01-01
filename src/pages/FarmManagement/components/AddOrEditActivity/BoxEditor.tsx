import { useState, useRef, memo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Field, FieldProps } from "formik";

const JoditEditorCustomizer = memo(({ field, meta }: FieldProps) => {
  const editor = useRef(null);
  const [value, setValue] = useState(field.value);

  useEffect(() => {
    field.onChange({
      target: {
        name: field.name,
        value: value,
      },
    });
  }, [value]);

  const config = {
    readonly: false,
  };
  return (
    <JoditEditor
      ref={editor}
      config={config}
      value={value}
      onBlur={(newContent) => {
        setValue(newContent);
      }}
    />
  );
});

const BoxEditor = ({ name }: { name: string }) => {
  return (
    <Field
      name={name}
      render={(fieldProps: FieldProps) => {
        return <JoditEditorCustomizer {...fieldProps} />;
      }}
    />
  );
};
export default BoxEditor;
