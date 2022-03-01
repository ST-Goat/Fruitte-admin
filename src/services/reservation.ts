import axiosServices from "./axiosServices";

export enum ReservationStatus {
  BOOKED = "Booked",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export const fetchReservations = async ({
  startDate,
  endDate,
  limit,
  skip,
  farmId,
  userId,
  status,
}: {
  startDate?: string;
  endDate?: string;
  limit?: number;
  skip?: number;
  farmId?: string | number;
  userId?: string | number;
  status?: ReservationStatus;
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
    .then((res) => res.data.content);
};

export const cancelReservationById = async (id: string | number) => {
  return axiosServices.patch(`admin/reservations/${id}/cancel`);
};
