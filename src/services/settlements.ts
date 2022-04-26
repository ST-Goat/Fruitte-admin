import axiosServices from "./axiosServices";

const endpointUrl = "admin/payments";

export enum PaymentStatus {
    UNSETTLED = "PAID",
    SETTLED = "PAID_TO_FARMER"
}

export const fetchPayments = ({
    startDate,
        endDate,
        status,
        farmId,
        limit,
        skip,
        farmName
}: {
    startDate?: Date,
        endDate?: Date,
        status?: PaymentStatus,
        farmId?: string | number,
        farmName?: string,
        limit: number,
        skip: number,
}) => {
    return axiosServices.get(endpointUrl, {params: {
        startDate,
        endDate,
        status,
        farmId,
        limit,
        skip,
        farmName
    }})
};

export const editSettlements = ({
    settlementBillIds,
    unsettlementBillIds
}: {
    settlementBillIds?: Array<number | string>,
    unsettlementBillIds?: Array<number | string>
}) => {
    return axiosServices.put(endpointUrl, {
        settlementBillIds,
        unsettlementBillIds
    })
}