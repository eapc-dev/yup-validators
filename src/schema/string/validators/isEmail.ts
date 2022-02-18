import isEmail from 'validator/lib/isEmail'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isEmail>

export interface IIsStringAlphanumericEmail extends IStringProps {
  options?: TParameters[1]
}

export const isStringEmail = (props?: IIsStringAlphanumericEmail): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isEmail(value, options)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_an_email' }),
      })
    }

    return schema
  }
}
