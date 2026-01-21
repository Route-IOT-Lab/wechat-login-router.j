import {WxLoginOptions} from "./WxLoginOptions";

export class WechatLogin {
    constructor(wxLoginOptions: WxLoginOptions) {
        this.wxLoginOptions = wxLoginOptions;
    }
    wxLoginOptions: WxLoginOptions;

    init() {
        let r = "default";
        if (this.wxLoginOptions.self_redirect === true) {
            r = "true";
        } else if (this.wxLoginOptions.self_redirect === false) {
            r = "false";
        }

        const iframe:HTMLIFrameElement = document.createElement("iframe");
        let s = `https://open.weixin.qq.com/connect/qrconnect?appid=${this.wxLoginOptions.appid}&scope=${this.wxLoginOptions.scope}&redirect_uri=${this.wxLoginOptions.redirect_uri}&state=${this.wxLoginOptions.state}&login_type=jssdk&self_redirect=${r}&styletype=${this.wxLoginOptions.styletype || ""}&sizetype=${this.wxLoginOptions.sizetype || ""}&bgcolor=${this.wxLoginOptions.bgcolor || ""}&rst=${this.wxLoginOptions.rst || ""}`;

        if (this.wxLoginOptions.style) s += `&style=${this.wxLoginOptions.style}`;
        if (this.wxLoginOptions.href) s += `&href=${this.wxLoginOptions.href}`;
        if (this.wxLoginOptions.lang === 'en') s += "&lang=en";
        if (this.wxLoginOptions.stylelite === 1) s += "&stylelite=1";
        if (this.wxLoginOptions.fast_login === 0) s += "&fast_login=0";

        switch (this.wxLoginOptions.color_scheme) {
            case 'auto':
                s += "&color_scheme=auto";
                break;
            case 'dark':
                s += "&color_scheme=dark";
                break;
            case 'light':
                s += "&color_scheme=light";
                break;
        }

        iframe.frameBorder = "0";
        // iframe.allowTransparency = "true";
        iframe.scrolling = "no";
        iframe.width = "300px";
        iframe.height = "400px";
        iframe.src = s;

        const i = document.getElementById(this.wxLoginOptions.id);
        if (i) {
            i.innerHTML = "";
            i.appendChild(iframe);
        }

        if (window.JSON && this.wxLoginOptions.onReady && typeof this.wxLoginOptions.onReady === 'function') {
            const messageHandler = (event: MessageEvent) => {
                if (event.origin === "https://open.weixin.qq.com") {
                    try {
                        const data = JSON.parse(event.data);
                        if (data?.type === "status") {
                            const isReady = data.status === "wxReady";
                            this.wxLoginOptions.onReady?.(isReady);
                        }
                    } catch (error) {
                        console.error("wxLogin postMessage error", error);
                    }
                }
            };
        }
    }
}

export function wechatLogin(options: WxLoginOptions) {
    new WechatLogin(options).init();
}