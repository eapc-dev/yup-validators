import Big from 'big.js'

import { parseReference, TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsEqualToProps {
  /**
   * The list of authorized values. Can be either an array of numbers or just a number.
   */
  values: number | number[]
}

/**
 * Check if the number is equal to a list of values.
 */
export const isEqualTo = (
  props: TReferenceProps<IIsEqualToProps> & INumberProps
): TNumberValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'number') return true

          const { values } = parseReference<IIsEqualToProps>(this, props)

          const whitelist: Big[] = []
          if (typeof values === 'number') {
            whitelist.push(Big(values))
          } else {
            for (const v of values) {
              whitelist.push(Big(v))
            }
          }

          let result = false
          for (const entry of whitelist) {
            if (entry.eq(value)) {
              result = true
              break
            }
          }

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.n_is_equal_to' },
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
