import isHSL from 'validator/lib/isHSL'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringHSLProps extends IStringProps {}

export const isStringHSL = (props?: IIsStringHSLProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isHSL(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_hsl_color',
        }),
      })
    }

    return schema
  }
}
