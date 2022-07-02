import { Injectable } from '@nestjs/common';
import { RequestContext } from '@Shared/context/RequestContext';
import { I18n } from 'i18n';
import { join } from 'path';

@Injectable()
export class TranslationService {
    private i18n: I18n;
    private readonly defaultLocale = 'es-ES';
    private readonly localesPath = join(__dirname, '../../../../locales');

    public init() {
        this.i18n = new I18n();
        this.i18n.configure({
            locales: [
                'es-ES',
                'fr-FR',
                'it-IT',
                'en-GB',
                'de-DE',
                'pt-PT',
                'pl-PL',
                'nl-NL',
                'en-IE',
                'de-AT',
                'fr-AT',
                'nl-BE',
                'fr-BE',
            ],
            defaultLocale: this.defaultLocale,
            fallbacks: { 'nl-NL': 'de-DE', 'en-IE': 'en-GB', 'fr-AT': 'fr-FR', 'fr-BE': 'fr-FR', 'de-AT': 'de-DE' },
            retryInDefaultLocale: true,
            directory: this.localesPath,
            mustacheConfig: {
                tags: ['{{', '}}'],
                disable: false,
            },
        });
    }

    public translate(text: string, { locale, vars }: { locale?: string; vars?: any } = {}): string {
        locale = locale ?? RequestContext.get()?.locale;
        return this.i18n.__({ phrase: text, locale: locale ?? this.defaultLocale }, vars);
    }
}
