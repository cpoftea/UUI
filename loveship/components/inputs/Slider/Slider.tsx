import { Slider as UuiSlider, SliderBaseProps } from '@epam/uui-components';
import css from './Slider.module.scss';
import { withMods } from '@epam/uui-core';

export function applySliderMods() {
    return [css.root];
}

export interface SliderProps extends SliderBaseProps<number> {}

export const Slider = withMods<SliderProps>(UuiSlider, applySliderMods);
