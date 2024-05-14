import { FC, ReactNode } from "react";
import { DropResult } from "react-beautiful-dnd";
import { DateLocalizer, NavigateAction, SlotInfo, ToolbarProps, View } from "react-big-calendar";
import { UseFormRegister } from "react-hook-form";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";

export interface ID {
  $oid: string;
}
export interface InputProps {
  textArea?: boolean;
  type?: string;
  id?: string | number | undefined;
  name: string;
  onChangeCustom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCustomSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeCustomTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register?: UseFormRegister<any>;
  customPlaceholder?: any;
  error?: any | undefined;
  label?: any;
  rightClick?: () => void;
  rightIcon?: string | undefined;
  options?: any[];
  textDefaultValue?: string;
  action?: FC;
  checked?: boolean;
  className?: string;
  onChangeCustomValue?: (e: string) => void;
  helperText?: string;
  disabled?: boolean;
}


export interface SelectProps {
  name: string;
  label?: string;
  values: { title?: string | number; value?: string | number; name?: string; last_name?: string; _id?: { $oid: string } }[] | undefined;
  register?: UseFormRegister<any>;
  IconLeft?: string;
  placeholder?: any;
  value?: string;
  onChangeCustom?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isCustomRounded?: boolean;
}

export type ButtonStyleType =
  | "primary"
  | "secondary"
  | "link"
  | "linkSecondary"
  | "outlined"
  | "gray"
  | "red"
  | "error"

export type ButtonPaddingSizeType = "small" | "medium" | "large";

export interface ButtonProps {
  href?: string;
  ButtonStyle: ButtonStyleType;
  ButtonPaddingSize?: ButtonPaddingSizeType;
  type?: "button" | "submit" | "reset";
  className?: string;
  full?: boolean;
  isCustomRounded?: boolean;
  title: string | undefined;
  iconLeft?: string;
  colorIcon?: string;
  fontColor?: string;
}

export interface IconProps {
  src: string;
  width?: string;
  height?: string;
  className?: string;
  originalSize?: boolean;
  color?: string | undefined;
}

export interface CheckBoxProps {
  checkboxValues: boolean[] | [];
  setCheckboxValues: React.Dispatch<React.SetStateAction<[] | boolean[]>>;
  multiple?: boolean;
  bold?: boolean;
  nameId?: string;
  setValue?: any;
}

export type ModalTitleStyles =
  | "success"
  | "error";

export interface ModalProps {
  isOpen: boolean;
  titleStyles: ModalTitleStyles;
  title: string,
  description: string;
  routeBack: string;
  buttonAccept: boolean;
  buttonCancel: boolean;
  buttonAcceptLabel?: string;
  buttonCancelLabel?: string;
  onButtonAcceptClicked?: () => void;
  onButtonCancelClicked?: () => void;
  function?: () => void;
}

export interface SidebarProps {
  pages: MenuItems[];
  mobile?: boolean;
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
}

export interface IndicatorsProps {
  id: number;
  name: string;
  value: string;
  gauge?: string;
}

export interface PosProps {
  data: PosDataProps[];
  title: string;
  pos?: boolean | undefined;
}

export interface PosDataProps {
  name: string;
  id: number;
  date: string;
  img?: string;
}

export interface OpenSubmenu {
  [key: string]: boolean;
}

export type PaginationProps = {
  pagActual: number;
  setPagActual: any;
  total: number | undefined;
  takeCount: number;
};

export interface AddSellerForm {
  name: string;
  last_name: string;
  email: string;
  san_number: string;
  npm_number: string;
  phone_number: string;
  superior_role_id: string;
  type_rol?: string;
}

export interface AddCompanyForm {
  agency: AgencyProps;
  bussiness: BussinessProps;
  shipping: ShippingProps;
  email: string;
  checkboxWebsite?: boolean;
}

