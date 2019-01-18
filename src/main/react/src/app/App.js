import React from 'react';
import './App.scss';

export default class App extends React.Component {
    render() {
        return (
            <div className='children'>
                {this.props.children}
            </div>
        )
    }
}
