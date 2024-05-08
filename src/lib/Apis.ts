'use server';

import { AddAdministratorForm, AddCoordinatorsForm, AddDirectorForm, AddManagerForm, AddPromotorsForm, AddSellerForm, AllCalendarResponse, AllLocationResponse, AppointmentByStatusResponse, AppointmentEventResponse, AppointmentRequest, ApproveEventRequest, AssignEventRequest, CitiesResponse, CompanyRequest, CompanyUpdateRequest, CreateGoalsRequest, DeclineEventRequest, DirectorByIDResponse, ForgotPasswordForm, GeneralCreateResponse, GeneralUpdateResponse, GoalManagerResponse, GoalSellerResponse, ListsResponse, LocationForm, LoginInterface, LoginResponse, LogoutResponse, PosActivityRequest, PosRequest, QrCodeResponse, ResetPasswordRequest, ResponseSales, ResponseUsers, SalesRequest, SalesResponse, SelectLists, StatesResponse, UpdateAppointmentRequest, UpdateEventRequest, UpdateGoalsRequest } from '@/interfaces';
import { auth, signIn, signOut } from '../../auth';
import instance from './AxiosConfig';
import { revalidatePath } from 'next/cache';
import { User } from 'next-auth';

export const login = async (formdata: { email: string, password: string, redirectTo: string }) => {
  return await signIn("credentials", formdata)
}

export const logout = async () => {
  return await signOut({ redirectTo: "/auth/login" });
}

export const isLoggedIn = async () => {
  const session = await auth();
  return session;
}

export const getLogin = async (data: LoginInterface): Promise<LoginResponse> => {
  return await instance().post(`/users/login`, data);
}

export const logoutUser = async(): Promise<LogoutResponse> => {
  return await instance().post("/users/logout");
}

export const forgotPassword = async(data: ForgotPasswordForm): Promise<LogoutResponse> => {
  return await instance().post("/users/request-reset-password", data);
}

export const verifyOtp = async(data: ResetPasswordRequest): Promise<LogoutResponse> => {
  return await instance().post(`/users/verify-otp`, data);
}

export const  getQrCode = async(token_email: string): Promise<QrCodeResponse> => {
  return await instance().get(`/users/get-otp-qrcode/${token_email}`);
}
export const activateAccount = async(data: ResetPasswordRequest, activate_account?: number | string): Promise<LogoutResponse> => {
  const path = activate_account ? `/${activate_account}` : "";
  return await instance().post(`/users/reset-password${path}`, data);
}

export const getCountries = async (): Promise<SelectLists[]> => {
  return await instance().get(`/country/all-countries`);
}

export const getStates = async (country_id: string | undefined | null): Promise<StatesResponse[]> => {
  return await instance().get(`/state/all-states/${country_id}`);
}

export const getCities = async (state_id: string | undefined | null): Promise<CitiesResponse[]> => {
  return await instance().get(`/city/all-cities/${state_id}`);
}

// DIRECTORS


// APPOINTMENT TRACKER
export const getStatusAppointment = async(): Promise<SelectLists[]> => {
  return  await instance().get(`/state_appointment/all-state-appointment`);
}

export const getAppointmentByStatus = async(searchName?: string): Promise<AppointmentByStatusResponse> => {
  const nameRequest = searchName ? `?client_name=${searchName}` : "";
  return await instance().get(`/appointment/get-appointment-by-status${nameRequest}`);
}


export const  updateAppointment = async(data: UpdateAppointmentRequest, id: string): Promise<AppointmentEventResponse> => {
  return await instance().put(`/appointment/update-appointment/${id}`, data);
}

export const deleteAppointment = async(id: string | undefined): Promise<AppointmentEventResponse> => {
  return await instance().get(`/appointment/remove-appointment/${id}`);
}


//SALES

export const getAllSales = async(page: number, limit: number, seller?: string, name?: string): Promise<ResponseSales> => {
  const sellerRequest = seller ? `?seller=${seller}` : "";
  const queryRequest = (name && seller) ? `${sellerRequest}&name=${name}` : name ? `?name=${name}` : sellerRequest;
  return await instance().get(`/sale/all-sale/${page}/${limit}${queryRequest}`);
}
export const createSale = async(data: SalesRequest): Promise<GeneralCreateResponse> =>  {
  const response =  await instance().post("/sale/create-sale", data) as GeneralCreateResponse;  
  revalidatePath('/sales', 'page');
  return response;
}
export const getIdSale = async(id: string | string[], token?: string): Promise<any>  => {
  if ( token ){
    const headers = {headers: {Authorization: `Bearer ${token}`}};
    const { data } = await instance().get(`/directo/find-director/${id}`, headers);
    return data
  }
  return await instance().get(`/directo/find-director/${id}`);
}

