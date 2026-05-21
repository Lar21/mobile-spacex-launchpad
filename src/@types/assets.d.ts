declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.jpg' {
  const value: number;
  export default value;
}

declare const process: {
  env: {
    EXPO_PUBLIC_FORCE_ERROR?: string;
    [key: string]: string | undefined;
  };
};
