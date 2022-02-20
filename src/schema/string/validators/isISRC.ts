import isISRC from 'validator/lib/isISRC'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringISRCProps extends IStringProps {}

export const isStringISRC = (props?: IIsStringISRCProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isISRC(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_isrc',
        }),
      })
    }

    return schema
  }
}
