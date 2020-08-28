export default class ReducerSwitch {
  constructor() {
    this.callbacks = {};
    this.start = () => {};
    this.success = () => {};
    this.failure = () => {};
  }

  add(__case) {
    this.callbacks[`${__case}_START`] = this.start;
    this.callbacks[`${__case}_SUCCESS`] = this.success;
    this.callbacks[`${__case}_FAILURE`] = this.failure;
  }

  addOne(__case, fn) {
    this.callbacks[__case] = fn;
  }

  update(__case, fn) {
    this.callbacks[__case] = fn;
  }

  switch(action, ...args) {
    if (this.callbacks[action.type]) {
      return this.callbacks[action.type](action, ...args);
    }
    return args;
  }
}
