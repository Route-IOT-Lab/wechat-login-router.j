export interface WxLoginOptions {
    appid: string;
    scope: string;
    redirect_uri: string;
    state: string;
    id: string;
    self_redirect?: boolean;
    styletype?: string;
    sizetype?: string;
    bgcolor?: string;
    rst?: string;
    style?: string;
    href?: string;
    lang?: 'en' | string;
    stylelite?: 1 | 0;
    fast_login?: 0 | 1;
    color_scheme?: 'auto' | 'dark' | 'light';
    onReady?: (ready: boolean) => void;
    onCleanup?: () => void;
}