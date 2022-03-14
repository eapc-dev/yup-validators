import { parseReference, TReferenceProps } from '../../..'
import { IBooleanProps, TBooleanValidatorResult } from '../_types'

export interface IIsDifferentThanProps {
  /**
   * The list of blacklisted values.
   */
  values: boolean[]
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
          for (const v of values) {
            whitelist.add(v)
          }

          const result = !whitelist.has(value)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.b_is_different_than' },
                  {
                    values: intl.formatList(values.map((e) => e.toString())),
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