export const allProducts = async(page: number, limit: number, searchName?: string): Promise<ListsResponse> => {
  const nameRequest = searchName ? `/${searchName}` : "";
  return await instance().get(`/product/all-product/${page}/${limit}${nameRequest}`);
}

export const allResources = async(): Promise<SelectLists[]> => {
  return await instance().get(`/resource/all-resources`);
}

export const  getStatusEvent = async(): Promise<SelectLists[]> => {
  return instance().get(`/event_status/all-event-status`);
}
export const  getTypes = async(page: number, limit: number): Promise<ListsResponse> => {
  return instance().get(`/event_type/all-event-type/${page}/${limit}`);
}

export const allSellers = async(page: number, limit: number, searchName?: string, showNonActive?: boolean): Promise<ResponseUsers> => {
  const nameRequest = searchName ? `?name=${searchName}` : "";
  const queryRequest = showNonActive && searchName ? `${nameRequest}&show-non-active=true` : showNonActive ? "?show-non-active=true" : nameRequest;
  return instance().get(`/seller/all-seller/${page}/${limit}${queryRequest}`);
}


//CALENDAR

export const  allCalendar = async(date: string, status?: string, seller?: string): Promise<AllCalendarResponse> =>{
  const dateRequest = date ? `?date=${date}` : "";
  const statusRequest = status ? `?date=${date}&status=${status}` : `${dateRequest}`;
  const sellerRequest = seller ? `?date=${date}&seller=${seller}` : `${dateRequest}`;
  const queryRequest = status ? statusRequest : seller ? sellerRequest : dateRequest;
  return await instance().get(`/calendar/all-calendar${queryRequest}`);
}

export const allDayCalendar = async(date: string, status?: string, seller?: string): Promise<AllCalendarResponse> =>{
  const dateRequest = date ? `?date=${date}` : "";
  const statusRequest = status ? `?date=${date}&status=${status}` : `${dateRequest}`;
  const sellerRequest = seller ? `?date=${date}&seller=${seller}` : `${dateRequest}`;
  const queryRequest = status ? statusRequest : seller ? sellerRequest : dateRequest;
  return await instance().get(`/calendar/day-calendar${queryRequest}`);
}

export const deleteEvent = async(id: string): Promise<AppointmentEventResponse> => {
  return await instance().get(`/event/remove-event/${id}`);
}

export const assignEvent = async(data: AssignEventRequest): Promise<AppointmentEventResponse> => {
  return await instance().post("/event/assign-event", data);
}

export const approveEvent = async(data: ApproveEventRequest): Promise<AppointmentEventResponse> => {
  return await instance().post("/event/approve-request-event", data);
}


export const declineRequestEvent= async (data: DeclineEventRequest): Promise<AppointmentEventResponse> => {
  return await instance().post(`/event/decline-request-event`, data);
}

export const updateEvent = async(data: UpdateEventRequest, id: string): Promise<AppointmentEventResponse> => {
  return await instance().put(`/event/update-event/${id}`, data);
}

export const getAllEventAssignedUser = async(userId: string): Promise<SelectLists[]> => {
  return await instance().get(`/event/all-event-assigned-user/${userId}`);
}


export const createAppointment = async(data: AppointmentRequest): Promise<AppointmentEventResponse> => {
  return await instance().post("/appointment/create-appointment", data);
}
// export const getAppointmentId(id: string): Promise<any> {
//   return await instance().post(`/appointment/find-appointment/${id}`);
// }

export const createPos = async(data: PosRequest, promotor: number): Promise<AppointmentEventResponse> => {
  const promotorRequest = promotor ? `/${promotor}` : "";
  return await instance().post(`/event/create-event${promotorRequest}`, data);
}
export const createPosActivity = async(data: PosActivityRequest, promotor: number): Promise<AppointmentEventResponse> => {
  const promotorRequest = promotor ? `/${promotor}` : "";
  return await instance().post(`/event/create-event-activity${promotorRequest}`, data);
}

// USERS

export const createDirector = async (data: AddDirectorForm): Promise<GeneralCreateResponse> => {
  return await instance().post("/directo/create-director", data);
}
export const updateDirector = async (data: AddDirectorForm, id: string | undefined): Promise<GeneralUpdateResponse> => {
  return await instance().post(`/directo/update-director/${id}`, data);
}

