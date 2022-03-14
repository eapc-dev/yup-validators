import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsDifferentThanProps {
  /**
   * The list of blacklisted values.
   */
  values: string[]
}

/**
 * Check if the string is different than a list of values.
 */
export const isDifferentThan = (
  props: TReferenceProps<IIsDifferentThanProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { values } = parseReference<IIsDifferentThanProps>(this, props)

          const whitelist = new Set<string>()
          for (const v of values) {
            whitelist.add(v)
          }

          const result = !whitelist.has(value)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_is_different_than' },
                  {
                    values: intl.formatList(values),
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
