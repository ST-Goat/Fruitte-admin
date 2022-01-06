import { useState, useRef, memo, useEffect } from "react";
import Editor from "pages/common/Editor";
import { Field, FieldInputProps, FieldMetaProps, FieldProps } from "formik";
import { isEqual } from "lodash";

const JoditEditorCustomizer = memo(
  ({
    field,
    meta,
  }: {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
  }) => {
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
      <Editor
        ref={editor}
        config={config}
        value={value}
        onBlur={(newContent: string) => {
          setValue(newContent);
        }}
      />
    );
  },
  (prevProps: any, nextProps: any) => {
    return isEqual(prevProps, nextProps);
  }
);

const BoxEditor = ({ name }: { name: string }) => {
  return (
    <Field name={name}>
      {(fieldProps: FieldProps) => {
        const { field, meta } = fieldProps;
        return <JoditEditorCustomizer field={field} meta={meta} />;
      }}
    </Field>
  );
};
export default BoxEditor;
