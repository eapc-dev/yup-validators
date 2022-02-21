import _isDecimal from 'validator/lib/isDecimal'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isDecimal>

export interface IIsDecimalProps {
  options?: TParameters[1]
}

/**
 * Check if the string represents a decimal number,
 * such as `0.1`, `.3`, `1.1`, `1.00003`, `4.0` etc.
 */
export const isDecimal = (
  props?: TReferenceProps<IIsDecimalProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsDecimalProps>(this, props)

          const result = _isDecimal(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_a_decimal_number' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
