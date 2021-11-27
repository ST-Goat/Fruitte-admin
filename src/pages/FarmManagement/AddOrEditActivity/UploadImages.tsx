import { useRef, useState } from "react";
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
      "w-32 h-32 mb-4",
      "bg-grey-100 rounded-lg overflow-hidden"
    )}
  >
    {!prevSrc ? (
      <Icon className="w-20 h-20" name="none-image" />
    ) : (
      <img style={{ minWidth: "8rem", minHeight: "8rem" }} src={prevSrc} />
    )}
  </div>
);

const listImage = [1, 2, 3];
const UploadImages = ({
  name,
  fieldValue,
  setFieldValue,
}: UploadImageProps) => {
  const fileRef = useRef<any>(null);
  const [mainSrcPreview, setMainSrcPreview] = useState("");
  const [srcPreviews, setSrcPreviews] = useState<Array<string>>([]);

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={(event) => {
          const newValues = event.target.files;
          if (newValues) {
            const listSrc: Array<string> = [];
            const firstFile = newValues[0];
            listImage.forEach((item, index) => {
              const imgSrc = newValues[index + 1]
                ? URL.createObjectURL(newValues[index + 1])
                : "";
              listSrc.push(imgSrc);
            });
            if (Boolean(firstFile))
              setMainSrcPreview(URL.createObjectURL(firstFile));
            setSrcPreviews(listSrc);
            setFieldValue(name, newValues);
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
            onClick={() => fileRef.current.click()}
          >
            {Boolean(mainSrcPreview) ? (
              <img
                style={{ minWidth: "24rem", minHeight: "24rem" }}
                src={mainSrcPreview}
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
          {listImage.map((num, i) => (
            <NoneImageFrame prevSrc={srcPreviews[i]} key={num} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default UploadImages;
