import { DataStatus } from "../common/enums"

const isSuccess = (status: DataStatus) => status === DataStatus.SUCCESS;

export default isSuccess;