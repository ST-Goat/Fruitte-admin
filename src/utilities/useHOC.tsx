import React from "react";

export const NewHOC = (PassedComponent: any) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <PassedComponent {...this.props} />
        </div>
      );
    }
  };
};
