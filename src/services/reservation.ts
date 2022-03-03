import axiosServices from "./axiosServices";

export enum ReservationStatus {
  BOOKING = "BOOKING",
  COMPLETED = "DONE",
  CANCELLED = "CANCEL",
}

export const fetchReservations = async ({
  startDate,
  endDate,
  limit,
  skip,
  farmId,
  userId,
  status,
  search,
}: {
  startDate?: string;
  endDate?: string;
  limit?: number;
  skip?: number;
  farmId?: string | number;
  userId?: string | number;
  status?: ReservationStatus;
  search?: string;
}) => {
  return axiosServices
    .get("admin/reservations", {
      params: {
        startDate,
        endDate,
        limit,
        skip,
        farmId,
        userId,
        status,
      },
    })
    .then((res) => res.data);
};

export const cancelReservationById = async (id: string | number) => {
  return axiosServices.patch(`admin/reservations/${id}/cancel`);
};

export const getReservationDetail = async (id: string | number) => {
  return axiosServices.get(`user/reservations/${id}`).then((res) => res.data);
};
