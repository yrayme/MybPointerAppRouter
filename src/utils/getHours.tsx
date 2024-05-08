import moment from "moment";

export const getHoursUTC = (date: Date | number ) => {  
    const dateUTC = new Date(date); 
    dateUTC.setUTCHours(dateUTC.getUTCHours() + 4);
    return dateUTC;
}

export const getHourFormatRequest = (date: Date | string | undefined, time: Date) => {
    const dateFormat = moment(date).format("MM-DD-YYYY");
    const timeFormat = moment(time).format("hh:mma");
    const dateInit = moment(`${dateFormat} ${timeFormat}`, 'MM-DD-YYYY hh:mma');
    const dateInitFormat = dateInit.format('YYYY-MM-DD HH:mm:ss');
    return dateInitFormat;
}

export const getHoursLabel = (date: Date | number) => {
    const dateFormat = getDateCalendar(date);
    const dateHours = moment(dateFormat);
    const hours = dateHours.format('h:mm A');
    return hours;
}

export const getDateCalendar = (date: Date | number) => {
    const dateFormat = new Date(date);
    const day = dateFormat.getUTCDate();
    const month = dateFormat.getUTCMonth();
    const year = dateFormat.getUTCFullYear();
    const hour = dateFormat.getUTCHours();
    const minute = dateFormat.getUTCMinutes();
    return new Date(year, month, day, hour, minute);
}