import Big from 'big.js'

import { parseReference, TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsEqualToProps {
  /**
   * The list of authorized values.
   */
  values: number[]
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
          for (const v of values) {
            whitelist.push(Big(v))
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
                    values: intl.formatList(values.map((e) => intl.formatNumber(e))),
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
