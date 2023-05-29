export type PublicConstructor<T> = new () => T

export type InstanceIdentifier = string | number

// type utils
export type BrowserNativeObject = Date | FileList | File
export type DeepPartial<T> = T extends BrowserNativeObject
    ? T
    : {
          [K in keyof T]?: DeepPartial<T[K]>
      }
