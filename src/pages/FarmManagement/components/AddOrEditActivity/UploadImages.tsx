import { useEffect, useRef, useState } from "react";
import Icon from "pages/common/components/Icon";
import cn from "classnames";

export type UploadImageProps = {
  name: string;
  fieldValue: any;
  setFieldValue: any;
};

const NoneImageFrame = ({ prevSrc }: { prevSrc: string }) => (
  <div
    className={cn(
      "flex justify-center items-center",
      "w-32 h-32 mr-4",
      "bg-grey-100 rounded-lg overflow-hidden"
    )}
  >
    {!prevSrc ? (
      <Icon className="w-20 h-20" name="none-image" />
    ) : (
      <img
        style={{ minWidth: "8rem", minHeight: "8rem" }}
        src={prevSrc}
        alt={prevSrc}
      />
    )}
  </div>
);

const LIMIT_SUB_IMAGE = 3;
const UploadImages = ({
  name,
  fieldValue,
  setFieldValue,
}: UploadImageProps) => {
  const fileRefMain = useRef<any>(null);
  const [mainSrcPreview, setMainSrcPreview] = useState(fieldValue[0] ?? "");
  const [srcPreviews, setSrcPreviews] = useState<Array<string>>(
    fieldValue.slice(1) ?? []
  );

  return (
    <div>
      <input
        ref={fileRefMain}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(event) => {
          const newValues = event.target.files;
          if (newValues && newValues.length > 0) {
            const mainFile = newValues[0];
            if (Boolean(mainFile))
              setMainSrcPreview(URL.createObjectURL(mainFile));
            setFieldValue(
              name,
              [mainFile, fieldValue[1], fieldValue[2], fieldValue[3]].filter(
                Boolean
              )
            );
          }
        }}
      />
      <div
        style={{ maxWidth: "520px", minWidth: "480px", width: "100%" }}
        className="flex"
      >
        <div className="mr-4 flex-grow">
          <div
            className={cn(
              "flex flex-col justify-center items-center",
              "w-96 h-96",
              "bg-grey-100 cursor-pointer rounded-lg overflow-hidden",
              "hover:opacity-90",
              "active:transform active:scale-95"
            )}
            onClick={() => fileRefMain.current.click()}
          >
            {Boolean(mainSrcPreview) ? (
              <img
                style={{ minWidth: "24rem", minHeight: "24rem" }}
                src={mainSrcPreview}
                alt={mainSrcPreview}
              />
            ) : (
              <>
                <div className="w-36 h-36">
                  <Icon className="h-full w-full" name="upload-image" />
                </div>
                <b>이미지를 첨부해 주세요</b>
                <p>
                  JPG, PNG, JPEG <br />
                  Maximum 100 Mb
                </p>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="w-full p-2 mb-4 border border-grey-300 rounded">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => {
                const newValues = event.target.files;
                if (newValues && newValues.length > 0) {
                  if (newValues.length > 3) {
                    alert("Maximum files is 3");
                    return;
                  }
                  const listSrc: Array<string> = [];
                  Array.from(
                    { length: LIMIT_SUB_IMAGE },
                    (_, i) => i + 1
                  ).forEach((item, index) => {
                    const imgSrc = newValues[index]
                      ? URL.createObjectURL(newValues[index])
                      : "";
                    listSrc.push(imgSrc);
                  });
                  setSrcPreviews(listSrc);
                  setFieldValue(
                    name,
                    [
                      fieldValue[0],
                      newValues[0],
                      newValues[1],
                      newValues[2],
                    ].filter(Boolean)
                  );
                }
              }}
            />
          </div>
          <div className="flex">
            {Array.from({ length: LIMIT_SUB_IMAGE }, (_, i) => i + 1).map(
              (num, i) => (
                <NoneImageFrame prevSrc={srcPreviews[i]} key={num} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UploadImages;
