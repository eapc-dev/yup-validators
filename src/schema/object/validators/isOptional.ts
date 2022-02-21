import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

import { TReferenceProps } from '../../..'
import { IObjectProps, TObjectValidatorResult } from '../_types'

export interface IIsOptionalProps {}

/**
 * Allow a object to be null.
 */
export const isOptional = <T extends ObjectShape = {}>(
  props?: TReferenceProps<IIsOptionalProps> & Omit<IObjectProps, 'message'>
): TObjectValidatorResult<T> => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.optional() as yup.ObjectSchema<T>
    }

    return schema
  }
}
