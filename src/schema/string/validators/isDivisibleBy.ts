import _isDivisibleBy from 'validator/lib/isDivisibleBy'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isDivisibleBy>

export interface IIsDivisibleByProps {
  number: TParameters[1]
}

/**
 * Check if the string is a number that's divisible by another.
 */
export const isDivisibleBy = (
  props: TReferenceProps<IIsDivisibleByProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { number } = parseReference<IIsDivisibleByProps>(this, props)

          const result = _isDivisibleBy(value, number)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_divisible_by' },
                  { number }
                ),
              })
        },
      })
    }

    return schema
  }
}