export const allPromotors = async(page: number, limit: number, searchName?: string, showNonActive?: boolean): Promise<ResponseUsers> => {
  const nameRequest = searchName ? `/${searchName}` : "";
  const queryRequest = showNonActive && searchName ? `${nameRequest}?show-non-active=true` : showNonActive ? "?show-non-active=true" : nameRequest;
  return await instance().get(`/promotor/all-promotor/${page}/${limit}${queryRequest}`);
}

export const getIdDirector = async(id: string | string[], token?: string): Promise<DirectorByIDResponse> => {
  if ( token ){
    const headers = {headers: {Authorization: `Bearer ${token}`}};
    const { data } = await instance().get(`/directo/find-director/${id}`, headers);
    return data
  }
  return await instance().get(`/directo/find-director/${id}`);
}
export const deleteDirector = async(id: string): Promise<GeneralUpdateResponse> => {
  return await instance().get(`/directo/remove-director/${id}`);
}

export const createSeller = async(data: AddSellerForm): Promise<GeneralCreateResponse> => {
  return await instance().post("/seller/create-seller", data);
}
export const updateSeller = async(data: AddSellerForm, id: string | undefined): Promise<GeneralUpdateResponse> => {
  return await instance().post(`/seller/update-seller/${id}`, data);
}
export const getIdSeller = async(id: string | string[], token?: string): Promise<User> => {
  if ( token ){
    const headers = {headers: {Authorization: `Bearer ${token}`}};
    const { data } = await instance().get(`/seller/find-seller/${id}`, headers);
    return data
  }
  return await instance().get(`/seller/find-seller/${id}`);
}
export const deleteSeller = async(id: string): Promise<GeneralUpdateResponse> => {
  return await instance().get(`/seller/remove-seller/${id}`);
}

export const allManagers = async(page: number, limit: number, showNonActive?: boolean): Promise<ResponseUsers> => {
  const showNonActiveRequest = showNonActive ? `?showNonActive=true` : "";
  return await instance().get(`/gerent_seller/all-gerent-seller/${page}/${limit}${showNonActiveRequest}`);
}
export const createManager = async(data: AddManagerForm): Promise<GeneralCreateResponse> => {
  return await instance().post("/gerent_seller/create-gerent_seller", data);
}
export const updateManager = async(data: AddManagerForm, id: string | undefined): Promise<GeneralUpdateResponse> => { 
  delete data.id;
  return await instance().post(`/gerent_seller/update-gerent-seller/${id}`, data);
}
export const getIdManager = async(id: string): Promise<User> => {
  return await instance().get(`/gerent_seller/find-gerent-seller/${id}`);
}
export const deleteManager = async(id: string): Promise<GeneralUpdateResponse> => {
  return await instance().get(`/gerent_seller/remove-gerent-seller/${id}`);
}

export const allCompanies = async(page: number, limit: number): Promise<ResponseUsers> => {
  return await instance().get(`/company/all-company/${page}/${limit}`);
}
export const createCompany = async(data: CompanyRequest): Promise<GeneralCreateResponse> => {
  return await instance().post("/company/create-company", data);
}
export const updateCompany = async(data: CompanyUpdateRequest, id: string | undefined): Promise<GeneralUpdateResponse> => {
  return await instance().post(`/company/update-company/${id}`, data);
}
export const getIdCompany = async(id: string | string[], token?: string): Promise<any> => {
  if ( token ){
    const headers = {headers: {Authorization: `Bearer ${token}`}};
    const { data } = await instance().get(`/company/find-company/${id}`, headers);
    return data
  }
  return await instance().get(`/company/find-company/${id}`);
}
export const deleteCompany = async(id: string): Promise<GeneralUpdateResponse> => {
  return await instance().get(`/company/remove-company/${id}`);
}

export const allAdminCompany = async(page: number, limit: number, showNonActive?: boolean): Promise<ResponseUsers> => {
  const showNonActiveRequest = showNonActive ? `?show-non-active=true` : "";
  return instance().get(`/admin_company/all-admin-company/${page}/${limit}${showNonActiveRequest}`);
}
export const createAdminCompany = async(data: AddAdministratorForm): Promise<GeneralCreateResponse> => {
  return await instance().post("/admin_company/admin-company-create", data);
}
export const updateAdminCompany = async(data: AddAdministratorForm, id: string | undefined): Promise<GeneralUpdateResponse> => {
  delete data.id;
  return await instance().post(`/admin_company/update-admin-company/${id}`, data);
}
export const getIdAdminCompany = async(id: string): Promise<User> => {
  return await instance().get(`/admin_company/find-admin-company/${id}`);
}
export const deleteAdminCompany = async(id: string): Promise<GeneralUpdateResponse> => {
  return await instance().get(`/admin_company/remove-admin-compan/${id}`);
}

