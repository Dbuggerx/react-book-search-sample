declare module 'rxjs/ajax' {
  declare interface AjaxRequest {
    url?: string;
    body?: any;
    user?: string;
    async?: boolean;
    method?: string;
    headers?: Object;
    timeout?: number;
    password?: string;
    hasContent?: boolean;
    crossDomain?: boolean;
    withCredentials?: boolean;
    createXHR?: () => XMLHttpRequest;
    progressSubscriber?: any;
    responseType?: string;
  }

  declare class AjaxResponse {
    originalEvent: Event;
    xhr: XMLHttpRequest;
    request: AjaxRequest;
    /** @type {number} The HTTP status code */
    status: number;
    /** @type {string|ArrayBuffer|Document|object|any} The response data */
    response: any;
    /** @type {string} The raw responseText */
    responseText: string;
    /** @type {string} The responseType (e.g. 'json', 'arraybuffer', or 'xml') */
    responseType: string;
    constructor(originalEvent: Event, xhr: XMLHttpRequest, request: AjaxRequest): void;
  }

  declare interface AjaxCreationMethod {
    (urlOrRequest: string | AjaxRequest): rxjs$Observable<AjaxResponse>;
    get(url: string, headers?: Object): rxjs$Observable<AjaxResponse>;
    post(url: string, body?: any, headers?: Object): rxjs$Observable<AjaxResponse>;
    put(url: string, body?: any, headers?: Object): rxjs$Observable<AjaxResponse>;
    patch(url: string, body?: any, headers?: Object): rxjs$Observable<AjaxResponse>;
    delete(url: string, headers?: Object): rxjs$Observable<AjaxResponse>;
    getJSON<T>(url: string, headers?: Object): rxjs$Observable<T>;
  }

  declare var ajax: AjaxCreationMethod;
}
