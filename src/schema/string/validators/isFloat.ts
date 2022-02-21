import _isFloat from 'validator/lib/isFloat'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isFloat>

export interface IIsFloatProps {
  options?: TParameters[1]
}

/**
 * Check if the string is a float.
 */
export const isFloat = (
  props?: TReferenceProps<IIsFloatProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsFloatProps>(this, props)

          const result = _isFloat(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_float' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
