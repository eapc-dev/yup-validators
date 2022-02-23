import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

import { TDateValidatorResult } from './_types'

export const schema = (intl: IIntlShape, ...validators: TDateValidatorResult[]): yup.DateSchema => {
  let value = new yup.DateSchema()

  for (const validator of validators) {
    value = validator(value, intl)
  }

  value.typeError(intl.formatErrorMessage({ id: 'e.form.d_type_error' }))

  return value
}

export * from './_types'

// export * from './validators/isEqual'
// export * from './validators/isDifferentThan'
// export * from './validators/isFuture'
export * from './validators/isMinMax'
// export * from './validators/isNotFuture'
export * from './validators/isNullable'
export * from './validators/isRequired'
export * from './validators/isOptional'
