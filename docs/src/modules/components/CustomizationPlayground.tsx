import * as React from 'react';
// @ts-ignore
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
// @ts-ignore
import BrandingProvider from 'docs/src/BrandingProvider';
import { styled, Theme, alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { grey } from '@mui/material/colors';
import pick from 'lodash/pick';
import {
  useCustomizationPlayground,
  UseCustomizationPlaygroundProps,
  DEFAULT_COLORS,
  withStyles,
  ColorKey,
  StyleTokensType,
  CustomizationLabelType,
} from '../utils/useCustomizationPlayground';

const PlaygroundWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${grey[200]}`,
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  justifyContent: 'space-between',

  [theme.breakpoints.down('lg')]: { flexWrap: 'wrap-reverse' },
}));

const PlaygroundDemoArea = styled(Box)(() => ({
  minWidth: 320,
}));

const PlaygroundConfigArea = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.light, 0.05),
  border: `1px solid ${grey[200]}`,
  borderRadius: '4px',
  [theme.breakpoints.down('lg')]: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    gap: theme.spacing(3),
  },
}));

const ComponentsSelect = styled(Select)(({ theme }) => ({
  ...theme.typography.caption,
}));

const ConfigSectionWrapper = styled(Box)(({ theme }) => ({
  gap: theme.spacing(0.5),
  width: 250,
}));

const ConfigLabel = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(12),
  textTransform: 'uppercase',
  letterSpacing: '.08rem',
}));

const ConfigItemLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  letterSpacing: '.08rem',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(11),
  fontweight: 600,
}));

const SlotItemsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
}));

const SlotItem = styled(Button)(({ theme }) => ({
  borderWidth: 1,
  borderRadius: theme.spacing(2),
  textTransform: 'none',
  padding: theme.spacing(0.1, 1),
}));

const TabsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

type TabsProps = {
  value: string;
  onChange: (e: React.SyntheticEvent, value: any) => void;
  options: Partial<CustomizationLabelType>;
};

function StylingApproachTabs({ value, onChange, options }: TabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={onChange} aria-label="Customization option">
        {(Object.keys(options) as Array<keyof typeof options>)?.map((option) => (
          <Tab value={option} key={option} label={options[option]} />
        ))}
      </Tabs>
    </Box>
  );
}

const RECOMMENDATION_MESSAGES: { [k in 'warning' | 'success']: string } = {
  warning:
    'This might not be the best styling approach for the selected component. You can check out the other options for better results.',
  success: 'This is the recommended styling approach for the selected component.',
};

function StylingRecommendation({ type = 'success' }: { type?: 'warning' | 'success' }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Alert severity={type || 'warning'} sx={{ width: '100%', p: 0.5 }}>
        {RECOMMENDATION_MESSAGES[type]}
      </Alert>
    );
  }

  return (
    <Tooltip title={RECOMMENDATION_MESSAGES[type]}>
      {type === 'warning' ? (
        <Chip color="warning" label="Warning" />
      ) : (
        <Chip color="success" label="Recommended" />
      )}
    </Tooltip>
  );
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: 'transparent',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

interface Props extends ToggleButtonProps {
  selectedColor: ColorKey;
}

const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'selectedColor',
})(({ theme, selectedColor = 'blue' }: Props & { theme: Theme }) => ({
  height: theme.spacing(3),
  minWidth: theme.spacing(3),
  color: theme.palette.primary.contrastText,
  background: DEFAULT_COLORS[selectedColor][500],
  '&:hover': {
    background: DEFAULT_COLORS[selectedColor][600],
  },
  '&.Mui-selected': {
    borderColor: 'transparent!important',
    background: DEFAULT_COLORS[selectedColor][500],
    color: theme.palette.primary.contrastText,
    '&:hover': {
      borderColor: 'transparent!important',
      background: DEFAULT_COLORS[selectedColor][600],
    },
  },
}));

function ColorSwitcher({
  handleTokenChange,
  selectedColor,
}: {
  handleTokenChange: (token: 'color', value: keyof typeof DEFAULT_COLORS) => void;
  selectedColor: ColorKey;
}) {
  return (
    <React.Fragment>
      <ConfigItemLabel>Color</ConfigItemLabel>
      <StyledToggleButtonGroup
        size="small"
        value={selectedColor}
        exclusive
        onChange={(_, value) => {
          if (value !== null) {
            handleTokenChange('color', value);
          }
        }}
        aria-label="color palette"
      >
        {(Object.keys(DEFAULT_COLORS) as Array<ColorKey>).map((color) => (
          <StyledToggleButton
            selectedColor={color}
            value={color}
            aria-label={`${color} button`}
            key={color}
          >
            {color === selectedColor ? <CheckIcon sx={{ fontSize: 12 }} /> : ''}
          </StyledToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </React.Fragment>
  );
}

function NumericTokensSlider({
  handleTokenChange,
  tokens,
}: {
  handleTokenChange: (token: keyof StyleTokensType, value: number) => void;
  tokens: Record<keyof Omit<StyleTokensType, 'color'>, number>;
}) {
  return (
    <React.Fragment>
      {(Object.keys(tokens) as Array<keyof typeof tokens>).map((token) => (
        <React.Fragment key={token}>
          <ConfigItemLabel>{token}</ConfigItemLabel>
          <Slider
            size="small"
            value={tokens[token]}
            onChange={(_, value) => handleTokenChange(token, value as number)}
            aria-label={`${token} slider`}
            key={token}
            min={0}
            max={20}
            marks
            step={1}
          />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

const CustomizationPlayground = function CustomizationPlayground({
  children,
  examples,
  componentName,
}: UseCustomizationPlaygroundProps) {
  const {
    selectedDemo,
    customizationOptions,
    selectedCustomizationOption,
    selectDemo,
    setSelectedCustomizationOption,
    selectedSlot,
    setSelectedSlot,
    codeExample,
    availableSlots,
    handleTokenChange,
    selectedTokens,
    selectedExample,
  } = useCustomizationPlayground({ examples, componentName });

  const StyledChild = withStyles(
    Box,
    selectedTokens,
    selectedCustomizationOption,
    selectedDemo,
    selectedSlot,
  );

  const shouldBeInteractive = selectedDemo && selectedCustomizationOption && codeExample;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {selectedDemo && customizationOptions && selectedCustomizationOption && (
        <BrandingProvider>
          <TabsWrapper>
            <StylingApproachTabs
              onChange={(_e, newValue) => {
                setSelectedCustomizationOption(newValue);
              }}
              value={selectedCustomizationOption}
              options={customizationOptions}
            />
            {selectedExample && <StylingRecommendation type={selectedExample.type} />}
          </TabsWrapper>{' '}
        </BrandingProvider>
      )}
      <PlaygroundWrapper>
        <PlaygroundDemoArea>
          <StyledChild sx={{ width: 'fit-content' }}>
            {React.Children.map(
              children,
              (child) =>
                React.isValidElement(child) &&
                React.cloneElement(
                  child,
                  selectedDemo && selectedCustomizationOption
                    ? {
                        ...examples[selectedDemo]?.examples[selectedCustomizationOption]
                          ?.componentProps,
                      }
                    : {},
                ),
            )}
          </StyledChild>
        </PlaygroundDemoArea>
        {shouldBeInteractive && (
          <BrandingProvider>
            <PlaygroundConfigArea>
              <ConfigSectionWrapper>
                <ConfigLabel gutterBottom>Components</ConfigLabel>
                <FormControl size="small" sx={{ backgroundColor: 'transparent', flexGrow: 1 }}>
                  <ComponentsSelect
                    id="select-component"
                    label=""
                    value={selectedDemo}
                    onChange={(e) => selectDemo(e.target.value as string)}
                  >
                    {Object.keys(examples || {}).map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </ComponentsSelect>
                </FormControl>
                {availableSlots && (
                  <React.Fragment>
                    <ConfigLabel gutterBottom>Slots</ConfigLabel>
                    <SlotItemsWrapper>
                      {(availableSlots as string[]).map((slot: string) => (
                        <SlotItem
                          size="small"
                          onClick={() => setSelectedSlot(slot)}
                          key={slot}
                          variant={selectedSlot === slot ? 'contained' : 'outlined'}
                        >
                          {slot}
                        </SlotItem>
                      ))}
                    </SlotItemsWrapper>
                  </React.Fragment>
                )}
              </ConfigSectionWrapper>
              <ConfigSectionWrapper>
                <ConfigLabel gutterBottom>Playground</ConfigLabel>
                <Stack sx={{ gap: 0.5 }}>
                  <ColorSwitcher {...{ handleTokenChange, selectedColor: selectedTokens.color }} />
                  <NumericTokensSlider
                    {...{
                      handleTokenChange,
                      tokens: pick(selectedTokens, ['borderRadius', 'borderWidth']),
                    }}
                  />
                </Stack>
              </ConfigSectionWrapper>
            </PlaygroundConfigArea>
          </BrandingProvider>
        )}
      </PlaygroundWrapper>

      {shouldBeInteractive && (
        <HighlightedCode code={codeExample} language="js" sx={{ overflowX: 'hidden' }} />
      )}
    </Box>
  );
};

export default CustomizationPlayground;
