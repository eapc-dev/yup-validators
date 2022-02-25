import { parseReference, TReferenceProps } from '../../..'
import { IBooleanProps, TBooleanValidatorResult } from '../_types'

export interface IIsDifferentThanProps {
  /**
   * The list of blacklisted values. Can be either an array of boolean or just a boolean.
   */
  values: boolean | boolean[]
}

/**
 * Check if the boolean is different than a list of values.
 */
export const isDifferentThan = (
  props: TReferenceProps<IIsDifferentThanProps> & IBooleanProps
): TBooleanValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'boolean') return true

          const { values } = parseReference<IIsDifferentThanProps>(this, props)

          const whitelist = new Set<boolean>()
          if (typeof values === 'boolean') {
            whitelist.add(values)
          } else {
            for (const v of values) {
              whitelist.add(v)
            }
          }

          const result = !whitelist.has(value)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.b_is_different_than' },
                  {
                    values: Array.isArray(values)
                      ? intl.formatList(values.map((e) => e.toString()))
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
