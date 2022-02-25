import _isCurrency from 'validator/lib/isCurrency'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isCurrency>

export interface IIsCurrencyProps {
  /**
   * `options` is an object which defaults to `{ symbol: '$', require_symbol: false, allow_space_after_symbol: false, symbol_after_digits: false, allow_negatives: true, parens_for_negatives: false, negative_sign_before_digits: false, negative_sign_after_digits: false, allow_negative_sign_placeholder: false, thousands_separator: ',', decimal_separator: '.', allow_decimal: true, require_decimal: false, digits_after_decimal: [2], allow_space_after_digits: false }`.

     Note: The array `digits_after_decimal` is filled with the exact number of digits allowed not a range, for example a range 1 to 3 will be given as `[1, 2, 3]`.
   */
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
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsCurrencyProps>(this, props)

          const result = _isCurrency(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_currency_amount' },
                  {
                    ...options,
                    digits_after_decimal: options?.digits_after_decimal
                      ? intl.formatList(
                          options.digits_after_decimal.map((e) => intl.formatNumber(e))
                        )
                      : undefined,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
