import isJSON from 'validator/lib/isJSON'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringJSON extends IStringProps {}

export const isStringJSON = (props?: IIsStringJSON): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isJSON(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_a_json' }),
      })
    }

    return schema
  }
}