interface BussinessProps {
  agency: string;
  street: string;
  poBox: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

interface ShippingProps {
  shippingYesOrNo: string;
  agencyShipping?: string;
  streetShipping?: string;
  poBoxShipping?: string;
  countryShipping?: string;
  stateShipping?: string;
  cityShipping?: string;
  zipShipping?: string;
}

interface AgencyProps {
  tax: string;
  legalName: string;
  primaryPhone: string;
  secondPhone: string;
  fax: string;
  contact: string;
  npn: string;
  san: string;
  radioYesOrNo: string;
  typeEntity: string;
}

export interface CompanyRequest {
  federal_tax_id: string;
  agency_full_legal: string;
  primary_phone: string;
  secondary_phone: string;
  agency_name: string;
  street: string;
  po_box: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  agency_name_shippimg?: string | undefined;
  street_shippimg?: string | undefined;
  po_box_shippimg?: string | undefined;
  country_shippimg?: string | undefined;
  state_shippimg?: string | undefined;
  city_shippimg?: string | undefined;
  zip_shippimg?: string | undefined;
  email: string;
  entity_type: string;
  agency_npn: string;
  agency_san: string;
  contact_name: string;
  is_agency_used_other_name: boolean;
  has_agency_website: boolean | undefined;
  fax: string;
}
export interface CompanyUpdateRequest {
  secondary_phone: string;
  fax: string;
  street: string;
  po_box: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  street_shippimg: string | undefined;
  po_box_shippimg: string | undefined;
  country_shippimg: string | undefined;
  state_shippimg: string | undefined;
  city_shippimg: string | undefined;
  zip_shippimg: string | undefined;
  email: string;
  is_agency_used_other_name: boolean;
  has_agency_website: boolean | undefined;
  agency_name: string;
  agency_name_shippimg: string | undefined;
}
export interface LayoutUsersProps {
  onClickAdd: () => void;
  routeEdit?: string;
  users: ResponseUsers | undefined;
  pagActual: number;
  setPagActual: any;
  getDelete: (id: string, name: string) => void;
  getEdit?: any;
  text?: string;
  onClickEdit?: () => void;
  isLoading?: boolean;
  refetch?: any;
  takeCount: number;
  company?: boolean;
}

export interface ResponseUsers {
  items: User[];
  total: number;
}
export interface User {
  _id: ID;
  email: string;
  date_joined: {
    $date: number;
  };
  type_rol: string;
  active: boolean;
  name: string;
  last_name: string;
  phone_number: string;
  code?: string;
  npn_number?: string;
  npm_number?: string;
  san_number: string;
  manager?: string;
  superior_role_id: string;
  federal_tax_id?: string;
  agency_full_legal?: string;
  primary_phone?: string;
  secondary_phone?: string;
  agency_name?: string;
  street?: string;
  po_box?: string;
  country?: CityItem | undefined;
  state?: CityItem;
  city?: CityItem;
  zip?: string;
  agency_name_shippimg?: string;
  street_shippimg?: string;
  po_box_shippimg?: string;
  country_shippimg?: CityItem;
  state_shippimg?: CityItem;
  city_shippimg?: CityItem;
  zip_shippimg?: string;
  entity_type?: CityItem;
  agency_npn?: string;
  agency_san?: string;
  contact_name?: string;
  is_agency_used_other_name: boolean;
  has_agency_website: boolean;
  fax?: string;
}

export interface UserWithoutCompany {
  _id: ID;
  email: string;
  date_joined: {
    $date: number;
  };
  type_rol: string;
  active: boolean;
  name: string;
  last_name: string;
  phone_number: string;
  code?: string;
  npn_number: string;
  npm_number: string;
  san_number: string;
  manager?: string;
  superior_role_id: string;
}
export interface ResponseTypes {
  items: Types[] | undefined;
  total: number;
}
export interface Types {
  _id: ID;
  name: string;
}

export interface AddManagerForm {
  id?: string;
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
  type_rol?: string;
}

export interface TableProps {
  name: string;
  body: BodyProps | LocationState | undefined;
  pagActual: number;
  setPagActual: any;
  getDelete: (data: any) => void;
  getEdit: (data: any) => void;
  goal?: boolean;
  valueGoal?: { [key: string]: string };
  onchangeInput?: (value: string, id: string) => void | undefined;
  takeCount: number;
  targetRef?: any;
  handleSubmitGoal?: (data: (ItemGoalManager & ItemGoalSeller)) => void;
  disabled?: boolean;
}

interface BodyProps {
  items: any[];
  total: number;
}


export interface AddDirectorForm {
  name: string;
  last_name: string;
  country_id: string;
  state_id: string;
  email: string;
  city_id: string;
  phone_number: string;
  type_rol?: string;
}


export interface ProfileSettingForm {
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  address: string;
}

export interface PasswordSettingForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Columns {
  roles: { id: string; name: string }[];
  goalManagers: { id: string; name: string }[];
  [key: string]: any;
}

export interface InputFilterProps {
  label?: string;
  icon: string;
  data: FilterData[];
}

export interface FilterData {
  id: number;
  img?: string;
  name: string;
}

export interface ClientForm {
  id?: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  productSold: string;
  previousProduct: string;
  mrbi: string;
  date: Date;
  status: string;
}

export interface AddAdministratorForm {
  id?: string;
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
  san_number: string;
  type_rol?: string;
}

export interface AddPromotorsForm {
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
  type_rol?: string;
  id?: string;
}

export interface AddCoordinatorsForm {
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
  type_rol?: string;
  id?: string;
}


export interface LocationForm {
  name: string;
  id_country: string;
  id_state: string;
  id_city: string;
  address: string;
}

export interface AppointmentForm {
  name: string;
  address: string;
  product: string;
  status: string;
  date?: string | undefined;
  note: string;
  timeStart: any;
  timeEnd: any;
  email: string;
  event?: string;
}

export interface PosForm {
  name: string;
  // address: string;
  location: string;
  contactName: string;
  numberPeople: string;
  phoneNumber: string;
  timeStart: any;
  timeEnd: any;
  date: Date;
  promotor?: string;
  seller?: string;
  dateLabel?: string;
}

export interface ItemsActivityForm {
  id?: string | undefined;
  quantity?: string | undefined;
  check?: boolean;
}
export interface PosActivityForm {
  assemblyDate: Date;
  timeAssembly: any;
  disassemblyDate: Date;
  timeDisassembly: any;
  items?: ItemsActivityForm[];
}
interface DateRange {
  startDate?: Date | null;
  endDate?: Date | null;
}

interface ArrayDates {
  dateRange: DateRange;
  time: string;
}

export interface ModalEventsProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  activity?: boolean;
  stepActivity?: boolean;
  steps?: any[];
  onChangeStep: (index: number, active: boolean) => void;
  session?: any;
  pos?: boolean;
  refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
  refetchDay?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
}

