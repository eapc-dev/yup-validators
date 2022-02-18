import isPassportNumber from 'validator/lib/isPassportNumber'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isPassportNumber>

export interface IIsStringPassportNumber extends IStringProps {
  countryCode?: TParameters[1]
}

export const isStringPassportNumber = (props?: IIsStringPassportNumber): TStringValidatorResult => {
  const { countryCode, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isPassportNumber(value, countryCode)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_passport_number' },
          { countryCode }
        ),
      })
    }

    return schema
  }
}
