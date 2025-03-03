import {
    equalColorObjects,
    equalColorString,
    equalHex,
    hexToHsva,
    hslStringToHsva,
    hslaStringToHsva,
    hslaToHsl,
    hslaToHsva,
    hsvStringToHsva,
    hsvaStringToHsva,
    hsvaToHex,
    hsvaToHslString,
    hsvaToHsla,
    hsvaToHslaString,
    hsvaToHsv,
    hsvaToHsvString,
    hsvaToHsvaString,
    hsvaToRgbString,
    hsvaToRgba,
    hsvaToRgbaString,
    rgbStringToHsva,
    rgbaStringToHsva,
    rgbaToHsva,
    rgbaToRgb,
    roundHsva,
} from './index'
import type { ColorModel, HslColor, HsvColor, HsvaColor, RgbColor, RgbaColor, ColorModelType } from '../types'

export const rgbaColorModel: ColorModel<RgbaColor> = {
    defaultColor: { r: 0, g: 0, b: 0, a: 1 },
    toHsva: rgbaToHsva,
    fromHsva: hsvaToRgba,
    equal: equalColorObjects,
}

export const rgbaStringColorModel: ColorModel<string> = {
    defaultColor: 'rgba(0, 0, 0, 1)',
    toHsva: rgbaStringToHsva,
    fromHsva: hsvaToRgbaString,
    equal: equalColorString,
}

export const rgbColorModel: ColorModel<RgbColor> = {
    defaultColor: { r: 0, g: 0, b: 0 },
    toHsva: ({ r, g, b }) => rgbaToHsva({ r, g, b, a: 1 }),
    fromHsva: hsva => rgbaToRgb(hsvaToRgba(hsva)),
    equal: equalColorObjects,
}

export const rgbStringColorModel: ColorModel<string> = {
    defaultColor: 'rgb(0, 0, 0)',
    toHsva: rgbStringToHsva,
    fromHsva: hsvaToRgbString,
    equal: equalColorString,
}

export const hexColorModel: ColorModel<string> = {
    defaultColor: '000',
    toHsva: hexToHsva,
    fromHsva: ({ h, s, v }) => hsvaToHex({ h, s, v, a: 1 }),
    equal: equalHex,
}


export const hexaColorModel: ColorModel<string> = {
    defaultColor: '0001',
    toHsva: hexToHsva,
    fromHsva: hsvaToHex,
    equal: equalHex,
}

export const hslaStringColorModel: ColorModel<string> = {
    defaultColor: 'hsla(0, 0%, 0%, 1)',
    toHsva: hslaStringToHsva,
    fromHsva: hsvaToHslaString,
    equal: equalColorString,
}

export const hslColorModel: ColorModel<HslColor> = {
    defaultColor: { h: 0, s: 0, l: 0 },
    toHsva: ({ h, s, l }) => hslaToHsva({ h, s, l, a: 1 }),
    fromHsva: hsva => hslaToHsl(hsvaToHsla(hsva)),
    equal: equalColorObjects,
}

export const hslStringColorModel: ColorModel<string> = {
    defaultColor: 'hsl(0, 0%, 0%)',
    toHsva: hslStringToHsva,
    fromHsva: hsvaToHslString,
    equal: equalColorString,
}

export const hsvaColorModel: ColorModel<HsvaColor> = {
    defaultColor: { h: 0, s: 0, v: 0, a: 1 },
    toHsva: hsva => hsva,
    fromHsva: roundHsva,
    equal: equalColorObjects,
}

export const hsvaStringColorModel: ColorModel<string> = {
    defaultColor: 'hsva(0, 0%, 0%, 1)',
    toHsva: hsvaStringToHsva,
    fromHsva: hsvaToHsvaString,
    equal: equalColorString,
}

export const hsvColorModel: ColorModel<HsvColor> = {
    defaultColor: { h: 0, s: 0, v: 0 },
    toHsva: ({ h, s, v }) => ({ h, s, v, a: 1 }),
    fromHsva: hsvaToHsv,
    equal: equalColorObjects,
}

export const hsvStringColorModel: ColorModel<string> = {
    defaultColor: 'hsv(0, 0%, 0%)',
    toHsva: hsvStringToHsva,
    fromHsva: hsvaToHsvString,
    equal: equalColorString,
}

export const getColorModel = (type: ColorModelType): ColorModel<any> => {
    let colorModel;
    // "hex" | "hexa" | "hsl" | "hslString" | "hsla" | "hslaString" | "hsv" | "hsvString" | "hsva" 
    // | "hsvaString" | "rgb" | "rgbString" | "rgba" | "rgbaString";
    switch (type) {
        case "hex":
            colorModel = hexColorModel
            break;
        case "hexa":
            colorModel = hexaColorModel
            break;
        case "hsl":
            colorModel = hslColorModel
            break;
        case "hslString":
            colorModel = hslStringColorModel
            break;
        case "hsla":
            colorModel = hslaStringColorModel
            break;
        case "hslaString":
            colorModel = hslaStringColorModel
            break;
        case "hsv":
            colorModel = hsvColorModel
            break;
        case "hsvString":
            colorModel = hsvStringColorModel
            break;
        case "hsva":
            colorModel = hsvaColorModel
            break;
        case "hsvaString":
            colorModel = hsvaStringColorModel
            break;
        case "rgb":
            colorModel = rgbColorModel
            break;
        case "rgbString":
            colorModel = rgbStringColorModel
            break;
        case "rgba":
            colorModel = rgbaColorModel
            break;
        case "rgbaString":
            colorModel = rgbaStringColorModel
            break;
        default:
            colorModel = hexColorModel
            break;
    }

    return colorModel
}

export const isAlphaType = (type: ColorModelType): boolean => {
    // 判断字符串type第四个字符是否等于字符a
    return type.length > 3 && type.slice(3,4) === 'a'
}