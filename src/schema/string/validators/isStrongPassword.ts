import isStrongPassword from 'validator/lib/isStrongPassword'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isStrongPassword>

export interface IIsStringStrongPassword extends IStringProps {
  options?: TParameters[1]
}

export const isStringStrongPassword = (props?: IIsStringStrongPassword): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isStrongPassword(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_strong_password' },
          {
            ...options,
          }
        ),
      })
    }

    return schema
  }
}