export interface ModalPromotorProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  edit?: User | null;
  setDataEdit?: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
}
export interface ModalCoordinatorProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  edit?: any;
  refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
}

export interface ModalCalendarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
  refetchDay?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
  events: AllCalendarResponse | undefined;
  promotor?: string;
}

export interface AppointmentRequest {
  id_type?: string;
  client_name: string;
  email: string;
  address: string;
  status: string;
  note: string;
  id_product: string;
  date_init: string;
  date_end: string;
  assigned_user: string;
}

export interface PosRequest {
  id_user: string;
  name: string;
  location: string;
  contact_name: string;
  phone_number: string;
  expect_number_people: number;
  date_init: string;
  date_end: string;
  promotor?: string;
}

export interface PosActivityRequest {
  id_user: string;
  name: string;
  location: string;
  contact_name: string;
  phone_number: string;
  expect_number_people: string;
  date_init: string;
  date_end: string;
  promotor?: string;
  assembly_date: string,
  disassembly_date: string,
  resources: any[]
}

export interface AssignEventRequest {
  event_id: string;
  assigned_user_id: string;
}
export interface ApproveEventRequest {
  event_id: string;
  promotor: string | undefined;
}

export interface UpdateEventRequest {
  location: string;
  date_init: string;
  date_end: string;
}

export interface UpdateAppointmentRequest {
  status: string;
  date_init?: string;
  date_end?: string;
}
export interface AppointmentProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  type?: string;
  refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
  refetchDay?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
  appointment?: boolean;
  events?: AllCalendarResponse | undefined;
  promotor?: string;
}

export interface DeclineEventRequest {
  event_id: string;
}
// export interface Task {
//   id: string;
//   product: string;
//   customer_name: string;
//   date: string;
// }

export interface Column {
  id: string;
  title: string;
  name: string;
  tasks: Appointment[];
  total: number;
  idStatus: string;
  color: string;
}


