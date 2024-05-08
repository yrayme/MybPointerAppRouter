import React from 'react'
import WorldIcon from './WorldIcon';
import ExclamationErrorIcon from './ExclamationErrorIcon';
import DashboardIcon from './DashboardIcon';
import CloseIcon from './CloseIcon';
import ArrowDownIcon from './ArrowDownIcon';
import ArrowUpIcon from './ArrowUpIcon';
import LogoutIcon from './LogoutIcon';
import ChatIcon from './ChatIcon';
import NotificationIcon from './NotificationIcon';
import MenuIcon from './MenuIcon';
import CalendarIcon from './CalendarIcon';
import PeopleIcon from './PeopleIcon';
import TrophyIcon from './TrophyIcon';
import UploadIcon from './UploadIcon';
import AppointmentIcon from './AppointmentIcon';
import SettingsIcon from './SettingsIcon';
import CheckIcon from './CheckIcon';
import DeleteIcon from './DeleteIcon';
import PlusIcon from './PlusIcon';
import PencilIcon from './PencilIcon';
import BackIcon from './BackIcon';
import PersonIcon from './Person';
import KeyIcon from './KeyIcon';
import CameraIcon from './CameraIcon';
import CheckCircleIcon from './CheckCircleIcon';
import CheckCircleOutlineIcon from './CheckCircleOutlineIcon';
import BuildingIcon from './BuildingIcon';
import EarthIcon from './EarthIcon';
import SaveIcon from './SaveIcon';
import DownloadIcon from './DownloadIcon';
import LocationIcon from './LocationIcon';
import SearchIcon from './SearchIcon';
import SalesIcon from './SalesIcon';
import CloseCircleOutlineIcon from './CloseCircleOutlineIcon';
import HomeIcon from './HomeIcon';
import CalendarIcon2 from './CalendarIcon2';
import ReportIcon from './ReportIcon';
import CreatePosIcon from './CreatePosIcon';
import EventIcon from './EventIcon';
import MedicalIcon from './MedicalIcon';
import CrossIcon from './CrossIcon';

interface allIconsProps {
  name: string;
  className: string;
}
const AllIcons: React.FC<allIconsProps> = ({
  name,
  className
}) => {
  const icons = {
    AppointmentIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    BackIcon,
    BuildingIcon,
    CalendarIcon,
    CalendarIcon2,
    CameraIcon,
    ChatIcon,
    CheckIcon,
    CheckCircleIcon,
    CheckCircleOutlineIcon,
    CloseIcon,
    CloseCircleOutlineIcon,
    CreatePosIcon,
    CrossIcon,
    DashboardIcon,
    DeleteIcon,
    DownloadIcon,
    EarthIcon,
    EventIcon,
    ExclamationErrorIcon,
    HomeIcon,
    KeyIcon,
    LocationIcon,
    MedicalIcon,
    MenuIcon,
    NotificationIcon,
    LogoutIcon,
    PencilIcon,
    PeopleIcon,
    PersonIcon,
    PlusIcon,
    ReportIcon,
    SalesIcon,
    SaveIcon,
    SearchIcon,
    SettingsIcon,
    TrophyIcon,
    UploadIcon,
    WorldIcon,
  }
  const Icon = icons[name as keyof typeof icons] || icons["CloseIcon"];
  return <Icon className={className}/>;
}
export default AllIcons;
