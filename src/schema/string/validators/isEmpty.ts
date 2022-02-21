import _isEmpty from 'validator/lib/isEmpty'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isEmpty>

/**
 * Check if the string has a length of zero.
 */
export interface IIsEmptyProps {
  options?: TParameters[1]
}

export const isEmpty = (
  props?: TReferenceProps<IIsEmptyProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsEmptyProps>(this, props)

          const result = _isEmpty(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_empty' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
