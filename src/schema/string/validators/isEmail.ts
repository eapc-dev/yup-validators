import _isEmail from 'validator/lib/isEmail'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isEmail>

export interface IIsEmailProps {
  /**
   * Options is an object which defaults to `{ allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false, blacklisted_chars: '', host_blacklist: [] }`. If `allow_display_name` is set to `true`, the validator will also match Display Name <email-address>. If `require_display_name` is set to `true`, the validator will reject strings without the format Display Name <email-address>. If `allow_utf8_local_part` is set to `false`, the validator will not allow any non-English UTF8 character in email address' local part. If `require_tld` is set to `false`, e-mail addresses without having TLD in their domain will also be matched. If `ignore_max_length` is set to `true`, the validator will not check for the standard max length of an email. If `allow_ip_domain` is set to `true`, the validator will allow IP addresses in the host part. If `domain_specific_validation` is `true`, some additional validation will be enabled, e.g. disallowing certain syntactically valid email addresses that are rejected by GMail. If `blacklisted_chars` receives a `string`, then the validator will reject emails that include any of the characters in the string, in the name part. If `host_blacklist` is set to an array of strings and the part of the email after the @ symbol matches one of the strings defined in it, the validation fails.
   */
  options?: TParameters[1]
}

/**
 * Check if the string is an email.
 */
export const isEmail = (
  props?: TReferenceProps<IIsEmailProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsEmailProps>(this, props)

          const result = _isEmail(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_email' },
                  {
                    ...options,
                    host_blacklist: options?.host_blacklist
                      ? intl.formatList(options.host_blacklist)
                      : undefined,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
