import { ObjectShape } from 'yup/lib/object'

import { TReferenceProps } from '../../..'
import { IObjectProps, TObjectValidatorResult } from '../_types'

export interface IIsOptionalProps {}

/**
 * Allow an `object` to be `undefined`.
 */
export const isOptional = <T extends ObjectShape = {}>(
  props?: TReferenceProps<IIsOptionalProps> & Omit<IObjectProps, 'message'>
): TObjectValidatorResult<T> => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return schema.optional()
    }

    return schema
  }
}
