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
import MonthlyIcon from './MonthlyIcon';
import AnualIcon from './AnualIcon';
import ReportDataIcon from './ReportDataIcon';
import TerraceIcon from './TerraceIcon';
import AppTrackerIcon from './AppTrackerIcon';
import DoctorsIcon from './DoctorsIcon';
import CompaniesIcon from './CompaniesIcon';
import MapIcon from './MapIcon';
import NotificationIcon2 from './NotificationIcon2';
import FilterIcon from './FilterIcon';
import CustomerIcon from './CustomerIcon';
import BoxIcon from './BoxIcon';
import TimeIcon from './TimeIcon';
import DescriptionIcon from './DescriptionIcon';

interface allIconsProps {
  name: string;
  className: string;
}
const AllIcons: React.FC<allIconsProps> = ({
  name,
  className
}) => {
  const icons = {
    AnualIcon,
    AppTrackerIcon,
    AppointmentIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    BackIcon,
    BoxIcon,
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
    CompaniesIcon,
    CreatePosIcon,
    CrossIcon,
    CustomerIcon,
    DashboardIcon,
    DeleteIcon,
    DescriptionIcon,
    DoctorsIcon,
    DownloadIcon,
    EarthIcon,
    EventIcon,
    ExclamationErrorIcon,
    FilterIcon,
    HomeIcon,
    KeyIcon,
    LocationIcon,
    MapIcon,
    MedicalIcon,
    MenuIcon,
    MonthlyIcon,
    NotificationIcon,
    NotificationIcon2,
    LogoutIcon,
    PencilIcon,
    PeopleIcon,
    PersonIcon,
    PlusIcon,
    ReportDataIcon,
    ReportIcon,
    SalesIcon,
    SaveIcon,
    SearchIcon,
    SettingsIcon,
    TerraceIcon,
    TimeIcon,
    TrophyIcon,
    UploadIcon,
    WorldIcon,
  }
  const Icon = icons[name as keyof typeof icons] || icons["CloseIcon"];
  return <Icon className={className}/>;
}
export default AllIcons;
