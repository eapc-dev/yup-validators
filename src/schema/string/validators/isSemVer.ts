import _isSemVer from 'validator/lib/isSemVer'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsSemVerProps {}

/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 */
export const isSemVer = (
  props?: TReferenceProps<IIsSemVerProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isSemVer(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_a_sem_ver',
        }),
      })
    }

    return schema
  }
}
