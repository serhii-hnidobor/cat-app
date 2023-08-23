enum NavItemType {
  VOTING = 'VOTING',
  BREEDS = 'BREEDS',
  GALLERY = 'GALLERY'
}

enum IconNames {
  LOGO = "LOGO"
}

enum AppRoutes {
  VOTING = '/voting',
  BREEDS = '/breeds',
  GALLERY = '/gallery' 
}

enum DataStatus{
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  IDLE = 'IDLE',
}

enum Sort {
  ASC = 'ASC',
  DESC = 'DESC'
}

export { NavItemType, IconNames, AppRoutes, DataStatus, Sort };