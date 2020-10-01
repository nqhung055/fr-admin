/* FR Admin Module */

import { fDLOMAM, fDLOMAM2016, fDLOFM, fDLOFM2019, fDLOJan, fDLOJan2018, fDLOYTD, fDLORT, fDLO, fDetectionLogsOnline1, fDetectionLogsOffline } from "./data";

const state = {
    fDLOMAM,
    fDLOMAM2016,
    fDLOFM,
    fDLOFM2019,
    fDLOJan,
    fDLOJan2018,
    fDLOYTD,
    fDLORT,
    fDLO,
    fDetectionLogsOnline1,
    fDetectionLogsOffline
}

// getters
const getters = {
    fDLOMAM: state => { return state.fDLOMAM; },
    fDLOMAM2016: state => { return state.fDLOMAM2016; },
    fDLOFM: state => { return state.fDLOFM; },
    fDLOFM2019: state => { return state.fDLOFM2019; },
    fDLOJan: state => { return state.fDLOJan; },
    fDLOJan2018: state => { return state.fDLOJan2018; },
    fDLOYTD: state => { return state.fDLOYTD; },
    fDLORT: state => { return state.fDLORT; },
    fDLO: state => { return state.fDLO; },
    fDetectionLogsOnline1: state => { return state.fDetectionLogsOnline1; },
    fDetectionLogsOffline: state => { return state.fDetectionLogsOffline; }
 }

// actions
const actions = {
    onDeleteDetectionLog(context, payload) {
        context.commit("onDeleteDetectionLog", payload);
    }
}

// mutations
const mutations = {
    onDeleteProductFromCart(state, payload) {
        let index = state.cart.indexOf(payload);
        state.cart.splice(index, 1);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}