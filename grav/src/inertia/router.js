export const navigationEvent = 'grav:navigate';

export function normalizeUrl(url = '/') {
  const target = new URL(url, window.location.origin);
  return `${target.pathname}${target.search}${target.hash}`;
}

export function buildUrl(url = window.location.pathname, data = {}) {
  const target = new URL(url, window.location.origin);

  Object.entries(data || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      target.searchParams.delete(key);
      return;
    }

    target.searchParams.set(key, value);
  });

  return normalizeUrl(target.toString());
}

function currentState() {
  return window.history.state?.gravState || {};
}

function notifyNavigation(url, state) {
  window.dispatchEvent(new CustomEvent(navigationEvent, {
    detail: { url, state },
  }));
}

function replaceHistoryState(url, state) {
  window.history.replaceState(
    { ...(window.history.state || {}), gravState: state },
    '',
    url,
  );
  notifyNavigation(url, state);
}

export const router = {
  visit(url, options = {}) {
    const nextUrl = normalizeUrl(url);
    const nextState = options.state ?? currentState();
    const historyState = {
      ...(window.history.state || {}),
      gravState: nextState,
    };

    if (options.replace) {
      window.history.replaceState(historyState, '', nextUrl);
    } else {
      window.history.pushState(historyState, '', nextUrl);
    }

    notifyNavigation(nextUrl, nextState);
  },

  get(url, data = {}, options = {}) {
    this.visit(buildUrl(url, data), options);
  },

  post(url, data = {}, options = {}) {
    void data;
    notifyNavigation(normalizeUrl(url), options.state ?? currentState());
  },

  patch(url, data = {}, options = {}) {
    void data;
    notifyNavigation(normalizeUrl(url), options.state ?? currentState());
  },

  delete(url, data = {}, options = {}) {
    void data;
    notifyNavigation(normalizeUrl(url), options.state ?? currentState());
  },

  replace(url, options = {}) {
    replaceHistoryState(normalizeUrl(url), options.state ?? currentState());
  },
};