export interface TaskData {
  tasks: Record<string, Appointment>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

export interface TaskProps {
  task: Appointment;
  index: number;
  color: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDataEdit: React.Dispatch<React.SetStateAction<DataAppointment>>;
}

export interface ColumnProps {
  column: Column,
  tasks: Appointment[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDataEdit: React.Dispatch<React.SetStateAction<DataAppointment>>;
}

export interface AllCalendarEvents {
  _id?: ID;
  type?: Product;
  client_name?: string;
  name?: string;
  email?: string;
  address?: string;
  status?: Product;
  note?: string;
  product?: Product;
  date_init?: DateJoinedClass;
  date_end?: DateJoinedClass;
  assigned_user?: EdUser | User;
  created_user?: EdUser | User;
  is_approved_by_client?: boolean;
  title?: string;
  start?: Date | number | undefined;
  end?: Date | number | undefined;

  event_status?: Product;
  location?: LocationCalendar;
  contact_name?: string;
  phone_number?: string;
  expect_number_people?: number;
  promotor?: ApproveOrRejectUser;
  // created_user?:            User;
  resources?: Resource[];
  // assigned_user?:          User;
  assembly_date?: DateEnd;
  disassembly_date?: DateEnd;
  request_event_status?: Product;
  requester_user?: User;
  approve_or_reject_user?: ApproveOrRejectUser;
}
export interface AllCalendarResponse {
  events?: MyEventCalendarProps[];
  appoimets?: Appointment[];
}
export interface Appointment {
  _id: ID;
  type: Product;
  name?: string;
  client_name: string;
  email: string;
  address: string;
  status: Product;
  note: string;
  product: Product;
  date_init: DateJoinedClass;
  date_end: DateJoinedClass;
  date_init1?: DateAppointment;
  date_end1?: DateAppointment;
  assigned_user: EdUser;
  created_user: EdUser;
  is_approved_by_client: boolean;
  title?: string;
  start?: Date;
  end?: Date;
}

export interface DateAppointment {
  $date: string;
}
export interface EdUser {
  _id: ID;
  email: string;
  type_rol: string;
  name: string;
  last_name: string;
  phone_number: string;
  superior_role_id: string;
  san_number: string;
  npm_number: string;
}

export interface DateEnd {
  $date: Date | number;
}
export interface Product {
  _id: ID;
  name: string;
}

export interface MyEventCalendarProps {
  _id: ID;
  type: Product;
  event_status: Product;
  name: string;
  client_name: string;
  location: LocationCalendar;
  contact_name: string;
  phone_number: string;
  expect_number_people: number;
  date_init: DateEnd;
  date_end: DateEnd;
  promotor?: ApproveOrRejectUser;
  created_user: User;
  resources: Resource[];
  assigned_user?: User;
  assembly_date?: DateEnd;
  disassembly_date?: DateEnd;
  request_event_status?: Product;
  requester_user?: User;
  approve_or_reject_user?: ApproveOrRejectUser;
  title?: string;
  start?: Date;
  end?: Date;
}
export interface ApproveOrRejectUser {
  _id: ID;
  email: string;
  type_rol: string;
  name: string;
  last_name: string;
  phone_number: string;
}
export interface Resource {
  id: string;
  quantity?: string;
}
export interface LocationCalendar {
  _id: ID;
  name: string;
  address: string;
  country?: Product;
  state?: Product;
  city?: Product;
}
export interface FieldProps {
  onChange: (value: any) => void;
  onBlur: () => void;
  name: string;
  ref?: React.Ref<any>;
  value: any;
  disabled?: boolean;
}

export interface SelectLists {
  _id: {
    $oid: string | any;
  };
  name: string;
  quantity?: boolean;
  year?: number;
  category?: string;
}

export interface ComboBoxAutocompleteProps {
  label?: string;
  defaultValue?: any;
  onChange?: (e: any) => void;
  customSelected?: (e: any) => string;
  name?: string;
  error?: any;
  disabled?: boolean;
  placeHolder?: string;
  selectedValue?: number | string;
  getData: (e: string) => Promise<any[]>;
  queryKey: string;
  customIcon?: (e: any) => ReactNode;
  customIconLeft?: (e: any) => ReactNode;
  filter?: boolean;
  product?: boolean;
  value?: string;
}

export interface Location {
  _id: ID;
  name: string;
  address: string;
  date_joined: Date;
  country: string | undefined;
  state: string | undefined;
  city: string | undefined;
  actions: boolean;
  id_city: string | undefined;
  id_country: string | undefined;
  id_state: string | undefined;
}

export interface DataAccessRol {
  items: AccessDataSetting[];
  total: number;
}
export interface AccessDataSetting {
  access: string;
  actions: boolean;
  id: number;
  role: string;
}
export interface SubmenuAccessSetting {
  id: number;
  name: string;
  check: boolean;
}

export interface MenuItemsSetting {
  name: string;
  icon: string;
  check: boolean;
  submenu?: SubmenuAccessSetting[];
}

export interface DataEvents {
  data: AllCalendarEvents | SlotInfo | null;
  newEvent: boolean | undefined;
}

export interface ActionsEvents {
  data: MyEventCalendarProps;
  newEvent: boolean | undefined;
}

export interface ResponseResources {
  id: string | undefined;
  quantity: string | undefined;
}
export interface AppointmentEventResponse {
  Success: string;
  id: string;
}

export interface ListsResponse {
  items: SelectLists[];
  total: number;
}

export interface GeneralCreateResponse {
  Success: string;
  id: string;
}

export interface GeneralUpdateResponse {
  Success: string;
}

export interface DirectorByIDResponse {
  _id: ID;
  email: string;
  password: string;
  date_joined: DateJoined;
  type_rol: string;
  active: boolean;
  name: string;
  last_name: string;
  phone_number: string;
  country_id: string;
  state_id: string;
  city_id: string;
  secret_token: string;
}

export interface DateJoined {
  $date: number;
}

export interface AllCompaniesResponse {
  total: number;
  items: ItemCompany[];
}

export interface ItemCompany {
  _id: ID;
  federaltaxid: string;
  agencyfulllegal: string;
  primaryPhone: string;
  secondaryPhone: string;
  agencyname: string;
  street: string;
  pobox: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  email: string;
}

export interface LocationState {
  items: Location[],
  total: number;
}
export interface AllLocationResponse {
  total: number;
  items: ItemLocation[];
}

export interface ItemLocation {
  _id: ID;
  name: string;
  address: string;
  date_joined: DateJoinedClass;
  state?: CityItem;
  country?: CityItem;
  city?: CityItem;
}
export interface CityItem {
  _id: ID;
  name: string;
}

export interface DateJoinedClass {
  $date: number | Date;
}

export interface StatesResponse {
  _id: ID;
  name: string;
  country_id: ID;
}

export interface CitiesResponse {
  _id: ID;
  name: string;
  state_id: ID;
}

export interface ModalAppointmentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: any;
  dataEdit: DataAppointment;
  setDataEdit?: React.Dispatch<React.SetStateAction<DataAppointment>>;
}

export interface DrapDropProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDataEdit: React.Dispatch<React.SetStateAction<DataAppointment>>;
  state: TaskData;
  onDragEnd: (result: DropResult) => void;
}

