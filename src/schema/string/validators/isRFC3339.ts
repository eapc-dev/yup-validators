import isRFC3339 from 'validator/lib/isRFC3339'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringRFC3339Props extends IStringProps {}

export const isStringRFC3339 = (props?: IIsStringRFC3339Props): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isRFC3339(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_rfc3339_date',
        }),
      })
    }

    return schema
  }
}
