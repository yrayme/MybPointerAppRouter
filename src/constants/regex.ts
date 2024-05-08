export const ONLY_CHARACTERS_REGEX = /^[a-zA-Z\s]+$/;
export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9\s]+$/;
export const ONLY_NUMBERS_REGEX = /^[0-9]+$/;
export const ROOM_REGEX = /^Room \d+\/[A-Za-z\s]+$/;

export const PHONE_NUMBER =
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const PASSWORD = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*\W).{8,10}$/;

export const PHONENUMBER = /^[+]{1,2}[0-9].{9,13}$/;

export const HOURS_REGEX = /^(?:[0-9]|1[0-9]|2[0-3])$/;
export const MINUTES_REGEX = /^(?:[0-9]|[1-5][0-9]|59)$/;
