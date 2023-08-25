import { DataStatus } from "../common/enums";

function isLoading(dataStatus: DataStatus) {
  return dataStatus === DataStatus.PENDING;
}

export { isLoading as default };
