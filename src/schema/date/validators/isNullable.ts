import * as yup from 'yup'

import { TReferenceProps } from '../../..'
import { IDateProps, TDateValidatorResult } from '../_types'

export interface IIsNullableProps {}

/**
 * Allow a `Date` to be `null`.
 */
export const isNullable = (
  props?: TReferenceProps<IIsNullableProps> & Omit<IDateProps, 'message'>
): TDateValidatorResult => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.nullable() as yup.DateSchema
    }

    return schema
  }
}
