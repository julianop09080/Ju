import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
}

static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
}

componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    this.setState({
        error: error,
        errorInfo: errorInfo,
    });
}

render() {
    if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            <div>
                <h2>Oops! Something went wrong.</h2>
                <p>Our team has been notified and is working on it.</p>
            </div>
        );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;