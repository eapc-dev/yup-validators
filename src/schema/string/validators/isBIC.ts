import isBIC from 'validator/lib/isBIC'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringBICProps extends IStringProps {}

export const isStringBIC = (props?: IIsStringBICProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isBIC(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_bic' }),
      })
    }

    return schema
  }
}
