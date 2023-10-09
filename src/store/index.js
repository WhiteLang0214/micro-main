import { createStore } from 'vuex';
import { state } from './state';
import { getters  } from './getters';
import { mutations } from './mutations';
import oldSys from "./modules/oldSys";

export default createStore({
  state,
  getters,
  mutations,
  modules: {
    oldSys
  }
})