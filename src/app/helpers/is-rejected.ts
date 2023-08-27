import { DataStatus } from "../common/enums";

const isRejected = (dataStatus: DataStatus) => dataStatus === DataStatus.FAILED;

export default isRejected;
