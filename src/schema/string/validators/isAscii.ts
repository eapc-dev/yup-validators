import isAscii from 'validator/lib/isAscii'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringAsciiProps extends IStringProps {}

export const isStringAscii = (props?: IIsStringAsciiProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isAscii(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_ascii' }),
      })
    }

    return schema
  }
}