export interface DataAppointment {
  data: Appointment | undefined | null;
  newEvent: boolean | undefined;
}

export interface AppointmentByStatusResponse {
  scheduled: Appointment[];
  recontact: Appointment[];
  "no-interest": Appointment[];
  "not-interested": Appointment[];
}

export interface Error {
  message: string;
  error?: string;
  status: number;
}

export interface SaleForm {
  id?: string;
  name: string;
  client?: string;
  phone: string;
  email: string;
  mrbi: string;
  date_eligibility: Date;
  date_eligibility_edit?: string;
  address: string;
  product_sold: string;
  // date_product_sold: Date,
  product_prev: string;
  from_where: string;
  id_product_sold?: string;
  date_sale?: string;
  date_sale1?: string
}

export interface CalendarComponentProps {
  defaultDate: Date;
  localizer: DateLocalizer;
  events: AllCalendarEvents[];
  getDates: (event: AllCalendarEvents | SlotInfo, newEvent: boolean) => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: DataEvents,
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
  refetchDay: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
  dataEvents: AllCalendarResponse | undefined;
  promotor?: string;
  handleNavigate?: ((newDate: Date, view: View, action: NavigateAction) => void) | undefined;
  date: Date;
  selectView: string;
  setSelectView: any;
  optionsView: { id: string; name: string, value: string, selected?: boolean }[];
}

