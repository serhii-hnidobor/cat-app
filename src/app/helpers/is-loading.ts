import { DataStatus } from "../common/enums";

function isLoading(dataStatus: DataStatus) {
  return dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;
}

export { isLoading as default };
