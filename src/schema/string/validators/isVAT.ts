import isVAT from 'validator/lib/isVAT'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isVAT>

export interface IIsStringVAT extends IStringProps {
  countryCode: TParameters[1]
}

export const isStringVAT = (props: IIsStringVAT): TStringValidatorResult => {
  const { countryCode, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isVAT(value, countryCode)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_vat_number' },
          { countryCode }
        ),
      })
    }

    return schema
  }
}
