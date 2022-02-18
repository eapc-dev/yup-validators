import isLocale from 'validator/lib/isLocale'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringLocaleProps extends IStringProps {}

export const isStringLocale = (props?: IIsStringLocaleProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isLocale(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_locale',
        }),
      })
    }

    return schema
  }
}
