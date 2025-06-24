// Imports
import { initializeApp, handleUnload, getUserLocation } from "./scripts/utils/events";

import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css'

document.addEventListener('DOMContentLoaded', () => {
  flatpickr("#datepicker", {
    dateFormat: "m/d/Y",
    minDate: "today",
    defaultDate: "today"
  })
})

initializeApp()
handleUnload()
getUserLocation()

