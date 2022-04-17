/** @format */

import axiosServices from 'services/axiosServices';

const endpointUrl = 'admin/feedback';

export enum FeedbackStatus {
  ON_GOING = 'ON_GOING',
  DONE = 'DONE',
}

export type FeedbackType = any;

export const getFeedbackList = async ({
  limit,
  skip,
  status,
  farmId,
}: {
  limit: number;
  skip: number;
  status?: FeedbackStatus;
  farmId: number | string;
}): Promise<{
  data: FeedbackType[];
  count: number;
}> => {
  return axiosServices
    .get(`${endpointUrl}s`, {
      params: {
        limit,
        skip,
        status,
        farmId,
      },
    })
    .then(response => response.data);
};

export const getFeedbackDetail = async ({
  id,
}: {
  id: string | number;
}): Promise<FeedbackType> => {
  return axiosServices
    .get(`${endpointUrl}/${id}`)
    .then(response => response.data.content);
};

export const resolvedFeedback = async ({
  id,
}: {
  id: string | number;
}): Promise<{ status: string }> => {
  return axiosServices
    .put(`${endpointUrl}/${id}`)
    .then(response => response.data);
};

export const createNewMessageForFeedBack = ({
  feedbackId,
  targetId,
  message,
}: {
  feedbackId: string;
  targetId: string;
  message: string;
}) => {
  return axiosServices
    .post(`${endpointUrl}/${feedbackId}`, {
      targetId: targetId,
      message: message,
    })
    .then(response => response.data);
};
