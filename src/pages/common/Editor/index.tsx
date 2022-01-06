import JoditEditor from "jodit-react";
import React, { LegacyRef } from "react";

const initConfigs = {
  readonly: false,
  width: "100%",
  toolbarButtonSize: "large",
  useSearch: false,
  spellcheck: false,
  enter: "P",
  defaultMode: "1",
  toolbarAdaptive: false,
  toolbarSticky: false,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  minHeight: 400,
  maxHeight: 1000,
  minWidth: null,
  buttons: [
    "paragraph",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "align",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "brush",
    "link",
    "|",
    "image",
    "undo",
    "redo",
  ],
  editorCssClass: "alic",
  placeHolder: "",
  controls: {
    fontsize: {
      list: [
        "8",
        "9",
        "10",
        "11",
        "12",
        "14",
        "16",
        "18",
        "24",
        "30",
        "36",
        "48",
        "60",
        "72",
        "96",
        "100",
      ],
    },
    font: {
      command: "fontname",
      list: {
        "": "Default",
        "'Open Sans',sans-serif": "Open Sans",
        "Helvetica,sans-serif": "Helvetica",
        "Arial,Helvetica,sans-serif": "Arial",
        "Georgia,serif": "Georgia",
        "Impact,Charcoal,sans-serif": "Impact",
        "Tahoma,Geneva,sans-serif": "Tahoma",
        "'Times New Roman',Times,serif": "Times New Roman",
        "Verdana,Geneva,sans-serif": "Verdana",
      },
    },
  },
  uploader: { insertImageAsBase64URI: true },
};

export type EditorProps = {
  value: string;
  customConfigs?: { [key: string]: any };
  onBlur: (newValue: string) => void;
} & {
  [key: string]: any;
};
const Editor = React.forwardRef(
  (
    { value, customConfigs = {}, onBlur, ...props }: EditorProps,
    ref: LegacyRef<any> | undefined
  ) => {
    return (
      <JoditEditor
        ref={ref}
        value={value}
        config={{
          ...initConfigs,
          ...customConfigs,
        }}
        onBlur={onBlur}
        {...props}
      />
    );
  }
);

export default Editor;
