import React, { Component } from 'react';
import { Button }           from 'reactstrap';
import user                 from 'views/assets/menu-user.png'
import loans                from 'views/assets/menu-loans.png'
import recent               from 'views/assets/menu-recent.png'
import payments             from 'views/assets/menu-payments.png'
import accounts             from 'views/assets/menu-accounts.png'
import recurring            from 'views/assets/menu-recurring.png'
import settings             from 'views/assets/menu-settings.png'
import messages             from 'views/assets/menu-messages.png'
import logout               from 'views/assets/menu-logout.png'

const menuimgs = {
  user,
  loans,
  recent,
  payments,
  accounts,
  recurring,
  settings,
  messages
}

const styles = {
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  }
}

export default function(menuimgName) {
  return function (args) {
    const a = args || {tintColor: 'black'}
    return (
      <image
        source={ menuimgs[menuimgName] }
        style={[styles.icon, {tintColor: a.tintColor}]}
      />
    )
  }
}