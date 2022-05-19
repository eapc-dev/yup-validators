import * as yup from 'yup'

import { TReferenceProps } from '../../..'
import { IBooleanProps, TBooleanValidatorResult } from '../_types'

export interface IIsNullableProps {}

/**
 * Allow a `boolean` to be `null`.
 */
export const isNullable = (
  props?: TReferenceProps<IIsNullableProps> & Omit<IBooleanProps, 'message'>
): TBooleanValidatorResult => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.nullable() as yup.BooleanSchema<boolean>
    }

    return schema
  }
}
