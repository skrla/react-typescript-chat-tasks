import moment from "moment";

export default function convertTime(date: string) {
  return moment().format("llll");
}
