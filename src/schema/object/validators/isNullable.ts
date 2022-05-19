import { ObjectShape } from 'yup/lib/object'

import { TReferenceProps } from '../../..'
import { IObjectProps, TObjectValidatorResult } from '../_types'

export interface IIsNullableProps {}

/**
 * Allow an `object` to be `null`.
 */
export const isNullable = <T extends ObjectShape = {}>(
  props?: TReferenceProps<IIsNullableProps> & Omit<IObjectProps, 'message'>
): TObjectValidatorResult<T> => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    return active
      ? schema.nullable()
      : schema.required(intl.formatErrorMessage({ id: 'e.y_v.is_required' }))
  }
}
