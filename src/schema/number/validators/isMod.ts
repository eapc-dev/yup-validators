import Big from 'big.js'

import { parseReference, TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsModProps {
  /**
   * The list of authorized values. Can be either an array of numbers or just a number.
   */
  values: number | number[]

  /**
   * Wether a number should be a mod of every value.
   *
   * @default false
   */
  matchAll?: boolean
}

/**
 * Check if the number is a mod of the values.
 */
export const isMod = (
  props: TReferenceProps<IIsModProps> & INumberProps
): TNumberValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'number') return true

          const { values, matchAll } = parseReference<IIsModProps>(this, props)

          const whitelist: Big[] = []
          if (typeof values === 'number') {
            whitelist.push(Big(values))
          } else {
            for (const v of values) {
              whitelist.push(Big(v))
            }
          }

          const valueBig = Big(value)
          const result = whitelist[matchAll ? 'every' : 'some']((e) => valueBig.mod(e).eq(0))

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.n_is_mod' },
                  {
                    values: Array.isArray(values)
                      ? intl.formatList(
                          values.map((e) => intl.formatNumber(e)),
                          {
                            type: matchAll ? 'conjunction' : 'disjunction',
                          }
                        )
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
