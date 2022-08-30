import React from 'react'

export interface ErrorProps {
}

export interface ErrorState {
  hasError: boolean
}

export class ErrorClass<Props extends ErrorProps, State extends ErrorState, SS = any> extends React.Component<Props, State, SS> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false } as State
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info)
  }

  static getDerivedStateFromError(error: any): ErrorState {
    return { hasError: true }
  }
}
