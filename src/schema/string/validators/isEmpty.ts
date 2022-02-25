import _isEmpty from 'validator/lib/isEmpty'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isEmpty>

export interface IIsEmptyProps {
  /**
   * Options is an object which defaults to `{ ignore_whitespace:false }`.
   */
  options?: TParameters[1]
}

/**
 * Check if the string has a length of zero.
 */
export const isEmpty = (
  props?: TReferenceProps<IIsEmptyProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsEmptyProps>(this, props)

          const result = _isEmpty(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_empty' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