export const createPromotor = async(data: AddPromotorsForm): Promise<GeneralCreateResponse> => {
  return await instance().post("/promotor/create-promotor", data);
}
export const updatePromotor = async(data: AddPromotorsForm, id: string | undefined): Promise<GeneralUpdateResponse> => {
  delete data.id;
  return await instance().post(`/promotor/update-promotor/${id}`, data);
}
export const getIdPromotor = async(id: string): Promise<User> => {
  return await instance().get(`/promotor/find-promotor/${id}`);
}
export const deletePromotor = async(id: string): Promise<GeneralUpdateResponse> => {
  return await instance().get(`/promotor/remove-promotor/${id}`);
}

export const createLocation = async(data: LocationForm): Promise<GeneralCreateResponse> => {
  return await instance().post("/location/create-location", data);
} 
export const allLocation = async(page: number, limit: number, searchName: string): Promise<AllLocationResponse> => {
  const nameRequest = searchName ? `/${searchName}` : "";
  return await instance().get(`/location/all-location/${page}/${limit}${nameRequest}`);
}
export const updateLocation = async(data: LocationForm, id: string): Promise<GeneralCreateResponse> => {
  return await instance().put(`/location/update-location/${id}`, data);
}     
export const deleteLocation = async(id: string): Promise<GeneralCreateResponse> => {
  return await instance().get(`/location/remove-location/${id}`,);
}   

export const allCoordinators = async(page: number, limit: number): Promise<ResponseUsers> => {
  return await instance().get(`/sales_coordinator/all-sales-coordinator/${page}/${limit}`);
}
export const createCoordinator = async(data: AddCoordinatorsForm): Promise<GeneralCreateResponse> => {
  return await instance().post("/sales_coordinator/create-sales-coordinator", data);
}
export const updateCoordinator = async(data: AddCoordinatorsForm, id: string | undefined): Promise<GeneralUpdateResponse> => {
  delete data.id;
  return await instance().post(`/sales_coordinator/update-sales-coordinator/${id}`, data);
}
export const getIdCoordinator = async(id: string): Promise<User> => {
  return await instance().get(`/sales_coordinator/find-sales-coordinator/${id}`);
}
export const deleteCoordinator = async(id: string): Promise<GeneralUpdateResponse> => {
  return await instance().get(`/sales_coordinator/remove-sales-coordinator/${id}`);
}   

export const getEntityType = async(): Promise<SelectLists[]> => {
  return await instance().get("/entity_type/all-entity-type");
}

//Goals 
export const allGoalsSellers = async(page: number, limit: number, dateInit?: string, dateEnd?: string,  manager?: string, name?: string): Promise<GoalSellerResponse> => {
  const dateRequest = dateInit && dateEnd ? `?date_init=${dateInit}&date_end=${dateEnd}` : "";
  const managerRequest = manager ? `${dateRequest}&sales_manager=${manager}` : dateRequest;
  const queryRequest = name ? `${managerRequest}&name=${name}` : manager ? managerRequest : dateRequest;
  return await instance().get(`/goal/all-goals-sales-manager/${page}/${limit}${queryRequest}`);
}
export const createGoal = async(data: CreateGoalsRequest): Promise<GeneralCreateResponse> => {
  return await instance().post("/goal/create-goal", data);
}
export const updateGoal = async(data: UpdateGoalsRequest, id: string): Promise<GeneralCreateResponse> => {
  return await instance().put(`/goal/update-goal/${id}`, data);
}
export const allGoalsManager = async(page: number, limit: number, dateInit?: string, dateEnd?: string, name?: string): Promise<GoalManagerResponse> => {
  const dateRequest = dateInit && dateEnd ? `?date_init=${dateInit}&date_end=${dateEnd}` : "";
  const nameRequest = name ? `${dateRequest}&name=${name}` : `${dateRequest}`;
  return await instance().get(`/goal/all-goals-admin/${page}/${limit}${nameRequest}`);
}
export const getFindSaleClient = async(id: string): Promise<SalesResponse> => {
  return await instance().get(`/sale/find-sale/${id}`);
}

export const allDirector = async(page: number, limit: number): Promise<ResponseUsers> =>{
  return await instance().get(`/directo/all-director/${page}/${limit}`);
}