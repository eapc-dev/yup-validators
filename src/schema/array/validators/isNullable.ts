import * as yup from 'yup'

import { TReferenceProps } from '../../..'
import { IArrayProps, TArrayValidatorResult } from '../_types'

export interface IIsNullableProps {}

/**
 * Allow an `array` to be `null`.
 */
export const isNullable = <T extends yup.AnySchema>(
  props?: TReferenceProps<IIsNullableProps> & Omit<IArrayProps, 'message'>
): TArrayValidatorResult<T> => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.nullable() as yup.ArraySchema<T>
    }

    return schema
  }
}
