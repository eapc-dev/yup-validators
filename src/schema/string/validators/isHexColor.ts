import isHexColor from 'validator/lib/isHexColor'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringHexColorProps extends IStringProps {}

export const isStringHexColor = (props?: IIsStringHexColorProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isHexColor(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_hexcolor_color',
        }),
      })
    }

    return schema
  }
}
