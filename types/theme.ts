export interface ITheme {
    merchantName: string;
    merchantLogo: string;
    theme: {
        "--background": string;
        "--foreground": string;
        "--primary": string;
        "--primary-foreground": string;
    };
}
