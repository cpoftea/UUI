import {
    TAccordionPreview,
    TAlertPreview,
    TAvatarStackPreview,
    TBadgePreview,
    TButtonPreview,
    TCheckboxPreview,
    TCountIndicatorPreview,
    TDatePickerPreview,
    TIconButtonPreview,
    TLabeledInputPreview,
    TLinkButtonPreview,
    TMainMenuPreview,
    TMultiSwitchPreview,
    TNotificationCardPreview,
    TNumericInputPreview,
    TPaginatorPreview,
    TPickerInputPreview,
    TRadioGroupPreview,
    TRadioInputPreview,
    TRangeDatePickerPreview,
    TSwitchPreview,
    TTabButtonPreview,
    TTagPreview,
    TTextAreaPreview,
    TTextInputPreview,
    TTextPreview, TTooltipPreview,
    TVerticalTabButtonPreview,
} from './previewIds';
import { TTheme } from '../types';

/**
 * Keep in sync with app/src/documents/structureComponents.ts
 */
export enum TComponentId {
    accordion= 'accordion',
    adaptivePanel= 'adaptivePanel',
    advancedTables= 'advancedTables',
    alert= 'alert',
    anchor= 'anchor',
    avatar= 'avatar',
    avatarStack= 'avatarStack',
    badge= 'badge',
    blocker= 'blocker',
    button= 'button',
    checkbox= 'checkbox',
    checkboxGroup= 'checkboxGroup',
    controlGroup= 'controlGroup',
    countIndicator= 'countIndicator',
    datePicker= 'datePicker',
    dropdown= 'dropdown',
    dropdownContainer= 'dropdownContainer',
    dropdownMenu = 'dropdownMenu',
    editableTables= 'editableTables',
    fileUpload= 'fileUpload',
    filtersPanel= 'filtersPanel',
    flexCell= 'flexCell',
    flexItems= 'flexItems',
    flexRow= 'flexRow',
    flexSpacer= 'flexSpacer',
    form= 'form',
    iconButton= 'iconButton',
    iconContainer= 'iconContainer',
    labeledInput= 'labeledInput',
    linkButton= 'linkButton',
    mainMenu= 'mainMenu',
    modals= 'modals',
    multiSwitch= 'multiSwitch',
    notificationCard= 'notificationCard',
    numericInput= 'numericInput',
    paginator= 'paginator',
    panel= 'panel',
    pickerInput= 'pickerInput',
    PickerList= 'PickerList',
    pickerModal= 'pickerModal',
    presetsPanel= 'presetsPanel',
    progressBar= 'progressBar',
    radioGroup= 'radioGroup',
    radioInput= 'radioInput',
    rangeDatePicker= 'rangeDatePicker',
    rating= 'rating',
    richTextEditor= 'richTextEditor',
    richTextView= 'richTextView',
    rteOverview= 'rteOverview',
    rteSerializers= 'rteSerializers',
    scrollSpy= 'scrollSpy',
    searchInput= 'searchInput',
    slider= 'slider',
    sliderRating= 'sliderRating',
    spinner= 'spinner',
    statusIndicator= 'statusIndicator',
    'switch' = 'switch',
    tabButton= 'tabButton',
    tables= 'tables',
    tablesOverview= 'tablesOverview',
    tag= 'tag',
    text= 'text',
    textArea= 'textArea',
    textInput= 'textInput',
    textPlaceholder= 'textPlaceholder',
    timePicker= 'timePicker',
    tooltip= 'tooltip',
    useTableState= 'useTableState',
    verticalTabButton= 'verticalTabButton',
    virtualList= 'virtualList'
}

type TPreviewIds<PreviewMap extends object> = (PreviewMap[keyof PreviewMap])[];

/**
 * Keep list of previews in sync with corresponding *.doc.tsx files
 */
export type TPreviewIdByComponentId = {
    [TComponentId.accordion]: TAccordionPreview[],
    [TComponentId.alert]: TPreviewIds<typeof TAlertPreview>,
    [TComponentId.avatarStack]: TAvatarStackPreview[],
    [TComponentId.badge]: TPreviewIds<typeof TBadgePreview>,
    [TComponentId.button]: TPreviewIds<typeof TButtonPreview>,
    [TComponentId.checkbox]: TPreviewIds<typeof TCheckboxPreview>,
    [TComponentId.countIndicator]: TPreviewIds<typeof TCountIndicatorPreview>,
    [TComponentId.datePicker]: TDatePickerPreview[],
    [TComponentId.iconButton]: TPreviewIds<typeof TIconButtonPreview>,
    [TComponentId.linkButton]: TPreviewIds<typeof TLinkButtonPreview>,
    [TComponentId.pickerInput]: TPickerInputPreview[],
    [TComponentId.rangeDatePicker]: TPreviewIds<typeof TRangeDatePickerPreview>,
    [TComponentId.switch]: TPreviewIds<typeof TSwitchPreview>,
    [TComponentId.tabButton]: TPreviewIds<typeof TTabButtonPreview>,
    [TComponentId.tag]: TPreviewIds<typeof TTagPreview>,
    [TComponentId.text]: TPreviewIds<typeof TTextPreview>,
    [TComponentId.textArea]: TPreviewIds<typeof TTextAreaPreview>,
    [TComponentId.textInput]: TTextInputPreview[],
    [TComponentId.verticalTabButton]: TPreviewIds<typeof TVerticalTabButtonPreview>,
    [TComponentId.numericInput]: TPreviewIds<typeof TNumericInputPreview>,
    [TComponentId.radioInput]: TPreviewIds<typeof TRadioInputPreview>,
    [TComponentId.radioGroup]: TPreviewIds<typeof TRadioGroupPreview>,
    [TComponentId.labeledInput]: TPreviewIds<typeof TLabeledInputPreview>,
    [TComponentId.multiSwitch]: TPreviewIds<typeof TMultiSwitchPreview>,
    [TComponentId.paginator]: TPreviewIds<typeof TPaginatorPreview>,
    [TComponentId.mainMenu]: TPreviewIds<typeof TMainMenuPreview>,
    [TComponentId.notificationCard]: TPreviewIds<typeof TNotificationCardPreview>,
    [TComponentId.tooltip]: TPreviewIds<typeof TTooltipPreview>,
};

export const THEMES = {
    allExceptVanillaThunder: Object.values(TTheme).filter((t) => t !== TTheme.vanilla_thunder),
};

/**
 * Terminology is not perfect, but it's basically list of themes which support "isSkin=true" parameter
 */
export const SKINS = {
    promo_loveship_electric: [TTheme.promo, TTheme.loveship, TTheme.loveship_dark, TTheme.electric],
    promo_loveship: [TTheme.promo, TTheme.loveship, TTheme.loveship_dark],
};
