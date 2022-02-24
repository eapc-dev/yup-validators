import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

import { TArrayValidatorResult } from './_types'

export const schema = <T extends yup.AnySchema, Intl extends IIntlShape = IIntlShape>(
  array: T,
  intl: Intl,
  ...validators: TArrayValidatorResult<T, Intl>[]
): yup.ArraySchema<T> => {
  let value = new yup.ArraySchema<T>(array)

  for (const validator of validators) {
    value = validator(value, intl)
  }

  value.typeError(intl.formatErrorMessage({ id: 'e.form.a_type_error' }))

  return value
}

export * from './_types'

export * from './validators/isLength'
export * from './validators/isNullable'
export * from './validators/isRequired'
export * from './validators/isOptional'

export * from './transformers/order'
export * from './transformers/customOrder'
