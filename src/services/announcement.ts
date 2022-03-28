import axiosServices from "./axiosServices";

const endpointUrl = "admin/notifications";

export const fetchAnnouncements = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) => {
  return axiosServices.get(endpointUrl, {
    params: { limit: limit, skip: skip },
  });
};

export const createNewAnnouncement = async (content: {
  title: string;
  content: string;
}) => {
  return axiosServices.post(endpointUrl, {
    ...content,
    reservationId: 0,
    type: "string",
    createdAt: new Date(),
  });
};

export const deleteAnnouncement = async ({ id }: { id: string | number }) => {
  return axiosServices.delete(`${endpointUrl}/${id}`, {
    params: {
      notificationId: id,
    },
  });
};

export const fetchAnnouncementDetail = async ({
  id,
}: {
  id: string | number;
}) => {
  return axiosServices.get(`${endpointUrl}/${id}`, {
    params: {
      notificationId: id,
    },
  });
};
