import _isSlug from 'validator/lib/isSlug'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsSlugProps {}

/**
 * Check if the string is of type slug.
 */
export const isSlug = (
  props?: TReferenceProps<IIsSlugProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isSlug(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_a_slug',
        }),
      })
    }

    return schema
  }
}
