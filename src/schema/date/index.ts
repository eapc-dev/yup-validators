import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

import { TDateValidatorResult } from './_types'

export const schema = <Intl extends IIntlShape = IIntlShape>(
  intl: Intl,
  ...validators: TDateValidatorResult<Intl>[]
): yup.DateSchema => {
  let value = new yup.DateSchema()

  for (const validator of validators) {
    value = validator(value, intl)
  }

  value.typeError(intl.formatErrorMessage({ id: 'e.form.d_type_error' }))

  return value
}

export * from './_types'

export * from './validators/isEqualTo'
export * from './validators/isDifferentThan'
export * from './validators/isInFuture'
export * from './validators/isMinMax'
export * from './validators/isNotInFuture'
export * from './validators/isNullable'
export * from './validators/isRequired'
export * from './validators/isOptional'

export * from './transformers/setEndOf'
export * from './transformers/setStartOf'
export * from './transformers/set'
