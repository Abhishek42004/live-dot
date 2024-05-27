export class ActionUri {
  constructor() {
    this.app = null;
    console.log("Uri loaded");
  }

  initialize(app) {
    this.app = app;
    console.log("Uri initiated");
  }

  // Method to unbuild an encoded URI back into an object
  unbuildEncodedUri(request) {
    var uriFragment = request.split("&"),
      data = {},
      i,
      parts;
    for (i = 0; i < uriFragment.length; i++) {
      parts = uriFragment[i].split("=");
      if (parts.length < 2) {
        parts.push("");
      }
      data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
    return data;
  }

  // Method to unbuild an encoded URL into a JSON object, dividing it into fragments
  unbuildEncodedUrl(url) {
    const urlObj = new URL(url);
    const fragments = {
      protocol: urlObj.protocol,
      host: urlObj.host,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash || "#/",
      params: this.unbuildEncodedUri(urlObj.search.substring(1)),
    };

    return fragments;
  }
  // Method to get the current URL from the address bar
  getCurrentUrl() {
    if (typeof window === "undefined") {
      console.error("This method can only be used in a browser environment.");
      return null;
    }
    console.log("url fetched");
    return window.location.href;
  }

  updateHash(hash) {
    console.log(hash);
    window.location.hash = hash;
  }

  extractComponentsFromUrl(url) {
    const regex = /#\/([^?]+)\??([^#]*)/;
    const match = url.match(regex);

    if (!match) return null;

    const [, path, queryString] = match;
    const params = {};

    if (queryString) {
      const queryParams = queryString.split('&');
      queryParams.forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
      });
    }
    console.log(path);

    return {
      path: path ,
      params: params
    };
  }
}


