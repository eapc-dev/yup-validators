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
    if (active) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return schema.nullable()
    }

    return schema
  }
}
