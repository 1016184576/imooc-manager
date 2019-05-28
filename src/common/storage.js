/*
 * @Author: Wang Xiao
 * @Date: 2017-05-23 10:49:36
 * @Last Modified by: Wang Xiao
 * @Last Modified time: 2017-05-23 11:33:36
 */
const _storage = {}; // 本地变量后备

/**
 * 检测storage 是否可用
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function detect(type) {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * storage 类
 *
 * @class storage
 */
class storage {

  constructor(type = 'localStorage', prefix = '__IMOOC__') {
    this.prefix = prefix;
    this.type = type;
    this.enabled = detect(type);
    this.storage = window[type];

  }

  _fillPrefix(key) {
    if (key.indexOf(this.prefix) === 0) {
      return key;
    }

    return `${this.prefix}${key}`;
  }

  /**
   * 获取对应 key 的 value 值
   *
   * @param {any} key key名
   * @returns
   *
   * @memberof storage
   */
  get(key) {
    let obj;
    key = this._fillPrefix(key);

    if (this.enabled) {
      const value = this.storage.getItem(key);
      try {
        obj = JSON.parse(value);
      } catch (e) {
        obj = value;
      }
    } else {
      obj = _storage[key];
    }

    if (obj && obj.data) {
      if (!obj.expire || obj.expire > (new Date()).getTime()) {
        return obj.data;
      }
      this.remove(key);
    }
    return null;
  }

  /**
   * 设置key值
   *
   * @param {any} key key名
   * @param {any} value key值
   * @param {any} expire 过期时间，单位毫秒
   * @returns
   *
   * @memberof storage
   */
  set(key, value, expire) {
    const obj = {
      data: value
    };

    key = this._fillPrefix(key);

    if (expire && expire > 0) {
      obj.expire = (new Date()).getTime() + expire;
    }

    if (this.enabled) {
      this.storage.setItem(key, JSON.stringify(obj));
    } else {
      _storage[key] = obj;
    }
    return value;
  }

  /**
   * 返回所有的 keys
   *
   * @returns
   *
   * @memberof storage
   */
  getKeys() {
    let keys = [];
    let resultKeys = [];
    const prefixLength = this.prefix.length;

    if (this.enabled) {
      keys = Object.keys(this.storage);
    } else {
      keys = Object.keys(_storage);
    }

    keys.forEach((key) => {
      const index = key.indexOf(this.prefix);
      if (index === 0) {
        resultKeys.push(key.substring(prefixLength));
      }
    });

    return resultKeys;
  }

  /**
   * 删除对应的key
   *
   * @param {any} key
   *
   * @memberof storage
   */
  remove(key) {
    key = this._fillPrefix(key);
    if (this.enabled) {
      this.storage.removeItem(key);
    } else {
      delete _storage[key];
    }
  }

  /**
   * 删除所有 key
   *
   *
   * @memberof storage
   */
  removeAll() {
    const keys = this.getKeys();

    keys.forEach((key) => {
      this.remove(key);
    });
  }

  /**
   * 删除过期的key
   *
   *
   * @memberof storage
   */
  removeExpired() {
    const keys = this.getKeys();

    keys.forEach((key) => {
      this.get(key);
    });
  }
};


export default new storage();