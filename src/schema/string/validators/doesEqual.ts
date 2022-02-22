import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IDoesEqualProps {
  /**
   * The list of authorized values. Can be either an array of string or just a string.
   */
  values: string | string[]
}

/**
 * Check if the string does equal to a list of values.
 */
export const doesEqual = (
  props: TReferenceProps<IDoesEqualProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { values } = parseReference<IDoesEqualProps>(this, props)

          const whitelist = new Set<string>()
          if (typeof values === 'string') {
            whitelist.add(values)
          } else {
            for (const v of values) {
              whitelist.add(v)
            }
          }

          const result = whitelist.has(value)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_equal' },
                  {
                    values: Array.isArray(values)
                      ? values.join(
                          intl.formatErrorMessage({
                            id: 'lang.array_separator',
                            defaultMessage: ', ',
                          })
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
