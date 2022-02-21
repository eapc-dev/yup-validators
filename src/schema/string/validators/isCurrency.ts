import _isCurrency from 'validator/lib/isCurrency'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isCurrency>

export interface IIsCurrencyProps {
  options?: TParameters[1]
}

/**
 * Check if the string is a valid currency amount.
 */
export const isCurrency = (
  props?: TReferenceProps<IIsCurrencyProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsCurrencyProps>(this, props)

          const result = _isCurrency(value, options)

          return result
            ? true
            : this.createError({
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
        },
      })
    }

    return schema
  }
}
