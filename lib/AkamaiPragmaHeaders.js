/**
 * A Helper class to manipulate Akamai HTTP Pragma headers.
 */
class AkamaiPragmaHeaders {

  
  /**
   * Default constructor.
   *
   * @param {Response} response - a Puppeteer Response class instance (see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-response)
   */
  constructor(response) {
    this.response = response;
  }


  /**
   * Modify a Page to use Akamai Pragma header when sending HTTP request.
   *
   * @param Page a Page object as defined in Puppeteer (see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page)
   */
  static addPragmaHeaders(page) {
    page.setExtraHTTPHeaders({'Pragma': 'akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key, akamai-x-get-ssl-client-session-id, akamai-x-get-true-cache-key, akamai-x-get-request-id, x-akamai-cpi-trace, akamai-x-tapioca-trace, akamai-x-get-extracted-values'});
  }


  getPragmaHeader(hdrName) {
    return this.response.headers()[hdrName];
  }

  getXCacheHeader() {
    return this.getPragmaHeader('x-cache');
  }

  /**
   * Parse a HTTP response and return the Pragma header X-Cache-Key.
   *
   * Example of X-Cache-Key header:
   * x-cache-key: S/L/1234/123456/3d/org-www.mydomain.com/homepage?param1=alpha
   *
   * @return String the value of the X-Cache-Key HTTP header, or an empty string if the header could not be found.
   */
  getXCacheKey() {
    return this.getPragmaHeader('x-cache-key');
  }

  /**
   * Return how the object has been handled by first Edge server.
   *
   * Example of X-Cache header:
   * x-cache: TCP_MEM_HIT from a23-200-87-112.deploy.akamaitechnologies.com (AkamaiGHost/9.5.0.2-23811872) (-)
   *
   * @return TCP field of X-Cache header or an empty string if the X-Cache header could not be found
   */
  getXCacheTCP() {
    var xCache = this.getXCacheHeader();
    if (xCache != undefined)
      return xCache.split(' ')[0];
    return '';
  }

  /**
   * Return the CP Code returned in X-Cache-Key header (if the header is present).
   *
   * @return String the CP Code found, or an empty string if the header could not be found.
   */
  getCPCode() {
    var xCacheKey = this.getXCacheKey();
    if (xCacheKey != undefined)
      return xCacheKey.split('/')[3];
    return '';
  }

  getTTL() {
    var xCacheKey = this.getXCacheKey();
    if (xCacheKey != undefined)
      return xCacheKey.split('/')[4];
    return '';
  }

  /**
   * @return String return the Cache Key from the X-Cache-Key header
   */
  getCacheKey() {
    var xCacheKey = this.getXCacheKey();
    if (xCacheKey != undefined)
      return xCacheKey.split('/')[5];
    return '';
  }

}

module.exports = AkamaiPragmaHeaders;


