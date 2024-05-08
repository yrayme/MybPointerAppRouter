export const Roles = {
    seller: process.env.NEXT_PUBLIC_MYBPOINTER_ROLE_SELLER, 
    manager: process.env.NEXT_PUBLIC_MYBPOINTER_ROLE_MANAGER, 
    admin: process.env.NEXT_PUBLIC_MYBPOINTER_ROLE_ADMIN, 
    promotor: process.env.NEXT_PUBLIC_MYBPOINTER_ROLE_PROMOTOR, 
    director: process.env.NEXT_PUBLIC_MYBPOINTER_ROLE_DIRECTOR, 
    adminPlatform: process.env.NEXT_PUBLIC_MYBPOINTER_ROLE_ADMIN_PLATFORM, 
    coordinator: process.env.NEXT_PUBLIC_MYBPOINTER_ROLE_COORDINATOR, 
}


export const colorsHome= {
    green: "#88C946",
    purple: "#9A25B4",
    yellow: "#FFCC00",
    orange: "#F58A07",
    green_light: "#29B9B9",
    pink: "#E1448B",
    blue: "#00AAE4",
    red: "#CE2D4F",
    gray: "#DEDEDE"
}

//------------------CALENDAR PERMISSIONS---------------//
export const rolesNotDisabledAppointment = [Roles.seller];
export const rolesDisabledEvent = [Roles.coordinator];
export const rolesEditAndDeleteEvents = [Roles.coordinator];
export const rolesAssignEvents = [Roles.seller];
export const rolesApproveEvents = [Roles.coordinator];
export const rolesCreateDeleteAppointment = [Roles.seller];
export const rolesRequestEvents = [Roles.seller, Roles.manager];
export const rolesAssignSellersEvents = [Roles.manager, Roles.director, Roles.admin];
export const rolesNotEvents = [Roles.director, Roles.admin];
export const rolesCreateAppointmentSeller = [Roles.promotor];
export const rolesViewsAppointment = [Roles.seller, Roles.promotor, Roles.director, Roles.admin];

export const eventsType = {
    appointment: process.env.NEXT_PUBLIC_MYBPOINTER_APPOINTMENT,
    pos: process.env.NEXT_PUBLIC_MYBPOINTER_POS,
    posActivity: process.env.NEXT_PUBLIC_MYBPOINTER_POS_ACTIVITY
}

export const statusRequestEvent = {
    pending: process.env.NEXT_PUBLIC_MYBPOINTER_PENDING,
    approved: process.env.NEXT_PUBLIC_MYBPOINTER_APPROVED,
    declined: process.env.NEXT_PUBLIC_MYBPOINTER_DECLINED,
}

export const viewGoalsManagers = [Roles.admin, Roles.director];
export const viewGoalsVendedor = [Roles.manager]
//---------------------------------------------------------------//

export const typeMenu = {    
    dashboard: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_DASHBOARD,
    calendar: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_CALENDAR,
    appointment_tracker: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_TRACKER,
    goals: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_GOALS,
    locations: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_LOCATIONS,
    cross_sales: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_CROSS,
    sales: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_SALES,
    users: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_USERS,    
    sellers: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_USERS_SELLERS,
    managers: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_USERS_MANAGERS,
    companies: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_USERS_COMPANIES,
    directors: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_USERS_DIRECTORS,
    admin: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_USERS_ADMIN,
    promotors: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_USERS_PROMOTORS,
    coordinators: process.env.NEXT_PUBLIC_MYBPOINTER_MENU_USERS_COORDINATOR,
}

export const timerTime = process.env.NEXT_PUBLIC_MYBPOINTER_TIMER ? parseInt(process.env.NEXT_PUBLIC_MYBPOINTER_TIMER) : 5