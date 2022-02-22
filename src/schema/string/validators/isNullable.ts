import * as yup from 'yup'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsNullableProps {}

/**
 * Allow a `string` to be `null`.
 */
export const isNullable = (
  props?: TReferenceProps<IIsNullableProps> & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.nullable() as yup.StringSchema
    }

    return schema
  }
}
