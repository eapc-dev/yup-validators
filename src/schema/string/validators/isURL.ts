import isURL from 'validator/lib/isURL'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isURL>

export interface IIsStringURL extends IStringProps {
  options?: TParameters[1]
}

export const isStringURL = (props?: IIsStringURL): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isURL(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_an_url' },
          {
            ...options,
            protocols: options?.protocols?.join(','),
            host_whitelist: options?.host_whitelist?.map((e) => e.toString()).join(', '),
            host_blacklist: options?.host_blacklist?.map((e) => e.toString()).join(', '),
          }
        ),
      })
    }

    return schema
  }
}
