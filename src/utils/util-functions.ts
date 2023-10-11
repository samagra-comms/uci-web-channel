import moment from "moment";
import { User } from "../types";

export const getMonthInHindi = (date: User) => {
  if (date?.createdAt)
    switch (moment(date?.createdAt)?.month()) {
      case 0:
        return `${moment(date.createdAt).date()} जनवरी`;
      case 1:
        return `${moment(date.createdAt).date()} फरवरी`;
      case 2:
        return `${moment(date.createdAt).date()} मार्च`;
      case 3:
        return `${moment(date.createdAt).date()} अप्रैल`;
      case 4:
        return `${moment(date.createdAt).date()} मई`;
      case 5:
        return `${moment(date.createdAt).date()} जून`;
      case 6:
        return `${moment(date.createdAt).date()} जुलाई`;
      case 7:
        return `${moment(date.createdAt).date()} अगस्त`;
      case 8:
        return `${moment(date.createdAt).date()} सितम्बर`;
      case 9:
        return `${moment(date.createdAt).date()} अक्टूबर`;
      case 10:
        return `${moment(date.createdAt).date()} नवम्बर`;
      case 11:
        return `${moment(date.createdAt).date()} दिसम्बर`;
      default:
        return "अमान्य दिनांक";
    }
  else return "";
};

export const getShouldFilterTheList = () => {
  if (localStorage.getItem("filterList")) {
    return localStorage.getItem("filterList") === "True";
  }
  if (process.env.REACT_APP_FILTER_LIST) {
    return process.env.REACT_APP_FILTER_LIST === "True";
  }

  return true;
};
