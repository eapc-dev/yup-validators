import * as yup from 'yup'

import { TReferenceProps } from '../../..'
import { IArrayProps, TArrayValidatorResult } from '../_types'

export interface IIsOptionalProps {}

/**
 * Allow an `array` to be `undefined`.
 */
export const isOptional = <T extends yup.AnySchema>(
  props?: TReferenceProps<IIsOptionalProps> & Omit<IArrayProps, 'message'>
): TArrayValidatorResult<T> => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.optional() as yup.ArraySchema<T>
    }

    return schema
  }
}
