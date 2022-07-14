import { useActions, useValues } from 'kea'
import { verificationLogic } from 'verificationLogic'
import { worldLogic } from 'worldLogic'

import { styled } from 'react-widget/stitches'
import { Dialog } from 'react-widget/components/Dialog'
import { DialogHeader } from 'react-widget/components/DialogHeader'
import { DialogHeaderLogo } from 'react-widget/components/DialogHeaderLogo'
import { Typography } from 'react-widget/components/Typography'
import { Button } from 'react-widget/components/Button'
import { Circle } from 'react-widget/components/Circle'
import { IconFailure } from 'assets/icons'

const SRoot = styled(Dialog, {
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  width: 400,
})

const SCircle = styled(Circle, {
  margin: '60px 0 48px 0',
})

const STitle = styled(Typography, {
  marginBottom: 8,
})

const SText = styled(Typography, {
  maxWidth: 290,
  marginBottom: 24,
})

export function ErrorScene() {
  const { endUserError } = useValues(verificationLogic)
  const { tryAgain } = useActions(verificationLogic)
  const { terminate } = useActions(worldLogic)

  return (
    <SRoot>
      <DialogHeader>
        <DialogHeaderLogo centered />
      </DialogHeader>
      <SCircle color={endUserError?.noRetry ? 'default' : 'primary'}>
        <IconFailure />
      </SCircle>
      <STitle as="h1" variant="h3" centered>
        {endUserError?.title || 'Something went wrong'}
      </STitle>
      <SText as="p" variant="p1" centered>
        {endUserError?.caption || 'Sorry, there was a problem with your request, please try again.'}
      </SText>
      {endUserError?.noRetry ? (
        <Button size="lg" fullWidth onClick={terminate}>
          Close
        </Button>
      ) : (
        <Button color="primary" size="lg" fullWidth onClick={tryAgain}>
          Try again
        </Button>
      )}
    </SRoot>
  )
}