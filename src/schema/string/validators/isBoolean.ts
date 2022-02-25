import _isBoolean from 'validator/lib/isBoolean'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isBoolean>

export interface IIsBooleanProps {
  /**
   * `options` is an object which defaults to `{ loose: false }`. If `loose` is is set to `false`, the validator will strictly match `['true', 'false', '0', '1']`. If `loose` is set to `true`, the validator will also match 'yes', 'no', and will match a valid boolean string of any case. (eg: `['true', 'True', 'TRUE']`).
   */
  options?: TParameters[1]
}

/**
 * Check if a string is a boolean.
 */
export const isBoolean = (
  props?: TReferenceProps<IIsBooleanProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsBooleanProps>(this, props)

          const result = _isBoolean(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_boolean' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
