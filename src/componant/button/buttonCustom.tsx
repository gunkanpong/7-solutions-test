import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const CustomButton = styled(Button)<{}>(({ theme }) => {
  return ({
    '&.Mui-disabled': { opacity: 0.7 },
    '&.MuiButton-text': {
      color: `#ffffff !important`
    },
    '&.MuiButton-outlined': {
      color: `#000000 !important`,
      border: `1px solid #ffffff !important`
    },
    '&.MuiButton-contained': {
      background: `#ffffff !important`,
      backgroundcolor: `#000000 !important`,
      color: `#000000 !important`,
      width: 300,
      border: 'none !important',
      '&:hover': {
        backgroundcolor: `#ffffff !important`,
        color: `#000000 !important`
      },
      '& .MuiButton-startIcon': {
        marginLeft: 0
      }
    },
    '&.btn-style': {
      borderRadius: '4px',
      '&:hover': {
        backgroundcolor: `#ffffff !important`,
        color: `#000000 !important`
      }
    }
  })
})
export const ButtonBase = styled(Button)(({ theme }) => ({
  height: 44,
  fontSize: '1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem'
}))

export default function ButtonCustom(props: any) {
  const { classes } = props
  return (
    <Box sx={{ margin: 'auto', ...props.style }}>
      <CustomButton
        sx={{ ...props.style, ...props.btnStyle }}
        endIcon={props.endIcon}
        startIcon={props.startIcon}
        onClick={props.onClick}
        type={props.type}
        className={`btn-style ${props.className} shadow-none`}
        disabled={props.disabled}
        variant={props.variant || 'contained'}
      >
          {props.textButton}
      </CustomButton>
    </Box>
  )
}

ButtonCustom.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  textButton: PropTypes.any,
  style: PropTypes.any,
  endIcon: PropTypes.any,
  startIcon: PropTypes.any,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  btnStyle: PropTypes.any
}

