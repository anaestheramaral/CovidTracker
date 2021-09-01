import React from 'react';
import {Menu as MenuComponent, MenuProps} from '@material-ui/core';
// import { Container } from './styles';
import useStyles from './styles'

export const Menu: React.FC<MenuProps> = ({...rest}) => {
  const classes = useStyles();

  return (
    <MenuComponent
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      className={classes.Container}
      {...rest}
    />
  )
}

