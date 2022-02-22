import * as yup from 'yup'

import { TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsNullableProps {}

/**
 * Allow a `number` to be `null`.
 */
export const isNullable = (
  props?: TReferenceProps<IIsNullableProps> & Omit<INumberProps, 'message'>
): TNumberValidatorResult => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.nullable() as yup.NumberSchema
    }

    return schema
  }
}
