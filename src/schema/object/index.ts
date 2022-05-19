import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

import { IIntlShape } from '../../i18n/placeholder'

import { TObjectValidatorResult } from './_types'

export const schema = <T extends ObjectShape = {}>(
  object: T,
  intl: IIntlShape,
  ...validators: TObjectValidatorResult<T>[]
): yup.ObjectSchema<T> => {
  let value = yup
    .object<T>(object)
    .typeError(intl.formatErrorMessage({ id: 'e.y_v.o_type_error' }))
    .default(null)
    .strict() as yup.ObjectSchema<T>

  for (const validator of validators) {
    value = validator(value, intl)
  }

  return value
}

export * from './_types'

export * from './validators/isNullable'
export * from './validators/isRequired'
export * from './validators/isOptional'
