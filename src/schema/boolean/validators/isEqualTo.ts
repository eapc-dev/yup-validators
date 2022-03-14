import { parseReference, TReferenceProps } from '../../..'
import { IBooleanProps, TBooleanValidatorResult } from '../_types'

export interface IIsEqualToProps {
  /**
   * The list of authorized values.
   */
  values: boolean[]
}

/**
 * Check if the boolean is equal to a list of values.
 */
export const isEqualTo = (
  props: TReferenceProps<IIsEqualToProps> & IBooleanProps
): TBooleanValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'boolean') return true

          const { values } = parseReference<IIsEqualToProps>(this, props)

          const whitelist = new Set<boolean>()
          for (const v of values) {
            whitelist.add(v)
          }

          const result = whitelist.has(value)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.b_is_equal_to' },
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
