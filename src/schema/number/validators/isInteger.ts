import Big from 'big.js'

import { TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsIntegerProps {}

/**
 * Check if the number is an integer.
 */
export const isInteger = (
  props?: TReferenceProps<IIsIntegerProps> & INumberProps
): TNumberValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'number') return true

          const result = Big(value).mod(1).eq(0)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage({ id: message ?? 'e.y_v.n_is_integer' }),
              })
        },
      })
    }

    return schema
  }
}
