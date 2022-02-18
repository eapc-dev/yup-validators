import isBase64 from 'validator/lib/isBase64'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isBase64>

export interface IIsStringBase64Props extends IStringProps {
  options?: TParameters[1]
}

export const isStringBase64 = (props?: IIsStringBase64Props): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isBase64(value, options)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_base64' }),
      })
    }

    return schema
  }
}
