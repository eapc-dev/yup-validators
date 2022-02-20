import isCurrency from 'validator/lib/isCurrency'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isCurrency>

export interface IIsStringCurrencyProps extends IStringProps {
  options?: TParameters[1]
}

export const isStringCurrency = (props?: IIsStringCurrencyProps): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isCurrency(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_currency_amount' },
          {
            ...options,
            digits_after_decimal: options?.digits_after_decimal?.join(
              intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' })
            ),
          }
        ),
      })
    }

    return schema
  }
}
