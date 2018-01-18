(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');

    // require comps

    class Altr extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        render() {
            return (
                <div className="altr">
                    <span>Hello, altr!</span>
                </div>
            );
        }
    }

    ReactDOM.render(<Altr />, document.getElementById('mount-point'));

}());
