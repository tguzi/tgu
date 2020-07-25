/* eslint-disable no-unused-vars */
import merge from 'lodash/merge'
import { FetchConfig, RequestMethod, Handlers, ResponseType } from './typings'
import InterceptorManager from './InterceptorManager'

export default class FetchUtil {
  private defaults: FetchConfig
  /**
   * @description 请求方法
   */
  public RequestMethod = RequestMethod

  /**
   * @description 拦截器
   */
  public interceptors: {
    request: InterceptorManager
    response: InterceptorManager
  }

  constructor(config: FetchConfig) {
    this.defaults = config
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }

  /**
   * @description 设置config
   */
  public setConfig = (config: FetchConfig) => {
    this.defaults = merge(this.defaults, config)
  }

  /**
   * @description init config
   */
  private initConfig = (config: FetchConfig) => {
    const config2: FetchConfig = merge(this.defaults, config)
    if (!config2.method) {
      config2.method = RequestMethod.GET
    }
    if (!RequestMethod[config2.method]) {
      throw new Error(`Request type ${config2.method} does not exist`)
    }
    if (!config2.url) {
      throw new Error('Request URL cannot be empty')
    }
    /**
     * 设置 headers 为 Headers 对象
     */
    config2.headers = new Headers(config.headers)

    if (config2.params) {
      let url: string = config2.url
      const param = this.parseParamKey(config2.params)
      if (url && url.indexOf('?') !== -1) {
        url += `&${param}`
      } else {
        url += `?${param}`
      }
      config2.url = url
    }
    return config2
  }

  /**
   * @description URL参数编码
   */
  public parseParamKey = (param: any, key?: string): string => {
    let paramStr = ''
    if (['string', 'number', 'boolean'].indexOf(typeof param) !== -1) {
      paramStr += `&${key}=${encodeURIComponent(param)}`
    } else {
      for (const i in param) {
        if (Object.prototype.hasOwnProperty.call(param, i)) {
          const element = param[i]
          const k =
            key == null ? i : key + (param instanceof Array ? '' : `.${i}`)
          paramStr += `&${this.parseParamKey(element, k)}`
        }
      }
    }
    return paramStr.substr(1)
  }

  /**
   * @description feth request请求
   */
  public request = (config: FetchConfig) => {
    const config2: FetchConfig = this.initConfig(config)
    const chain: any[] = [this.dispatchRequest, undefined]
    let promise = Promise.resolve(config2)
    this.interceptors.request.forEach((interceptor: Handlers) => {
      if (interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected)
      }
    })
    this.interceptors.response.forEach((interceptor: Handlers) => {
      if (interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected)
      }
    })
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }
    return Promise.race([
      promise,
      new Promise((resolve, reject) => {
        const timeout = config.timeout !== undefined ? config.timeout : 5000
        let start = 0
        let timer: number
        const step = (timestamp: number) => {
          if (!start) {
            start = timestamp
          }
          const progress = timestamp - start
          if (progress > timeout) {
            // 终止请求
            // controller.abort();
            cancelAnimationFrame(timer)
            const err: any = new Error('请求超时')
            err.code = 500
            reject(err)
          } else {
            timer = requestAnimationFrame(step)
          }
        }
        if (timeout) {
          timer = requestAnimationFrame(step)
        }
      }),
    ])
  }

  private dispatchRequest = (config: FetchConfig) => {
    const {
      url,
      baseURL = '',
      body,
      headers,
      transformRequest,
      timeout = 1000 * 5,
      responseType,
      ...payload
    } = config
    if (!url) {
      throw new Error('Request URL cannot be empty')
    }
    return fetch(baseURL + url, {
      ...payload,
      body: body,
      headers: new Headers(headers),
    }).then((response) => {
      if (response.ok) {
        if (responseType === ResponseType.json) {
          return response.json()
        } else if (responseType === ResponseType.text) {
          return response.text()
        } else if (responseType === ResponseType.arraybuffer) {
          return response.arrayBuffer()
        } else if (responseType === ResponseType.blob) {
          return response.blob()
        } else if (responseType === ResponseType.formData) {
          return response.formData()
        }
        return response.json()
      }
      const error: any = new Error()
      error.res = response.json()
      throw error
    })
  }
}
