import React, { Component } from 'react';
import { AppStateContext } from './AppState/AppStateContext';
import ErrorFallback from '@components/commons/ErrorFallback';
import Head from '@components/commons/Head';

class ErrorBoundary extends Component {
  static contextType = AppStateContext;

  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const appState = this.context;

    if (this.state.hasError) {
      return (
        <>
          <Head title="Short.nr" />
          {/* You probably want the caught error here; 
              fall back to context error ID if you still need it */}
          <ErrorFallback error={this.state.error?.message || appState.error?.id} />
        </>
      );
    }

    return (
      <>
        <Head title="Short.nr" />
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
