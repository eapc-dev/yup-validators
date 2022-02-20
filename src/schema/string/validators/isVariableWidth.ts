import isVariableWidth from 'validator/lib/isVariableWidth'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringVariableWidthProps extends IStringProps {}

export const isStringVariableWidth = (
  props?: IIsStringVariableWidthProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isVariableWidth(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_variable_width',
        }),
      })
    }

    return schema
  }
}
