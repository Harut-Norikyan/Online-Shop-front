class Account {
  static get() {
    try {
      return JSON.parse(localStorage.getItem('account')) || {};
    } catch (e) {
      return {};
    }
  }

  static set(data) {
    localStorage.setItem('account', JSON.stringify(data));
  }
}

export default Account;

