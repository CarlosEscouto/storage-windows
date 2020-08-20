import { isEmpty } from '@kernel-js/support';

export default class StorageManager{

  /**
   *
   *
   * @param {Object} windows
   * @memberof StorageManager
   */
  persistStorage(windows: Object) {
    window.localStorage.setItem('platafoor-windows', `${JSON.stringify(windows)}`);
    window.dispatchEvent(new window.StorageEvent('storage'));
  }

  /**
   *
   *
   * @returns {Object}
   * @memberof StorageManager
   */
  loadStorage(): Object {
    let windows = <string> window.localStorage.getItem('platafoor-windows');

    if (isEmpty(windows)) windows = '{}';

    return JSON.parse(windows);
  }

}