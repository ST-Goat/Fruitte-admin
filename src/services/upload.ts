import axiosServices from "./axiosServices";
import axios from "axios";
import { HttpStatus } from "shared/comom.enum";

type PresignedPostUrlResponse = {
  url: string;
  fields: string;
};

export const getPresignedPostUrl = async ({
  key,
  contentType,
}: {
  key: string;
  contentType?: string;
}): Promise<PresignedPostUrlResponse> => {
  const { data } = await axiosServices.get(`user/presigned/${key}`, {
    params: { contentType: contentType },
  });
  return data;
};

export const uploadFileToAws3 = async ({
  fileType,
  fileContents,
  presignedPostUrl,
}: {
  fileType: string;
  fileContents: File;
  presignedPostUrl: any;
}) => {
  const formData = new FormData();
  formData.append("Content-Type", fileType);
  const presignedFields = JSON.parse(presignedPostUrl.fields);
  Object.entries(presignedFields).forEach(([k, v]) => {
    formData.append(k, v as any);
  });
  formData.append("file", fileContents);

  const response = await axios.post(presignedPostUrl.url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  let nameFile = null;
  if (response.status === HttpStatus.NO_CONTENT) {
    nameFile = `${presignedPostUrl.url}/${presignedFields.key}`;
  }
  return nameFile;
};

export type UploadFileResponse = {
  isSuccess: boolean;
  data?: {
    link: string;
  };
};
export const uploadFiles = async ({
  file,
}: {
  file: File;
}): Promise<UploadFileResponse> => {
  try {
    const responsePresigned = await getPresignedPostUrl({
      key: file.name,
      contentType: file.type,
    });
    const responseUpload = await uploadFileToAws3({
      fileType: file.type,
      fileContents: file,
      presignedPostUrl: responsePresigned,
    });
    if (!responseUpload) throw new Error("File name iamge is not valid");
    return {
      isSuccess: true,
      data: {
        link: responseUpload,
      },
    };
  } catch (error) {
    return {
      isSuccess: false,
    };
  }
};
