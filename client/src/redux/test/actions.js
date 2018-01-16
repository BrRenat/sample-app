import { createAction } from 'redux-act'
import { createAjaxAction } from 'redux/ajax/action'

export const testRequestGet = createAjaxAction('Test request get', {
  url: ({ param }) => `/endpoint/${param}`,
  method: 'GET',
  transformConfig: ({ params, ...config }) => {
    // Remove eventId from params list
    const { param, ...otherParams } = params

    return {
      ...config,
      // Override params list (without eventId)
      params: otherParams,
      // Put eventId to url
      url: config.url({ param }),
    }
  },
})

export const testRequestPost = createAjaxAction('Test request post', {
  method: 'POST',
  url: '/endpoint',
})

export const testAction = createAction('Test action')

export const testRequestGetIsNeeded = createAction('Test request get master')
