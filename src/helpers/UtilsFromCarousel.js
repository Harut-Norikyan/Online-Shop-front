// eslint-disable-next-line import/no-named-as-default,import/extensions
import Api from '../Api.js';

class Utils {
  static fileUrl(url) {
    if (!url) return url;

    if (!/https?:\/\//.test(url) && !url.toString().includes(';base64,')) {
      try {
        url = JSON.parse(url);
      } catch (e) {
        //
      }
      return `${Api.url}/uploads/${url}`;
    }

    return url;
  }
}

export default Utils;
