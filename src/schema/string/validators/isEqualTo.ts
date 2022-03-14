import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsEqualToProps {
  /**
   * The list of authorized values.
   */
  values: string[]
}

/**
 * Check if the string is equal to a list of values.
 */
export const isEqualTo = (
  props: TReferenceProps<IIsEqualToProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { values } = parseReference<IIsEqualToProps>(this, props)

          const whitelist = new Set<string>()
          for (const v of values) {
            whitelist.add(v)
          }

          const result = whitelist.has(value)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_is_equal_to' },
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
