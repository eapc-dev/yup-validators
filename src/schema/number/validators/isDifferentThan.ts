import Big from 'big.js'

import { parseReference, TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsDifferentThanProps {
  /**
   * The list of blacklisted values. Can be either an array of numbers or just a number.
   */
  values: number | number[]
}

/**
 * Check if the number is different than a list of values.
 */
export const isDifferentThan = (
  props: TReferenceProps<IIsDifferentThanProps> & INumberProps
): TNumberValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'number') return true

          const { values } = parseReference<IIsDifferentThanProps>(this, props)

          const blacklist: Big[] = []
          if (typeof values === 'number') {
            blacklist.push(Big(values))
          } else {
            for (const v of values) {
              blacklist.push(Big(v))
            }
          }

          let result = true
          for (const entry of blacklist) {
            if (entry.eq(value)) {
              result = false
              break
            }
          }

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.n_is_different_than' },
                  {
                    values: Array.isArray(values)
                      ? intl.formatList(values.map((e) => intl.formatNumber(e)))
                      : values,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
