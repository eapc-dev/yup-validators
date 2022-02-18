import isEAN from 'validator/lib/isEAN'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringEANProps extends IStringProps {}

export const isStringEAN = (props?: IIsStringEANProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isEAN(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_ean',
        }),
      })
    }

    return schema
  }
}
