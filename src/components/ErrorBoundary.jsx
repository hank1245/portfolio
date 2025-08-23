import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Optionally report to analytics/logging
    console.error("ErrorBoundary caught an error", error, info);
  }
  handleRetry = () => {
    this.setState({ hasError: false });
    // allow parent to retry reload lazily loaded chunks
    this.props.onRetry?.();
  };
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-6 text-center text-gray-900">
          <h2 className="text-2xl font-bold mb-2">Something went wrong.</h2>
          <p className="mb-4">
            Please try again. If the problem persists, refresh the page.
          </p>
          <button
            onClick={this.handleRetry}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
