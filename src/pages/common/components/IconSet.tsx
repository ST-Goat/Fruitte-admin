import { FC, SVGProps } from 'react'
import { ReactComponent as EyesHide } from '../../../assets/icons/eyes-hide.svg'
import { ReactComponent as EyesShow } from '../../../assets/icons/eyes-show.svg'
import { ReactComponent as ArrowLeft } from '../../../assets/icons/arrow-left.svg'
import { ReactComponent as RecruitJobPosting } from '../../../assets/icons/recruit-job-posting.svg'
import { ReactComponent as RecruitChat } from '../../../assets/icons/recruit-chat.svg'
import { ReactComponent as RecruitCalendar } from '../../../assets/icons/recruit-calendar.svg'
import { ReactComponent as RecruitSearch } from '../../../assets/icons/recruit-search.svg'
import { ReactComponent as SettingCompany } from '../../../assets/icons/setting-company.svg'
import { ReactComponent as SettingRecruitment } from '../../../assets/icons/setting-recruitment.svg'
import { ReactComponent as SettingOnboard } from '../../../assets/icons/setting-onboard.svg'
import { ReactComponent as SettingTeamMgt } from '../../../assets/icons/setting-team-mgt.svg'
import { ReactComponent as NavMenu } from '../../../assets/icons/nav-menu.svg'
import { ReactComponent as Notification } from '../../../assets/icons/notification.svg'
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrow-down.svg'
import { ReactComponent as ArrowDownBlack } from '../../../assets/icons/arrow-down-black.svg'
import { ReactComponent as ArrowDownWhite } from '../../../assets/icons/arrow-down-white.svg'
import { ReactComponent as ArrowDownPrimary } from '../../../assets/icons/arrow-down-primary.svg'
import { ReactComponent as GridItemActive } from '../../../assets/icons/grid-item-active.svg'
import { ReactComponent as GridItemInactive } from '../../../assets/icons/grid-item-inactive.svg'
import { ReactComponent as ListItemActive } from '../../../assets/icons/list-item-active.svg'
import { ReactComponent as ListItemInactive } from '../../../assets/icons/list-item-inactive.svg'
import { ReactComponent as Search } from '../../../assets/icons/search.svg'
import { ReactComponent as Settings } from '../../../assets/icons/settings.svg'
import { ReactComponent as CircleArrowRight } from '../../../assets/icons/circle-arrow-right.svg'
import { ReactComponent as EditJobBlack } from '../../../assets/icons/edit-job-black.svg'
import { ReactComponent as FindCandidatesBlack } from '../../../assets/icons/find-candidates-black.svg'
import { ReactComponent as ShareJobBlack } from '../../../assets/icons/share-job-black.svg'
import { ReactComponent as RemoveJobBlack } from '../../../assets/icons/remove-job-black.svg'
import { ReactComponent as JobTick } from '../../../assets/icons/job-tick.svg'
import { ReactComponent as JobUncheck } from '../../../assets/icons/job-uncheck.svg'
import { ReactComponent as JobChecking } from '../../../assets/icons/job-checking.svg'
import { ReactComponent as JobTickBlack } from '../../../assets/icons/job-tick-black.svg'
import { ReactComponent as ClockGrey } from '../../../assets/icons/clock-grey.svg'
import { ReactComponent as SalaryGrey } from '../../../assets/icons/salary-grey.svg'
import { ReactComponent as MapGrey } from '../../../assets/icons/map-grey.svg'
import { ReactComponent as EditJobPrimary600 } from '../../../assets/icons/edit-job-primary-600.svg'
import { ReactComponent as NotiInfo } from '../../../assets/icons/noti-info.svg'
import { ReactComponent as NotiSuccess } from '../../../assets/icons/noti-success.svg'
import { ReactComponent as NotiWarn } from '../../../assets/icons/noti-warn.svg'
import { ReactComponent as NotiError } from '../../../assets/icons/noti-error.svg'
import { ReactComponent as CBChecked } from '../../../assets/icons/cb-checked.svg'
import { ReactComponent as CBUncheck } from '../../../assets/icons/cb-uncheck.svg'
import { ReactComponent as AddPrimary } from '../../../assets/icons/add-primary.svg'
import { ReactComponent as RemoveBlack } from '../../../assets/icons/remove-black.svg'

export const ICON_SET: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  'eyes-hide': EyesHide,
  'eyes-show': EyesShow,
  'arrow-left': ArrowLeft,
  'recruit-job-posting': RecruitJobPosting,
  'recruit-chat': RecruitChat,
  'recruit-calendar': RecruitCalendar,
  'recruit-search': RecruitSearch,
  'setting-company': SettingCompany,
  'setting-recruitment': SettingRecruitment,
  'setting-onboard': SettingOnboard,
  'setting-team-mgt': SettingTeamMgt,
  'nav-menu': NavMenu,
  notification: Notification,
  arrow: Arrow,
  'arrow-down': ArrowDown,
  'arrow-down-black': ArrowDownBlack,
  'arrow-down-white': ArrowDownWhite,
  'arrow-down-primary': ArrowDownPrimary,
  'grid-item-active': GridItemActive,
  'grid-item-inactive': GridItemInactive,
  'list-item-active': ListItemActive,
  'list-item-inactive': ListItemInactive,
  search: Search,
  settings: Settings,
  'circle-arrow-right': CircleArrowRight,
  'edit-job': EditJobBlack,
  'find-candidates': FindCandidatesBlack,
  'share-job': ShareJobBlack,
  'remove-job': RemoveJobBlack,
  'job-tick': JobTick,
  'job-uncheck': JobUncheck,
  'job-checking': JobChecking,
  'job-tick-black': JobTickBlack,
  'clock-grey': ClockGrey,
  'salary-grey': SalaryGrey,
  'map-grey': MapGrey,
  'edit-job-primary-600': EditJobPrimary600,
  'noti-info': NotiInfo,
  'noti-success': NotiSuccess,
  'noti-warn': NotiWarn,
  'noti-error': NotiError,
  'cb-checked': CBChecked,
  'cb-uncheck': CBUncheck,
  'add-primary': AddPrimary,
  'remove-black': RemoveBlack,
}