export interface CardTodayProps {
  date: Date;
  data: AllCalendarResponse | undefined,
}

export interface ResponseSales {
  items: SalesResponse[];
  total: number;
  seller?: Seller | undefined;
}

export interface SalesRequest {
  sale_address: string;
  affiliated_name: string;
  phone_number: string;
  email: string;
  mrbi: string;
  affiliated_address: string;
  selled_product: string;
  previous_product: string;
  eligibility_date: string;
}

export interface SalesResponse {
  _id: ID;
  date_sale: DateSale;
  seller: Seller;
  sale_address: string;
  affiliated_name: string;
  phone_number: string;
  email: string;
  mrbi: string;
  affiliated_address: string;
  selled_product: SaleStatus;
  previous_product: string;
  eligibility_date: DateSale;
  sale_status: SaleStatus;
  id?: string;
  name?: string;
  client?: string;
  phone?: string;
  date_eligibility?: Date;
  date_eligibility_edit?: string;
  address?: string;
  product_sold?: string;
  product_prev?: string;
  from_where?: string;
  id_product_sold?: string;
  date_sale1?: string;
}

export interface DateSale {
  $date: number;
}

export interface SaleStatus {
  _id: ID;
  name: string;
}
export interface Seller {
  _id: ID;
  email: string;
  type_rol: string;
  name: string;
  last_name: string;
  phone_number: string;
  superior_role_id: string;
  san_number: string;
  npm_number: string;
}

export interface StateSales {
  items: SaleForm[];
  total: number;
  seller?: Seller;
}

export interface TooltipProps {
  text: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
}

export interface CreateGoalsRequest {
  quantity: number;
  assigned_user: string;
  date: string;
}

export interface UpdateGoalsRequest {
  quantity: number;
}

export interface GoalManagerResponse {
  total: number;
  items: ItemGoalManager[];
}

export interface ItemGoalManager {
  _id: ID;
  email: string;
  type_rol: string;
  name: string;
  last_name: string;
  phone_number: string;
  team_goal: number;
  goal?: ItemGoal;
  phone?: string;
  full_name?: string;
  goal_number?: number;
  color?: string;
  disabled?: boolean;
}
export interface ItemGoal {
  _id: ID;
  quantity: number;
  created_user: EdUser;
  assigned_user: EdUser;
  date: DateClass;
}
export interface DateClass {
  $date: Date;
}

export interface GoalSellerResponse {
  total: number;
  items: ItemGoalSeller[];
  monthly_goal_sales_manager: number;
  sales_manager: ItemDataManager;
}
export interface ItemDataManager {
  _id: ID;
  email: string;
  type_rol: string;
  name: string;
  last_name: string;
  phone_number: string;
}
export interface ItemGoalSeller {
  _id: ID;
  email: string;
  type_rol: string;
  name: string;
  last_name: string;
  phone_number: string;
  superior_role_id: string;
  san_number: string;
  npm_number: string;
  goal?: ItemGoal;
  phone?: string;
  full_name?: string;
  goal_number?: number;
  disabled?: boolean;
}

export interface ValueGol {
  [key: string]: string;
}

export interface RangeDate {
  selection: Selection;
}

export interface Selection {
  startDate: Date;
  endDate: Date;
  color: string;
  key: string;
  autoFocus: boolean;
}

export interface MenuItems {
  _id: ID;
  name: string;
  icon: string;
  color: string;
  routes?: string[];
  type_menu: string;
  subitems?: SubmenuSidebarProps[];
  submenu?: SubmenuSidebarProps[];
}


export interface SubmenuSidebarProps {
  _id: ID;
  type_menu: string;
  name: string,
  routes: string[],
}


// export interface MenuProps {  
//   name: string, 
//   icon: string, 
//   routes?: string[],
//   submenu?: SubmenuSidebarProps[]
// }

// export interface SubmenuSidebarProps {
//   name: string, 
//   id: number, 
//   routes: string[],
// }

export interface notificationCardProps {
  id: number;
  type: string;
  name: string;
  role?: string;
  message?: string;
  date: string
}