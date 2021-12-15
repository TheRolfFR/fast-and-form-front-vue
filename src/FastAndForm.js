import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import merge from "deepmerge";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

/**
 * @typedef {Object} FFOptions
 * @property {Boolean} dark Puts fast and form components in dark mode
 * @property {Boolean} edit Sets in edit mode
 * @property {String} baseURL Backend root url for data manipulation
 * @property {Object[]} parameters Parameter file content objects
 * @property {Object} entities Entities objects
 */

const defaultOptions = {
  dark: false,
  edit: true,
  baseURL: undefined,
  parameters: [],
  entities: {},
};

export default {
  /**
   *
   * @param {import('vue')} Vue Vue instance
   * @param {FFOptions} options Install options
   */
  install(Vue, options) {
    if (!options) options = defaultOptions;
    else options = merge(defaultOptions, options);
    // Make BootstrapVue available throughout your project
    Vue.use(BootstrapVue);
    // Optionally install the BootstrapVue icon components plugin
    Vue.use(IconsPlugin);

    // add a global fast and form variable
    Vue.fastandform = {
      data: {
        entities: {},
        forms: {},
        locales: {},
        rules: {},
      },
      config: {
        edit: options.edit || defaultOptions.edit,
        dark: options.dark || defaultOptions.dark,
        baseURL: options.baseURL || defaultOptions.baseURL,
      },
    };

    // add methods
    /**
     * Entity setter
     * @param {String} name Entity name
     * @param {Object} entity Entity object
     */
    Vue.loadEntity = function (name, entity) {
      if (!name && !entity) return; // if non true, it's a safe return

      // else throw error if missing
      if (!name && entity.name) name = entity.name;
      if (!name) throw new Error("No name provided, got " + name);
      if (!entity) throw new Error("No object provided for " + name);

      this.fastandform.data.entities[name] = entity;
    };

    /**
     * Entity getter
     * @param {String} name Entity name searched
     * @returns Given entity with complete rules
     */
    Vue.getEntity = function (name) {
      if (!this.fastandform.data.entities[name])
        throw new Error("No object found for " + name);
      return this.fastandform.data.entities[name];
    };

    /**
     *
     * @param {Object} parameters Parameters object
     */
    Vue.loadParameters = function (parameters) {
      let keys;
      if (parameters.entities) {
        keys = Object.keys(parameters.entities);
        keys.forEach((k) => {
          Vue.loadEntity(k, parameters.entities[k]);
        });
      }
    };

    options.parameters.forEach((par) => {
      Vue.loadParameters(par);
    });

    Object.keys(options.entities).forEach((k) => {
      Vue.loadEntity(k, options.entities[k]);
    });
  },
};