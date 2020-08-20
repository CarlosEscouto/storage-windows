import StorageManager from './StorageManager';
import { generateId, getLastScore } from './support/index'

export class WindowsManager extends StorageManager {

  /**
   *
   * @private
   * @memberof ManagerWindows
   */
  createWindow(group: string) {
    let windows = this.loadStorage();

    const id = `${group}_${generateId(windows)}`;

    windows[id] = getLastScore(windows);

    this.persistStorage(windows)
  }

  /**
   *
   *
   * @param {string} key
   * @returns
   * @memberof ManagerWindows
   */
  getWindow(id: string) : number | undefined {
    let windows = this.loadStorage();

    if (windows[id] !== undefined) return windows[id];
  }

  /**
   *
   *
   * @param {string} group
   * @returns {Array<string>}
   * @memberof WindowsManager
   */
  getWindowsGroup(group: string): Array<string> {
    let windows = this.loadStorage();

    return Object.keys(windows).filter((window: string) => {
      if (group === window.split('_')[0]) {
        return true;
      }
    });
  }

  /**
   *
   *
   * @returns {(Array<string> | void)}
   * @memberof WindowsManager
   */
  getAllWindows(): Array<string> | void {
    let windows: Object = this.loadStorage();

    if (windows === undefined) return;

    return Object.keys(windows).map((window: string) => {
      return window;
    })
  }

  /**
   *
   *
   * @returns {string}
   * @memberof WindowsManager
   */
  getActiveWindow(): string {
    let id = '';
    let lastScore = 0;
    let windows: Object = this.loadStorage();

    Object.values(windows).map((score: number) => {
      lastScore = (score > lastScore) ? score : lastScore
    })

    for(var key in windows) {
      if(windows[key] === lastScore && windows.hasOwnProperty(key)) {
        id = key;
      }
    }

    return id;
  }

  /**
   *
   *
   * @param {string} id
   * @returns
   * @memberof WindowsManager
   */
  setActiveWindow(id: string) {
    let windows = this.loadStorage();
    let lastScore: number = 1;

    if (windows[id] === undefined || this.getActiveWindow() === id) return;

    for(var key in windows) {

      if(windows[key] > windows[id]) {
        lastScore = (windows[key] > lastScore) ? windows[key] : lastScore
        windows[key] = windows[key] - 1;
      }
    }

    windows[id] = lastScore; 

    this.persistStorage(windows);
  }

  /**
   *
   *
   * @param {string} id
   * @returns
   * @memberof WindowsManager
   */
  setStandByWindow(id: string): void {
    let windows = this.loadStorage();

    if (windows[id] === undefined || windows[id] === 1) return;

    for(var key in windows) {
      if(windows[key] < windows[id] && windows.hasOwnProperty(key)) {
        windows[key] = windows[key] + 1;
      }
    }

    windows[id] = 1;

    this.persistStorage(windows);
  }

  /**
   *
   *
   * @param {string} id
   * @returns
   * @memberof WindowsManager
   */
  deleteWindow(id: string) {
    let windows = this.loadStorage();

    if (windows[id] === undefined) return;

    for(var key in windows) {
      if(windows[key] > windows[id] && windows.hasOwnProperty(key)) {
        windows[key] = windows[key] - 1;
      }
    }

    delete windows[id];

    this.persistStorage(windows);
  }

  /**
   *
   *
   * @param {string} group
   * @memberof WindowsManager
   */
  deleteWindowsGroup(group: string) {
    let windows = this.loadStorage();

    const windowsIds = Object.keys(windows).filter((window: string) => {
      return group === window.split('_')[0];
    });

    windowsIds.forEach((windowId: string) => {
      for(var key in windows) {
        if(windows[key] > windows[windowId]) {
          windows[key] = windows[key] - 1;
        }
      }
      delete windows[windowId];
    })

    this.persistStorage(windows);
  }

  /**
   *
   *
   * @memberof WindowsManager
   */
  deleteAllWindows() {
    this.persistStorage({});
  }

}
