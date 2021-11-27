import React from "react";

export const NewHOC = <P extends object>(
  PassedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<P> {
    render() {
      return (
        <div>
          <PassedComponent {...this.props} />
        </div>
      );
    }
  };
};
