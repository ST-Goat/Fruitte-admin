export enum Size {
  BASE = "base",
  SMALL = "small",
  BIG = "big",
}

export enum Color {
  PRIMARY = "primary-default",
  LEMON = "lemon",
  PURPLE = "purple",
  BLUE = "blue",
  CARBON = "carbon",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  WHITE = "white",
  GREEN = "green-500",
  GRAY = "gray-500",
  GRAYLIGHT = "gray-light",
  GREY = "grey-500",
}

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  UNKNOWN_ERROR = 520,
}

export enum ModalMode {
  REGULAR = "regular",
  DROPDOWN = "dropdown",
  BOTTOM_SHEET = "bottom_sheet",
}

export enum JobStatus {
  ACTIVE = "active",
  DRAFT = "draft",
  EXPIRED = "expired",
}

export enum DisplayStyle {
  LIST_VIEW = "list",
  GRID_VIEW = "grid",
}

export enum JobEditorState {
  TODO = "todo",
  DOING = "doing",
  DONE = "done",
}

export enum JobDraftStep {
  INFORMATION = "1",
  REQUIREMENTS = "2",
  PLACEMENT = "3",
  PERKS_BENEFITS = "4",
  PREVIEW = "5",
}

export enum JobDetailsAction {
  PREVIEW = "preview",
  EDIT = "edit",
}

export enum UserStatus {
  ACTIVE = "Active",
  DEACTIVE = "Deactive",
  CHANGING_PASSWORD = "ChangingPassword",
  PENDING = "Pending",
}

export enum PaginationDefault {
  PAGE = 0,
  PAGE_SIZE = 10,
}

export type DeleteApiResponse = {
  deletedCount: number;
  metadata: {
    timestamp: number;
  };
};

export type PaginationParams = {
  page: string;
  size?: number;
};

export type PaginationMetadata = {
  nextPage: number;
  prevPage: string;
  page: number;
  size: number;
};

export type FetchMetadata = {
  timestamp: number;
};

export type FetchResponse<T> = {
  data: T;
  metadata: FetchMetadata;
};

export type PaginationResponse<T> = {
  data: T[];
  metadata: PaginationMetadata;
};
