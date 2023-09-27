import { Emitter } from "../emitter";
import { CheckoutPricingInstance, CheckoutPricingPromise } from "../pricing/checkout";
import {
    ApplePayContactField,
    ApplePayCouponCodeChangedEvent,
    ApplePayErrorUpdate,
    ApplePayPaymentAuthorizedEvent,
    ApplePayPaymentMethodSelectedEvent,
    ApplePayPaymentRequest,
    ApplePaySelectionUpdate,
    ApplePayShippingContactSelectedEvent,
    ApplePayShippingMethodSelectedEvent,
} from "./native";

export * from "./native";

export type I18n = {
    /**
     * The short, localized description of the subtotal line item
     */
    subtotalLineItemLabel: string;

    /**
     * The short, localized description of the total line item
     */
    totalLineItemLabel: string;

    /**
     * The short, localized description of the discount line item
     */
    discountLineItemLabel: string;

    /**
     * The short, localized description of the tax line item
     */
    taxLineItemLabel: string;

    /**
     * The short, localized description of the gift card line item
     */
    giftCardLineItemLabel: string;
};

export type ApplePayConfig = {
    /**
     * Your ISO 3166 country code (ex: ‘US’). This is your country code as the merchant. Required if not
     * set in `options.paymentRequest.countryCode`.
     */
    country?: string;

    /**
     * ISO 4217 purchase currency (ex: ‘USD’). Required if not set in `options.paymentRequest.currencyCode`.
     */
    currency?: string;

    /**
     * Purchase description to display in the Apple Pay payment sheet.
     */
    label?: string;

    /**
     * Total cost to display in the Apple Pay payment sheet. Defaults to '0'.
     */
    total?: string;

    /**
     * Display the recurring payment request on a monthly cadence
     */
    recurring?: boolean;

    /**
     * `options.pricing` line item descriptions to display in the Apple Pay payment sheet.
     */
    i18n?: I18n;

    /**
     * Callbacks for the events emitted by the payment session when a user selects options in the payment sheet.
     */
    callbacks?: {
        onPaymentMethodSelected?: (
            event: ApplePayPaymentMethodSelectedEvent,
        ) => Promise<ApplePaySelectionUpdate> | ApplePaySelectionUpdate | void;
        onShippingContactSelected?: (
            event: ApplePayShippingContactSelectedEvent,
        ) => Promise<ApplePaySelectionUpdate> | ApplePaySelectionUpdate | void;
        onShippingMethodSelected?: (
            event: ApplePayShippingMethodSelectedEvent,
        ) => Promise<ApplePaySelectionUpdate> | ApplePaySelectionUpdate | void;
        onCouponCodeChanged?: (
            event: ApplePayCouponCodeChangedEvent,
        ) => Promise<ApplePaySelectionUpdate> | ApplePaySelectionUpdate | void;
        onPaymentAuthorized?: (
            event: ApplePayPaymentAuthorizedEvent,
        ) => Promise<ApplePayErrorUpdate> | ApplePayErrorUpdate | void;
    };

    /**
     * If provided, will override `options.total` and provide the current total price on the CheckoutPricing instance
     * when the Apple Pay flow is initiated.
     */
    pricing?: CheckoutPricingInstance | CheckoutPricingPromise;

    /**
     * If provided, tokens generated by the `recurly.ApplePay` instance will include customer billing address from the
     * form, overriding any billing address gathered from Apple Pay.
     *
     * See {@link https://developers.recurly.com/reference/recurly-js/index.html#getting-a-token|Getting a Token} for all
     * compatible fields.
     */
    form?: HTMLFormElement;

    /**
     * If `requiredShippingContactFields` is specified, validate that the browser supports the minimum version required for that option.
     */
    enforceVersion?: boolean;

    /**
     * If set, the apple flow will require the user to provide these attributes.
     * See docs here: https://recurly.com/developers/reference/recurly-js/#apple-pay
     * @deprecated use paymentRequest.requiredShippingContactFields field instead
     */
    requiredShippingContactFields?: ApplePayContactField[];

    /**
     * If provided, will use Braintree to process the ApplePay transaction.
     */
    braintree?: {
        clientAuthorization: string;

        /**
         * Canonical name for your store, suitable for display.
         */
        displayName?: string;
    };

    /**
     * The request for a payment.
     */
    paymentRequest?: ApplePayPaymentRequest;
};

export type ApplePayEvent =
    | "token"
    | "error"
    | "ready"
    | "shippingContactSelected"
    | "paymentAuthorized"
    | "shippingMethodSelected"
    | "cancel";

export interface ApplePayInstance extends Emitter<ApplePayEvent> {
    /**
     * @see {@link https://developers.recurly.com/reference/recurly-js/index.html#fn-applepayready|ApplePay.ready}
     */
    ready: (cb?: VoidFunction) => void;
    begin: (cb?: VoidFunction) => void;
}

export type ApplePay = (config: ApplePayConfig) => ApplePayInstance;
