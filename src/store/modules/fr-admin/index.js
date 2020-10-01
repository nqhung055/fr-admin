/**
 * FR Dectection Logs Module
 */
/* import { detectionLogsFromAPI } from "./data"; */
import { detectionLogsFromAPI, fDetectionLogs } from "./data";

const state = {
   detectionLogsFromAPI,
   fDetectionLogs,
}

// getters
const getters = {
   detectionLogsFromAPI: state => {
      return state.detectionLogsFromAPI;
   },

   fDetectionLogs: state => {
      return state.fDetectionLogs;
   },
}

// actions
const actions = {
   onDeleteLog(context, payload) {
      context.commit("onDeleteLog", payload);
   }
}

// mutations
const mutations = {
   /* onDeleteLog(state, payload) {
      let index = state.detectionLogsFromAPI.indexOf(payload);
      state.detectionLogsFromAPI.splice(index, 1);
   }, */
}

export default {
   state,
   getters,
   actions,
   mutations,
}
