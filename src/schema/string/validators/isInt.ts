import _isInt from 'validator/lib/isInt'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isInt>

export interface IIsIntProps {
  /**
   * Options is an object which can contain the keys min and/or max to check the integer is within boundaries (e.g. `{ min: 10, max: 99 }`). options can also contain the key `allow_leading_zeroes`, which when set to `false` will disallow integer values with leading zeroes (e.g. `{ allow_leading_zeroes: false }`). Finally, options can contain the keys gt and/or lt which will enforce integers being greater than or less than, respectively, the value provided (e.g. `{gt: 1, lt: 4}` for a number between 1 and 4).
   */
  options?: TParameters[1]
}

/**
 * Check if the string is an integer.
 */
export const isInt = (
  props?: TReferenceProps<IIsIntProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsIntProps>(this, props)

          const result = _isInt(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_int' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
