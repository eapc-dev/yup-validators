import isPostalCode from 'validator/lib/isPostalCode'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isPostalCode>

export interface IIsStringPostalCode extends IStringProps {
  locale: TParameters[1]
}

export const isStringPostalCode = (props: IIsStringPostalCode): TStringValidatorResult => {
  const { locale, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isPostalCode(value, locale)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_postal_code' },
          { locale }
        ),
      })
    }

    return schema
  }
}
